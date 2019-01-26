import Quill from 'quill'
import VueQuill from './vue-quill/vue-quill.js'
import HookableMention from './quill-mention/src/hookable.mention.js'
import './quill_mention.css'

Quill.register('modules/mention', HookableMention)

export { VueQuill }
