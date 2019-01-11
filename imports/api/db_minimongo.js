import minimongo from 'minimongo'
import { List as ImList, fromJS } from 'immutable'
import _assign from 'lodash/assign'
import _map from 'lodash/map'
import _property from 'lodash/property'

const localDb = new minimongo.MemoryDb()

const _network_delay = 2000

// Thin layer on top of the minimongo APi
class _DumbCursor {
  constructor (find_result) {
    this._find_result = find_result
  }

  // Promise result: immutable order-preserving map of _id -> records
  fetch () {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * _network_delay

      setTimeout(() => {
        this._find_result.fetch(
          (data) => {
            let output = new ImList()
            data.forEach((d) => {
              output = output.push(fromJS(d))
            })
            resolve(output)
          },
          reject
        )
      }, delay)
    })
  }

  clear() {
  }
}

// Simple promise-based wrapper around the minimongo API
class _Collection {
  constructor (name) {
    if (localDb.getCollectionNames().indexOf(name) < 0) localDb.addCollection(name)
    this._coll = localDb[name]
    this.find = this.find.bind(this)
    this.findOne = this.findOne.bind(this)
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)
    this.bulkInsert = this.bulkInsert.bind(this)
  }

  // Arguments: Mongo-style selector and options
  find (selector, options) {
    return new _DumbCursor(this._coll.find(selector, options))
  }

  // Arguments: Mongo-style selector and options
  // Promise result: fetched record or null
  findOne (selector, options) {
    return new Promise((resolve, reject) => {
      // Random delay to simulate network
      const delay = Math.random() * _network_delay

      setTimeout(() => {
        this._coll.findOne(selector, options, resolve, reject)
      }, delay)
    })
  }

  // Arguments: record to be upserted
  update (doc, upsert) {
    return new Promise((resolve, reject) => {
      // Random delay to simulate network
      const delay = Math.random() * _network_delay

      setTimeout(() => {
        this._coll.upsert([doc], upsert ? null : undefined,
          (data) => {
            resolve(data[0]._id)
          },
          reject)
      }, delay)
    })
  }

  insert (doc) {
    doc = _assign({}, doc)
    delete doc._id
    return this.update(doc, true)
  }

  bulkInsert(docs) {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * _network_delay

      setTimeout(() => {
        this._coll.upsert(docs, null,
          (data) => {
            resolve(_map(data, _property('_id')))
          },
          reject)
      }, delay)
    })
  }

  // Dummy; minimongo does not support indices
  createIndex() {
    return Promise.resolve()
  }
}

// Arguments: collection name
// Return value: reference to Collection interface
function get_collection (name) {
  return new _Collection(name)
}

const db_interface = {
  get_collection,

  get_capabilities : function () {
    return {
      regexp_query : false,
      events : false,
    }
  }
}

const db_promise = Promise.resolve(db_interface)

function generate_uid () {
  return minimongo.utils.createUid()
}

// Returns a promise that fulfills with db handle when the DB backend is ready for
// use
function get_db_promise () {
  return db_promise
}

// This backend runs completely an the client, when the server just serves static content,
// thus there is no difference between client and server.
function is_server() {
  return true
}
function is_client() {
  return true
}

// This is a test-only backend
function is_production() {
  return false
}

export { get_db_promise, generate_uid, is_server, is_client, is_production }
