// require modules
/** @type {import('ava').TestInterface} */
const test = require('ava');
const versionCheck = require('../');

test('fetching tags returns a more lightweight schema', async t => {
	const update = await versionCheck({
		token: null,
		owner: 'axelrindle',
		repo: 'github-version-checker',
		currentVersion: '0.0.1',
		fetchTags: true
	});
	
	t.truthy(update);
	t.is(Object.keys(update).length, 1);
	t.is(Object.keys(update)[0], 'name');
});
