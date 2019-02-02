import Quill from 'quill'
import VueQuill from './vue-quill/vue-quill.js'
import HookableMention from './hookable_mention.js'
import './quill_mention.css'

Quill.register('modules/mention', HookableMention)

export { VueQuill }
