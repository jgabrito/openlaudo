
<template>
  <nav class="nav-extended">
    <div class="nav-wrapper">
      <a v-if="tabs" href="#!" class="brand-logo right">Open Laudo</a>
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
          <a href="#" v-on:click="set_modality(modality.name)"
             v-bind:class="{ tab : tabs , active : (modality === current_modality) }">
            {{modality.nickname}}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

import * as db from '../../api/db.js'
import DropdownTrigger from './DropdownTrigger.vue'
import metadata_mixin from './mixins/metadata_mixin.js'
import materialize_mixin from './mixins/materialize_mixin.js'
import db_mixin from './mixins/db_mixin.js'

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
      return output
    }
  },

  methods: {
    get_specialty_id: function (specialty) {
      return `${this.current_modality.name}-${specialty.name}`
    },

    find_function: function () {
      return db.find_templates({ modality: this.current_modality.name })
    }
  },

  watch: {
    current_modality: function () {
      this.refresh_dataset()
    }
  },

  mixins: [ metadata_mixin, materialize_mixin, db_mixin ]
}

</script>
