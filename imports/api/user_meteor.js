
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

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
      login_provider_names : provider_names,
      user_id : null,
    }
  },

  methods : {
    login : function(provider_name) {
      const provider = providers[provider_name]
      if (provider === undefined) {
        throw new Error(`Unknown login provider: ${provider_name}`);
      }

      this.login_called().then((proceed) => {
        if (!proceed) return

        provider._provider(provider._provider_data, (err) => {
          if (err) {
            console.log(`Login failed for provider ${provider_name}: ${err}`)
          }
        })
      })
    },

    logout : function() {
      this.logout_called().then((proceed) => {
        if (!proceed) return
        Meteor.logout()
      })
    },

    login_called : function() {
      return Promise.resolve(true)
    },

    logout_called : function() {
      return Promise.resolve(true)
    }
  },

  created : function() {
    this._tracker = Tracker.autorun(() => {
      const user_id = Meteor.userId()
      this.user_id = user_id
    })
  }
}

export { get_current_uid, userid_mixin }
