import { Meteor } from 'meteor/meteor';

import configServices from '../imports/startup/server/config_services.js';
import { db_ready_promise } from '../imports/api/db.js'

Meteor.startup(() => {
  // code to run on server at startup
  configServices();
  db_ready_promise();
});
