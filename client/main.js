import { Meteor } from 'meteor/meteor'
import { get_default_specialty_modality_pair } from '../imports/api/base_metadata.js'

let Vue
let MainWindow
let main_window

Meteor.startup(() => {
  const el = document.getElementById('root')

  const load_promises = []
  let resolved_count = 0

  const document_resource_checker_factory = (name) => {
    return new Promise((resolve, reject) => {
      const me = setInterval(
        () => {
          const resource = document[name]
          if (resource !== undefined) {
            if (resource.error) {
              reject()
            }
            else {
              resolve()
            }
            clearInterval(me)
          }
        },
        500
      )
    })
    .then(() => {
      resolved_count += 1
    })
  } 

  load_promises.push(document_resource_checker_factory('roboto_css'))
  load_promises.push(document_resource_checker_factory('material_icons_css'))
  load_promises.push(
    import('../imports/startup/client/startup.js').then((content) => {
      Vue = content.Vue
      const { load_main_window } = content
  
      // TODO: here Vue could be used to render some fancier intermediate screen
      load_promises.push(load_main_window().then((content) => {
        MainWindow = content.MainWindow
        resolved_count += 1     
      }))

      resolved_count += 1
    })
  )

  const promise_checker_factory = () => {
    return Promise.all(Array.from(load_promises))
      .then(() => {
        if (resolved_count < load_promises.length) {
          return promise_checker_factory()
        }
      })
  }
  
  promise_checker_factory().then(() => {
    // Show the main App window in its full splendour
    const modspec = get_default_specialty_modality_pair(true)
    main_window = new Vue({
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
        local_vue : Vue
      },
      components: { MainWindow }
    })
  })
  .catch (() => {
    el.innerHTML = '<p> Erro carregando componentes básicos. Recarregue por favor. </p>'
    console.log(err)
  })
  
  const me = setInterval(
    () => {
      if (resolved_count >= load_promises.length) {
        clearInterval(me)
        return
      }
      const progress = 100.0  * resolved_count / load_promises.length
      el.innerHTML = `<div><p>Carregando... ${progress.toFixed(0)}% </p></div>`
    },
    200
  )
})
