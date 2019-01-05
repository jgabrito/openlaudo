/*
  asset_interface: Object containing the following callbacks:
    get_title, get_body: take an asset reference as input and return
      the corresponding information
    sort_key: string

    find_assets(selector, options, search_expression) : reroutes the call to the
      appropriate entry in the DB backend and returns a promise for the data

    upsert_assets(docs): upserts the given assets, returning a promise that
      never rejects and always resolves to an array of the Objects with the
      following specification:
        {
          requested_id: id originally requested
          _id : id of upserted item
          error : error message, if appropriate, otherwise null
        }
*/

// TODO: create abstract AssetInterface class and derived descriptor and template
// interface classes. Also allow sort_key to be changed, so that different
// sort orders are available at the GUI

import * as db from '../../api/db.js'

function _promise_factory (dispatcher, doc) {
  return dispatcher(doc).then(
    (id) => ({
      _id : id,
      requested_id : doc._id,
      error : null
    }),
    (error) => ({
      _id : null,
      requested_id : doc._id,
      error
    })
  )
}

const descriptor_interface = {
  get_title: a => (a.title),
  get_body: a => (a.body),
  sort_key: 'title',
  find_assets: function (selector, options, search_expression) {
    return db.find_descriptors(selector, options, search_expression, 'title')
  },
  upsert_assets: function (docs) {
    const promises = docs.map(d => _promise_factory(db.upsert_descriptor, d))
    return Promise.all(promises)
  }
}

const template_interface = {
  get_title: a => (a.nickname),
  get_body: a => (a.body),
  sort_key: 'nickname',
  find_assets: function (selector, options, search_expression) {
    return db.find_templates(selector, options, search_expression, 'nickname')
  },
  upsert_assets: function (docs) {
    const promises = docs.map(d => _promise_factory(db.upsert_template, d))
    return Promise.all(promises)
  }
}

export { descriptor_interface, template_interface }
