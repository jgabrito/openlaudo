<template>
  <a href='#!' class="dropdown-trigger" v-bind:data-target="target"
    v-on:click="$emit('click')">
    {{textContent}}
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: [ 'target', 'textContent' ],

  mounted: function () {
    this.$nextTick(function () {
      console.log('DropdownTrigger.nexttick:')
      console.log(this.$el)
      this._dropdown = new window.M.Dropdown(this.$el, { constrainWidth: false })
    })
  },

  beforeDestroy: function () {
    if (this._dropdown) {
      this._dropdown.destroy()
      this._dropdown = null
    }
  }
}
</script>
