#!/usr/bin/env node
'use strict';

// require modules
const versionCheck = require('../');

const options = {
  token: process.env.GITHUB_API_TOKEN,
  repo: 'github-version-checker',
  owner: 'axelrindle',
  currentVersion: require('../package.json').version
};

describe('github-version-checker', function () {
  describe('#versionCheck with one parameter and correct options', function () {
    it('should resolve without errors', function (done) {
      versionCheck(options)
        .then(function (update) {
          done();
        })
        .catch(function (err) {
          done(new Error(err));
        });
    });
  });
});
