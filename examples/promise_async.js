#!/usr/bin/env node
(async () => {

  // register coffeescript
  require('coffeescript/register')

  const versionCheck = require('../lib/main')
  const options = {
    repo: 'axelrindle/github-version-checker',
    currentVersion: require('../package.json').version
  }

  try {
    update = await versionCheck(options)
    if (update) { // update is null if there is no update available, so check here
      console.log("An update is available! " + update.tag_name)
      console.log("You are on version " + options.currentVersion + "!")
    }
  } catch (e) {
    console.error(e);
  }
})()
