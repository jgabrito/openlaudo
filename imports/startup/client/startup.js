import Vue from 'vue/dist/vue.min.js'
import VueMeteorTracker from 'vue-meteor-tracker'

Vue.use(VueMeteorTracker)

function load_main_window() {
  const promises = [
    import('./vue-quill/vue-quill.js').then((content) => {
      Vue.use(content.default)
    }),
    import('../../ui/components/MainWindow.vue').then(content => ({ MainWindow : content.default })),
  ]

  return Promise.all(promises)
    .then(results => results[1])
}

export { Vue, load_main_window }
