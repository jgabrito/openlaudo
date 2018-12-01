<template>
  <div class="d-flex flex-column flex-grow-1">
    <div>
      <input type="text" id="search-input" v-on:keyup="search_input_changed"
        placeholder="Buscar..." title="Buscar" />
    </div>
    <ul v-if="expanded" id="assets_ul" class="flex-grow-1">
      <li
        v-for="asset in assets" v-bind:key="asset._id">
        <a href="#!" v-on:click="$emit('asset-chosen', asset)">
          <b>{{assetInterface.get_title(asset)}}</b>
        </a>
        <p href="#!"> {{assetInterface.get_body(asset)}}</p>
        <!-- v-on:dblclick="format_asset(asset.body)" used to double click and insert text -->
      </li>
    </ul>
    <ul v-else id="assets_ul" class="flex-grow-1">
      <li v-for="asset in assets" v-bind:key="asset._id">
        <a href="#!" v-on:click="$emit('asset-chosen', asset)">
          {{assetInterface.get_title(asset)}}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  #search-input {
    background-image: url('../assets/images/searchicon.png');
    background-position: 10px 12px;
    background-repeat: no-repeat;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    padding: 2px 2px 2px 35px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    /*margin-right: 40px;*/
  }

  #assets_ul {
    list-style-type: none;
    padding: 10px 0px 0px 0px;
    margin: 0px;
    overflow-y: scroll;
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

export default {
  data: function () {
    return {
      search_expression: '',
      dataset: new Map()
    }
  },

  /*
    assetInterface: Object containing the following callbacks:
      get_title, get_body, get_sort_key : take an asset reference as input and return
        the corresponding information
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
    assets: function () {
      return _.sortBy(Array.from(this.dataset.values()), this.assetInterface.get_sort_key)
    }
  },

  watch: {
    modality: function () {
      this.refresh_assets()
    },
    specialty: function () {
      this.refresh_assets()
    },
    search_expression: function () {
      this.refresh_assets()
    }
  },

  methods: {
    search_input_changed: _.debounce(
      function (event) {
        console.log('assetList.search_input_changed')
        console.log(event.target.value)
        this.search_expression = event.target.value
      },
      500,
      {
        leading: true,
        trailing: true,
        maxWait: 2000
      }
    ),

    refresh_assets: function () {
      // Overwrite any ongoing request and clear the asset list
      if (this._db_promise !== undefined) delete this._db_promise
      this.dataset = new Map()

      let my_promise = this._db_promise = this.assetInterface.find_assets(
        {
          modality: this.modality.name,
          specialty: this.specialty.name
        },
        {},
        this.search_expression
      )
        .then((data) => {
          // Success
          // Only actually update the list for the most recent request
          if (this._db_promise === my_promise) {
            console.log('assetList.refresh_assets: data received')
            console.log(this)
            console.log(data)
            this.dataset = data
          }
        },
        (error) => {
          console.log('assetList.refresh_assets: bumped')
          console.log(this)
          console.log(error)
        })
        .then(() => {
          // Finally:
          if (this._db_promise === my_promise) delete this._db_promise
        })
    }
  },

  created: function () {
    this.refresh_assets()
  },

  beforeDestroy: function () {
    if (this._db_promise !== undefined) delete this._db_promise
  }
}

</script>
