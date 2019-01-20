<template>
  <div :class="container_classes['dialog_main_container']">
    <div :class="container_classes['client_area']">
      <div class="switch mt-2 mb-2">
        <label>
          Público
          <input
            v-model="not_public"
            type="checkbox"
          >
          <span class="lever" />
          Privado
        </label>
      </div>

      <ModSpecSelector v-model="current_modspec_pair" />

      <div class="input-field">
        <input
          id="nickname_input"
          v-model.trim="nickname"
          type="text"
        >
        <label
          for="nickname_input"
          class="active"
        >
          Título
        </label>
      </div>

      <div class="switch mt-2">
        <label>
          Criar novo
          <input
            v-model="overwrite_template"
            type="checkbox"
          >
          <span class="lever" />
          Sobrescrever
        </label>
      </div>

      <div
        class="flex-grow-1 mt-3 mb-3"
        style="overflow-y : auto;"
      >
        <AssetList
          v-if="(overwrite_template) && (user_id)"
          :modality="current_modspec_pair.modality"
          :specialty="current_modspec_pair.specialty"
          search-expression=""
          :asset-interface="template_interface"
          :extra-filters="{ owner_id : user_id }"
          @asset-chosen="asset_chosen"
          @asset-changed="asset_changed"
        />
      </div>

      <div
        v-if="submitting"
        style="text-align:center;"
      >
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
              <div class="circle" />
            </div><div class="gap-patch">
              <div class="circle" />
            </div><div class="circle-clipper right">
              <div class="circle" />
            </div>
          </div>
        </div>
      </div>
      <a
        v-else
        :class="button_classes.submit"
        @click="button_clicked('submit')"
      >
        Enviar
      </a>
    </div>
  </div>
</template>

<script>

import _assign from 'lodash/assign'

import * as db from '../../api/db.js'
import AssetList from './AssetList.vue'
import ModSpecSelector from './ModSpecSelector.vue'
import dialog_mixin from './mixins/dialog_mixin.js'
import { template_interface } from './asset_interfaces.js'
import { userid_mixin } from '../../api/user.js'

export default {

  components: {
    AssetList,
    ModSpecSelector
  },

  mixins: [ dialog_mixin, userid_mixin ],

  props: {
    initialSpecialty: Object,
    initialModality: Object,
    initialTemplate: Object,
    content: Array
  },
  data: function () {
    return {
      overwrite_template: false,
      nickname: '',
      not_public: false,
      current_modspec_pair : {
        modality : this.initialModality,
        specialty : this.initialSpecialty,
      },
      current_template: this.initialTemplate,
      submitting: false,
      template_interface
    }
  },

  computed: {
    button_classes: function () {
      const overwrite_template = this.overwrite_template
      const current_template = this.current_template
      const nickname = this.nickname
      const can_submit = (this.user_id)
        && (nickname !== '')
        && ((!overwrite_template) || current_template)
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
    },

    template_body : function() {
      return this.content.map((x) => {
        x = _assign({}, x)
        if (x.attributes !== undefined) {
          x.attributes = JSON.stringify(x.attributes)
        }
        return x
      })
    }
  },

  watch: {
    current_template: function (val, old_val) {
      const old_id = old_val ? old_val._id : null
      const new_id = val ? val._id : null

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
      this.$set(this.current_modspec_pair, 'modality', modality)
    },

    set_specialty: function (specialty) {
      this.$set(this.current_modspec_pair, 'specialty', specialty)
    },

    clear_current_template : function() {
      this.current_template = null
    },

    button_clicked: function (name) {
      const _submit_upsert_and_close = upsert => template_interface.upsert_assets([upsert])
        .then(() => {
          this.submitting = false
          return this.hide()
        }, (error) => {
          console.log('Error sending template update to DB')
          console.log(error)
          console.log('Retrying...')
          return _submit_upsert_and_close(upsert)
        })

      if (name === 'submit') {
        this.submitting = true
        let upsert = {}
        if (this.overwrite_template) {
          upsert = _assign(upsert, this.current_template)
        }
        upsert.owner_id = this.user_id
        upsert.nickname = this.nickname
        upsert.body = this.template_body
        upsert.specialty = this.current_modspec_pair.specialty.name
        upsert.modality = this.current_modspec_pair.modality.name
        upsert.public = (!this.not_public)
        _submit_upsert_and_close(upsert)
      }
    }
  }
}

</script>

<style>
</style>
