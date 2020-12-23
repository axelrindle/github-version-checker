// require modules
const versionCheck = require('../');
const test = require('ava');

const options = {
  repo: 'github-version-checker',
  owner: 'axelrindle',
  currentVersion: require('../package.json').version
};

test('one parameter returns a promise', t => {
  const promise = versionCheck(options);
  t.false(promise == null);
  t.true(promise instanceof Promise);
});

test('two parameters return a null', t => {
  const nothing = versionCheck(options, (error, update) => {});
  t.true(nothing === null);
});