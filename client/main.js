import { Meteor } from 'meteor/meteor'
import Vue from 'vue/dist/vue.min.js'
import VueMeteorTracker from 'vue-meteor-tracker'

Vue.use(VueMeteorTracker)

Meteor.startup(() => {
  import('../imports/startup/client/sidebar.js').then(( { click_template_dispatcher } ) => {
    window.click_template_dispatcher = click_template_dispatcher
  })
})
