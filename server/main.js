import { Meteor } from 'meteor/meteor';

import configServices from '../imports/startup/server/config_services.js';

Meteor.startup(() => {
  // code to run on server at startup
  configServices();
});
