
import AssetDialog from './AssetDialog.vue'
import DescriptorEditor from './DescriptorEditor.vue'
import * as db from '../db.js'

const descriptor_interface = {
  get_title: (a) => (a.title),
  get_body: (a) => (a.body),
  sort_key: 'title',
  find_assets: function (selector, options, search_expression) {
    return db.find_descriptors(selector, options, search_expression)
  },
  upsert_assets: function (docs) {
    return db.upsert_descriptors(docs)
  }
}

export default {
  data : function() {
    return {
      asset_interface : descriptor_interface,
    }
  },

  components : {
    AssetEditor : DescriptorEditor,
  },
  
  mixins : [ AssetDialog ],
}
