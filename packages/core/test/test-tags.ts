import test from 'ava'
import versionCheck from '../src/index'

test('fetching tags returns a more lightweight schema', async t => {
    const { type, update } = await versionCheck({
        owner: 'axelrindle',
        repo: 'github-version-checker',
        currentVersion: '0.0.1',
        fetchTags: true,
        forceRest: true,
    })

    t.is(type, 'tags')
    t.truthy(update)
    t.is(Object.keys(update).length, 1)
    t.is(Object.keys(update)[0], 'name')
})
