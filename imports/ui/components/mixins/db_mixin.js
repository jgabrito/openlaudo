/*
    Mixin to add DB backend following capabilities to a component.
*/
import { List as ImList } from 'immutable'
import _ from 'lodash'
import * as db from '../../../api/db.js'

export default {
  data: function () {
    return {
      dataset: null,
      db_ready: false,
      searching: false
    }
  },

  methods: {
    find_function: function () {
      /*
        Overloaded by actual components to perform appropriate DB backend call.
        Expected return value is a Cursor.
      */
      return null
    },

    cleanup_cursor: function () {
      this.searching = false
      if (this._cursor === undefined) return

      if (!db.get_capabilities()['events']) {
        if (this._db_promise !== undefined) delete this._db_promise
        if (this._refresh_timeout) {
          clearTimeout(this._refresh_timeout)
          this._refresh_timeout = null
        }
      } else if (this._observer) {
        this._observer.stop()
        delete this._observer
      }
      this._throttled_update.cancel()
      this._cursor.clear()
      delete this._cursor
    },

    refresh_dataset: function (active = false) {
      if (!this.db_ready) return

      this.cleanup_cursor()

      this._cursor = this.find_function()
      if (!this._cursor) return

      if (db.get_capabilities()['events']) {
        this.dataset = new ImList()
        this._observer = this._cursor.observe((dataset) => {
          this._throttled_update(dataset)
        })
      } else {
        if (active) {
          this.searching = true
        }

        const my_promise = this._db_promise = this._cursor.fetch()
          .then(
            (data) => {
              if (this._db_promise !== my_promise) {
                return
              }
              if (!data.equals(this.dataset)) this.dataset = data
            },
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
              this._refresh_timeout = setTimeout(() => { this.refresh_dataset() }, 5000)
            }
          })
      }
    }
  },

  created: function () {
    db.db_ready_promise().then(() => {
      this.db_ready = true
      this.refresh_dataset(true)
    })

    this._throttled_update = _.throttle(
      (dataset) => {
        this.dataset = dataset
      },
      1000,
      {
        leading : true,
        trailing : true,
      }
    )
  },

  beforeDestroy: function () {
    this.cleanup_cursor()
  }
}
