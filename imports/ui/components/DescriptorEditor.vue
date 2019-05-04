<template>
  <div class="d-flex flex-column flex-grow-1 justify-content-between">
    <div class="switch">
      <label>
        Público
        <input
          type="checkbox"
          :disabled="disableControls"
          :checked="(! get_value_for_control('public'))"
          @change="control_value_changed('public', !($event.target.checked))"
        >
        <span class="lever" />
        Privado
      </label>
    </div>

    <ModSpecSelector
      :disabled="disableControls"
      :value="get_value_for_control('modspec_pair')"
      @input="control_value_changed('modspec_pair', $event.target.value)"
    />

    <div class="input-field">
      <input
        id="title"
        type="text"
        :disabled="disableControls"
        :value="get_value_for_control('title')"
        @input="control_value_changed('title', $event.target.value)"
      >
      <label
        for="title"
        class="active"
      >
        Título
      </label>
    </div>

    <div class="input-field">
      <input
        id="hotkey"
        type="text"
        :disabled="disableControls"
        :value="get_value_for_control('hotkey')"
        @input="control_value_changed('hotkey', $event.target.value)"
      >
      <label
        for="hotkey"
        class="active"
      >
        Hotkey
      </label>
    </div>

    <div class="input-field">
      <textarea
        id="body"
        type="text"
        style="height:8rem;"
        :disabled="disableControls"
        :value="get_value_for_control('body')"
        @input="control_value_changed('body', $event.target.value)"
      />
      <label
        for="body"
        class="active"
      >
        Texto
      </label>
    </div>

    <div class="d-flex flex-row ">
      <div class="flex-fill p-1">
        <slot name="submit_button" />
      </div>
      <div class="flex-fill p-1">
        <slot
          class="flex-fill"
          name="remove_button"
        />
      </div>
    </div>
  </div>
</template>

<script>

import _assign from 'lodash/assign'

import ModSpecSelector from './ModSpecSelector.vue'
import materialize_mixin from './mixins/materialize_mixin.js'
import base_metadata from '../../api/base_metadata.js'

export default {

  components : { ModSpecSelector },

  mixins: [ materialize_mixin ],

  props: {
    asset: Object,
    inputAsset: Object,
    disableControls : Boolean
  },
  data: function () {
    return {
      materialize_classes: [ 'select' ],
      materialize_recursive: true
    }
  },

  watch: {
    asset: function () {

    },

    inputAsset: function () {

    }
  },

  methods: {
    get_value_for_control: function (name) {
      if (name === 'modspec_pair') {
        return {
          modality : base_metadata.modalities[this.get_value_for_control('modality')],
          specialty : base_metadata.specialties[this.get_value_for_control('specialty')]
        }
      }

      let value = this.inputAsset[name]
      if (value === undefined) value = this.asset[name]
      return value
    },

    control_value_changed: function (name, value) {
      const input_asset = _assign({}, this.inputAsset)
      if (name === 'modspec_pair') {
        input_asset.modality = value.modality.name
        input_asset.specialty = value.specialty.name
      } else if (name === 'hotkey') {
        // Force hotkeys to be alphanumeric; backend will not check this.
        input_asset.hotkey = value.replace(/\W+/g, '')
      } else {
        input_asset[name] = value
      }
      this.$emit('content-changed', input_asset)
    }
  }
}
</script>
