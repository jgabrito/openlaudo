/* eslint no-unused-vars: "warn", "no-undef" : "warn", "no-new" : "warn" */

import { submit_laudo } from './click_templates.js'
import templates from './templates.js'
import descriptors from './descriptors.js'
import Vue from 'vue'

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
  htmlStr = quill.root.innerHTML
  textStr = quill.getText()

  copySelection()
} }

// code that inserts the editor on the page
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
function format_template (exam, usg) {
  var tecniqueTitle = ''
  var analysisTitle = ''
  if (exam.tecnique) {
    tecniqueTitle = '\nTécnica\n'
    analysisTitle = '\nAnálise\n'
  }
  var conclusaoTitle = ''
  if (usg) {
    conclusaoTitle = 'Conclusão\n'
  }

  quill.setContents([
    { insert: exam.title + '\n', attributes: { bold: true, align: 'center' } },
    { insert: tecniqueTitle, attributes: { bold: true, align: 'justify' } },
    { insert: exam.tecnique + '\n' },
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

// TOP MENU TOP MENU TOP MENU TOP MENU
// TOP MENU TOP MENU TOP MENU TOP MENU
// TOP MENU TOP MENU TOP MENU TOP MENU

// TRIGGERS TRIGGERS TRIGGERS
// TRIGGERS TRIGGERS TRIGGERS
// These buttons correspond to the specialties inside each modality. When a modality button is clicked, these specialties are updated on the top most menu bar

new Vue({
  el: '#usg_triggers',
  data: {
    modality: templates.usg.specialties
  },
  methods: {
    change_specialty: function (specialty) {
      v_descriptors_ul.set_specialty(specialty)
    }
  }

})

new Vue({
  el: '#tc_triggers',
  data: {
    modality: templates.tc.specialties
  },
  methods: {
    change_specialty: function (specialty) {
      v_descriptors_ul.set_specialty(specialty)
    }
  }

})

new Vue({
  el: '#rm_triggers',
  data: {
    modality: templates.rm.specialties
  },
  methods: {
    change_specialty: function (specialty) {
      v_descriptors_ul.set_specialty(specialty)
    }
  }

})

// DROPDOWNDS DROPDOWNDS DROPDOWNDS
// DROPDOWNDS DROPDOWNDS DROPDOWNDS

// these are the menus that drop down with the report titles for each specialty
// when clicked, they insert the template to the quill editor

new Vue({
  el: '#usg_dropdowns',
  data: {
    modality: templates.usg.specialties
  },
  methods: {
    html_format_template: function (exam) {
      format_template(exam, true)
    }
  }
})

new Vue({
  el: '#tc_dropdowns',
  data: {
    modality: templates.tc.specialties
  },
  methods: {
    html_format_template: function (exam) {
      format_template(exam, false)
    }
  }
})

new Vue({
  el: '#rm_dropdowns',
  data: {
    modality: templates.rm.specialties
  },
  methods: {
    html_format_template: function (exam) {
      format_template(exam, false)
    }
  }
})

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
      { title: '', src: '/images/ultrasound_icon.png', description: '' }
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
function format_descriptor (text) {
  try {
    selectionIndex = quill.getSelection().index
  } catch (err) {
    quill.focus()
    selectionIndex = quill.getSelection().index
    console.warn(err)
  }

  quill.insertText(selectionIndex, text)
}

// vue
const v_descriptors_ul = new Vue({
  el: '#descriptors_ul',
  data: {
    selected_modality: 'usg',
    selected_specialty: 'cep',
    v_descriptors: descriptors.cep.modalities.tc.findings
  },

  methods: {

    format_descriptor: format_descriptor,

    set_modality: function (new_modality) {
      this.selected_modality = new_modality
      this.v_descriptors = descriptors[this.selected_specialty].modalities[this.selected_modality].findings
    },

    set_specialty: function (new_specialty) {
      this.selected_specialty = new_specialty
      this.v_descriptors = descriptors[this.selected_specialty].modalities[this.selected_modality].findings
    },

    nl2br: function (text) {
      return nl2br(text)
    }

  }

})

// function to update v_descriptors_ul vue
function update_descriptors (specific_descriptors) {
  v_descriptors_ul.v_descriptors = specific_descriptors
}

$(document).ready(function () {
  $('.dropdown-trigger').dropdown({ constrainWidth: false })
  $('.tabs').tabs()
  $('.form_select_init').formSelect()
})

function nl2br (str, is_xhtml) {
  if (typeof str === 'undefined' || str === null) {
    return ''
  }
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>'
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
}

export { v_descriptors_ul }
