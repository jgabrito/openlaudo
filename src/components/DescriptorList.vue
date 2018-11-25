<template>
  <div class="d-flex flex-column flex-grow-1">
    <div>
      <input type="text" id="search-input" v-on:keyup="search_input_changed"
        placeholder="Busque descritores..." title="Busque descritores" />
    </div>
    <ul id="descriptors_ul" class="flex-grow-1">
      <li v-for="descriptor in descriptors" v-bind:key="descriptor._id">
        <a href="#!" v-on:click="$emit('descriptor-chosen', descriptor)">
          <b>{{descriptor.title}}</b>
        </a>
        <p href="#!"> {{descriptor.body}}</p>
        <!-- v-on:dblclick="format_descriptor(descriptor.body)" used to double click and insert text -->
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

  #descriptors_ul {
    list-style-type: none;
    padding: 10px 0px 0px 0px;
    margin: 0px;
    overflow-y: scroll;
  }

  #descriptors_ul li a {
    border: 1px solid #ddd;
    margin-top: -1px; /* Prevent double borders */
    background-color: #f6f6f6;
    padding: 8px;
    text-decoration: none;
    font-size: 12px;
    color: black;
    display: block;
  }

  #descriptors_ul li p {
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

  #descriptors_ul li a:hover:not(.header) {
    background-color: #eee;
  }
</style>

<script>
import _ from 'lodash'
import * as db from '../db.js'

export default {
  data: function () {
    return {
      search_expression: '',
      dataset: new Map()
    }
  },

  props: [ 'modality', 'specialty' ],

  computed: {
    descriptors: function () {
      return _.sortBy(Array.from(this.dataset.values()), _.property('nickname'))
    }
  },

  watch: {
    modality: function () {
      this.refresh_descriptors()
    },
    specialty: function () {
      this.refresh_descriptors()
    },
    search_expression: function () {
      this.refresh_descriptors()
    }
  },

  methods: {
    search_input_changed: _.debounce(
      function (event) {
        console.log('DescriptorList.search_input_changed')
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

    refresh_descriptors: function () {
      // Overwrite any ongoing request and clear the descriptor list
      if (this._db_promise !== undefined) delete this._db_promise
      this.dataset = new Map()

      let my_promise = this._db_promise = db.find_descriptors(
        {
          modality: this.modality,
          specialty: this.specialty
        },
        {},
        this.search_expression
      )
        .then((data) => {
          // Success
          // Only actually update the list for the most recent request
          if (this._db_promise === my_promise) {
            console.log('DescriptorList.refresh_descriptors: data received')
            console.log(this)
            console.log(data)
            this.dataset = data
          }
        },
        (error) => {
          console.log('DescriptorList.refresh_descriptors: bumped')
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
    this.refresh_descriptors()
  },

  beforeDestroy: function () {
    if (this._db_promise !== undefined) delete this._db_promise
  }
}

</script>
