import test from 'ava'
import { CheckOptions, RestResponseRelease, RestResponseTag } from '../src/types'
import { compareReleases, compareTags } from '../src/util/comparator'

const options: CheckOptions = {
    owner: 'axelrindle',
    repo: 'github-version-checker',
    currentVersion: '1.0.0'
}

test('comparator returns newer release', t => {
    const v1337: RestResponseRelease = {
        name: 'A newer release',
        html_url: 'https://example.org',
        prerelease: false,
        published_at: 'some day',
        tag_name: 'v1.3.37'
    }
    const result = compareReleases(options, [v1337])
    t.is(result, v1337)
})

test('comparator returns undefined release', t => {
    const v1337: RestResponseRelease = {
        name: 'A newer release',
        html_url: 'https://example.org',
        prerelease: false,
        published_at: 'some day',
        tag_name: 'v1.3.37'
    }

    const myOptions = Object.assign({}, options, { currentVersion: 'v2.0.0' })
    const result = compareReleases(myOptions, [v1337])
    t.is(result, undefined)
})

test('comparator returns newer tag', t => {
    const v1337: RestResponseTag = {
        name: 'v1.3.37'
    }
    const result = compareTags(options, [v1337])
    t.is(result, v1337)
})

test('comparator returns undefined tag', t => {
    const v1337: RestResponseTag = {
        name: 'v1.3.37'
    }

    const myOptions = Object.assign({}, options, { currentVersion: 'v2.0.0' })
    const result = compareTags(myOptions, [v1337])
    t.is(result, undefined)
})
