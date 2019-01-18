
import materialize_mixin from './materialize_mixin.js'

export default {
  data: function () {
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
      }
    }
  },

  props: {
    modal: Boolean,
    showOnCreate : {
      type : Boolean,
      default : function () { return false }
    }
  },

  methods: {
    show: function () {
      if (this.modal) {
        return this.get_mounted_promise().then(() => {
          this.get_instances('modal')[0].open()
        })
      }
    },

    hide: function () {
      if (this.modal) {
        return this.get_mounted_promise().then(() => {
          this.get_instances('modal')[0].close()
        })
      }
    }
  },

  mounted : function() {
    if (this.showOnCreate) {
      this.show()
    }
  },

  mixins: [ materialize_mixin ]
}
