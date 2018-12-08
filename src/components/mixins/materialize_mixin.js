
/*
  Mixin to perform materialize initializations and destruction on a per-component basis
*/

export default {
  data: function () {
    return {
      materialize_recursive: false,
      materialize_classes: [],
      materialize_M: window.M
    }
  },

  mounted: function () {
    this.$nextTick(function () {
      const _do_initialize_tag = (ControlClass, name, options) => {
        if (this.$el.tagName === name) 
          this._materialize_controls.push(new ControlClass(this.$el, options))
        if (this.materialize_recursive) {
          let elems = this.$el.getElementsByTagName(name)
          for (let i = 0; i < elems.length; i++) { 
            let instance = new ControlClass(elems[i], options)
            if (instance) this._materialize_controls.push(instance) 
          }
        }
      }

      const _do_initialize_class = (ControlClass, name, options) => {
        if (this.$el.classList.contains(name))
          this._materialize_controls.push(new ControlClass(this.$el, options))
        if (this.materialize_recursive) {
          let elems = this.$el.getElementsByClassName(name)
          for (let i = 0; i < elems.length; i++) { 
            let instance = new ControlClass(elems[i], options)
            if (instance) this._materialize_controls.push(instance) 
          }
        }
      }

      if (!this._materialize_controls) this._materialize_controls = []

      if (this.materialize_classes.includes('select')) 
        _do_initialize_tag(this.materialize_M.FormSelect, 'select', {})

      if (this.materialize_classes.includes('dropdown')) 
        _do_initialize_class(this.materialize_M.Dropdown, 'dropdown-trigger', 
          { constrainWidth: false })

      if (this.materialize_classes.includes('tabs')) 
        _do_initialize_class(this.materialize_M.Tabs, 'tabs', {})

      if (this.materialize_classes.includes('modal')) 
        _do_initialize_class(this.materialize_M.Modal, 'modal', {})
    })
  },

  beforeDestroy: function () {
    if (this._materialize_controls) {
      for (let i = 0; i < this._materialize_controls.length; i++) { this._materialize_controls[i].destroy() }
      delete this._materialize_controls
    }
  }
}
