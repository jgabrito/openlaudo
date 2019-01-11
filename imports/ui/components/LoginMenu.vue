<template>
  <DropdownTrigger v-if="login_provider_names.length > 0"
    v-bind:text-content="null" target="login_widget_dropdown">
    <ul v-if="user_id === null" id="login_widget_dropdown" slot="items" 
      class="dropdown-content">
      <li v-for="name in login_provider_names" v-bind:key="name">
        <a href="#!" v-on:click="login(name)"> {{ login_providers[name].text }} </a>
      </li>
    </ul>
    <ul v-else id="login_widget_dropdown" slot="items"
      class="dropdown-content">
        <a href="#!" v-on:click="logout"> Logout </a>
    </ul>
    <a class="btn-flat" slot="content" > 
      <span class="material-icons md-18">menu</span> 
    </a>
  </DropdownTrigger>
</template>

<script>

import { userid_mixin } from '../../api/user.js'
import DropdownTrigger from './DropdownTrigger.vue'

export default {
  data : function() {
    return {
    }
  },

  components : { DropdownTrigger },

  mixins : [ userid_mixin ]
}

</script>