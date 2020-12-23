// require modules
const test = require('ava');
const versionCheck = require('../');

const options = {
  token: process.env.GITHUB_API_TOKEN,
  repo: 'github-version-checker',
  owner: 'axelrindle',
  currentVersion: require('../package.json').version
};

test('one parameter and correct options returns without errors', t => {
  t.notThrows(() => {
    versionCheck(options)
      .then(update => {
        t.true(update !== undefined);
        t.true(update !== null);
        t.is(update.name, 'axelrindle/github-version-checker');
      });
  });
});

test('fails without options', async t => {
  const error = await t.throwsAsync(async () => {
    await versionCheck(null);
  });
  t.is(error.message, 'options object must not be null or undefined!');

  const error2 = await t.throwsAsync(async () => {
    await versionCheck();
  });
  t.is(error2.message, 'options object must not be null or undefined!');
});

test('fails with invalid options', async t => {
  const opts1 = Object.assign({}, options);
  delete opts1.repo;
  try {
    await versionCheck(opts1);
  } catch (e) {
    t.is(e, 'no repository specified');
  }

  const opts2 = Object.assign({}, options);
  delete opts2.owner;
  try {
    await versionCheck(opts2);
  } catch (e) {
    t.is(e, 'no owner specified');
  }

  const opts3 = Object.assign({}, options);
  delete opts3.currentVersion;
  try {
    await versionCheck(opts3);
  } catch (e) {
    t.is(e, 'no current version given');
  }
});