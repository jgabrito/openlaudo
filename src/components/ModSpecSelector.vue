<template>
<div class="input-field">
 <select v-bind:value="get_value_for_control('modality')"
   v-on:change="control_value_changed('modality', $event.target.value)">
   <option v-for="modality in modalities" v-bind:key="modality.name"
     v-bind:value="modality.name">
     {{ modality.nickname }}
   </option>
   <label> Modalidade </label>
 </select>
 <select v-bind:value="get_value_for_control('specialty')"
   v-on:change="control_value_changed('specialty', $event.target.value)">
   <option v-for="specialty in specialties" v-bind:key="specialty.name"
     v-bind:value="specialty.name">
     {{ specialty.nickname }}
   </option>
   <label> Especialidade </label>
 </select>
</div>
</template>

<script>

import metadata_mixin from './mixins/metadata_mixin.js'
import materialize_mixin from './mixins/materialize_mixin.js'

export default {
  data : function() {
    return {
      materialize_classes : [ 'select' ],
      materialize_recursive : true,
    }
  },

  methods: {
    get_value_for_control : function(name) {
      if (name === 'modality') {
        return this.current_modality.name
      }
      else if (name === 'specialty') {
        return this.current_specialty.name
      }
    },

    control_value_changed : function(name, value) {
      if (name === 'modalities') {
        this.set_modality(value)
      }
      else if (name === 'specialty') {
        this.set_specialty(value)
      }
    }
  },

  mixins : [ metadata_mixin, materialize_mixin ],
}

</script>

<style>
</style>
