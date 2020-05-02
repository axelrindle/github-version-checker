// require modules
const versionCheck = require('../');
const assert = require('assert');

const options = {
  repo: 'github-version-checker',
  owner: 'axelrindle',
  currentVersion: require('../package.json').version
};

describe('#versionCheck with two parameters', function () {
  it('should return null', function (done) {
    assert.equal(versionCheck(options, function(update, err) {
      if (err) done(new Error(err));
      else done();
    }), null);
  });
});

describe('#versionCheck with only one options parameter', function () {
  it('should return a Promise', function () {
    assert.equal(typeof versionCheck(options).then, 'function');
  });
});
