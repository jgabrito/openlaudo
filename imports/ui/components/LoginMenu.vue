<template>
  <DropdownTrigger
    v-if="login_provider_names.length > 0"
    :text-content="null"
    target="login_widget_dropdown"
  >
    <ul
      v-if="user_id === null"
      id="login_widget_dropdown"
      slot="items"
      class="dropdown-content"
    >
      <li
        v-for="name in login_provider_names"
        :key="name"
      >
        <a
          href="#!"
          @click="$root.$emit('login',name)"
        >
          {{ login_providers[name].text }}
        </a>
      </li>
    </ul>
    <ul
      v-else
      id="login_widget_dropdown"
      slot="items"
      class="dropdown-content"
    >
      <a
        href="#!"
        @click="$root.$emit('logout')"
      >
        Logout
      </a>
    </ul>
    <a
      slot="content"
      class="btn-flat"
    >
      <span class="material-icons md-18">
        menu
      </span>
    </a>
  </DropdownTrigger>
</template>

<script>

import { userid_mixin } from '../../api/user.js'
import DropdownTrigger from './DropdownTrigger.vue'

export default {

  components : { DropdownTrigger },

  mixins : [ userid_mixin ],
  data : function() {
    return {
    }
  }
}

</script>
