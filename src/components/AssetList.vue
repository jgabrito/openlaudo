<template>
  <div class="flex-grow-1 d-flex flex-column">
    <div class="input-field">
      <i class="material-icons prefix"> search </i>
      <input type="text" id="search_input" v-on:keyup="search_input_changed"
        placeholder="Buscar..." />
    </div>

    <ul v-if="(! searching) && expanded" id="assets_ul" class="flex-grow-1">
      <li v-for="asset in assets" v-bind:key="asset._id">
        <a href="#!" v-on:click="asset_clicked(asset)">
          <b>{{assetInterface.get_title(asset)}}</b>
        </a>
        <p href="#!"> {{assetInterface.get_body(asset)}}</p>
      </li>
    </ul>
    <ul v-else-if="(! searching)" id="assets_ul" class="flex-grow-1">
      <li v-for="asset in assets" v-bind:key="asset._id">
        <a href="#!" v-on:click="asset_clicked(asset)"
            v-bind:class="{ selected : (current_asset_id === asset._id)}">
          {{assetInterface.get_title(asset)}}
        </a>
      </li>
    </ul>
    <div v-else class="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <div  class="preloader-wrapper big active">
        <div class="spinner-layer spinner-red">
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

import _ from 'lodash'
import { fromJS } from 'immutable'
import db_mixin from './mixins/db_mixin.js'

export default {
  data: function () {
    return {
      search_expression: '',
      selected_asset_id_stack: [],
      current_asset: null
    }
  },
  
  /*
    assetInterface: Object containing the following callbacks:
      get_title, get_body: take an asset reference as input and return
        the corresponding information
      sort_key: string
      find_assets(selector, options, search_expression) : reroutes the call to the
        appropriate entry in the DB backend and returns a promise for the data
  */
  props: {
    modality: Object,
    specialty: Object,
    expanded: Boolean,
    assetInterface: Object
  },

  computed: {
    current_asset_id: function () {
      console.log('current_asset_id')
      console.log(this.current_asset)
      if (this.current_asset) return this.current_asset._id
      else return null
    },

    assets: function() {
      if (! this.dataset) return []
      
      return this.dataset.toList().sort((a, b) => (
        a.get(this.assetInterface.sort_key).localeCompare(b.get(this.assetInterface.sort_key))
      )).toJS()      
    }
  },

  watch: {
    modality: function () {
      this.refresh_dataset(true)
    },

    specialty: function () {
      this.refresh_dataset(true)
    },

    search_expression: function () {
      this.refresh_dataset(false)
    },

    dataset: function () {
      let dataset = this.dataset
      let current_asset = this.current_asset
      let selected_asset_id_stack = this.selected_asset_id_stack
      let new_current_asset = null

      if (! this.dataset) {
        this.current_asset = null
        return
      }
      
      for (let i = selected_asset_id_stack.length - 1; i >= 0; i--) {
        let imm_asset = dataset.get(selected_asset_id_stack[i])
        console.log(imm_asset)
        if (imm_asset) {
          if (!imm_asset.equals(fromJS(current_asset))) {
            new_current_asset = imm_asset.toJS()
          } else {
            new_current_asset = current_asset
          }
          break
        }
      }

      if (new_current_asset !== current_asset) this.current_asset = new_current_asset
    },

    current_asset: function () {
      this.$emit('asset-changed', this.current_asset)
    }
  },

  methods: {
    push_selected_asset_id: function (id) {
      let stack = this.selected_asset_id_stack
      if ((stack.length > 0) && (stack[stack.length - 1] === id)) return

      stack.push(id)
      if (stack.length > 10) {
        stack.splice(0, this.selected_asset_id_stack.length - 10)
      }
    },

    asset_clicked: function (asset) {
      console.log('asset_clicked')
      console.log(asset)
      this.push_selected_asset_id(asset._id)
      this.current_asset = asset
      this.$emit('asset-chosen', asset)
    },

    search_input_changed: _.throttle(
      function (event) {
        console.log('assetList.search_input_changed')
        console.log(event.target.value)
        this.search_expression = event.target.value
      },
      1000,
      {
        leading: false,
        trailing: true,
      }
    ),

    find_function: function () {
      return this.assetInterface.find_assets(
        {
          modality: this.modality.name,
          specialty: this.specialty.name
        },
        {},
        this.search_expression
      )
    }
  },

  mixins: [ db_mixin ]
}

</script>
