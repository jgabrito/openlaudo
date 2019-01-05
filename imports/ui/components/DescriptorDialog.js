
import AssetDialog from './AssetDialog.vue'
import DescriptorEditor from './DescriptorEditor.vue'

import { descriptor_interface } from './asset_interfaces.js'

export default {
  data: function () {
    return {
      asset_interface: descriptor_interface
    }
  },

  components: {
    AssetEditor: DescriptorEditor
  },

  mixins: [ AssetDialog ]
}
