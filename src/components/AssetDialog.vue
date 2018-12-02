<template>
<div id="dialog_main_container" v-bind:class="container_classes['dialog_main_container']">
  <div v-bind:class="container_classes['client_area']">
    <div class="d-flex flex-column" style="width:40%;">
      <TemplateNav v-bind:initial-modality="initialModality"
		   v-bind:initial-specialty="initialSpecialty"
		   v-on:specialty-changed="set_specialty"
		   v-on:modality-changed="set_modality">
      </TemplateNav>
      
      <AssetList v-bind:modality="current_modality" v-bind:specialty="current_specialty"
		 v-bind:asset-interface="assetInterface"
		 v-on:asset-chosen="asset_chosen"
		 v-on:asset-changed="asset_changed" >
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
  .zero-margin {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
</style>

<script>

import { fromJS } from 'immutable'
import _ from 'lodash'

import AssetList from './AssetList.vue'
import TemplateNav from './TemplateNav.vue'
import materialize_mixin from './mixins/materialize_mixin.js'

export default {
  data: function () {
    return {
      current_modality: this.initialModality,
      current_specialty: this.initialSpecialty,
      current_asset: null,
      input_asset_store: {},
      ongoing_upsert: false,
      materialize_recursive: false,
      materialize_classes: [ 'modal' ],
      materialize_options: {
        modal: {
          onCloseEnd: () => {
            this.$emit('close')
          },
          dismissible: true
        }
      }
    }
  },

  /*
    assetInterface: Object containing the following callbacks:
      get_title, get_body: take an asset reference as input and return
        the corresponding information
      sort_key: string
      find_assets(selector, options, search_expression) : reroutes the call to the
        appropriate entry in the DB backend and returns a promise for the data
      upsert_assets(docs): upserts the given assets, returning a promise that resolves
        to the ids of the upserted items
  */
  props: {
    modal: Boolean,
    initialModality: Object,
    initialSpecialty: Object,
    assetInterface: Object
  },

  computed: {
    button_classes: function () {
      let current_input_asset = this.current_input_asset
      let clean = ((_.keys(current_input_asset).length === 0) || (current_input_asset._submitted !== null))
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
        },
	'client_area' : {
	  'w-100' : true,
	  'h-100' : true,
	  'd-flex' : true,
	  'flex-row' : true,
	}
      }
    },

    current_input_asset: function () {
      let store = this.input_asset_store
      let asset = this.current_asset
      if (!asset) return {}
      else return store[asset._id] || {}
    }
  },

  methods: {
    set_modality: function (modality) {
      this.current_modality = modality
    },

    set_specialty: function (specialty) {
      this.current_specialty = specialty
    },

    show: function () {
      if (this.modal) this.get_instances('modal')[0].open()
    },

    hide: function () {
      if (this.modal) this.get_instances('modal')[0].open()
    },

    asset_chosen: function (asset) {
      console.log('AssetDialog.asset_chosen')
      console.log(asset)
      console.log(this)
      this.current_asset = asset
    },

    asset_changed: function (asset) {
      console.log('AssetDialog.asset_changed')
      console.log(asset)
      console.log(this)
      this.current_asset = asset
      if (!asset) return

      let id = asset._id
      let input_asset = this.input_asset_store[id]
      if ((!input_asset) || (!input_asset._submitted)) return

      asset = _.assign({}, asset)
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
      } else if (name === 'remove') {
        // TODO
        console.log('Remove button clicked')
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
      input_asset = _.assign({}, input_asset, { _submitted: null })

      this.$set(this.input_asset_store, id, input_asset)
      this._pending_upserts.set(id, asset)
    },

    // Assemble an upsert-ready asset based on the current asset and input data
    assemble_asset: function (input_asset) {
      if (!this.current_asset) return null
      let asset = _.assign({}, this.current_asset, input_asset)
      for (let k of _.keys(asset)) {
        if ((k[0] === '_') && (k !== '_id')) delete asset[k]
      }
      return asset
    },

    submit_upserts: function (last_effort = false) {
      // Single ongoing upsert allowed to prevent race conditions, unless we are
      // making a last ditch effort to save input data.
      if (this.ongoing_upsert && (!last_effort)) return

      // Submit all pending upserts to the database backend
      let upserts = this._pending_upserts
      if (upserts.size === 0) return

      let me = this.ongoing_upsert = this.assetInterface.upsert_assets(Array.from(upserts.values()))
        .then(
          (ids) => {

          },
          (error) => {
            console.log(error)
            if (last_effort) return

            // Return failed upserts to pending upsert list where appropriate, to avoid
            // losing sacred user input data
            for (let [id, asset] of upserts.entries()) {
              let input_asset = this.input_asset_store[id]
              if (input_asset && input_asset._submitted === me) {
                // Unchanged since last submit by myself
                // Return upsert to pending list to try again next round
                this._pending_upserts.set(id, asset)

                // Clear submission indicator on input store
                input_asset = _.assign({}, input_asset, { _submitted: null })
                this.$set(this.input_asset_store, id, input_asset)
              }
            }
          }
        )
        .then(() => {
          if (last_effort) return

          // Finally: clear the ongoing upsert
          if (this.ongoing_upsert === me) this.ongoing_upsert = null
        })

      // Set submission indicator on input store
      for (let id of upserts.keys()) {
        let temp = _.assign({}, this.input_asset_store[id], { _submitted: me })
        this.$set(this.input_asset_store, id, temp)
      }

      // Clear pending upserts to start input accumulation over
      this._pending_upserts = new Map()
    }
  },

  components: {
    TemplateNav,
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

  mixins: [ materialize_mixin ]
}

</script>
