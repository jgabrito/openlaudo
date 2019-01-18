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
        style="width: 40%; overflow-y: auto; overflow-x: hidden"
      >
        <!-- FORMS CLICKS -->
        <ul
          id="clickable_template_cards"
          ref="clickable_template_cards"
          class="collapsible popout"
        >
          <li
            v-for="card in cards"
            :key="card.id"
          >
            <div class="collapsible-header d-flex flex-row">
              <img
                :src="card.src"
                class="circle vignette "
              >
              <span
                class="headline white--text flex-grow-1"
                style="margin-top:20px;"
                v-html="card.title"
              />
            </div>
            <div
              id="form_div"
              class="collapsible-body white"
            >
              <span
                class="headline white--text"
                v-html="card.description"
              />
              <!-- HERE ENTERS THE CLICK FORM -->
              <!-- HERE ENTERS THE CLICK FORM -->
              <!-- HERE ENTERS THE CLICK FORM -->
            </div>
          </li>
        </ul>

        <!-- DESCRIPTORS DESCRIPTORS -->
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
</template>

<script>

import 'quill/dist/quill.snow.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'pretty-checkbox/dist/pretty-checkbox.min.css'

import _keys from 'lodash/keys'
import _sortBy from 'lodash/sortBy'

import TemplateNav from './TemplateNav.vue'
import AssetList from './AssetList.vue'
import DescriptorDialog from './DescriptorDialog.js'
import TemplateSaveDialog from './TemplateSaveDialog.vue'
import { descriptor_interface } from './asset_interfaces.js'
import form_templates from './form_templates.js'
import { submit_laudo } from './click_templates.js'
import { editor_insert_stuff } from './quill_utils.js'

import ultrasound_icon from '../assets/images/ultrasound_icon.png'

export default {

  components : {
    TemplateNav,
    AssetList,
  },

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
      cards : [],
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
      }
    }
  },

  watch : {
    current_modality : function() {
      this.update_click_templates()
    },

    current_specialty : function() {
      this.update_click_templates()
    }
  },

  mounted : function() {
    window.click_template_dispatcher = this.click_template_dispatcher
    this.$nextTick(() => {
      window.M.Collapsible.init(this.$refs.clickable_template_cards.$el)
    })
  },

  methods: {
    set_modality : function(modality) {
      this.current_modality = modality
    },

    set_specialty : function(specialty) {
      this.current_specialty = specialty
    },

    template_chosen : function(template) {
      const quill = this.$refs.editor.editor
      editor_insert_stuff(quill, template.body, true)
    },

    format_descriptor : function(descriptor) {
      const quill = this.$refs.editor.editor
      editor_insert_stuff(quill, [{ insert: descriptor.body }], false)
    },

    update_click_templates : function() {
      // change click form
      const new_cards = []
      let templates = form_templates[this.current_modality.name]
      if (templates) templates = templates[this.current_specialty.name]
      if (templates) {
        // if there is a clickable form for this modality/specialty pair in the
        // form_templates.js file, render it on the cover of the expansible box
        // with button to generate report
        const names = _sortBy(_keys(templates))
        names.forEach((name) => {
          const content = templates[name]
          if (submit_laudo[name] === undefined) {
            console.log(`Form for template ${name} defined, but dispatcher not found.`)
            return
          }
          const id = Math.round(1e10 * Math.random()).toString()
          const card = {
            id: id,
            title: `
              <div class="fb-button form-group field-button-${id} d-flex flex-row flex-nowrap justify-content-between">
                <div class='flex-grow'>
                  ${content.nickname}
                </div>
                <button type="button" class="btn btn-success" name="button-${id}" 
                  id="button-${id}" 
                    onclick="click_template_dispatcher('${name}'); event.stopPropagation();">
                  Laudo
                </button>
              </div>
            `,
            description: content.template,
            src: ultrasound_icon
          }
          new_cards.push(card)
        })
      }

      if (new_cards.length > 0) {
        // calls func tha changes vue object
        this.cards = new_cards
        setTimeout(
          function () {
            const elems = document.querySelectorAll('.form_select_init')
            window.M.FormSelect.init(elems)
          },
          500
        )
        setTimeout(
          function () {
            const elems = document.querySelectorAll('.collapsible')
            window.M.Collapsible.init(elems)
          },
          500
        )
      } else {
        this.cards = []
      }
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
      const quill = this.$refs.editor.editor
      const len = quill.getLength()
      quill.setSelection(0, len)
      document.execCommand('copy')
      quill.setSelection(len, len)
    },

    click_template_dispatcher : function(name) {
      submit_laudo[name](this.$refs.editor.editor)
    }
  }
}

</script>

<style scoped>

.vignette {
  max-width: 60px;
  max-height: 60px;
    margin-right: 4%;
}

#clickable_template_cards {
  margin-top: 0px
}

* {
  box-sizing: border-box;
}

.collapsible-header {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 10px;
  padding-left: 10px;
}

.collapsible-body {
  padding-top: 2px;
  padding-bottom: 2px;
}


html, body {
  overflow: hidden;
  max-height: 100%;
  height: 100%;
}

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

.form_sg {
  width: 30%;
}

#form_div {
  padding-top: 5px;
}

.idade-gestacional {
  border: 1px solid #f1a7ae;
  margin-bottom: 5px;
}

.fb-number-label {
  margin-bottom: 0px;
}

label {
  margin-bottom: 0px;
}

</style>
