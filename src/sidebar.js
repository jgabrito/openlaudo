/* eslint no-unused-vars: "warn", "no-undef" : "warn", "no-new" : "warn" */
import Vue from 'vue'

import { submit_laudo } from './click_templates.js'

import TemplateNav from './components/TemplateNav.vue'
import AssetList from './components/AssetList.vue'
import DescriptorDialog from './components/descriptor_dialog.js'
import * as db from './db.js'
import base_metadata from './base_metadata.js'
import ultrasound_icon from './assets/images/ultrasound_icon.png'

const initial_modality = base_metadata.modalities['tc']
const initial_specialty = base_metadata.specialties['cep']

//  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL
//  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL  QUILL

// this list determinates the tools that are displayed in the top tool bar of the editor
var toolbarOptions = [
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

// code that inserts the editor on the page
// TODO: move the editor to a Vue component to solve sizing issues.
var quill = new Quill('#editor', {
  modules: {
    toolbar: {
      container: toolbarOptions,
      handlers: myhandlers
    }
  },
  theme: 'snow'
})

// function to copy content
function copySelection () {
  var len = quill.getLength()
  quill.setSelection(0, len)
  document.execCommand('copy')
  quill.setSelection(len, len)
}

// inserts simple template to quill
// also changes clickable template that shows on the right
function format_template (exam) {
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
  var selection = null
  try {
    selection = quill.getSelection()
  } catch (err) {
    quill.focus()
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
    descriptor_interface
  },

  template: `
    <AssetList expanded v-bind:modality="modality" v-bind:specialty="specialty"
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
/*  if (descriptor_dialog) {
    descriptor_dialog.destroy(true)
    descriptor_dialog = null
  } */
}

$(document).ready(function () {
  // $('.dropdown-trigger').dropdown({ constrainWidth: false })
  // $('.tabs').tabs()
  $('.form_select_init').formSelect()
  $('.fixed-action-btn').floatingActionButton()

  $('#descriptor_edit_button').on('click', function () {
    var el = document.createElement('div')
    document.body.appendChild(el)
    if (!descriptor_dialog) {
      descriptor_dialog = new DescriptorDialog(el, v_descriptors_ul.modality, v_descriptors_ul.specialty, { close: descriptor_dialog_close })
    }
    descriptor_dialog.set_modality(v_descriptors_ul.modality)
    descriptor_dialog.set_specialty(v_descriptors_ul.specialty)
    descriptor_dialog.show()
  })
})

export { v_descriptors_ul }
