#!/usr/bin/env node
(async () => {

  // register coffeescript
  require('coffeescript/register');

  const versionCheck = require('../lib/main');
  const options = {
    token: require('./token'),
    repo: 'github-version-checker',
    owner: 'axelrindle',
    currentVersion: require('../package.json').version
  };

  try {
    update = await versionCheck(options);
    if (update) { // update is null if there is no update available, so check here
      console.log("An update is available! " + update.name);
      console.log("You are on version " + options.currentVersion + "!");
    } else {
      console.log("You are up to date.");
    }
  } catch (e) {
    console.error(e);
  }
})();
