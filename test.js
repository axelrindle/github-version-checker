#!/usr/bin/env node
'use strict';

// register coffee-script
require('coffee-script/register');

// require modules
const chalk = require('chalk');
const versionCheck = require('./lib/main.coffee');

const currentVersion = require('./package.json').version;

// version check options
const options = {
  repo: 'axelrindle/boilernode', // the GitHub repo (required)
  currentVersion: currentVersion // your app's current version (required)
};
versionCheck(options, function (update) {
  if (update) { // true if update isn't null
    console.log(chalk.green.bold('Update found!'));
    console.log('');
    console.log(chalk.bold('Current version: ') + chalk.cyan.bold(currentVersion));
    console.log(chalk.bold('Latest version: ') + chalk.cyan.bold(update.tag_name.replace('v', '')));
    console.log(chalk.bold.underline(update.html_url));
    console.log('');
    console.log(chalk.bold('Please consider updating as soon as possible.'));
    console.log(chalk.cyan.bold('npm update -g my-app'));
    console.log('');
    console.log('------------------------------------------------------------');
    console.log('');
  }
});
