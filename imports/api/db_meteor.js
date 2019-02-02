import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'
import { check, Match } from 'meteor/check'
import { List as ImList, fromJS } from 'immutable'
import _assign from 'lodash/assign'
import _values from 'lodash/values'
import _entries from 'lodash/entries'
import _keys from 'lodash/keys'
import _pick from 'lodash/pick'

import { validate_template, validate_descriptor, validate_user_data } from './db.js'

const _method_calls = new Set()

const collections = {
  'templates' : new Mongo.Collection('templates'),
  'descriptors' : new Mongo.Collection('descriptors'),
  'user_data' : new Mongo.Collection('user_data'),
  'metadata' : new Mongo.Collection('metadata')
}

_values(collections).forEach((c) => {
  c.deny(
    {
      insert() { return true },
      update() { return true },
      remove() { return true }
    }
  )
})

function _sanitize_options(options) {
  const output = {}
  if (options.limit !== undefined) output.limit = Number(options.limit)
  if (options.sort instanceof Object) {
    output.sort = {}
    _entries(options.sort).forEach(([k, v]) => {
      output.sort[k] = Number(v)
    })
  }
  return output
}

// Basic publication function.
// The collection here is the actual MongoDB colletion.
// The publication always includes all user-owned entries. When selector === null,
// only these entries are included. Otherwise, these entries plus other user's
// public entries, filtered by the selector, are included and sorted accordingly. Thus,
// client-side code should be aware of that and ensure filtering as appropriate.
function _publication (collection, selector, options) {
  if (this.userId === null) {
    // DB access restricted to logged-in users
    return []
  }

  try {
    options = _sanitize_options(options || {})

    if (selector === null) {
      selector = { 'owner_id' : this.userId }
    } else {
      selector = { '$or' :
        [
          { 'owner_id' : this.userId },
          { '$and' :
            [
              { 'owner_id' : { '$ne' : this.userId } },
              { 'public' : true },
              selector
            ]
          }
        ]
      }
    }
    return collection.find(selector, options)
  } catch (err) {
    console.log(err)
    this.error(Meteor.Error(err))
  }
}

// Register publications
if (Meteor.isServer) {
  Meteor.publish('templates', function(selector, options) {
    check(selector, Match.Any)
    check(options, Match.Any)
    return _publication.bind(this)(collections.templates, selector, options)
  })

  Meteor.publish('descriptors', function(selector, options) {
    check(selector, Match.Any)
    check(options, Match.Any)
    return _publication.bind(this)(collections.descriptors, selector, options)
  })

  Meteor.publish('user_data', function(selector, options) {
    check(selector, Match.Any)
    check(options, Match.Any)

    if (this.userId === null) {
      // DB access restricted to logged-in users
      return []
    }

    // Publish only current user data; no parameters needed
    return collections.user_data.find({ _id : this.userId }, { limit : 1 })
  })
}

function _method_call_wrapper (fn, params) {
  const { op_id } = params

  if (_method_calls.has(op_id)) {
    // Ignore method retry
    return
  }
  _method_calls.add(op_id)

  let result
  let error
  try {
    result = fn(params)
  } catch (err) {
    error = err
  }
  _method_calls.delete(op_id)

  if (error) {
    throw error
  }
  return result
}

// This function performs the actual upsert in response to the corresponding method call.
// Input sanitization and authorization happen here.
function _do_update (params) {
  const { collection, doc, upsert, validator } = params
  let result

  if (this.userId === null) {
    throw new Meteor.Error('Unauthorized')
  }
  const current_uid = this.userId

  try {
    validator(doc)
  } catch (err) {
    throw new Meteor.Error(err)
  }

  if (doc.owner_id !== current_uid) {
    throw new Meteor.Error('Unauthorized')
  }

  if (Meteor.isServer) {
    let orig = null;
    if (doc._id !== undefined) {
      orig = collection.findOne({ '_id' : doc._id })
    }
    if (orig && (orig.owner_id !== current_uid)) {
      throw new Meteor.Error(`Record ${doc._id} belongs to another user.`)
    }
  }

  // Document is OK. Perform actual update.
  if (doc._id) {
    if (collection.update({ '_id' : doc._id }, doc, { upsert })) {
      result = doc._id
    }
  } else {
    result = collection.insert(doc)
  }

  return result
}

function _do_update_user_data (params) {
  const { doc } = params
  const collection = collections.user_data
  let result

  if (this.userId === null) {
    throw new Meteor.Error('Unauthorized')
  }
  const current_uid = this.userId

  try {
    validate_user_data(doc)
  } catch (err) {
    throw new Meteor.Error(err)
  }

  if (!doc._id) {
    doc._id = current_uid
  } else if (doc._id !== current_uid) {
    throw new Meteor.Error('Unauthorized')
  }

  // Document is OK. Perform actual update.
  // Upsert always implied for user data
  if (collection.update({ '_id' : doc._id }, doc, { upsert : true })) {
    result = doc._id
  }

  return result
}


// Register methods
Meteor.methods({
  update_template : function(doc, upsert, op_id) {
    check(doc, Object)
    check(upsert, Boolean)
    check(op_id, String)
    const params = {
      collection : collections.templates,
      doc,
      upsert,
      op_id,
      validator : validate_template
    }
    return _method_call_wrapper.bind(this)(_do_update.bind(this), params)
  },

  update_descriptor : function(doc, upsert, op_id) {
    check(doc, Object)
    check(upsert, Boolean)
    check(op_id, String)
    const params = {
      collection : collections.descriptors,
      doc,
      upsert,
      op_id,
      validator : validate_descriptor
    }
    return _method_call_wrapper.bind(this)(_do_update.bind(this), params)
  },

  update_user_data : function(doc, upsert, op_id) {
    check(doc, Object)
    check(upsert, Boolean) // upsert is always true for user_data collection; ignore
    check(op_id, String)
    const params = {
      doc,
      op_id,
    }
    return _method_call_wrapper.bind(this)(_do_update_user_data.bind(this), params)
  }
})

const _method_names = {
  descriptors : 'update_descriptor',
  templates : 'update_template',
  user_data : 'update_user_data'
}

// Rate-limiting for method calls
if (Meteor.isServer) {
  DDPRateLimiter.addRule(
    {
      type : 'method',
      name : name => (_values(_method_names).includes(name)),
      connectionId : () => true,
    },
    10, 1000
  )
}

// Wrapper for a MongoDB cursor with the expected interface
class _Cursor {
  constructor(cursor, subscription = null) {
    this._cursor = cursor
    this._subscription = subscription
    this._callbacks = null
    this._live_query = null
    this.fetch = this.fetch.bind(this)
    this.clear = this.clear.bind(this)
    this.observe = this.observe.bind(this)
    this.doc_added = this.doc_added.bind(this)
    this.doc_changed = this.doc_changed.bind(this)
    this.doc_removed = this.doc_removed.bind(this)
  }

  // Promise result: immutable order-preserving map of _id -> records
  fetch () {
    return new Promise((resolve) => {
      let output = new ImList()
      this._cursor.forEach( (d) => {
        output = output.push(fromJS(d))
      })
      resolve(output)
    })
  }

  clear() {
    if (this._subscription) {
      this._subscription.stop()
      this._subscription = null
    }
    if (this._live_query) {
      this._live_query.stop()
      this._live_query = null
      this._callbacks = null
    }
  }

  doc_added (new_doc) {
    this._callbacks.added(fromJS(new_doc))
  }

  doc_changed(new_doc, old_doc) {
    this._callbacks.changed(fromJS(new_doc), fromJS(old_doc))
  }

  doc_removed(old_doc) {
    this._callbacks.removed(fromJS(old_doc))
  }

  filter_callbacks (callbacks) {
    const callback_map = {
      added : this.doc_added,
      changed : this.doc_changed,
      removed : this.doc_removed,
    }
    return _pick(callback_map, _keys(callbacks))
  }

  observe(callbacks) {
    if (this._live_query) {
      this._live_query.stop()
      this._callbacks = null
      this._live_query = null
    }
    const filtered_cbs = this.filter_callbacks(callbacks)
    this._callbacks = callbacks
    this._live_query = this._cursor.observe(filtered_cbs)
  }
}

function generate_uid () {
  return new Mongo.ObjectID().toHexString()
}

// Wrapper for a Meteor/MongoDB collection implementing the expected interface
class _Collection {
  constructor (name) {
    this._name = name
    this._coll = collections[name]
    if (this._coll === undefined) {
      throw new Meteor.Error(`Invalid collection name: ${name}`)
    }
    this._update_method = _method_names[name]

    this.find = this.find.bind(this)
    this.findOne = this.findOne.bind(this)
    this.update = this.update.bind(this)
    this.insert = this.insert.bind(this)
    this.bulkInsert = this.bulkInsert.bind(this)
  }

  // Arguments: Mongo-style selector and options
  find (selector = {}, options = {}) {
    if (Meteor.isServer) {
      return new _Cursor(this._coll.find(selector, options))
    }

    // Client-side: subscribe and find
    const subscription = Meteor.subscribe(this._name, selector, options)
    return new _Cursor(this._coll.find(selector, options), subscription)
  }

  // Arguments: Mongo-style selector and options
  // Promise result: fetched record or null
  findOne (selector = {}, options = {}) {
    if (!Meteor.isServer) {
      throw new Meteor.Error('Server-side only')
    }

    if (_keys(selector).length === 0) {
      const cursor = this._coll.find(selector, options)
      if (cursor.count() > 0) return Promise.resolve(cursor.fetch()[0])
      return Promise.resolve(undefined)
    }

    return Promise.resolve(this._coll.findOne(selector, options))
  }

  bulkInsert(docs) {
    if (!Meteor.isServer) {
      throw new Error('Server side only')
    }
    docs = docs.map((d) => {
      d = _assign({}, d)
      delete d._id
      return d
    })

    return new Promise((resolve, reject) => {
      this._coll.batchInsert(docs, (res, err) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  insert (doc) {
    doc = _assign({}, doc)
    delete doc._id
    return this.update(doc, true)
  }

  update (doc, upsert) {
    if (Meteor.isServer) {
      // Server side: perform update without further ado
      return new Promise((resolve, reject) => {
        if (doc._id === undefined) {
          this._coll.insert(doc, (err, id) => {
            if (err) reject(err)
            else resolve(id)
          })
        } else {
          this._coll.update( { _id : doc._id }, doc, { upsert }, (err, nbr) => {
            if (err) {
              reject(err)
            } else if (nbr) resolve(doc._id)
            else resolve(null)
          })
        }
      })
    }

    // Client side: stub for corresponding Meteor method
    return new Promise((resolve, reject) => {
      Meteor.call(this._update_method, doc, upsert, generate_uid(),
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }

  createIndex (field_spec, options) {
    if (!Meteor.isServer) {
      throw new Meteor.Error('Index creation only supported on server.')
    }
    return this._coll.rawCollection().createIndex(field_spec, options)
  }
}

const collection_interfaces = {
  'templates' : new _Collection('templates'),
  'descriptors' : new _Collection('descriptors'),
  'user_data' : new _Collection('user_data'),
  'metadata' : new _Collection('metadata')
}

const db_interface = {
  get_collection : function(name) {
    const coll = collection_interfaces[name]
    if (coll === undefined) {
      throw new Meteor.Error(`Invalid collection name: ${name}`)
    }
    return coll
  },

  get_capabilities : function () {
    return {
      regexp_query : true,
      events : true,
    }
  }
}

const db_promise = Promise.resolve(db_interface)

// Returns a promise that fulfills with db handle when the DB backend is ready for
// use
function get_db_promise () {
  return db_promise
}

function is_server() {
  return Meteor.isServer
}

function is_client() {
  return Meteor.isClient
}

function is_production() {
  return Meteor.isProduction
}

export { get_db_promise, generate_uid, is_server, is_client, is_production }
