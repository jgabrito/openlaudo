<template>
  <div
    id="dialog_main_container"
    :class="container_classes['dialog_main_container']"
  >
    <div :class="container_classes['client_area']">
      <div
        class="d-flex flex-column"
        style="width:40%;"
      >
        <ModSpecSelector
          :initial-modality="initialModality"
          :initial-specialty="initialSpecialty"
          @specialty-changed="set_specialty"
          @modality-changed="set_modality"
        />

        <div class="input-field">
          <i class="material-icons prefix">
            search
          </i>
          <input
            id="search_input"
            type="text"
            placeholder="Buscar..."
            @keyup="search_input_changed"
          >
        </div>

        <AssetList
          ref="asset_list"
          :modality="current_modality"
          :specialty="current_specialty"
          :search-expression="search_expression"
          :asset-interface="asset_interface"
          :disabled="ongoing_addition"
          class="flex-grow-1"
          @asset-chosen="asset_chosen"
          @asset-changed="asset_changed"
        />

        <div class="p-2">
          <a
            :class="button_classes['add']"
            @click="button_clicked('add')"
          >
            Adicionar...
          </a>
        </div>
      </div>

      <div class="flex-grow-1 d-flex flex-column p-3 m-3 border">
        <AssetEditor
          v-if="current_asset !== null"
          :key="current_asset._id"
          :asset="current_asset"
          :input-asset="current_input_asset"
          :disable-controls="! can_edit_current_asset"
          @content-changed="input_asset_changed"
        >
          <a
            v-if="! current_asset_is_copy"
            slot="remove_button"
            :class="button_classes.remove"
            @click="button_clicked('remove')"
          >
            Remover
          </a>
          <a
            v-else
            slot="remove_button"
            :class="button_classes.cancel"
            @click="button_clicked('cancel')"
          >
            Cancelar
          </a>

          <div
            v-if="ongoing_upsert"
            slot="submit_button"
            style="text-align:center;"
          >
            <div class="preloader-wrapper small active">
              <div class="spinner-layer spinner-red-only">
                <div class="circle-clipper left">
                  <div class="circle" />
                </div><div class="gap-patch">
                  <div class="circle" />
                </div><div class="circle-clipper right">
                  <div class="circle" />
                </div>
              </div>
            </div>
          </div>
          <a
            v-else-if="((! current_asset_is_mine) && (! current_asset_is_copy))"
            slot="submit_button"
            :class="button_classes.copy"
            @click="button_clicked('copy')"
          >
            Duplicar
          </a>
          <a
            v-else
            slot="submit_button"
            :class="button_classes.submit"
            @click="button_clicked('submit')"
          >
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
import _find from 'lodash/find'

import AssetList from './AssetList.vue'
import ModSpecSelector from './ModSpecSelector.vue'
import dialog_mixin from './mixins/dialog_mixin.js'
import { userid_mixin } from '../../api/user.js'

export default {

  props: {
    initialModality: Object,
    initialSpecialty: Object
  },

  data: function () {
    return {
      current_modality: this.initialModality,
      current_specialty: this.initialSpecialty,
      search_expression: '',
      current_asset: null,
      input_asset_store: {},
      ongoing_addition: false,
      ongoing_upsert: null,
      asset_interface: null // expected from derived classes
    }
  },

  computed: {
    button_classes: function () {
      const current_input_asset = this.current_input_asset
      const clean = ((_keys(current_input_asset).length === 0)
                     || (current_input_asset._submitted !== null))
      const current_asset_is_mine = this.current_asset_is_mine
      return {
        'submit': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true,
          disabled: (! this.user_id) || (current_asset_is_mine && clean)
        },
        'copy': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true,
          disabled : (! this.user_id) 
        },
        'add': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true,
          disabled : (! this.user_id) 
        },
        'remove': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true,
          disabled : (! this.user_id) || (!current_asset_is_mine)
        },
        'cancel': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true,
        },
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
      const store = this.input_asset_store
      const asset = this.current_asset
      if (!asset) return {}
      return store[asset._id] || {}
    },

    current_asset_is_mine: function() {
      const current_asset = this.current_asset
      const user_id = this.user_id

      if (!current_asset) return false

      if ((current_asset._id.startsWith('local://'))
        || (user_id !== current_asset.owner_id)) {
        return false
      }

      return true
    },

    current_asset_is_copy : function() {
      const current_asset = this.current_asset
      const current_asset_is_mine = this.current_asset_is_mine
      const store = this.input_asset_store

      if (!current_asset) return false
      if (current_asset_is_mine) return false

      const input_asset = store[current_asset._id] || {}
      if (input_asset._copy) return true
      return false
    },

    can_edit_current_asset : function() {
      const current_asset_is_mine = this.current_asset_is_mine
      const current_asset_is_copy = this.current_asset_is_copy
      const ongoing_upsert = this.ongoing_upsert
      const user_id = this.user_id
      return user_id && (current_asset_is_mine || (current_asset_is_copy && (! ongoing_upsert)))
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
    },

    button_clicked: function (name) {
      const current_asset = this.current_asset || {}
      let _id = current_asset._id
      let input_asset = _id ? this.input_asset_store[_id] : {}

      if (name === 'add') {
        _id = 'NEW'
        this.current_asset = _assign(
          this.asset_interface.empty_asset(), 
          {
            modality: this.current_modality.name,
            specialty: this.current_specialty.name,
            _id
          }
        )
        this.ongoing_addition = true
        this.$set(this.input_asset_store, _id, { _copy : true })
      } else if (name === 'submit') {
        if (input_asset._copy) {
          // This is the copy gatekeeper. From now on, this input asset will be treated
          // as a normal one, with online updates from UI and synchronous updates to the
          // pending upsert map
          const asset = this.assemble_asset(input_asset)
          this._pending_upserts.set(_id, asset)
        }
        this.submit_upserts()
      } else if (name === 'copy') {
        input_asset = { _copy : true }
        this.$set(this.input_asset_store, _id, input_asset)
      } else if (name === 'remove') {
        // TODO
        console.log('Remove button clicked')
      } else if (name === 'cancel' ) {
        this.$delete(this.input_asset_store, _id)
        if (this.ongoing_addition) {
          this.ongoing_addition = false
          this.current_asset = this.$refs.asset_list.get_current_asset()
        }
      } else {
        throw new Error(`Unknown button: ${name}`)
      }
    },

    on_successful_upsert : function(upserts) {
      const current_asset = this.current_asset || {}
      const _id = current_asset._id
      const upsert = _find(upserts, u => (_id === u.requested_id))

      if (upsert && (upsert._id !== upsert.requested_id)) {
        if (this.ongoing_addition) {
          this.ongoing_addition = false
          this.current_asset = null
        }
        // The current asset was copied to another _id or is a new one. Have asset list
        // navigate us to it if possible.
        this.$refs.asset_list.push_selected_asset_id(upsert._id)
      }
    },

    on_failed_upsert : function(upserts) {
      console.log(upserts)
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

      const id = this.current_asset._id
      const asset = this.assemble_asset(input_asset)
      input_asset = _assign({}, input_asset, { _submitted: null })

      this.$set(this.input_asset_store, id, input_asset)
      if ((!input_asset._copy) || (this._pending_upserts.has(id))) {
        // In case this is a copy, only update the pending upserts map if it has
        // already been submitted at least once by the user
        this._pending_upserts.set(id, asset)
      }
    },

    // Assemble an upsert-ready asset based on the current asset and input data
    assemble_asset: function (input_asset) {
      if (!this.current_asset) return null
      const asset = _assign({}, this.current_asset, input_asset)
      _keys(asset).forEach((k) => {
        if ((k[0] === '_') && (!['_id', '_copy'].includes(k))) delete asset[k]
      })
      return asset
    },

    submit_upserts: function (last_effort = false) {
      // Single ongoing upsert allowed to prevent race conditions, unless we are
      // making a last ditch effort to save input data.
      if (this.ongoing_upsert && (!last_effort)) return

      // Submit pending upserts to the database backend
      const upserts = this._pending_upserts // ownership taken
      const actual_upserts = new Map()

      // Mangle ids of to-be-copied entries
      Array.from(upserts.entries()).forEach(([k, v]) => {
        if (v._copy) {
          v = _assign({}, v)
          delete v._copy
          k = v._id = `copy://${v._id}`
        }
        actual_upserts.set(k, v)
      })

      const upsert_array = Array.from(actual_upserts.values())

      // submit upserts
      const me = this.ongoing_upsert = this.asset_interface.upsert_assets(upsert_array)
        .then((results) => {
          const successful_upserts = []
          const failed_upserts = []

          results.forEach(({ _id, requested_id, error }) => { 
            if (requested_id.startsWith('copy://')) {
              // Unmangle the ids corresponding to the copy operations
              requested_id = requested_id.slice(7)
            }

            if (!error) {
              successful_upserts.push({ _id, requested_id, asset : upserts.get(requested_id) })
            } else {
              const will_retry = last_effort ? 'ignoring because last effort' : 'will retry'
              console.log(`Failed upsert for ${requested_id}: ${error}; ${will_retry}`)
              failed_upserts.push({ requested_id, asset : upserts.get(requested_id) } )
            }
          })

          // Remove input store entry for successful upsets where appropriate
          successful_upserts.forEach(({ _id, requested_id }) => {
            let input_asset = this.input_asset_store[requested_id]
            if (input_asset && input_asset._submitted === me) {
              // Unchanged since last submit by myself
              this.$delete(this.input_asset_store, requested_id)
            }
          })

          // Return failed upserts to pending upsert list where appropriate, to avoid
          // losing sacred user input data
          failed_upserts.forEach(({requested_id, asset}) => {
            let input_asset = this.input_asset_store[requested_id]
            if (input_asset && input_asset._submitted === me) {
              // Unchanged since last submit by myself
              // Return upsert to pending list to try again next round
              this._pending_upserts.set(requested_id, asset)
              // Clear submission indicator on input store
              input_asset = _assign({}, input_asset, { _submitted: null })
              this.$set(this.input_asset_store, requested_id, input_asset)
            }
          })

          // Finally: clear the ongoing upsert
          if (this.ongoing_upsert === me) {
            this.ongoing_upsert = null
            if (successful_upserts.length > 0) {
              this.on_successful_upsert(successful_upserts)
            }
            if (failed_upserts.length > 0) {
              this.on_failed_upsert(failed_upserts)
            }
          }
        })

      // Set submission indicator on input store
      Array.from(upserts.keys()).forEach((_id) => {
        const temp = _assign({}, this.input_asset_store[_id], { _submitted: me })
        this.$set(this.input_asset_store, _id, temp)
      })

      // Clear pending upserts to start input accumulation over
      this._pending_upserts = new Map()

      return me
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
