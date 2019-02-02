// Dummy user interface

import { get_system_uid } from './db.js'

const get_current_uid = () => 'USER'

const userid_mixin = {
  data : function() {
    return {
      user_id : get_system_uid(),
      login_providers : {},
      provider_names : [],
    }
  },

  methods : {
    login : function() {
      console.log('Login called')
      this.login_called()
    },
    logout : function() {
      console.log('Logout called')
      this.logout_called()
    },

    login_called : function() {
      return Promise.resolve(true)
    },

    logout_called : function() {
      return Promise.resolve(true)
    }
  }
}

export { get_current_uid, userid_mixin }
