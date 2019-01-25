/*
    Mixin to add DB backend following capabilities to a component.
*/
import { List as ImList } from 'immutable'
import _throttle from 'lodash/throttle'
import _entries from 'lodash/entries'
import _map from 'lodash/map'
import _values from 'lodash/values'

import * as db from '../../../api/db.js'

export default {
  props : {
    datasetNames : {
      type : Array,
      default : function() {
        return [ 'default' ]
      }
    },

    // If this property is set by a parent component, then this component will
    // not initiate any DB subscription and will expect to receive all its data
    // from the parent component
    injectedDatasets : {
      type : Object,
      default : function() {
        return null
      }
    }
  },

  data: function () {
    const datasets = {}
    this.datasetNames.forEach((n) => {
      datasets[n] = new ImList()
    })
    return {
      datasets,
      db_ready: false,
      searching: false
    }
  },

  watch: {
    injectedDatasets : {
      immediate : true,
      handler : function() {
        if (!this.injectedDatasets) {
          this.refresh_datasets()
          return
        }

        _entries(this.injectedDatasets).forEach(([n, d]) => {
          this._schedule_update(n, d)
        })
        this._throttled_update()
      }
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
      if (this.injectedDatasets) return
      if (!this.db_ready) return

      this.cleanup_cursors()

      this._cursors = this.find_function()
      if (!this._cursors) return

      if (db.get_capabilities()['events']) {
        this.datasets = { }
        this._observers = { }
        _entries(this._cursors).forEach(([n, c]) => {
          this.$set(this.datasets, n, new ImList())
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
              if (!dataset.equals(this.datasets[n])) {
                this.$set(this.datasets, n, dataset)
              }
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
    }
  },

  beforeCreate: function () {
    db.db_ready_promise().then(() => {
      this.db_ready = true
      this.refresh_datasets(true)
    })

    this._throttled_update = _throttle(
      () => {
        _entries(this._updates).forEach(([name, dataset]) => {
          this.$set(this.datasets, name, dataset)
        })
        this._updates = { }
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

  beforeDestroy: function () {
    this.cleanup_cursors()
  }
}
