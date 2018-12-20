
import materialize_mixin from './materialize_mixin.js'

export default {
  data : function() {
    return {
      materialize_recursive: false,
      materialize_classes: [ 'modal' ],
      materialize_options: {
        modal: {
          onCloseEnd: () => {
            this.$emit('close')
          },
          dismissible: true
        }
      },
    }
  },
  
  props : {
    modal: Boolean,
  },

  methods : {
    show: function () {
      if (this.modal) return this.get_mounted_promise().then(() => {
        this.get_instances('modal')[0].open()
      })
    },

    hide: function () {
      if (this.modal) return this.get_mounted_promise().then(() => {
        this.get_instances('modal')[0].close()
      })
    },

  },

  mixins : [ materialize_mixin ]
}
