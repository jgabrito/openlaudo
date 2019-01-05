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
    },
    logout : function() {
      console.log('Logout called')
    }
  }
}

export { get_current_uid, userid_mixin }
