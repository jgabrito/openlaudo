
<template>
  <nav class="nav-extended">
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo right">Open Laudo</a>
      <ul class="left hide-on-med-and-down">
        <li v-for="specialty in specialties"
          v-bind:key="get_specialty_id(specialty)"
          v-bind:class="{ active : (specialty === current_specialty) }" >
          <DropdownTrigger v-if="templateDropdowns" v-bind:text-content="specialty.nickname"
            v-bind:target="get_specialty_id(specialty)"
            v-on:click="set_specialty(specialty.name)" >
            <ul v-bind:id="get_specialty_id(specialty)" class="dropdown-content">
              <li v-for="template in report_templates.get(specialty.name)"
                v-bind:key="template._id">
                <a href="#!" v-on:click="$emit('template-chosen', template)">
                  {{template.nickname}}
                </a>
              </li>
            </ul>
          </DropdownTrigger>
          <a v-else href="#!" v-on:click="set_specialty(specialty.name)">
            {{ specialty.nickname }}
          </a>
        </li>
      </ul>
    </div>
    <div class="nav-content">
      <ul v-bind:class="{tabs : tabs}">
        <li v-for="modality in modalities" v-bind:key="modality.name"
            v-bind:class="{ tab : tabs , active : (modality === current_modality) }">
          <a href="#" v-on:click="set_modality(modality.name)">{{modality.nickname}}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

import * as db from '../db.js'
import DropdownTrigger from './DropdownTrigger.vue'
import metadata_mixin from './metadata_mixin.js'
import materialize_mixin from './materialize_mixin.js'

export default {
  data: function () {
    return {
      dataset: null, // Immutable
      materialize_classes: [ 'tabs' ],
      materialize_recursive: true
    }
  },

  props: {
    templateDropdowns: Boolean,
    tabs: Boolean
  },

  components: { DropdownTrigger },

  computed: {

    report_templates: function () {
      let entries = this.dataset
      if (entries === null) return new Map()

      entries = entries.sort((a, b) => (
        a.get('nickname').localeCompare(b.get('nickname'))
      ))
      entries = entries.groupBy((t) => (t.get('specialty')))
      entries = entries.sortBy(
        (v, k) => (k),
        (a, b) => (a.localeCompare(b))
      )
      const output = new Map()
      entries.forEach((v, k) => {
        output.set(k, v.toJS())
      })
      console.log('ModalityNav: computed templates')
      console.log(output)
      return output
    }
  },

  methods: {
    get_specialty_id: function (specialty) {
      return `${this.current_modality.name}-${specialty.name}`
    },

    refresh_templates: function () {
      if (!this.templateDropdowns) return
      if (this._db_promise !== undefined) delete this._db_promise
      this.dataset = null

      let my_promise = this._db_promise = db.find_templates({ modality: this.current_modality.name })
        .then((data) => {
          console.log('ModalityNav: fill_modality_dropdown: received')
          console.log(this)
          console.log(this.modality)
          console.log(data)
          this.dataset = data
        }, (error) => {
          console.log('ModalityNav: fill_modality_dropdown: bumped')
          console.log(this)
          console.log(this.modality)
          console.log(error)
        })
        .then(() => {
        // Finally:
          if (this._db_promise === my_promise) delete this._db_promise
        })
    }
  },

  watch: {
    current_modality: function () {
      this.refresh_templates()
    }
  },

  // TODO: must continuously reflect changes made to the backend DB
  created: function () {
    this.refresh_templates()
  },

  beforeDestroy: function () {
    if (this._db_promise !== undefined) delete this._db_promise
  },

  mixins: [ metadata_mixin, materialize_mixin ]
}

</script>
