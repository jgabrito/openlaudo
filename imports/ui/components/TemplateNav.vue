
<template>
  <nav class="nav-extended">
    <div class="nav-wrapper">
      <a
        v-if="tabs"
        href="#!"
        class="brand-logo right"
      >
        Open Laudo
      </a>

      <ul class="left hide-on-med-and-down">
        <li v-if="tabs">
          <LoginMenu />
        </li>
        <li
          v-for="specialty in specialties"
          :key="get_specialty_id(specialty)"
          :class="{ active : (specialty === current_specialty) }"
        >
          <DropdownTrigger
            v-if="templateDropdowns"
            class="specialty_a"
            :text-content="specialty.nickname"
            :target="get_specialty_id(specialty)"
            @click="set_specialty(specialty.name)"
          >
            <ul
              :id="get_specialty_id(specialty)"
              class="dropdown-content"
            >
              <li
                v-for="template in report_templates[specialty.name]"
                :key="template._id"
              >
                <a
                  href="#!"
                  :class="get_template_class(template)"
                  @click="$emit('template-chosen', template)"
                >
                  {{ template.nickname }}
                </a>
              </li>
            </ul>
          </DropdownTrigger>
          <a
            v-else
            href="#!"
            class="specialty_a"
            @click="set_specialty(specialty.name)"
          >
            {{ specialty.nickname }}
          </a>
        </li>
      </ul>
    </div>
    <div class="nav-content">
      <ul :class="{tabs : tabs}">
        <li
          v-for="modality in modalities"
          :key="modality.name"
          :class="{ tab : tabs , active : (modality === current_modality) }"
        >
          <a
            href="#"
            class="modality_a"
            :class="{ tab : tabs , active : (modality === current_modality) }"
            @click="set_modality(modality.name)"
          >
            {{ modality.nickname }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

import { Map as ImMap } from 'immutable'

import * as db from '../../api/db.js'
import DropdownTrigger from './DropdownTrigger.vue'
import LoginMenu from './LoginMenu.vue'
import metadata_mixin from './mixins/metadata_mixin.js'
import materialize_mixin from './mixins/materialize_mixin.js'
import db_mixin from './mixins/db_mixin.js'
import { userid_mixin } from '../../api/user.js';

export default {

  components: { DropdownTrigger, LoginMenu },

  mixins: [ metadata_mixin, materialize_mixin, db_mixin, userid_mixin ],

  props: {
    templateDropdowns: Boolean,
    tabs: Boolean,
  },

  data: function () {
    return {
      report_templates : {},
      materialize_classes: [ 'tabs' ],
      materialize_recursive: true,
    }
  },

  watch : {
    current_modality : function() {
      this.update_templates()
    }
  },

  beforeCreate : function() {
    this._all_templates = new ImMap()
  },

  methods: {
    update_templates : function() {
      const modality_templates = this._all_templates.get(this.current_modality.name)
      if (modality_templates) {
        this.report_templates = modality_templates.toJS()
      } else {
        this.report_templates = {}
      }
    },

    dataset_changed : function(name, new_value, old_value) {
      if (name !== 'default') {
        throw new Error('Only default dataset supported')
      }

      const entries = new_value

      if (!entries) {
        this._all_templates = new ImMap()
        this.update_templates()
        return
      }
      if (entries.equals(old_value)) {
        return
      }

      let entries_by_modality = entries.groupBy(t => (t.get('modality')))
      entries_by_modality = entries_by_modality.sortBy(
        (v, k) => (k),
        (a, b) => (a.localeCompare(b))
      )

      entries_by_modality = entries_by_modality.map((v) => {
        let entries_by_specialty = v.groupBy(t => (t.get('specialty')))
        entries_by_specialty = entries_by_specialty.sortBy(
          (vs, ks) => (ks),
          (a, b) => (a.localeCompare(b))
        )
        return entries_by_specialty
      })

      this._all_templates = entries_by_modality
      this.update_templates()
    },

    get_specialty_id: function (specialty) {
      return `${this.current_modality.name}-${specialty.name}`
    },

    find_function: function () {
      if (!this.ownSubscription) {
        throw new Error('Should not be here.')
      }

      const selector = {
        modality: this.current_modality.name,
      }

      if (this.user_id) {
        selector.owner_id = {
          $in : [ this.user_id, db.get_system_uid() ]
        }
      } else {
        selector.owner_id = db.get_system_uid()
      }

      return { default : db.find_templates(selector, {}, '', 'nickname' ) }
    },

    get_template_class : function(template) {
      if ((this.user_id) && (template.owner_id === this.user_id)) {
        return {
          bold : true
        }
      }
      return { }
    }
  }
}

</script>

<style scoped>
  .specialty_a {
    text-decoration: none !important;
  }

  .specialty_a:hover {
    background-color: #80808080 !important;
    color: #FFFFFF !important;
  }

  .modality_a {
    text-decoration: none !important;
  }

  .modality_a:hover {
    background-color: #80808040 !important;
  }

  .bold {
    font-weight: bold;
  }

</style>
