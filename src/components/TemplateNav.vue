
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
      <ul class="tabs">
        <li v-for="modality in modalities" v-bind:key="modality.name"
            v-bind:class="{ tab : true, active : (modality === current_modality) }">
          <a href="#" v-on:click="set_modality(modality.name)">{{modality.nickname}}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// TODO: visual feedback of currently selected modality and specialty
// TODO: make specialty list include all specialties, independently of the
// avaliability of templates for that specialty, otherwise descriptors for that
// combination will not show up in the descriptor list

import _ from 'lodash'
import * as db from '../db.js'
import DropdownTrigger from './DropdownTrigger.vue'
import base_metadata from '../base_metadata.js'

function _valid_modality_for_specialty(modality, specialty) {
  if (specialty.modalities === 'all') return true
  else return specialty.modalities.includes(modality.name) 
}

export default {
  data: function () {
    return {
      metadata: base_metadata,
      current_modality: base_metadata.modalities[this.initialModalityName],
      current_specialty: base_metadata.specialties[this.initialSpecialtyName],
      dataset: new Map()
    }
  },

  props: {
    templateDropdowns: Boolean,
    initialModalityName: String,
    initialSpecialtyName: String
  },

  components: { DropdownTrigger },

  computed: {
    modalities : function() {
      return _.sortBy(Object.values(this.metadata.modalities), _.property('nickname'))
    },

    specialties: function () {
      return this.get_valid_specialties()
    },

    report_templates: function () {
      const output = new Map()
      for (let t of _.sortBy(Array.from(this.dataset.values()), _.property('nickname'))) {
        let items = output.get(t.specialty)
        if (items === undefined) {
          items = []
          output.set(t.specialty, items)
        }
        items.push(t)
      }
      console.log('ModalityNav: computed templates')
      console.log(output)
      return output
    }
  },

  methods: {
    get_specialty_id: function (specialty) {
      return `${this.current_modality.name}-${specialty.name}`
    },

    get_valid_specialties: function() {
      let specialties = Object.values(this.metadata.specialties)
      specialties = _.filter(specialties, (s) => (_valid_modality_for_specialty(this.current_modality, s)))
      specialties = _.sortBy(specialties, _.property('nickname'))
      return specialties
    },

    set_modality: function (new_modality_name) {
      this.current_modality = this.metadata.modalities[new_modality_name]
      if (! _valid_modality_for_specialty(this.current_modality, this.current_specialty))
        this.set_specialty(this.get_valid_specialties()[0].name)
      this.$emit('modality-changed', this.current_modality)
    },

    set_specialty: function (new_specialty_name) {
      console.log('TemplateNav.set_specialty:')
      this.current_specialty = this.metadata.specialties[new_specialty_name]
      console.log(new_specialty_name)
      console.log(this.current_specialty)
      this.$emit('specialty-changed', this.current_specialty)
    },

    refresh_templates: function () {
      if (!this.templateDropdowns) return
      if (this._db_promise !== undefined) delete this._db_promise
      this.dataset = new Map()

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

  mounted: function() {
    this.$nextTick(function () {
      let els = this.$el.getElementsByClassName('tabs')
      this._tabs = new window.M.Tabs.init(els)
    })
  },

  beforeDestroy: function () {
      if (this._tabs) {
        for (let i=0; i<this._tabs.length; i++) this._tabs[i].destroy()
        delete this._tabs
    }
    if (this._db_promise !== undefined) delete this._db_promise
  }
}

</script>
