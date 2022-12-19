import test from 'ava'
import versionCheck from '../src/index'
import { ReleaseDescriptor } from '../src/types'

if (! process.env['GITHUB_TOKEN']) {
    throw new Error('No GITHUB_TOKEN specified!')
}

const opts = {
    owner: 'axelrindle',
    repo: 'github-version-checker',
    currentVersion: '0.0.1'
}

test('graphql returns the same releases answer as rest', async (t) => {
    const responseGraphql = await versionCheck(opts) as ReleaseDescriptor
    t.not(responseGraphql, undefined)

    const responseRest = await versionCheck({ token: false, ...opts }) as ReleaseDescriptor
    t.not(responseRest, undefined)

    t.deepEqual(responseRest, responseGraphql)
})

test('graphql returns the same tags answer as rest', async (t) => {
    const responseGraphql = await versionCheck({ fetchTags: true, ...opts }) as ReleaseDescriptor
    t.not(responseGraphql, undefined)

    const responseRest = await versionCheck({ token: false, fetchTags: true, ...opts }) as ReleaseDescriptor
    t.not(responseRest, undefined)

    t.deepEqual(responseRest, responseGraphql)
})
