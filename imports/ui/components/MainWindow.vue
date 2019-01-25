<template>
  <div
    id="main_container"
    class="container-fluid d-flex flex-column h-100"
  >
    <TemplateNav
      template-dropdowns
      tabs
      :initial-modality="initialModality"
      :initial-specialty="initialSpecialty"
      @template-chosen="template_chosen"
      @specialty-changed="set_specialty"
      @modality-changed="set_modality"
    />

    <div
      id="container"
      class="d-flex flex-row flex-grow-1"
    >
      <!-- ROW WITH RTF_EDITOR AND FINDINGS DESCRIPTORS -->
      <!-- RTF_EDITOR -->
      <div
        id="all_editor"
        class="d-flex flex-column ml-1"
        style="width: 60%;"
      >
        <div
          id="editor_toolbar"
          class="d-flex flex-row flex-wrap"
        >
          <select class="ql-font" />

          <div class="d-flex flex-row">
            <button class="ql-bold" />
            <button class="ql-italic" />
            <button class="ql-underline" />
            <button class="ql-strike" />
          </div>

          <select class="ql-size">
            <option value="small" />
            <option selected />
            <option value="large" />
            <option value="huge" />
          </select>

          <div class="d-flex flex-row">
            <button
              class="ql-list"
              value="ordered"
            />
            <button
              class="ql-list"
              value="bullet"
            />
          </div>

          <div class="d-flex flex-row">
            <button
              class="ql-script"
              value="sub"
            />
            <button
              class="ql-script"
              value="super"
            />
          </div>

          <div class="d-flex flex-row">
            <button
              class="ql-indent"
              value="-1"
            />
            <button
              class="ql-indent"
              value="+1"
            />
          </div>

          <div class="d-flex flex-row">
            <select class="ql-color" />
            <select class="ql-background" />
          </div>

          <select class="ql-align" />

          <div class="d-flex flex-row">
            <button class="ql-COPIAR" />
            <button class="ql-SALVAR" />
            <button class="ql-ACHADOS" />
          </div>
        </div>

        <div
          id="editor_container"
          class="flex-grow-1"
        >
          <quill
            ref="editor"
            v-model="editor_content"
            class="h-100"
            output="delta"
            :config="quill_config"
          />
        </div>
      </div>

      <div
        class="d-flex flex-column pl-4 pr-2"
        style="width: 40%; overflow: hidden;"
      >
        <div class="d-flex flex-row">
          <ul class="tabs">
            <li class="tab">
              <a
                class="sidebar_tab sidebar_tab_enabled active"
                href="#descriptor_list_container"
              >
                Achados
              </a>
            </li>
            <li
              class="tab"
              :class="{ disabled : (! has_cards) }"
            >
              <a
                class="sidebar_tab"
                :class="{sidebar_tab_enabled : has_cards}"
                href="#clickable_template_container"
              >
                Forms clicáveis
              </a>
            </li>
          </ul>
        </div>

        <!-- FORMS CLICKS -->
        <ClickableTemplateList
          id="clickable_template_container"
          class="flex-grow-1 mt-4 pt-4"
          :modality="current_modality"
          :specialty="current_specialty"
          :get-quill="get_quill"
          @cards_changed="clickable_templates_received"
        />

        <!-- DESCRIPTORS DESCRIPTORS -->
        <div
          id="descriptor_list_container"
          class="flex-grow-1 mt-4"
        >
          <div
            id="descriptor_list_inner_container"
            class="d-flex flex-column h-100"
          >
            <div>
              <input
                id="descriptor_search_input"
                v-model="search_expression"
                type="text"
                placeholder="Busque descritores..."
              >
            </div>

            <AssetList
              expanded
              class="flex-grow-1"
              :modality="current_modality"
              :specialty="current_specialty"
              :search-expression="search_expression"
              :asset-interface="descriptor_interface"
              @asset-chosen="format_descriptor"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import 'quill/dist/quill.snow.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'pretty-checkbox/dist/pretty-checkbox.min.css'

import TemplateNav from './TemplateNav.vue'
import AssetList from './AssetList.vue'
import DescriptorDialog from './DescriptorDialog.js'
import TemplateSaveDialog from './TemplateSaveDialog.vue'
import ClickableTemplateList from './ClickableTemplateList.vue'

import { descriptor_interface } from './asset_interfaces.js'
import { editor_insert_stuff } from './quill_utils.js'
import materialize_mixin from './mixins/materialize_mixin';

export default {

  components : {
    TemplateNav,
    AssetList,
    ClickableTemplateList,
  },
  mixins : [
    materialize_mixin
  ],

  props: {
    initialModality : Object,
    initialSpecialty : Object,
    localVue : Object
  },

  data : function() {
    return {
      current_modality : this.initialModality,
      current_specialty : this.initialSpecialty,
      search_expression : '',
      editor_content : [],
      has_cards : false,
      descriptor_interface,
      quill_config : {
        modules: {
          toolbar: {
            container: '#editor_toolbar',
            handlers : {
              'SALVAR' : () => { this.show_template_save_dialog() },
              'ACHADOS' : () => { this.show_descriptor_edit_dialog() },
              'COPIAR' : () => { this.copy_editor_content() },
            }
          }
        },
        theme: 'snow',
        scrollingContainer: '#editor-container'
      },
      materialize_classes : [ 'tabs' ],
      materialize_recursive : true
    }
  },

  methods: {
    set_modality : function(modality) {
      this.current_modality = modality
    },

    set_specialty : function(specialty) {
      this.current_specialty = specialty
    },

    template_chosen : function(template) {
      editor_insert_stuff(this.get_quill(), template.body, true)
    },

    format_descriptor : function(descriptor) {
      editor_insert_stuff(this.get_quill(), [{ insert: descriptor.body }], false)
    },

    show_descriptor_edit_dialog : function() {
      const el = document.createElement('div')
      document.body.appendChild(el)
      const Vue = this.localVue
      const dialog = new Vue({
        el,
        template : `<DescriptorDialog
          ref="dialog"
          modal
          show-on-create
          :initial-modality="modality"
          :initial-specialty="specialty"
          @close="on_dialog_close"
        />`,
        data: {
          modality : this.current_modality,
          specialty : this.current_specialty,
        },
        methods: {
          on_dialog_close : function() {
            this.$destroy()
            this.$el.parentElement.removeChild(this.$el)
          }
        },
        components: {
          DescriptorDialog
        }
      })
    },

    show_template_save_dialog : function() {
      const el = document.createElement('div')
      document.body.appendChild(el)
      const Vue = this.localVue
      const dialog = new Vue({
        el,
        template : `<TemplateSaveDialog
          ref="dialog"
          modal
          show-on-create
          :initial-modality="modality"
          :initial-specialty="specialty"
          :content="content"
          :initial-template="null"
          @close="on_dialog_close">
          </TemplateSaveDialog>`,
        data: {
          modality : this.current_modality,
          specialty : this.current_specialty,
          content : this.editor_content
        },
        methods: {
          on_dialog_close : function() {
            dialog.$destroy()
            dialog.$el.parentElement.removeChild(dialog.$el)
          }
        },
        components: {
          TemplateSaveDialog
        }
      })
    },

    copy_editor_content : function() {
      const quill = this.get_quill()
      const len = quill.getLength()
      quill.setSelection(0, len)
      document.execCommand('copy')
      quill.setSelection(len, len)
    },

    get_quill : function() {
      return this.$refs.editor.editor
    },

    clickable_templates_received : function(cards) {
      this.has_cards = (cards.length > 0)
    }
  }
}

</script>

<style scoped>

.zero-margin {
  margin-left: 0px;
  margin-right: 0px;
}

#main_container {
  padding-left: 0px;
  padding-right: 0px;
}

#descriptor_search_input {
  box-sizing: border-box;
  background-image: url('/searchicon.png');
  background-position: 10px 12px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 2px 10px 2px 35px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
/*  margin-right: 40px; */
}

#container {
  margin-top: 10px;
  margin-bottom: 10px;
}

.row {
  margin-bottom: 2px;
}

#editor {
  font-size: medium;
  height: 100%;
  min-height: 100%;
}

#editor .ql-editor {
  overflow-y: visible;
}

#editor_container {
  overflow-y: auto;
  flex-basis: 0;
  -webkit-flex-basis: 0;
}

#descriptor_list_container {
  overflow-y: hidden;
  flex-basis: 0;
  -webkit-flex-basis: 0;
}

#descriptor_list_inner_container {
  overflow-y: hidden;
  flex-basis: 0;
  -webkit-flex-basis: 0;
}

#clickable_template_container {
  overflow-y: auto;
  flex-basis: 0;
  -webkit-flex-basis: 0;
}

.ql-snow.ql-toolbar button.ql-COPIAR {
  width: 90px;
}

.ql-COPIAR:after {
  content: "COPIAR";
  background-color: #f56565;
  box-shadow: 2px 2px grey;
  padding: 4;
  padding-left: 10;
  padding-right: 10;
}

.ql-snow.ql-toolbar button.ql-SALVAR {
  width: 90px;
}

.ql-SALVAR:after {
  content: "SALVAR";
  background-color: #f56565;
  box-shadow: 2px 2px grey;
  padding: 4;
  padding-left: 10;
  padding-right: 10;
}

.ql-snow.ql-toolbar button.ql-ACHADOS {
  width: 90px;
}

.ql-ACHADOS:after {
  content: "ACHADOS";
  background-color: #f56565;
  box-shadow: 2px 2px grey;
  padding: 4;
  padding-left: 10;
  padding-right: 10;
}

.sidebar_tab {
    text-decoration: none !important;
  }

.sidebar_tab_enabled:hover {
  background-color: #80808040 !important;
}

</style>
