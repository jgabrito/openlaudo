<template>
<div id="dialog_main_container" v-bind:class="container_classes['dialog_main_container']">
  <div v-bind:class="container_classes['client_area']">
    <div class="d-flex flex-column" style="width:40%;">
      <ModSpecSelector v-bind:initial-modality="initialModality"
                       v-bind:initial-specialty="initialSpecialty"
                       v-on:specialty-changed="set_specialty"
                       v-on:modality-changed="set_modality">
      </ModSpecSelector>

      <div class="input-field">
        <i class="material-icons prefix"> search </i>
        <input type="text" id="search_input" v-on:keyup="search_input_changed"
               placeholder="Buscar..." />
      </div>

      <AssetList v-bind:modality="current_modality" v-bind:specialty="current_specialty"
                 v-bind:search-expression="search_expression"
                 v-bind:asset-interface="asset_interface"
                 v-on:asset-chosen="asset_chosen"
                 v-on:asset-changed="asset_changed"
                 class="flex-grow-1">
      </AssetList>

      <div class="p-2">
        <a v-bind:class="button_classes['add']" v-on:click="button_clicked('add')">
          Adicionar...
        </a>
      </div>
    </div>

    <div class="flex-grow-1 d-flex flex-column p-3 m-3 border">
      <AssetEditor v-if="current_asset !== null"
                   v-bind:asset="current_asset" v-bind:input-asset="current_input_asset"
                   v-bind:key="current_asset._id"
                   v-bind:disable-controls="(! can_edit_current_asset)"
                   v-on:content-changed="input_asset_changed" >

        <a slot="remove_button" v-bind:class="button_classes.remove"
           v-on:click="button_clicked('remove')">
          Remover
        </a>

        <div v-if="ongoing_upsert" slot="submit_button" style="text-align:center;">
          <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-red-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
        <a v-else-if="(! can_edit_current_asset)"
          slot="submit_button" v-bind:class="button_classes.copy"
          v-on:click="button_clicked('copy')">
          Duplicar
        </a>
        <a v-else slot="submit_button" v-bind:class="button_classes.submit"
           v-on:click="button_clicked('submit')">
          Enviar
        </a>
      </AssetEditor>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>

<script>

import { fromJS } from 'immutable'
import _assign from 'lodash/assign'
import _keys from 'lodash/keys'
import _throttle from 'lodash/throttle'

import AssetList from './AssetList.vue'
import ModSpecSelector from './ModSpecSelector.vue'
import dialog_mixin from './mixins/dialog_mixin.js'
import { userid_mixin } from '../../api/user.js'

export default {

  data: function () {
    return {
      current_modality: this.initialModality,
      current_specialty: this.initialSpecialty,
      search_expression: '',
      current_asset: null,
      input_asset_store: {},
      ongoing_upsert: null,
      asset_interface: null // expected from derived classes
    }
  },

  props: {
    initialModality: Object,
    initialSpecialty: Object
  },

  computed: {
    button_classes: function () {
      let current_input_asset = this.current_input_asset
      let clean = ((_keys(current_input_asset).length === 0) || (current_input_asset._submitted !== null))
      return {
        'submit': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true,
          disabled: clean
        },
        'copy': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true,
        },
        'add': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true
        },
        'remove': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true
        }
      }
    },

    container_classes: function () {
      return {
        'dialog_main_container': {
          'modal': this.modal,
          'w-75': true,
          'h-75': true
        },
        'client_area': {
          'w-100': true,
          'h-100': true,
          'd-flex': true,
          'flex-row': true
        }
      }
    },

    current_input_asset: function () {
      let store = this.input_asset_store
      let asset = this.current_asset
      if (!asset) return {}
      else return store[asset._id] || {}
    },

    can_edit_current_asset: function() {
      const current_asset = this.current_asset
      const user_id = this.user_id
      
      if (! current_asset) return false
      
      if ((current_asset._id.startsWith('local://')) ||
        (user_id !== current_asset.owner_id)) {
        return false
      }

      return true
    }
  },

  methods: {
    set_modality: function (modality) {
      this.current_modality = modality
    },

    set_specialty: function (specialty) {
      this.current_specialty = specialty
    },

    search_input_changed: _throttle(
      function (event) {
        this.search_expression = event.target.value
      },
      1000,
      {
        leading: false,
        trailing: true
      }
    ),

    asset_chosen: function (asset) {
      this.current_asset = asset
    },

    asset_changed: function (asset) {
      this.current_asset = asset
      if (!asset) return

      let id = asset._id
      let input_asset = this.input_asset_store[id]
      if ((!input_asset) || (!input_asset._submitted)) return

      asset = _assign({}, asset)
      let my_asset = this.assemble_asset(input_asset)

      if (fromJS(asset).equals(fromJS(my_asset))) {
        // The changed asset has been submitted and equals my view of it.
        // Clear input store and go on.
        this.$delete(this.input_asset_store, id)
      } else {
        // The changed asset is different from my view of it. It is probably
        // a flicker, thus ignore.
      }
    },

    button_clicked: function (name) {
      if (name === 'submit') {
        this.submit_upserts()
      } 
      else if (name === 'copy') {
        console.log('Copy local asset clicked')
      }
      else if (name === 'remove') {
        // TODO
        console.log('Remove button clicked')
      }
      else {
        throw new Error(`Unknown button: ${name}`)
      }
    },

    input_asset_changed: function (input_asset) {
      /*
        Merge input into store, register pending submission and clear any submission
        flag present in input store.

        This is the key moment to build the upsert, because we only have guaranteed
        easy access to the DB record while it is being focused by the user. Also, the
        values in this.current_asset represent what the user had in front of him/her
        during edit. If changes to the DB happened behind our back, let the backend
        worry about merging them, or not.
      */
      if (!this.current_asset) return

      let id = this.current_asset._id
      let asset = this.assemble_asset(input_asset)
      input_asset = _assign({}, input_asset, { _submitted: null })

      this.$set(this.input_asset_store, id, input_asset)
      this._pending_upserts.set(id, asset)
    },

    // Assemble an upsert-ready asset based on the current asset and input data
    assemble_asset: function (input_asset) {
      if (!this.current_asset) return null
      let asset = _assign({}, this.current_asset, input_asset)
      for (let k of _keys(asset)) {
        if ((k[0] === '_') && (k !== '_id')) delete asset[k]
      }
      return asset
    },

    submit_upserts: function (last_effort = false) {
      // Single ongoing upsert allowed to prevent race conditions, unless we are
      // making a last ditch effort to save input data.
      if (this.ongoing_upsert && (!last_effort)) return

      // Submit pending upserts to the database backend
      let upserts = this._pending_upserts // ownership taken
      const upsert_array = Array.from(upserts.values())
      if (upserts.size === 0) return

      let me = this.ongoing_upsert = this.asset_interface.upsert_assets(upsert_array)
        .then((results) => {
          results.forEach(({_id, requested_id, error}) => {
            if (! error) {
              if (_id === requested_id) {
                // Success
                upserts.delete(_id)  
              }
              else {
                // This id was not in the originally submitted list, thus the backend
                // created a new entry behind our backs
                upserts.delete(requested_id)
              }
              
            }
            else {
              const will_retry = last_effort ? "ignoring because last effort" : "will retry"
              console.log(`Failed upsert for ${_id}: ${error}; ${will_retry}`)
            }
          })

          // Return failed upserts to pending upsert list where appropriate, to avoid
          // losing sacred user input data
          Array.from(upserts.entries()).forEach(([_id, asset]) => {
            let input_asset = this.input_asset_store[_id]
            if (input_asset && input_asset._submitted === me) {
              // Unchanged since last submit by myself
              // Return upsert to pending list to try again next round
              this._pending_upserts.set(_id, asset)

              // Clear submission indicator on input store
              input_asset = _assign({}, input_asset, { _submitted: null })
              this.$set(this.input_asset_store, _id, input_asset)
            }
          })

          // Finally: clear the ongoing upsert
          if (this.ongoing_upsert === me) this.ongoing_upsert = null
        })
        
      // Set submission indicator on input store
      Array.from(upserts.keys()).forEach((_id) => { 
        let temp = _assign({}, this.input_asset_store[_id], { _submitted: me })
        this.$set(this.input_asset_store, _id, temp)
      })
      
      // Clear pending upserts to start input accumulation over
      this._pending_upserts = new Map()
    }
  },

  components: {
    //    TemplateNav,
    ModSpecSelector,
    AssetList
    /*
      AssetEditor: expected from derived components; behaves as a managed input element
      Props: asset, inputAsset
      Emit: content-changed(input_asset)
      Slot: submit_button, remove_button
    */
  },

  beforeCreate: function () {
    this._pending_upserts = new Map()
  },

  created: function () {
    // Start periodic polling of pending upserts
    this._submit_interval = setInterval(() => { this.submit_upserts() }, 5000)
  },

  beforeDestroy: function () {
    if (this._submit_interval) {
      clearInterval(this._submit_interval)
      this._submit_interval = null
    }

    // Last ditch effort to submit about-to-be-lost input data
    if (this._pending_upserts) this.submit_upserts(true)
  },

  mixins: [ dialog_mixin, userid_mixin ]
}

</script>
