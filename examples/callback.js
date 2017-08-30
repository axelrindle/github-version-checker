#!/usr/bin/env node
'use strict'

// register coffeescript
require('coffeescript/register')

const versionCheck = require('../lib/main')
const options = {
  repo: 'axelrindle/github-version-checker',
  currentVersion: require('../package.json').version
}

versionCheck(options, function (update, error) {
  if (error) {
    console.error(error);
    process.exit(-1)
  }

  if (update) {
    console.log("An update is available! " + update.tag_name);
    console.log("You are on version " + options.currentVersion + "!");
  } else {
    console.log("You are up to date.");
  }
})
