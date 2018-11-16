<template>
  <a href="#!" class="dropdown-trigger" v-bind:data-target="target" v-bind:name="name"
    v-on:click="$emit('trigger-selected')">
    {{textContent}}
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: [ 'target', 'name', 'textContent' ],

  mounted: function () {
    this.$nextTick(function () {
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
