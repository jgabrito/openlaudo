<template>
  <a v-if="textContent !== null" href='#!' class="dropdown-trigger" v-bind:data-target="target"
    v-on:click="$emit('click')">
    {{textContent}}
    <slot></slot>
  </a>
  <div v-else href='#!' class="dropdown-trigger" v-bind:data-target="target">
    <slot name="content"></slot>
    <slot name="items"> </slot>
  </div>
</template>

<script>

import materialize_mixin from './mixins/materialize_mixin.js'

export default {
  data: function () {
    return {
      materialize_recursive: false,
      materialize_classes: [ 'dropdown' ]
    }
  },

  props: [ 'target', 'textContent' ],

  mixins: [ materialize_mixin ]
}
</script>
