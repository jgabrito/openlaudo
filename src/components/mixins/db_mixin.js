/*
    Mixin to add DB backend following capabilities to a component.
*/

import * as db from '../../db.js'

export default {
  data: function () {
    return {
      dataset: null,
      db_ready: false,
      searching: false,
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

      if (!this._cursor.get_capabilities()['events']) {
        if (this._db_promise !== undefined) delete this._db_promise
      } else {
        //TODO
      }
      if (this._refresh_timeout) {
        clearTimeout(this._refresh_timeout)
        this._refresh_timeout = null
      }
     
      delete this._cursor
    },

    refresh_dataset: function (active=false) {
      if (!this.db_ready) return

      this.cleanup_cursor()

      this._cursor = this.find_function()
      if (!this._cursor) return
      
      if (this._cursor.get_capabilities()['events']) {
        // TODO
      } else {
        if (active) this.searching = true
        
        let my_promise = this._db_promise = this._cursor.fetch()
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
  },

  beforeDestroy: function () {
    this.cleanup_cursor()
  }
}
