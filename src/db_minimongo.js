import minimongo from 'minimongo'
import { OrderedMap, fromJS } from 'immutable'
import _ from 'lodash'

const localDb = new minimongo.MemoryDb()

const _network_delay = 2000

const db_interface = {
  get_collection
}

const db_promise = Promise.resolve(db_interface)

// Thin layer on top of the minimongo APi
class _DumbCursor {
  constructor (find_result) {
    this._find_result = find_result
  }

  get_capabilities () {
    return {
      events: false
    }
  }

  fetch () {
    return new Promise((resolve, reject) => {
      let delay = Math.random() * _network_delay

      setTimeout(() => {
        this._find_result.fetch(
          (data) => {
            let output = new OrderedMap()
            for (let d of data) output = output.set(d._id, fromJS(d))
            resolve(output)
          },
          reject
        )
      }, delay)
    })
  }
}

// Simple promise-based wrapper around the minimongo API
class _Collection {
  constructor (name) {
    if (localDb.getCollectionNames().indexOf(name) < 0) localDb.addCollection(name)
    this._coll = localDb[name]
    this.find = this.find.bind(this)
    this.findOne = this.findOne.bind(this)
    this.upsert = this.upsert.bind(this)
  }

  // Arguments: Mongo-style selector and options
  // Promise result: immutable order-preserving map of _id -> records
  find (selector, options) {
    return new _DumbCursor(this._coll.find(selector, options))
  }

  // Arguments: Mongo-style selector and options
  // Promise result: fetched record or null
  findOne (selector, options) {
    return new Promise((resolve, reject) => {
      // Random delay to simulate network
      let delay = Math.random() * _network_delay

      setTimeout(() => {
        this._coll.findOne(selector, options, resolve, reject)
      }, delay)
    })
  }

  // Arguments: array of records to be upserted
  upsert (docs) {
    return new Promise((resolve, reject) => {
      // Random delay to simulate network
      let delay = Math.random() * _network_delay

      setTimeout(() => {
        this._coll.upsert(docs, null,
          (data) => {
            resolve(_.map(data, _.property('_id')))
          },
          reject
        )
      }, delay)
    })
  }
}

// Arguments: collection name
// Return value: reference to Collection interface
function get_collection (name) {
  return new _Collection(name)
}

function generate_uid () {
  return minimongo.utils.createUid()
}

// Returns a promise that fulfills with db handle when the DB backend is ready for
// use
function get_db_promise () {
  return db_promise
}

export { get_db_promise, generate_uid }
