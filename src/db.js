import SimpleSchema from 'simpl-schema'
import _ from 'lodash'

import { collate } from './intl_util.js'
import { get_db_promise, generate_uid, log_db } from './db_minimongo.js'
import { normalized_descriptors } from './descriptors.js'
import { normalized_templates } from './templates.js'

const descriptor_schema = new SimpleSchema({
  specialty: String,
  modality: String,
  title: String,
  body: String,
  owner_id: String,
  public: Boolean,
  mtime: Number
})
const descriptor_search_fields = [
  'title',
  'body'
]

const template_schema = new SimpleSchema({
  specialty: String,
  modality: String,
  name: String,
  nickname: String,
  title: String,
  technique: String,
  body: String,
  conc: String,
  owner_id: String,
  public: Boolean,
  mtime: Number
})
const template_search_fields = [
  'nickname',
  'title',
  'technique',
  'body',
  'conc'
]

const aux_fieldname = '_AUX_BAG_OF_WORDS'

var ready_promise = null
var db_handle = null
var db_metadata = null

function ready () {
  if (!ready_promise) {
    ready_promise = get_db_promise()
      .then((handle) => { db_handle = handle })
      .then(bootstrap_db_if_necessary)
  }

  return ready_promise
}

function bootstrap_db_if_necessary () {
  const metadata_col = db_handle.get_collection('metadata')

  return metadata_col.findOne({}, {})
    .then((data) => {
      if (data) {
        db_metadata = data
        return
      }

      // New database; populate it with hard-coded templates and descriptors.
      db_metadata = {
        system_uid: generate_uid(),
        version: 1
      }
      return metadata_col.upsert(db_metadata)
        .then(bootstrap_collections)
        .then(() => {
          console.log('Bootstraped DB:')
          log_db()
        })
    })
}

function bootstrap_collections () {
  const descriptors_coll = db_handle.get_collection('descriptors')
  const templates_coll = db_handle.get_collection('templates')

  const descriptors = normalized_descriptors.map((f) => {
    f = Object.assign(f, {
      owner_id: db_metadata.system_uid,
      public: true,
      mtime: Date.now()
    })
    try {
      descriptor_schema.validate(f)
      f = transform_record(f, descriptor_search_fields)
      return f
    } catch (error) {
      console.log('Error validating base descriptor: ')
      console.log(f)
      return null
    }
  })
  _.remove(descriptors, (f) => (f === null))
  const templates = normalized_templates.map((t) => {
    t = Object.assign(t, {
      owner_id: db_metadata.system_uid,
      public: true,
      mtime: Date.now()
    })
    try {
      template_schema.validate(t)
      t = transform_record(t, template_search_fields)
      return t
    } catch (error) {
      console.log('Error validating base template: ')
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
  if (!db_metadata) return null
  return db_metadata.system_uid
}

// search_expression will be split and collated into keywords, and an array
// query into the auxiliary field will be added to selector, with an implicit
// and.
function find_templates (selector, options, search_expression = '') {
  selector = transform_selector(selector, options, search_expression)
  return ready().then(() => {
    return db_handle.get_collection('templates').find(selector, options)
  })
}

// search_expression will be split and collated into keywords, and an array
// query into the auxiliary field will be added to selector, with an implicit
// and.
function find_descriptors (selector, options, search_expression = '') {
  selector = transform_selector(selector, options, search_expression)
  return ready().then(() => {
    return db_handle.get_collection('descriptors').find(selector, options)
  })
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
  let new_selector = Object.assign({}, selector)

  const search_array = split_and_collate_text(search_expression, false)
  if (search_array.length > 0) new_selector[aux_fieldname] = { '$in': search_array }
  return new_selector
}

export { ready, find_templates, find_descriptors, get_system_uid }
