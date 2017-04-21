#!/usr/bin/env node
'use strict';

// register coffee-script
require('coffee-script/register');

// require modules
const versionCheck = require('../lib/main.coffee');
const assert = require('assert');

const options = {
  repo: 'axelrindle/github-version-checker',
  currentVersion: "1.0.0"
};

describe('github-version-checker', function () {
  describe('#versionCheck with two parameters', function () {
    it('should return null', function () {
      assert.equal(versionCheck(options, function(update, error) {}), null);
    });
  });
});

describe('github-version-checker', function () {
  describe('#versionCheck with only one options parameter', function () {
    it('should return a Promise', function () {
      assert.equal(typeof versionCheck(options).then, 'function');
    });
  });
});
