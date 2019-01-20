<template>
  <div class="input-field">
    <select
      :disabled="disabled"
      :value="get_value_for_control('modality')"
      @change="control_value_changed('modality', $event.target.value)"
    >
      <option
        v-for="modality in modalities"
        :key="modality.name"
        :value="modality.name"
      >
        {{ modality.nickname }}
      </option>
      <label> Modalidade </label>
    </select>
    <select
      :disabled="disabled"
      :value="get_value_for_control('specialty')"
      @change="control_value_changed('specialty', $event.target.value)"
    >
      <option
        v-for="specialty in specialties"
        :key="specialty.name"
        :value="specialty.name"
      >
        {{ specialty.nickname }}
      </option>
      <label> Especialidade </label>
    </select>
  </div>
</template>

<script>

import _assign from 'lodash/assign'
import _find from 'lodash/find'

import metadata_mixin from './mixins/metadata_mixin.js'
import materialize_mixin from './mixins/materialize_mixin.js'

/*
  This component will act as a mmanaged selector for modality/specialty pairs.
  It supports v-model. All value changes are full modality/specialty pair changes,
  since it is necessary to ensure validity of the specialty to the chosen modality.
  Some of the mixin_metadata funcionalities are used, but the state tracking
  current_* and intitial* are ignored, as well as the *-changed events.
*/

export default {

  mixins: [ metadata_mixin, materialize_mixin ],

  model : {
    prop : 'value',
    event : 'input'
  },
  props : {
    value : {
      // This are always modality/specialty objects; never their names
      type : Object,
      default : function() {
        const pair = this.get_default_specialty_modality_pair()
        return {
          ...pair
        }
      }
    },
    disabled : {
      type : Boolean,
      default : function() {
        return false
      }
    }
  },

  data: function () {
    return {
      materialize_classes: [ 'select' ],
      materialize_recursive: true
    }
  },

  watch: {
    specialties: function () {
      this.schedule_reinit()
    },

    modalities: function () {
      this.schedule_reinit()
    },

    value : {
      immediate : true,
      handler : function() {
        this.set_modality(this.value.modality)
        this.set_specialty(this.value.specialty)
      }
    }
  },

  methods: {
    get_value_for_control: function (name) {
      return this.value[name].name
    },

    control_value_changed: function (name, value) {
      const pair = _assign({}, this.value)

      if (name === 'modality') {
        pair.modality = this.metadata.modalities[value]
        this.set_modality(value)

        // Modality changes always entail a check if the currently selected specialty
        // is valid for the new modality, changing the former if necessary.
        const valid_specialties = this.get_valid_specialties()
        const current_specialty_name = this.value.specialty.name
        let new_specialty = _find(valid_specialties, s => (s.name === current_specialty_name))
        if (!new_specialty) {
          new_specialty = valid_specialties[0]
        }
        pair.specialty = new_specialty
      } else {
        pair[name] = this.metadata.specialties[value]
        this.set_modality(value)
      }

      // There should be no such thing as an independent modality or specialty change.
      // Only pair events are allowed.
      this.$emit('input', pair)
    }
  }
}

</script>

<style>
</style>
