import Vue from 'vue/dist/vue.min.js'
import VueMeteorTracker from 'vue-meteor-tracker'

Vue.use(VueMeteorTracker)

function load_main_window() {
  const promises = [
    import('./load_quill_stuff.js').then((content) => {
      Vue.use(content.VueQuill)
    }),
    import('../../ui/components/MainWindow.vue').then(content => ({ MainWindow : content.default })),
  ]

  return Promise.all(promises)
    .then(results => results[1])
}

export { Vue, load_main_window }
