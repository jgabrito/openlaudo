import Vue from 'vue'

import AssetDialog from './AssetDialog.vue'
import DescriptorEditor from './DescriptorEditor.vue'
import * as db from '../db.js'

const descriptor_dialog_component = {
  components: {
    AssetEditor: DescriptorEditor
  },
  mixins: [ AssetDialog ]
}

const descriptor_interface = {
  get_title: (a) => (a.title),
  get_body: (a) => (a.body),
  sort_key: 'title',
  find_assets: function (selector, options, search_expression) {
    return db.find_descriptors(selector, options, search_expression)
  },
  upsert_assets: function (docs) {
    return db.upsert_descriptors(docs)
  }
}

class DescriptorDialog {
  constructor (el, initial_modality, initial_specialty, event_handlers = {}) {
    this._event_handlers = event_handlers
    this.close_handler = this.close_handler.bind(this)
    this.destroyed_handler = this.destroyed_handler.bind(this)

    this._ready = new Promise((resolve, reject) => {
      let parent = this

      parent._vm = new Vue({
        el: el,
        render: function (createElement) {
          return createElement(descriptor_dialog_component,
            {
              props: {
                initialModality: initial_modality,
                initialSpecialty: initial_specialty,
                modal: true,
                assetInterface: descriptor_interface
              },
              on: {
                close: parent.close_handler
              }
            }
          )
        },

        mounted: function () {
          this.$nextTick(() => {
            resolve()
          })
        },

        destroyed: function () {
          parent.destroyed_handler()
        }
      })
    })
  }

  set_modality (modality) {
    this._ready.then(() => {
      this._vm.$children[0].set_modality(modality)
    })
  }

  set_specialty (specialty) {
    this._ready.then(() => {
      this._vm.$children[0].set_specialty(specialty)
    })
  }

  show () {
    this._ready.then(() => {
      this._vm.$children[0].show()
    })
  }

  hide () {
    this._ready.then(() => {
      this._vm.$children[0].hide()
    })
  }

  destroy (detach_element = true) {
    this._detach_element = true
    this._vm.$destroy()
  }

  close_handler () {
    if (this._event_handlers.close) this._event_handlers.close()
  }

  destroyed_handler () {
    if (this._detach_element) {
      this._vm.$el.parentElement.removeChild(this._vm.$el)
    }
    delete this._vm
    if (this._event_handlers.destroyed) this._event_handlers.destroyed()
  }
}

export default DescriptorDialog
