import minimongo from 'minimongo'
import { OrderedMap, fromJS } from 'immutable'

const localDb = new minimongo.MemoryDb()

const db_interface = {
  get_collection
}

const db_promise = Promise.resolve(db_interface)

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
    console.log('_Collection.find selector:')
    console.log(this._coll)
    console.log(selector)
    console.log(options)
    return new Promise((resolve, reject) => {
      this._coll.find(selector, options).fetch(
        (data) => {
          console.log('_Collection.find received:')
          console.log(data)
          let output = new OrderedMap()
          for (let d of data) output = output.set(d._id, fromJS(d))
          resolve(output)
        },
        reject)
    })
  }

  // Arguments: Mongo-style selector and options
  // Promise result: fetched record or null
  findOne (selector, options) {
    return new Promise((resolve, reject) => {
      this._coll.findOne(selector, options, resolve, reject)
    })
  }

  // Arguments: array of records to be upserted
  upsert (docs) {
    return new Promise((resolve, reject) => {
      this._coll.upsert(docs, null, resolve, reject)
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

function log_db () {
  console.log(localDb)
}

export { get_db_promise, generate_uid, log_db }
