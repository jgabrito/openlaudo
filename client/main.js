import { Meteor } from 'meteor/meteor'
import { get_default_specialty_modality_pair } from '../imports/api/base_metadata.js'

let MyVue
let main_window

Meteor.startup(() => {
  const el = document.getElementById('root')

  import('../imports/startup/client/startup.js').then(({ Vue, load_main_window }) => {
    // TODO: here Vue could be used to render some fancier intermediate screen
    MyVue = Vue
    el.innerHTML = '<div><p> Carregando... 50% </p></div>'
    return load_main_window()
  })
    .then(({ MainWindow }) => {
      const modspec = get_default_specialty_modality_pair(true)
      // Show the main App window in its full splendour
      main_window = new MyVue({
        el,
        template : `
        <MainWindow 
          v-bind:initial-modality="modality"
          v-bind:initial-specialty="specialty"
          v-bind:local-vue="local_vue"
        >
        </MainWindow>
      `,
        data : {
          modality : modspec.modality,
          specialty : modspec.specialty,
          local_vue : MyVue
        },
        components: { MainWindow }
      })
    })
    .catch((err) => {
      el.innerHTML = '<p> Erro carregando componentes básicos. Recarregue por favor. </p>'
      console.log(err)
    })
})
