<template>
  <div class="d-flex flex-column">
    <ul
      v-if="(! searching) && expanded"
      id="assets_ul"
      class="flex-grow-1"
    >
      <li
        v-for="asset in assets"
        :key="asset._id"
      >
        <a
          href="#!"
          @click="asset_clicked(asset)"
        >
          <b>{{ assetInterface.get_title(asset) }}</b>
        </a>
        <p href="#!">
          {{ assetInterface.get_body(asset) }}
        </p>
      </li>
    </ul>
    <ul
      v-else-if="(! searching)"
      id="assets_ul"
      class="flex-grow-1"
    >
      <li
        v-for="asset in assets"
        :key="asset._id"
      >
        <a
          href="#!"
          :class="{ selected : (current_asset_id === asset._id)}"
          @click="asset_clicked(asset)"
        >
          {{ assetInterface.get_title(asset) }}
        </a>
      </li>
    </ul>
    <div
      v-else
      class="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
    >
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-red">
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
  </div>
</template>

<style scoped>

  #assets_ul {
    list-style-type: none;
    padding: 0px 0px 0px 0px;
    margin: 0px;
    overflow-y: auto;
  }

  #assets_ul li a {
    border: 1px solid #ddd;
    margin-top: -1px; /* Prevent double borders */
    background-color: #f6f6f6;
    padding: 8px;
    text-decoration: none;
    font-size: 12px;
    color: black;
    display: block;
  }

  #assets_ul li a.selected {
    background-color: #b0b0b0;
  }

  #assets_ul li p {
    border: 1px solid #ddd;
    margin-top: -1px; /* Prevent double borders */
    margin-bottom: 7px;
    background-color: #f6f6f6;
    padding: 8px;
    text-decoration: none;
    font-size: 11px;
    color: black;
    display: block;
    white-space: pre-line;
    word-wrap: break-word;
  }

  #assets_ul li a:hover:not(.header) {
    background-color: #eee;
  }

</style>

<script>

import { fromJS } from 'immutable'
import _assign from 'lodash/assign'
import db_mixin from './mixins/db_mixin.js'

export default {

  mixins: [ db_mixin ],

  /*
    assetInterface: Object containing the following callbacks:
      get_title, get_body: take an asset reference as input and return
        the corresponding information
      sort_key: string
      find_assets(selector, options, search_expression) : reroutes the call to the
        appropriate entry in the DB backend and returns a promise for the data
  */
  props: {
    modality: {
      type : Object,
      default : function() {
        return null
      }
    },
    specialty: {
      type : Object,
      default : function() {
        return null
      }
    },
    searchExpression: {
      type : String,
      default : function() {
        return ''
      }
    },
    extraFilters: {
      type : Object,
      default : function() {
        return {}
      }
    },
    expanded: {
      type : Boolean,
      default : function() {
        return false
      }
    },
    assetInterface: {
      type : Object,
      default : function() {
        return null
      }
    },
    disabled: {
      type : Boolean,
      default: function() {
        return false
      }
    }
  },

  data: function () {
    return {
      selected_asset_id_stack: [],
      assets : [],
      current_asset: null
    }
  },

  computed: {
    current_asset_id: function () {
      const current_asset = this.current_asset
      if (current_asset) return current_asset._id
      return null
    },
  },

  watch: {
    modality: function () {
      this.refresh_datasets(true)
    },

    specialty: function () {
      this.refresh_datasets(true)
    },

    searchExpression: function () {
      this.refresh_datasets(false)
    },

    extraFilters : function() {
      this.refresh_datasets(false)
    },

    selected_asset_id_stack : function() {
      this.dataset_changed('default', this._datasets.default, this._datasets.default)
    },

    current_asset: function () {
      if (!this.disabled) {
        this.$emit('asset-changed', this.current_asset)
      }
    }
  },

  methods: {
    push_selected_asset_id: function (id) {
      const stack = Array.from(this.selected_asset_id_stack)
      if ((stack.length > 0) && (stack[stack.length - 1] === id)) return

      stack.push(id)
      if (stack.length > 10) {
        stack.splice(0, this.selected_asset_id_stack.length - 10)
      }

      this.selected_asset_id_stack = stack
    },

    get_current_asset: function() {
      return this.current_asset
    },

    dataset_changed : function (name, new_value, old_value) {
      if (name !== 'default') {
        throw new Error('Only default dataset supported')
      }
      const dataset = new_value
      const current_asset = this.current_asset
      const selected_asset_id_stack = this.selected_asset_id_stack
      let new_current_asset = null

      if (!dataset) {
        this.current_asset = null
        this.assets = []
        return
      }
      if (!dataset.equals(old_value)) {
        this.assets = dataset.toJS()
      }

      for (let i = selected_asset_id_stack.length - 1; i >= 0; i -= 1) {
        const imm_asset = dataset.find(d => ( d.get('_id') === selected_asset_id_stack[i]))
        if (imm_asset) {
          if (!imm_asset.equals(fromJS(current_asset))) {
            new_current_asset = imm_asset.toJS()
          } else {
            new_current_asset = current_asset
          }
          break
        }
      }

      if (new_current_asset !== current_asset) {
        this.current_asset = new_current_asset
      }

      // TODO: scroll list into view
    },

    asset_clicked: function (asset) {
      if (this.disabled) return
      this.push_selected_asset_id(asset._id)
      this.current_asset = asset
      this.$emit('asset-chosen', asset)
    },

    find_function: function () {
      if (!this.ownSubscription) {
        throw new Error('Should not be here.')
      }

      const selector = _assign(
        {
          modality: this.modality.name,
          specialty: this.specialty.name
        },

        // TODO: should make this more generic with a boolean $and ?
        this.extraFilters
      )

      return {
        default : this.assetInterface.find_assets(
          selector,
          {},
          this.searchExpression,
          this.assetInterface.sort_key
        )
      }
    }
  }
}

</script>
