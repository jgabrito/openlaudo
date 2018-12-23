/* eslint no-unused-vars: "warn" */

import Vue from 'vue'
import VueQuill from 'vue-quill'

import form_templates from './form_templates.js'
import { base_templates as templates } from './templates.js'
import { base_descriptors as descriptors } from './descriptors.js'

import { v_descriptors_ul, click_template_dispatcher } from './sidebar.js'

Vue.use(VueQuill)

window.form_templates = form_templates
window.templates = templates
window.descriptors = descriptors
window.v_descriptors_ul = v_descriptors_ul
window.click_template_dispatcher = click_template_dispatcher
