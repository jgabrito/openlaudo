import SimpleSchema from 'simpl-schema'
import _ from 'lodash'
import { List as ImList, Map as ImMap, Set as ImSet, fromJS } from 'immutable'

import { collate } from './intl_util.js'
import { get_db_promise, generate_uid, is_client, is_server, is_production } from './db_meteor.js'
import { get_current_uid } from './user.js'

/*
  DB backend interface specification:

  Should always provide the following functions:
    get_db_promise(): returns a promise that resolves to the actual DB interface when
      all initialization steps have been done.
    generate_uid(): generates UIDs
    is_server(): true if server-side code.
    is_client(): same for client-side code
    is_production(): production environment

    The actual DB interface has the following methods:
      get_collection(name): returns a handle into a named collection in the DB, creating
        one if necessary.
      get_capabilities(): Object containing capabilities of the DB backend:
        {
          regexp_query: can perform regexp queries
          events : bool : the cursors support live queries through observe method
        }

    Collection interface:
      find (selector, options): performs a search operation with a Mongo-style selector and
        synchronously returns a cursor
      findOne (selector, options): similar, but returns a promise to the first matched
        document as a plain javascript object. Server-side only.

      insert (document): inserts the given document (plain javascript Object) into the
        collection, returning a promise that resolves to the new item id. If the
        document contains an _id field, it is ignored.
      update (document, upsert): updates the given document (plain javascript object)
        in the collection. Selection is based on _id. Perform a simple insert if no _id
        field. If upsert is true, perform an upsert, i.e., insert non-existing document.
        Returns a a promise that resolves to the affected item id.

      bulkInsert(docs): performs bulk insertion of documents into DB. This function
        will be called for large, optimized, server-side-only inserts.

      createIndex(fieldSpec, options) : create an index with the given field specs and options
        in the DB backend for that collection. Returns a promise that fulfills when index
        creation is complete.
          fieldSpec should be an object of the form { fieldName : +-1 , (...) }, to create a
            single index or a compound one;
          options: { unique : bool }

    Cursor interface: ultra bare bones cursor
      fetch(): returns a promise that resolves to the full list of results as an immutable list
      clear(): clears any resources, subscriptions and watchers associated
        with the cursor
      observe(callbacks): setup live queries, when available all docs should be sent as immutable
        maps
        callbacks: {
          added(doc): new document added
          changed(newdoc, olddoc): document changed
          removed(olddoc): document removed
        }
        returns: live query handle that implements stop() method to stop observation
*/

// Schema definitions

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
  hotkey : String,
  [ aux_fieldname ]: {
    type: Array
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
  },
  [ aux_fieldname_items ]: String
})
const template_search_fields = [
  'nickname'
]

// Module-global variables
let _ready_promise = null
let _ready = false
let _db_handle = null
let _db_metadata = null
let _hardcoded_templates = {}
let _hardcoded_descriptors = {}

// Record and selector transformers
function split_and_collate_text (text, full_info = false) {
  const retval = []
  const myRegExp = /[^\s,.!?;:()[\]{}<>/\\'"-+*!@%&]{2,}/g
  let myArray = null

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
  for (let l = min_length; l <= s.length; l += 1) output.push(s.slice(0, l))
  return output
}

function transform_record (record, search_fields) {
  const bag_of_words = new Set()

  search_fields.forEach((f) => {
    const keys = split_and_collate_text(record[f], false)
    keys.forEach((key) => {
      generate_head_substrings(key, 2).forEach(
        (s) => { bag_of_words.add(s) }
      )
    })
  })
  record[aux_fieldname] = Array.from(bag_of_words.values()).sort()
  return record
}

function transform_selector (selector, options, search_expression) {
  const new_selector = _.assign({}, selector)

  const search_array = split_and_collate_text(search_expression, false)
  if (search_array.length > 0) new_selector[aux_fieldname] = { '$all': search_array }
  return new_selector
}

function get_system_uid () {
  return 'SYSTEM'
}

function is_db_ready () {
  return _ready
}

// Aync-load hard-coded templates and descriptors from static JS.
// These are off-DB assets, hopefully available from the browser cache even when offline.
function _transform_hardcoded_stuff(items, schema, search_fields, sort_key) {
  let output = new ImList()
  items.forEach((i) => {
    i = _.assign({}, i, {
      _id : `local://${generate_uid()}`,
      owner_id: get_system_uid(),
      public: true
    })
    try {
      transform_record(i, search_fields)
      schema.validate(i)
      output = output.push(fromJS(i))
    } catch (error) {
      console.log('Error validating hardcoded item: ')
      console.log(error)
      console.log(i)
    }
  })
  output = output.sort((a, b) => {
    a = a.get(sort_key)
    b = b.get(sort_key)
    if (a < b) { return -1 }
    if (a > b) { return 1 }
    return 0
  })

  let output_wordmap = new ImMap()
  output.forEach((o) => {
    o.get(aux_fieldname).forEach((w) => {
      let temp = output_wordmap.get(w) || new ImSet()
      temp = temp.add(o)
      output_wordmap = output_wordmap.set(w, temp)
    })
  })

  return { items: output, wordmap : output_wordmap }
}

function load_hardcoded_stuff() {
  if ( is_production() && (!is_client()) ) { return Promise.resolve() }

  return Promise.all([
    import('./templates.js').then((m) => {
      _hardcoded_templates = _transform_hardcoded_stuff(m.normalized_templates,
        template_schema, template_search_fields, 'nickname')
    }),
    import('./descriptors.js').then((m) => {
      _hardcoded_descriptors = _transform_hardcoded_stuff(m.normalized_descriptors,
        descriptor_schema, descriptor_search_fields, 'title')
    })
  ])
}


// DB backend initialization-related code
function bootstrap_test_db_if_development() {
  // Run server-side only to bootstrap a test DB.
  if (!is_server()) return
  if (is_production()) return

  const descriptors_col = _db_handle.get_collection('descriptors')
  const templates_col = _db_handle.get_collection('templates')

  const test_descriptors = _hardcoded_descriptors.items.map((d) => {
    d = d.set('title', `${d.get('title')} - TEST`)
    d = d.set('_id', generate_uid())
    return d
  })
  const test_templates = _hardcoded_templates.items.map((t) => {
    t = t.set('nickname', `${t.get('nickname')} - TEST`)
    t = t.set('_id', generate_uid() )
    return t
  })
  return descriptors_col.bulkInsert(test_descriptors.toJS())
    .then( () => {
      return templates_col.bulkInsert(test_templates.toJS())
    })
}

function upgrade_db_if_necessary () {
  // Run server-side only to initialize a new DB or upgrade an old one.
  if (!is_server()) return Promise.resolve()

  const metadata_col = _db_handle.get_collection('metadata')

  return metadata_col.findOne()
    .then((data) => {
      if (data) {
        console.log('No need to upgrade DB')
        _db_metadata = data
        return
      }

      // New database;
      _db_metadata = {
        version: 1
      }

      // Create indices
      const descriptors_col = _db_handle.get_collection('descriptors')
      const templates_col = _db_handle.get_collection('templates')
      const indices_promise = [
        descriptors_col.createIndex( { modality : 1, specialty : 1, _id : 1 }, { unique : true } ),
        descriptors_col.createIndex( { owner_id : 1, public : 1, _id : 1 }, { unique : true } ),
        descriptors_col.createIndex( { title : 1, _id : 1 }, { unique : true } ),
        descriptors_col.createIndex( { [aux_fieldname] : 1 }, { unique : false } ),
        templates_col.createIndex( { modality : 1, specialty : 1, _id : 1 }, { unique : true } ),
        templates_col.createIndex( { owner_id : 1, public : 1, _id : 1 }, { unique : true } ),
        templates_col.createIndex( { nickname : 1, _id : 1 }, { unique : true } ),
        templates_col.createIndex( { [aux_fieldname] : 1 }, { unique : false } ),
      ]
      return Promise.all(indices_promise)
        .then(() => {
          console.log('Bootstraping test db if necessary')
          return bootstrap_test_db_if_development()
        })
        .then( () => {
          console.log('DB ready')
          return metadata_col.insert(_db_metadata)
        })
    })
}

// Returns promise that resolves when the DB is ready.
function db_ready_promise () {
  if (!_ready_promise) {
    _ready_promise = get_db_promise()
      .then((handle) => { _db_handle = handle })
      .then(load_hardcoded_stuff)
      .then(upgrade_db_if_necessary)
      .then(() => {
        _ready = true
      })
  }
  return _ready_promise
}

// Local collection filters and utilities

// Finds the lowest insertion index of an item in an ordered list by binary search.
// Assumes the list is ordered according to the comparator function
function _sorted_insert_index(list, item, comparator) {
  let min = 0
  let max = list.size
  let mid = 0

  while (max > min) {
    mid = (max + min) >>> 1
    if (comparator(item, list.get(mid)) > 0) {
      min = mid + 1
    } else {
      max = mid
    }
  }
  return min
}

// Finds the index of an item in on ordered list. Returns -1 if not present.
// Assumes the list is ordered according to the comparator function
function _sorted_index_of (list, item, comparator) {
  const idx = _sorted_insert_index(list, item, comparator)
  if ((idx < list.size) && (comparator(list.get(idx), item) === 0)) {
    return idx
  }
  return -1
}

function _filter_items (items, items_wordmap, selector) {
  let valid_items
  if ((items_wordmap) && (selector['$all'] !== undefined)) {
    for (let i = 0; i < selector['$all'].length; i += 1) {
      const w = selector['$all'][i]
      const new_records = items_wordmap.get(w)
      if (!new_records) return new ImList()

      if (!valid_items) valid_items = new_records
      else valid_items = valid_items.intersect(new_records)

      if (valid_items.size === 0) return new ImList()
    }
  }

  selector = _.entries(selector)
  return items.filter((i) => {
    let retval = true

    selector.forEach(([k, v]) => {
      if (k === '$all') {
        if (valid_items) {
          if (!valid_items.has(i)) {
            retval = false
          }
        } else {
          v.forEach((w) => {
            if (_sorted_index_of(i.get(aux_fieldname), w,
              (a, b) => a.localeCompare(b)) < 0) {
              retval = false
            }
          })
        }
      } else if (i.get(k) !== v) {
        retval = false
      }
    })

    return retval
  })
}

// Merge fixed items with items fetched from DB, assuming both lists are compatibly
// sorted.
function _merge_sorted_lists(l1, l2, comparator) {
  let output = new ImList()
  let i1 = 0
  let i2 = 0
  while (true) {
    const l1_value = l1.get(i1, undefined)
    const l2_value = l2.get(i2, undefined)
    let output_value

    if ((l1_value !== undefined) && (l2_value !== undefined)) {
      if (comparator(l1_value, l2_value) < 0) {
        output_value = l1_value
        i1 += 1
      } else {
        output_value = l2_value
        i2 += 1
      }
    } else if (l1_value !== undefined) {
      output_value = l1_value
      i1 += 1
    } else if (l2_value !== undefined) {
      output_value = l2_value
      i2 += 1
    } else {
      break
    }

    output = output.push(output_value)
  }
  return output
}

// Cursor class that allows one to combine a fixed asset list (hard-coded) with results from
// the DB. It assumes that both collections are sorted in the same way.
class ExpandedCursor {
  constructor (cursor, fixed_items, selector, options, sort_key) {
    this._cursor = cursor
    this._selector = selector
    this._options = options
    this._sort_key = sort_key
    this._comparator = ((a, b) => {
      const temp = a.get(this._sort_key).localeCompare(b.get(this._sort_key))
      if (temp !== 0) {
        return temp
      }
      // _id should be always secondary sort key, to ensure unicity
      return a.get('_id').localeCompare(b.get('_id'))
    })

    // These should have already been filtered by the caller
    this._fixed_items = fixed_items.sort(this._comparator)
    this._dataset = this._fixed_items

    this.fetch = this.fetch.bind(this)
    this.observe = this.observe.bind(this)
    this.clear = this.clear.bind(this)
    this.item_added = this.item_added.bind(this)
    this.item_changed = this.item_changed.bind(this)
    this.item_removed = this.item_removed.bind(this)

    if (_db_handle.get_capabilities()['events']) {
      this._observers = []
      this._live_query = this._cursor.observe({
        added : this.item_added,
        changed : this.item_changed,
        removed : this.item_removed
      })
    }
  }

  fetch() {
    return this._cursor.fetch().then((data) => {
      // Locally filter items fetched from DB, since they unconditionally include
      // user-owned items. Fixed items had already been filtered before this
      // cursor was created.
      data = _filter_items(data, undefined, this._selector)
      return _merge_sorted_lists(this._fixed_items, data, this._comparator)
    })
  }

  item_added(doc) {
    const idx = _sorted_insert_index(this._dataset, doc, this._comparator)
    this._dataset = this._dataset.insert(idx, doc)
    this.notify_observers()
  }

  item_changed(new_doc, old_doc) {
    let idx = _sorted_index_of(this._dataset, old_doc, this._comparator)
    if (idx < 0) {
      throw new Error(`item_changed: item with id ${old_doc.get('_id')} not found in dataset`)
    }
    this._dataset = this._dataset.delete(idx)
    idx = _sorted_insert_index(this._dataset, new_doc, this._comparator)
    this._dataset = this._dataset.insert(idx, new_doc)
    this.notify_observers()
  }

  item_removed(old_doc) {
    const idx = _sorted_index_of(this._dataset, old_doc, this._comparator)
    if (idx < 0) {
      throw new Error(`item_changed: item with id ${old_doc.get('_id')} not found in dataset`)
    }
    this._dataset = this._dataset.delete(idx)
    this.notify_observers()
  }

  notify_observers() {
    this._observers.forEach((o) => {
      o.callback(this._dataset)
    })
  }

  observe(callback) {
    const _id = generate_uid()
    this._observers.push({
      _id,
      callback,
      stop : () => {
        this._observers = _.filter(this._observers, o => (o._id !== _id))
      }
    })
    callback(this._dataset)
  }

  clear() {
    this._cursor.clear()
    if (this._live_query) {
      this._live_query.stop()
      this._live_query = null
    }
    if (this._observers) {
      this._observers = null
    }
  }
}

// Selector must be an object that will be matched field by field with the
// incoming records assuming equality predicates and implicit logic AND.
// search_expression will be split and collated into keywords, and an array
// query into the auxiliary field will be added to selector.
function _do_find(collection, hardcoded_collection, selector, options, sort_key) {
  if (!is_client()) {
    throw new Error('Client-side only.')
  }
  if (!_ready) return null

  options = _.assign({}, options, { sort : { [ sort_key ] : 1, _id : 1 } } )
  const fixed_items = _filter_items(hardcoded_collection.items,
    hardcoded_collection.wordmap, selector)
  return new ExpandedCursor(collection.find(selector, options), fixed_items, selector,
    options, sort_key)
}

function find_templates (selector, options, search_expression = '', sort_key = 'nickname') {
  selector = transform_selector(selector, options, search_expression)
  return _do_find(_db_handle.get_collection('templates'), _hardcoded_templates, selector,
    options, sort_key)
}

function find_descriptors (selector, options, search_expression = '', sort_key = 'title') {
  selector = transform_selector(selector, options, search_expression)
  return _do_find(_db_handle.get_collection('descriptors'), _hardcoded_descriptors, selector,
    options, sort_key)
}

function _transform_docs (docs, schema, search_fields) {
  const user_id = get_current_uid()
  if (!user_id) throw new Error('Could not get current user id.')

  return docs.map((d) => {
    d = _.assign({}, d, {
      owner_id: user_id
    })
    d = transform_record(d, search_fields)
    schema.validate(d)
    if ((d._id !== undefined) && d._id.startsWith('local://')) {
      // Attempting to upsert a local, hardcoded doc; silently convert to an insert
      delete d._id
    }
    return d
  })
}

function upsert_descriptor (doc) {
  if (!is_client()) {
    throw new Error('Client-side only.')
  }
  if (!_ready) {
    return null
  }
  [doc] = _transform_docs([doc], descriptor_schema, descriptor_search_fields)
  return _db_handle.get_collection('descriptors').update(doc, true)
}

function upsert_template (doc) {
  if (!is_client()) {
    throw new Error('Client-side only.')
  }
  if (!_ready) {
    return null
  }
  [doc] = _transform_docs([doc], template_schema, template_search_fields)
  return _db_handle.get_collection('templates').update(doc, true)
}

function get_capabilities() {
  if (!_ready) return null
  return _db_handle.get_capabilities()
}

function _check_sorted(l) {
  for (let i = 1; i < l.length; i += 1) {
    if (l[i].localeCompare(l[i - 1]) < 0) return false
  }
  return true
}

function validate_template(t) {
  template_schema.validate(t)
  if (!_check_sorted(t[aux_fieldname])) {
    throw new Error(`template.${aux_fieldname} not sorted.`)
  }
}

function validate_descriptor(d) {
  descriptor_schema.validate(d)
  if (!_check_sorted(d[aux_fieldname])) {
    throw new Error(`descriptor.${aux_fieldname} not sorted.`)
  }
}

export {
  db_ready_promise, is_db_ready, get_system_uid,
  find_templates, upsert_template, validate_template,
  find_descriptors, upsert_descriptor, validate_descriptor,
  get_capabilities
}
