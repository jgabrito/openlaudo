
import { Meteor } from 'meteor/meteor'
import { ServiceConfiguration } from 'meteor/service-configuration'

const configServices =  function() {
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        clientId: Meteor.settings.google.clientId,
        secret: Meteor.settings.google.secret,
        loginStyle: 'popup',
      }
    }
  )

  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        appId: Meteor.settings.facebook.clientId,
        secret: Meteor.settings.facebook.secret,
        loginStyle: 'popup',
      }
    }
  )
}

export default configServices;
