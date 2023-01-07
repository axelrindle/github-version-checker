import test from 'ava'
import versionCheck from '../src/check'
import { CheckOptions, CheckResult } from '@version-checker/api'

if (! process.env['GITHUB_TOKEN']) {
    throw new Error('No GITHUB_TOKEN specified!')
}

const opts: CheckOptions = {
    owner: 'axelrindle',
    repo: 'github-version-checker',
    currentVersion: '0.0.1'
}

test('graphql returns the same releases answer as rest', async (t) => {
    const responseGraphql = await versionCheck(opts) as CheckResult
    t.not(responseGraphql, undefined)

    const responseRest = await versionCheck({ ...opts, forceRest: true }) as CheckResult
    t.not(responseRest, undefined)

    t.is(responseGraphql.src, 'graphql')
    t.is(responseRest.src, 'rest')
    t.deepEqual(responseRest.update, responseGraphql.update)
})

test('graphql returns the same tags answer as rest', async (t) => {
    const responseGraphql = await versionCheck({ ...opts, fetchTags: true }) as CheckResult
    t.not(responseGraphql, undefined)

    const responseRest = await versionCheck({ ...opts, forceRest: true, fetchTags: true }) as CheckResult
    t.not(responseRest, undefined)

    t.is(responseGraphql.src, 'graphql')
    t.is(responseRest.src, 'rest')
    t.deepEqual(responseRest.update, responseGraphql.update)
})
