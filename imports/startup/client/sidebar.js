/* eslint no-unused-vars: "warn", "no-undef" : "warn", "no-new" : "warn" */
import Vue from 'vue/dist/vue.min.js'
import _ from 'lodash'

import TemplateNav from '../../ui/components/TemplateNav.vue'
import AssetList from '../../ui/components/AssetList.vue'
import DescriptorDialog from '../../ui/components/DescriptorDialog.js'
import TemplateSaveDialog from '../../ui/components/TemplateSaveDialog.vue'
import * as db from '../../api/db.js'
import base_metadata from '../../api/base_metadata.js'
import ultrasound_icon from '../../ui/assets/images/ultrasound_icon.png'
import { submit_laudo } from './click_templates.js'
import form_templates from './form_templates.js'

const $ = window.$

const initial_modality = base_metadata.modalities['tc']
const initial_specialty = base_metadata.specialties['cep']

//  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL
//  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL

// define function to run when 'COPIAR' tool is pressed
const myhandlers = {
  'COPIAR': function () {
    // htmlStr = quill.root.innerHTML
    // textStr = quill.getText()

    copySelection()
  },

  'SALVAR': function () {
    const template_body_editor = quill_comp.content.ops || []

    var el = null
    if (!template_save_dialog) {
      el = document.createElement('div')
      document.body.appendChild(el)
      template_save_dialog = new Vue({
        el,
        template: `
          <TemplateSaveDialog v-bind:initial-modality="v_descriptors_ul.modality"
            v-bind:initial-specialty="v_descriptors_ul.specialty"
            v-bind:modal="true" 
            v-bind:template-body="template_body"
            v-bind:initial-template="null"
            v-on:close="template_save_dialog_close" ref="dialog">
          </TemplateSaveDialog>
        `,
        data: {
          v_descriptors_ul,
          template_body_editor
        },
        computed: {
          template_body: function () {
            return this.template_body_editor.map((x) => {
              x = Object.assign({}, x)
              if (x.attributes !== undefined) {
                x.attributes = JSON.stringify(x.attributes)
              }
              return x
            })
          }
        },
        methods: {
          template_save_dialog_close
        },
        components: {
          TemplateSaveDialog
        }
      })
    }
    template_save_dialog.template_body_editor = template_body_editor
    template_save_dialog.$refs.dialog.set_modality(v_descriptors_ul.modality)
    template_save_dialog.$refs.dialog.set_specialty(v_descriptors_ul.specialty)
    template_save_dialog.$refs.dialog.new_template = true
    template_save_dialog.$refs.dialog.current_template = null
    template_save_dialog.$refs.dialog.show()
  },

  'ACHADOS': function () {
    var el = null
    if (!descriptor_dialog) {
      el = document.createElement('div')
      document.body.appendChild(el)
      descriptor_dialog = new Vue({
        el,
        template: `
          <DescriptorDialog v-bind:initial-modality="v_descriptors_ul.modality"
            v-bind:initial-specialty="v_descriptors_ul.specialty"
            v-on:close="descriptor_dialog_close" v-bind:modal="true" ref="dialog">
          </DescriptorDialog>
        `,
        data: {
          v_descriptors_ul
        },
        methods: {
          descriptor_dialog_close
        },
        components: {
          DescriptorDialog
        }
      })
    }
    descriptor_dialog.$refs.dialog.set_modality(v_descriptors_ul.modality)
    descriptor_dialog.$refs.dialog.set_specialty(v_descriptors_ul.specialty)
    descriptor_dialog.$refs.dialog.show()
  }
}

const quill_config = {
  modules: {
    toolbar: {
      container: '#editor_toolbar',
      handlers: myhandlers
    }
  },
  theme: 'snow',
  scrollingContainer: '#editor-container'
}

// code that inserts the editor on the page
// TODO: move the editor to a Vue component to solve sizing issues.
const quill_comp = new Vue({
  el: '#editor',

  template: `
    <quill class="h-100" v-model="content" output="delta" ref="editor" 
       v-bind:config="config" > 
    </quill>
  `,

  data: {
    content: [],
    config: quill_config
  }
})

// function to copy content
function copySelection () {
  const quill = quill_comp.$refs.editor.editor
  var len = quill.getLength()
  quill.setSelection(0, len)
  document.execCommand('copy')
  quill.setSelection(len, len)
}

function editor_insert_stuff (deltas) {
  const quill = quill_comp.$refs.editor.editor
  const selection = quill.getSelection(true)
  const update = {
    ops: []
  }

  if (selection.index > 0) {
    update.ops.push({ retain: selection.index })
  }
  if (selection.length > 0) {
    update.ops.push({ delete: selection.length })
  }

  update.ops = update.ops.concat(deltas.map((x) => {
    x = Object.assign({}, x)
    if (x.attributes !== undefined) x.attributes = JSON.parse(x.attributes)
    return x
  }))

  quill.updateContents(update)
}

// CLICKS CLICKS CLICKS
// CLICKS CLICKS CLICKS
// CLICKS CLICKS CLICKS

// inserts the collapsible menu where the clickable forms lie

$('#form_div').html()

const collapsible_app = new Vue({
  el: '#app',
  mounted: function () { $('.collapsible').collapsible() },
  data: {
    cards: [ ]
  }
})

// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS
// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS
// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS

// insert descriptor in quill
function format_descriptor (descriptor) {
  editor_insert_stuff([{ insert: descriptor.body }])
}

const descriptor_interface = {
  get_title: (a) => (a.title),
  get_body: (a) => (a.body),
  sort_key: 'title',
  find_assets: function (selector, options, search_expression) {
    return db.find_descriptors(selector, options, search_expression)
  }
}

// vue
const v_descriptors_ul = new Vue({
  el: '#descriptor_list',

  data: {
    modality: initial_modality,
    specialty: initial_specialty,
    search_expression: '',
    descriptor_interface
  },

  template: `
    <AssetList expanded class="flex-grow-1"
      v-bind:modality="modality" v-bind:specialty="specialty"
      v-bind:searchExpression="search_expression"
      v-bind:asset-interface="descriptor_interface" v-on:asset-chosen="format_descriptor" > 
    </AssetList>
  `,

  methods: {
    format_descriptor,
    set_specialty: function (new_specialty) {
      this.specialty = new_specialty
    },
    set_modality: function (new_modality) {
      this.modality = new_modality
    }
  },

  components: {
    AssetList
  }
})

// TOP MENU TOP MENU TOP MENU TOP MENU
// TOP MENU TOP MENU TOP MENU TOP MENU
// TOP MENU TOP MENU TOP MENU TOP MENU

// these are the menus that drop down with the report titles for each specialty
// when clicked, they insert the template to the quill editor

const template_nav = new Vue({
  el: '#template_nav',
  template: `
    <TemplateNav template-dropdowns tabs
      v-bind:initial-modality="initial_modality" 
      v-bind:initial-specialty="initial_specialty"
      v-on:template-chosen="template_chosen" 
      v-on:specialty-changed="set_specialty"
      v-on:modality-changed="set_modality">
    </TemplateNav>
  `,
  data: {
    initial_modality,
    initial_specialty,
    current_modality: initial_modality,
    current_specialty: initial_specialty
  },

  watch: {
    current_specialty: function () {
      this.update_click_templates()
    },
    current_modality: function () {
      this.update_click_templates()
    }
  },

  methods: {
    set_specialty: function (new_specialty) {
      this.current_specialty = new_specialty
      v_descriptors_ul.set_specialty(new_specialty)
    },

    set_modality: function (new_modality) {
      this.current_modality = new_modality
      v_descriptors_ul.set_modality(new_modality)
    },

    update_click_templates: function () {
      // change click form
      let new_cards = []
      let templates = form_templates[this.current_modality.name]
      if (templates) templates = templates[this.current_specialty.name]
      if (templates) {
        // if there is a clickable form for this modality/specialty pair in the
        // form_templates.js file, render it on the cover of the expansible box
        // with button to generate report
        let names = _.sortBy(_.keys(templates))
        for (let name of names) {
          let content = templates[name]
          if (submit_laudo[name] === undefined) {
            console.log(`Form for template ${name} defined, but dispatcher not found.`)
            continue
          }
          let id = Math.round(1e10 * Math.random()).toString()
          let card = {
            id: id,
            title: `
              <div class="fb-button form-group field-button-${id} d-flex flex-row flex-nowrap justify-content-between">
                <div class='flex-grow'>
                  ${content.nickname}
                </div>
                <button type="button" class="btn btn-success" name="button-${id}" 
                  id="button-${id}" 
                  onclick="click_template_dispatcher('${name}');">
                  Laudo
                </button>
              </div>
            `,
            description: content.template,
            src: ultrasound_icon
          }
          new_cards.push(card)
        }
      }

      if (new_cards.length > 0) {
        // calls func tha changes vue object
        collapsible_app.cards = new_cards
        setTimeout(function () { $('.form_select_init').formSelect() }, 500)
        setTimeout(function () { $('.collapsible').collapsible() }, 500)
      } else {
        collapsible_app.cards = []
      }
    },

    template_chosen: function (exam) {
      editor_insert_stuff(exam.body)
    }
  },

  components: { TemplateNav }
})

var descriptor_dialog = null
function descriptor_dialog_close () {
  if (descriptor_dialog) {
    descriptor_dialog.$destroy()
    descriptor_dialog.$el.parentElement.removeChild(descriptor_dialog.$el)
    descriptor_dialog = null
  }
}

const descriptor_search_input_changed = _.throttle(
  (event) => {
    v_descriptors_ul.search_expression = event.target.value
  },
  1000,
  {
    leading: false,
    trailing: true
  }
)

var template_save_dialog = null
function template_save_dialog_close () {
  if (template_save_dialog) {
    template_save_dialog.$destroy()
    template_save_dialog.$el.parentElement.removeChild(template_save_dialog.$el)
    template_save_dialog = null
  }
}

$(document).ready(function () {
  // $('.dropdown-trigger').dropdown({ constrainWidth: false })
  // $('.tabs').tabs()
  $('.form_select_init').formSelect()

  $('#descriptor_search_input').on('keyup', descriptor_search_input_changed)
})

function click_template_dispatcher (name) {
  submit_laudo[name](quill_comp.$refs.editor.editor)
}

export { click_template_dispatcher }
