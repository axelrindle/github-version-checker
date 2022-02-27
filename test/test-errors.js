// require modules
/** @type {import('ava').TestInterface} */
const test = require('ava');
const versionCheck = require('../');

test('fails when trying to exclude pre-releases in the graphql call', async t => {
	await t.throwsAsync(async () => {
		await versionCheck({
			token: 'hello there',
			owner: 'axelrindle',
			repo: 'github-version-checker',
			currentVersion: '0.0.1',
			excludePrereleases: true
		});
	});
});
