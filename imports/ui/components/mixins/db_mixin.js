/*
    Mixin to add DB backend following capabilities to a component.
*/
import { List as ImList } from 'immutable'
import _throttle from 'lodash/throttle'
import _entries from 'lodash/entries'
import _map from 'lodash/map'
import _values from 'lodash/values'
import _assign from 'lodash/assign'

import * as db from '../../../api/db.js'

export default {
  props : {
    datasetNames : {
      type : Array,
      default : function() {
        return [ 'default' ]
      }
    },

    ownSubscription : {
      type : Boolean,
      default : function() {
        return true
      }
    }
  },

  data: function () {
    return {
      db_ready: false,
      searching: false
    }
  },

  methods: {
    find_function: function () {
      /*
        Overloaded by actual components to perform appropriate DB backend call.
        Expected return value is map from dataset names to Cursors.
      */
      return null
    },

    dataset_changed : function(name, new_value, old_value) {
      /*
        Overloaded by actual components to perform appropriate actions in response
        to dataset changes
      */
    },

    cleanup_cursors: function () {
      this.searching = false
      if (this._cursors === undefined) return

      if (!db.get_capabilities()['events']) {
        if (this._db_promise !== undefined) delete this._db_promise
        if (this._refresh_timeout) {
          clearTimeout(this._refresh_timeout)
          this._refresh_timeout = null
        }
      } else if (this._observers) {
        _values(this._observers).forEach((o) => {
          o.stop()
        })
        delete this._observers
      }
      this._throttled_update.cancel()
      this._updates = { }
      _values(this._cursors).forEach((c) => {
        c.clear()
      })
      delete this._cursors
    },

    refresh_datasets: function (active = false) {
      if (!this.ownSubscription) return
      if (!this.db_ready) return

      this.cleanup_cursors()

      this._cursors = this.find_function()
      if (!this._cursors) return

      if (active) {
        this._datasets = this._new_datasets()
      }

      if (db.get_capabilities()['events']) {
        this._observers = { }
        _entries(this._cursors).forEach(([n, c]) => {
          this._observers[n] = c.observe((dataset) => {
            this._schedule_update(n, dataset)
          })
        })
      } else {
        if (active) {
          this.searching = true
        }

        const my_promise = Promise.all(
          _map(_entries(this._cursors),
            ([n, c]) => c.fetch().then((dataset) => {
              if (this._db_promise !== my_promise) {
                return
              }
              this._schedule_update(n, dataset)
            }))
        )
          .catch(
            (error) => {
              console.log('db_mixin: bumped')
              console.log(this)
              console.log(error)
            }
          )
          .then(() => {
            // Finally:
            if (this._db_promise === my_promise) {
              delete this._db_promise
              this.searching = false
              this._refresh_timeout = setTimeout(() => { this.refresh_datasets() }, 5000)
            }
          })
      }
    },

    inject_datasets : function(datasets) {
      const old_datasets = this._datasets
      this._datasets = _assign({}, datasets)
      _entries(this._datasets).forEach(([n, d]) => {
        const old_d = old_datasets[n]
        this.dataset_changed(n, d, old_d)
        this.$emit('dataset_changed', n, d, old_d)
      })
    }
  },

  beforeCreate: function () {
    this._throttled_update = _throttle(
      () => {
        const old_datasets = this._datasets
        let updated = false

        this._datasets = _assign({}, this._datasets)
        _entries(this._updates).forEach(([name, dataset]) => {
          this._datasets[name] = dataset
          updated = true
        })
        this._updates = { }

        if (updated) {
          _entries(this._datasets).forEach(([n, d]) => {
            const old_d = old_datasets[n]
            if ((d.size === 0) || (!d.equals(old_d))) {
              this.dataset_changed(n, d, old_d)
              this.$emit('dataset_changed', n, d, old_d)
            }
          })
        }
      },
      1000,
      {
        leading : true,
        trailing : true,
      }
    )

    this._updates = { }
    this._schedule_update = (name, dataset) => {
      this._updates[name] = dataset
      this._throttled_update()
    }
  },

  created: function() {
    this._new_datasets = () => {
      const datasets = {}
      this.datasetNames.forEach((n) => {
        datasets[n] = new ImList()
      })
      return datasets
    }
    this._datasets = this._new_datasets()

    db.db_ready_promise().then(() => {
      this.db_ready = true
      this.refresh_datasets(true)
    })
  },

  beforeDestroy: function () {
    this.cleanup_cursors()
  }
}
