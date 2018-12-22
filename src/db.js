import SimpleSchema from 'simpl-schema'
import _ from 'lodash'

import { collate } from './intl_util.js'
import { get_db_promise, generate_uid } from './db_minimongo.js'
import { normalized_descriptors } from './descriptors.js'
import { normalized_templates } from './templates.js'
import { get_current_uid } from './user.js'

/*
  DB backend interface specification:

  Should always provide the following functions:
    get_db_promise(): returns a promise that resolves to the actual DB interface when
      all initialization steps have been done.
    generate_uid(): generates UIDs

    The actual DB interface has the following methods:

      get_collection(name): returns a handle into a named collection in the DB, creating one if necessary.

    Collection interface:

      find (selector, options): performs a search operation with a Mongo-style selector and synchronously returns
        a cursor
      findOne (selector, options): similar, but returns a promise to the first matched document.

      upsert (document): inserts the given document into the collection, returning a promise that resolves to
        the item id.

    Cursor interface: ultra bare bones cursor

      get_capabilities(): returns cursor capabilities as an object with the following schema:
        {
          events : bool : the cursor emits on_* style events
        }

      on_*: event handler registration methods, in case they are supported.

      fetch(): returns a promise that resolves to the full list of results.
*/

const aux_fieldname = '_AUX_BAG_OF_WORDS'
const aux_fieldname_items = `${aux_fieldname}.$`

const descriptor_schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  specialty: String,
  modality: String,
  title: String,
  body: String,
  owner_id: String,
  public: Boolean,
  [ aux_fieldname ]: {
    type: Array,
    optional: true
  },
  [ aux_fieldname_items ]: String
})
const descriptor_search_fields = [
  'title',
  'body'
]

const _attribute_custom_validator = function () {
  // Will force the attribute field to be a JSON representation of an Object instance
  if (this.value === undefined) return

  const value = JSON.parse(this.value)
  if (!(value instanceof Object)) {
    return 'Delta.item.attribute field must be a valid JSON string representing an Object'
  }
}

const delta_schema = new SimpleSchema({
  insert: {
    type: String
  },
  attributes: {
    type: String,
    optional: true,
    custom: _attribute_custom_validator
  }
})

const template_schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  specialty: String,
  modality: String,
  nickname: String,
  body: Array,
  'body.$': delta_schema,
  owner_id: String,
  public: Boolean,
  [ aux_fieldname ]: {
    type: Array,
    optional: true
  },
  [ aux_fieldname_items ]: String
})
const template_search_fields = [
  'nickname'
]

var _ready_promise = null
var _ready = false
var _db_handle = null
var _db_metadata = null

function db_ready_promise () {
  if (!_ready_promise) {
    _ready_promise = get_db_promise()
      .then((handle) => { _db_handle = handle })
      .then(bootstrap_db_if_necessary)
      .then(() => {
        _ready = true
      })
  }
  return _ready_promise
}

function is_db_ready () {
  return _ready
}

function bootstrap_db_if_necessary () {
  const metadata_col = _db_handle.get_collection('metadata')

  return metadata_col.findOne({}, {})
    .then((data) => {
      if (data) {
        _db_metadata = data
        return
      }

      // New database; populate it with hard-coded templates and descriptors.
      _db_metadata = {
        system_uid: generate_uid(),
        version: 1
      }
      return metadata_col.upsert(_db_metadata)
        .then(bootstrap_collections)
    })
}

function bootstrap_collections () {
  const descriptors_coll = _db_handle.get_collection('descriptors')
  const templates_coll = _db_handle.get_collection('templates')

  const descriptors = normalized_descriptors.map((f) => {
    f = _.assign({}, f, {
      owner_id: _db_metadata.system_uid,
      public: true
    })
    try {
      descriptor_schema.validate(f)
      f = transform_record(f, descriptor_search_fields)
      return f
    } catch (error) {
      console.log('Error validating base descriptor: ')
      console.log(error)
      console.log(f)
      return null
    }
  })
  _.remove(descriptors, (f) => (f === null))
  const templates = normalized_templates.map((t) => {
    t = _.assign({}, t, {
      owner_id: _db_metadata.system_uid,
      public: true
    })
    try {
      template_schema.validate(t)
      t = transform_record(t, template_search_fields)
      return t
    } catch (error) {
      console.log('Error validating base template: ')
      console.log(error)
      console.log(t)
      return null
    }
  })
  _.remove(templates, (t) => (t === null))

  return templates_coll.upsert(templates)
    .then(() => {
      return descriptors_coll.upsert(descriptors)
    })
}

function get_system_uid () {
  if (!_db_metadata) return null
  return _db_metadata.system_uid
}

// search_expression will be split and collated into keywords, and an array
// query into the auxiliary field will be added to selector, with an implicit
// and.
function find_templates (selector, options, search_expression = '') {
  if (!_ready) return null
  selector = transform_selector(selector, options, search_expression)
  return _db_handle.get_collection('templates').find(selector, options)
}

// search_expression will be split and collated into keywords, and an array
// query into the auxiliary field will be added to selector, with an implicit
// and.
function find_descriptors (selector, options, search_expression = '') {
  if (!_ready) return null
  selector = transform_selector(selector, options, search_expression)
  return _db_handle.get_collection('descriptors').find(selector, options)
}

function _transform_docs (docs, schema, search_fields) {
  let user_id = get_current_uid()
  if (!user_id) throw Error('Could not get current user id.')

  return docs.map((d) => {
    d = _.assign({}, d, {
      owner_id: user_id
    })
    schema.validate(d)
    d = transform_record(d, search_fields)
    return d
  })
}

function upsert_descriptors (docs) {
  if (!_ready) return null
  docs = _transform_docs(docs, descriptor_schema, descriptor_search_fields)
  return _db_handle.get_collection('descriptors').upsert(docs)
}

function split_and_collate_text (text, full_info = false) {
  const retval = []
  const myRegExp = /[^\s,.!?;:()[\]{}<>/\\'"-+*!@%&]{2,}/g
  var myArray = null

  while (true) {
    myArray = myRegExp.exec(text)
    if (!myArray) break
    if (full_info) {
      retval.push({
        value: myArray[0],
        collated_value: collate(myArray[0]),
        position: myRegExp.lastIndex - myArray[0].length
      })
    } else retval.push(collate(myArray[0]))
  }

  return retval
}

function generate_head_substrings (s, min_length = 2) {
  const output = []
  for (let l = min_length; l <= s.length; l++) output.push(s.slice(0, l))
  return output
}

function transform_record (record, search_fields) {
  const bag_of_words = new Set()
  for (let f of search_fields) {
    let keys = split_and_collate_text(record[f], false)
    for (let key of keys) {
      generate_head_substrings(key, 2).forEach(
        (s) => { bag_of_words.add(s) }
      )
    }
  }
  record[aux_fieldname] = Array.from(bag_of_words.values()).sort()
  return record
}

function transform_selector (selector, options, search_expression) {
  let new_selector = _.assign({}, selector)

  const search_array = split_and_collate_text(search_expression, false)
  if (search_array.length > 0) new_selector[aux_fieldname] = { '$all': search_array }
  return new_selector
}

export {
  db_ready_promise, is_db_ready, get_system_uid,
  find_templates,
  find_descriptors, upsert_descriptors
}
