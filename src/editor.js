/* eslint no-unused-vars: "warn" */

import form_templates from './form_templates.js'
import templates from './templates.js'
import descriptors from './descriptors.js'

import { v_descriptors_ul } from './sidebar.js'

// function to search  descriptors
function myFunction () {
  var input, filter, ul, li, a, i
  input = document.getElementById('myInput')
  filter = input.value.toUpperCase()
  ul = document.getElementById('descriptors_ul')
  li = ul.getElementsByTagName('li')
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName('a')[0]
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = ''
    } else {
      li[i].style.display = 'none'
    }
  }
}

window.form_templates = form_templates
window.templates = templates
window.descriptors = descriptors
window.v_descriptors_ul = v_descriptors_ul
window.myFunction = myFunction
