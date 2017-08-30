#!/usr/bin/env node
'use strict';

// register coffee-script
require('coffeescript/register');

// require modules
const versionCheck = require('../lib/main.coffee');
const assert = require('assert');

const options = {
  repo: 'axelrindle/github-version-checker',
  currentVersion: require('../package.json').version
};

describe('github-version-checker', function () {
  describe('#versionCheck with one parameter and correct options', function () {
    it('should resolve the Promise without errors', function () {
      versionCheck(options).then(
        function (update) {
          assert.notEqual(update, undefined);
        },
        function (error) {
          throw error;
        }
      );
    });
  });
});
