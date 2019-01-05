<template>
  <div class="d-flex flex-column flex-grow-1 justify-content-between">

    <div class="switch">
      <label>
        Público
        <input type="checkbox"
          v-bind:disabled="disableControls"
          v-bind:checked="(! get_value_for_control('public'))"
          v-on:change="control_value_changed('public', !($event.target.checked))" >
        <span class="lever"></span>
        Privado
      </label>
    </div>

    <div class="input-field">
      <select v-bind:value="get_value_for_control('modality')"
        v-bind:disabled="disableControls"
        v-on:change="control_value_changed('modality', $event.target.value)">
        <option v-for="modality in modalities" v-bind:key="modality.name"
          v-bind:value="modality.name">
          {{ modality.nickname }}
        </option>
        <label> Modalidade </label>
      </select>
      <select v-bind:value="get_value_for_control('specialty')"
        v-bind:disabled="disableControls"
        v-on:change="control_value_changed('specialty', $event.target.value)">
        <option v-for="specialty in specialties" v-bind:key="specialty.name"
          v-bind:value="specialty.name">
          {{ specialty.nickname }}
        </option>
        <label> Especialidade </label>
      </select>
    </div>

    <div class="input-field col-12">
      <input id="title" type="text"
        v-bind:disabled="disableControls"
        v-bind:value="get_value_for_control('title')"
        v-on:input="control_value_changed('title', $event.target.value)" >
      <label for="title" class="active"> Título </label>
    </div>

    <div class="input-field">
      <textarea id="body" type="text" style="height:10rem;"
        v-bind:disabled="disableControls"
        v-bind:value="get_value_for_control('body')"
        v-on:input="control_value_changed('body', $event.target.value)">
      </textarea>
      <label for="body" class="active"> Texto </label>
    </div>

    <div class="d-flex flex-row ">
      <div class="flex-fill p-1">
        <slot name="submit_button"></slot>
      </div>
      <div class="flex-fill p-1">
        <slot class="flex-fill" name="remove_button"></slot>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'

import metadata_mixin from './mixins/metadata_mixin.js'
import materialize_mixin from './mixins/materialize_mixin.js'

export default {
  data: function () {
    return {
      materialize_classes: [ 'select' ],
      materialize_recursive: true
    }
  },

  created: function () {
    this.current_modality = this.metadata.modalities[this.asset.modality]
    this.current_specialty = this.metadata.specialties[this.asset.specialty]
  },

  props: {
    asset: Object,
    inputAsset: Object,
    disableControls : Boolean
  },

  watch: {
    asset: function () {

    },

    inputAsset: function () {

    }
  },

  methods: {
    get_value_for_control: function (name) {
      let value = this.inputAsset[name]
      if (value === undefined) value = this.asset[name]
      return value
    },

    control_value_changed: function (name, value) {
      let inputAsset = _.assign({}, this.inputAsset, { [name]: value })
      this.$emit('content-changed', inputAsset)
    }
  },

  mixins: [ metadata_mixin, materialize_mixin ]
}
</script>
