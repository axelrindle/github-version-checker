#!/usr/bin/env node
'use strict'

// register coffeescript
require('coffeescript/register')

const versionCheck = require('../lib/main')
const options = {
  repo: 'axelrindle/github-version-checker',
  currentVersion: require('../package.json').version
}

versionCheck(options).then(function (update) {
  if (update) { // update is null if there is no update available, so check here
    console.log("An update is available! " + update.tag_name)
    console.log("You are on version " + options.currentVersion + "!")
  } else {
    console.log("You are up to date.");
  }
}).catch(function (error) {
  console.error(error)
})
