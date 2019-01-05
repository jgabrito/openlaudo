
import { Meteor } from 'meteor/meteor'

const get_current_uid = function() {
  return Meteor.userId()
}

const providers = {
  google : {
    text : 'Login com Google',
    _provider : Meteor.loginWithGoogle,
    _provider_data : { }
  },
  facebook : {
    text : 'Login com Facebook',
    _provider : Meteor.loginWithFacebook,
    _provider_data : {
      requestPermissions: ['public_profile', 'email']
    }
  }
}

const provider_names = [ 'google', 'facebook' ]

const userid_mixin = {
  data : function() {
    return {
      login_providers : providers,
      login_provider_names : provider_names
    }
  },

  methods : {
    login : function(provider_name) {
      const provider = providers[provider_name]
      if (provider === undefined) {
        throw new Error(`Unknown login provider: ${provider_name}`);
      }

      provider._provider(provider._provider_data, (err) => {
        if (err) {
          console.log(`Login failed for provider ${provider_name}: ${err}`)
        }
      })
    },

    logout : function() {
      Meteor.logout()
    }
  },

  meteor : {
    user_id : function() {
      return Meteor.userId();
    }
  }
}

export { get_current_uid, userid_mixin }
