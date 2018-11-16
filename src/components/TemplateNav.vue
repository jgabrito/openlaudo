
<template>
  <nav class="nav-extended">
    <div class="nav-wrapper">
      <a href="#!" class="brand-logo right">Open Laudo</a>
      <ul class="left hide-on-med-and-down">
        <li v-for="specialty in specialties" v-bind:key="get_specialty_id(specialty)">
          <DropdownTrigger v-bind:data-target="get_specialty_id(specialty)" v-bind:name="specialty"
            v-on:trigger-selected="$emit('specialty-changed', specialty)"
            v-bind:text-content="get_specialty_nickname(specialty)" >
            <ul v-bind:id="get_specialty_id(specialty)" class="dropdown-content">
              <li v-for="template in report_templates.get(specialty)" v-bind:key="template._id">
                  <a href="#!" v-on:click="$emit('template-chosen', template)">{{template.nickname}}</a>
              </li>
            </ul>
          </DropdownTrigger>
        </li>
      </ul>
    </div>
    <div class="nav-content">
      <ul class="tabs">
        <li class="tab"><a href="#" v-on:click="set_modality('usg')">USG</a></li>
        <li class="tab"><a href="#" v-on:click="set_modality('tc')">TC</a></li>
        <li class="tab"><a href="#" v-on:click="set_modality('rm')">RM</a></li>
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
import { base_templates } from '../templates.js'
import * as db from '../db.js'
import DropdownTrigger from './DropdownTrigger.vue'

export default {
  data: function () {
    return {
      modality: 'tc',
      dataset: new Map(),
      base_templates
    }
  },

  components: { DropdownTrigger },

  computed: {
    specialties: function () {
      let specialties = Array.from(this.dataset.values()).map(_.property('specialty'))
      specialties = _.uniq(specialties).sort()
      console.log('ModalityNav: computed specialties: ')
      console.log(specialties)
      return specialties
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
      return `${this.modality}-${specialty}`
    },

    get_specialty_nickname (specialty) {
      return this.base_templates[this.modality].specialties[specialty].metadata.specialty_nickname
    },

    set_modality: function (new_modality) {
      this.modality = new_modality
      this.$emit('modality-changed', new_modality)
    },

    refresh_templates: function () {
      if (this._db_promise !== undefined) delete this._db_promise
      this.dataset = new Map()

      let my_promise = this._db_promise = db.find_templates({ modality: this.modality })
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
    modality: function () {
      this.refresh_templates()
    }
  },

  // TODO: must continuously reflect changes made to the backend DB
  created: function () {
    this.refresh_templates()
  },

  beforeDestroy: function () {
    if (this._db_promise !== undefined) delete this._db_promise
  }
}

</script>
