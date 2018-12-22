/* eslint no-unused-vars: "warn", "no-undef" : "warn", "no-new" : "warn" */
import Vue from 'vue'
import VueQuill from 'vue-quill'

import _ from 'lodash'

import { submit_laudo } from './click_templates.js'

import TemplateNav from './components/TemplateNav.vue'
import AssetList from './components/AssetList.vue'
import DescriptorDialog from './components/DescriptorDialog.js'
import * as db from './db.js'
import base_metadata from './base_metadata.js'
import ultrasound_icon from './assets/images/ultrasound_icon.png'

Vue.use(VueQuill)

const initial_modality = base_metadata.modalities['tc']
const initial_specialty = base_metadata.specialties['cep']

//  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL
//  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL

// this list determinates the tools that are displayed in the top tool bar of the editor
const toolbarOptions = [
  [{ 'font': [] }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  // ['blockquote', 'code-block'],

  // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
  // [{ 'direction': 'rtl' }],                         // text direction

  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
  [{ 'align': [] }],
  ['COPIAR']

  // ['clean']                                         // remove formatting button
]

// define function to run when 'COPIAR' tool is pressed
const myhandlers = { 'COPIAR': function () {
  // htmlStr = quill.root.innerHTML
  // textStr = quill.getText()

  copySelection()
} }

const quill_config = {
  modules: {
    toolbar: {
      container: toolbarOptions,
      handlers: myhandlers
    }
  },
  theme: 'snow'
}

// code that inserts the editor on the page
// TODO: move the editor to a Vue component to solve sizing issues.
const quill_comp = new Vue({
  el: '#editor',

  template: `
    <quill class="h-100" v-model="content" output="html" ref="editor" 
       v-bind:config="config" > 
    </quill>
  `,

  data: {
    content: '',
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

// inserts simple template to quill
// also changes clickable template that shows on the right
function format_template (exam) {
  const quill = quill_comp.$refs.editor.editor
  var techniqueTitle = ''
  var analysisTitle = ''
  if (exam.technique !== '') {
    techniqueTitle = '\nTécnica\n'
    analysisTitle = '\nAnálise\n'
  }
  var conclusaoTitle = ''
  if (exam.conc !== '') {
    conclusaoTitle = 'Conclusão\n'
  }

  quill.setContents([
    { insert: exam.title + '\n', attributes: { bold: true, align: 'center' } },
    { insert: techniqueTitle, attributes: { bold: true, align: 'justify' } },
    { insert: exam.technique + '\n' },
    { insert: analysisTitle, attributes: { bold: true, align: 'justify' } },
    { insert: exam.body + '\n\n', attributes: { align: 'justify' } },
    { insert: conclusaoTitle, attributes: { bold: true } },
    { insert: exam.conc }
  ])

  // change click form
  if (exam.name) {
    if (form_templates[exam.name]) {
      // if there is a clickable form with this exam.name in the form_templates.js file, render it

      // cover of the expansible box. has button to generate report
      div_tags =
          `<div class="fb-button form-group field-button-1540577184864 row"><div class="col-8">` + exam.nickname +
          `</div><div class=col"><button type="button" class="btn btn-success" name="button-1540577184864" style="success; float:right" id="button-1540577184864" onclick="submit_laudo.` + exam.name + `();event.stopPropagation();">Laudo</button></div>
          </div>`

      // calls func tha changes vue object
      collpasible_app.change_name(div_tags, form_templates[exam.name])
      setTimeout(function () { $('.form_select_init').formSelect() }, 500)
      // $("#form_div").html(form_templates[exam.name]);
      setTimeout(function () { $('.collapsible').collapsible() }, 500)
    } else {
      collpasible_app.change_name('<p>-</p>', '<p>-</p>')
    }
  }
}

// CLICKS CLICKS CLICKS
// CLICKS CLICKS CLICKS
// CLICKS CLICKS CLICKS

// inserts the collapsible menu where the clickable forms lie

$('#form_div').html()

const collpasible_app = new Vue({
  el: '#app',
  mounted: function () { $('.collapsible').collapsible() },
  data: {
    cards: [
      { title: '', src: ultrasound_icon, description: '' }
    ]
  },
  methods: {
    change_name: function (newTitle, newDescription) {
      this.cards[0].title = newTitle
      this.cards[0].description = newDescription
    }
  }
})

// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS
// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS
// DESCRIPTORS DESCRIPTORS DESCRIPTORS DESCRIPTORS

// insert descriptor in quill
function format_descriptor (descriptor) {
  const quill = quill_comp.$refs.editor.editor
  var selection = null
  try {
    selection = quill.getSelection()
  } catch (err) {
    quill.focusEditor()
    selection = quill.getSelection()
    console.warn(err)
  }

  quill.insertText((selection) ? selection.index : 0, descriptor.body)
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
      console.log('set_specialty:')
      console.log(new_specialty)
      this.specialty = new_specialty
    },
    set_modality: function (new_modality) {
      console.log('set_modality:')
      console.log(new_modality)
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
  data: {
    initial_modality,
    initial_specialty
  },
  methods: {
    format_template,
    set_specialty: v_descriptors_ul.set_specialty,
    set_modality: v_descriptors_ul.set_modality
  },
  template: `
    <TemplateNav template-dropdowns tabs
      v-bind:initial-modality="initial_modality" 
      v-bind:initial-specialty="initial_specialty"
      v-on:template-chosen="format_template" 
      v-on:specialty-changed="set_specialty"
      v-on:modality-changed="set_modality">
    </TemplateNav>
  `,
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

$(document).ready(function () {
  // $('.dropdown-trigger').dropdown({ constrainWidth: false })
  // $('.tabs').tabs()
  $('.form_select_init').formSelect()
  $('.fixed-action-btn').floatingActionButton()

  $('#descriptor_edit_button').on('click', function () {
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
    console.log(descriptor_dialog)
    descriptor_dialog.$refs.dialog.set_modality(v_descriptors_ul.modality)
    descriptor_dialog.$refs.dialog.set_specialty(v_descriptors_ul.specialty)
    descriptor_dialog.$refs.dialog.show()
  })

  $('#descriptor_search_input').on('keyup', descriptor_search_input_changed)
})

export { v_descriptors_ul }
