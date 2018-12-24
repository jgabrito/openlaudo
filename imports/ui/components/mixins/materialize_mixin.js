
/*
  Mixin to perform materialize initializations and destruction on a per-component basis
*/

export default {
  data: function () {
    return {
      materialize_recursive: false,
      materialize_classes: [],
      materialize_options: {
        dropdown: { constrainWidth: false },
        modal: {
          dismissible: true
        },
        select: {},
        tabs: {}
      },
      materialize_M: window.M
    }
  },

  methods: {
    get_instances: function (classname) {
      const name_to_class = {
        'select': this.materialize_M.FormSelect,
        'tabs': this.materialize_M.Tabs,
        'modal': this.materialize_M.Modal,
        'dropdown': this.materialize_M.Dropdown
      }
      return this._materialize_controls.filter((c) => (c instanceof name_to_class[classname]))
    },

    resize_textareas: function () {
      if (!this.$el) return

      if (this.$el.tagName === 'textarea') { this.materialize_M.textareaAutoResize(this.$el) }
      if (this.materialize_recursive) {
        let elems = this.$el.getElementsByTagName('textarea')
        for (let i = 0; i < elems.length; i++) {
          this.materialize_M.textareaAutoResize(elems[i])
        }
      }
    },

    get_mounted_promise: function () {
      return this._mounted_promise
    },

    schedule_reinit: function () {
      this.get_mounted_promise().then(() => {
        this.$nextTick(() => {
          this.init_components()
        })
      })
    },

    init_components: function () {
      const _do_initialize_tag = (ControlClass, name, options) => {
        if (this.$el.tagName === name) { this._materialize_controls.push(new ControlClass(this.$el, options)) }
        if (this.materialize_recursive) {
          let elems = this.$el.getElementsByTagName(name)
          for (let i = 0; i < elems.length; i++) {
            let instance = new ControlClass(elems[i], options)
            if (instance) this._materialize_controls.push(instance)
          }
        }
      }

      const _do_initialize_class = (ControlClass, name, options) => {
        if (this.$el.classList.contains(name)) { this._materialize_controls.push(new ControlClass(this.$el, options)) }
        if (this.materialize_recursive) {
          let elems = this.$el.getElementsByClassName(name)
          for (let i = 0; i < elems.length; i++) {
            let instance = new ControlClass(elems[i], options)
            if (instance) this._materialize_controls.push(instance)
          }
        }
      }

      if (!this._materialize_controls) this._materialize_controls = []

      if (this.materialize_classes.includes('select')) {
        _do_initialize_tag(this.materialize_M.FormSelect, 'select', this.materialize_options['select'])
      }

      if (this.materialize_classes.includes('dropdown')) {
        _do_initialize_class(this.materialize_M.Dropdown, 'dropdown-trigger',
          this.materialize_options['dropdown'])
      }

      if (this.materialize_classes.includes('tabs')) {
        _do_initialize_class(this.materialize_M.Tabs, 'tabs',
          this.materialize_options['tabs'])
      }

      if (this.materialize_classes.includes('modal')) {
        _do_initialize_class(this.materialize_M.Modal, 'modal',
          this.materialize_options['modal'])
      }

      if (this.materialize_classes.includes('textarea')) this.resize_textareas()
    }
  },

  beforeCreate: function () {
    this._mounted_promise = new Promise((resolve) => {
      this._mounted_promise_resolve = resolve
    })
  },

  mounted: function () {
    this.$nextTick(function () {
      this.init_components()
      this._mounted_promise_resolve()
    })
  },

  beforeDestroy: function () {
    // Check for possible memory leaks
    /* if (this._materialize_controls) {
      for (let i = 0; i < this._materialize_controls.length; i++) { this._materialize_controls[i].destroy() }
      delete this._materialize_controls
    } */
  }
}
