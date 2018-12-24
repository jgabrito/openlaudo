import { Meteor } from 'meteor/meteor'
import Vue from 'vue/dist/vue.min.js'

import VueQuill from '../imports/startup/client/vue-quill/vue-quill.js'

Vue.use(VueQuill)

Meteor.startup(() => {
  import ('../imports/startup/client/sidebar.js').then(({click_template_dispatcher}) => {
    window.click_template_dispatcher = click_template_dispatcher
  })
})
