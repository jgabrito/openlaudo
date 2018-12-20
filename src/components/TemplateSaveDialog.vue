<template>
<div v-bind:class="container_classes['dialog_main_container']">
  <div v-bind:class="container_classes['client_area']">
    <div class="switch mt-2 mb-2">
      <label>
        Público
        <input type="checkbox" v-model="not_public">
        <span class="lever"></span>
        Privado
      </label>
    </div>

    <ModSpecSelector v-bind:initial-modality="initialModality"
                      v-bind:initial-specialty="initialSpecialty"
                      v-on:specialty-changed="set_specialty"
                      v-on:modality-changed="set_modality">
    </ModSpecSelector>

    <div class="input-field">
      <input id="nickname_input" type="text" v-model.trim="nickname">
      <label for="nickname_input" class="active"> Título </label>
    </div>

    <div class="switch mt-2">
      <label>
        Criar novo
        <input type="checkbox" v-model="overwrite_template" >
        <span class="lever"></span>
        Sobrescrever
      </label>
    </div>

    <div class="flex-grow-1 mt-3 mb-3">
      <AssetList v-if="overwrite_template"
        v-bind:modality="current_modality" v-bind:specialty="current_specialty"
        search-expression=""
        v-bind:asset-interface="template_interface"
        v-on:asset-chosen="asset_chosen"
        v-on:asset-changed="asset_changed" >
      </AssetList>
    </div>

    <div v-if="submitting" style="text-align:center;">
      <div class="preloader-wrapper small active">
        <div class="spinner-layer spinner-red-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    </div>
    <a v-else v-bind:class="button_classes.submit"
        v-on:click="button_clicked('submit')">
      Enviar
    </a>

  </div>
</div>
</template>

<script>

import * as db from '../db.js'
import AssetList from './AssetList.vue'
import ModSpecSelector from './ModSpecSelector.vue'
import dialog_mixin from './mixins/dialog_mixin.js'

const template_interface = {
  get_title: (a) => (a.nickname),
  get_body: (a) => (a.body),
  sort_key: 'nickname',
  find_assets: function (selector, options, search_expression) {
    return db.find_templates(selector, options, search_expression)
  },
  upsert_assets: function (docs) {
    return db.upsert_templates(docs)
  }
}

export default {
  data: function () {
    return {
      overwrite_template: false,
      nickname: '',
      not_public: false,
      current_modality: this.initialModality,
      current_specialty: this.initialSpecialty,
      current_template: this.initialTemplate,
      submitting: false,
      template_interface
    }
  },

  props: {
    initialSpecialty: Object,
    initialModality: Object,
    initialTemplate: Object,
    templateBody: Array
  },

  computed: {
    button_classes: function () {
      let overwrite_template = this.overwrite_template
      let current_template = this.current_template
      let nickname = this.nickname
      let can_submit = (nickname !== '') && ((!overwrite_template) || current_template)
      return {
        'submit': {
          btn: true,
          red: true,
          'lighten-2': true,
          'waves-effect': true,
          'waves-light': true,
          'w-100': true,
          disabled: (!can_submit)
        }
      }
    },

    container_classes: function () {
      return {
        'dialog_main_container': {
          'modal': this.modal
        },
        'client_area': {
          'p-2': true,
          'w-100': true,
          'h-100': true,
          'd-flex': true,
          'flex-column': true
        }
      }
    }
  },

  watch: {
    current_template: function (val, old_val) {
      let old_id = old_val ? old_val._id : null
      let new_id = val ? val._id : null

      if (old_id !== new_id) {
        this.nickname = val ? val.nickname : ''
        this.not_public = val ? (!val.public) : true
      }
    }
  },

  methods: {
    asset_chosen: function (asset) {
      this.current_template = asset
    },

    asset_changed: function (asset) {
      this.current_template = asset
    },

    set_modality: function (modality) {
      this.current_modality = modality
    },

    set_specialty: function (specialty) {
      this.current_specialty = specialty
    },

    button_clicked: function (name) {
      const _submit_upsert_and_close = (upsert) => {
        return template_interface.upsert_assets([upsert])
          .then(() => {
            this.submitting = false
            return this.hide()
          }, (error) => {
            console.log('Error sending template update to DB')
            console.log(error)
            console.log('Retrying...')
            return _submit_upsert_and_close(upsert)
          })
      }

      if (name === 'submit') {
        this.submitting = true
        let upsert = {}
        if (this.overwrite_template) {
          upsert = Object.assign(upsert, this.current_template)
        }
        console.log(upsert)
        upsert.nickname = this.nickname
        upsert.body = this.templateBody
        upsert.specialty = this.current_specialty.name
        upsert.modality = this.current_modality.name
        upsert.public = (!this.not_public)
        _submit_upsert_and_close(upsert)
      }
    }
  },

  components: {
    AssetList,
    ModSpecSelector
  },

  mixins: [ dialog_mixin ]
}

</script>

<style>
</style>
