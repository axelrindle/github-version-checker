// require modules
const test = require('ava')
const schemeMapper = require('../lib/scheme-mapper')

// define some test objects
const validReleaseObject = {
    name: 'axelrindle/github-version-checker',
    tag_name: 'v2.0.0',
    prerelease: false,
    published_at: '1. May 2018',
    html_url: 'https://github.com/axelrindle/github-version-checker/releases/tag/v2.0.0'
}
const validReleaseObject2 = {
    name: 'axelrindle/github-version-checker',
    tag_name: 'v2.0.0',
    prerelease: false,
    published_at: '1. May 2018',
    html_url: 'https://github.com/axelrindle/github-version-checker/releases/tag/v2.0.0',
    lorem: 'ipsum',
    dolor: 'sit',
    amet: 'test'
}

test('scheme-mapper#release maps correctly', t => {
    const mapped = schemeMapper.release(validReleaseObject)
    t.deepEqual(mapped, {
        name: 'axelrindle/github-version-checker',
        tag: {
            name: 'v2.0.0'
        },
        isPrerelease: false,
        publishedAt: '1. May 2018',
        url: 'https://github.com/axelrindle/github-version-checker/releases/tag/v2.0.0'
    })


    const mapped2 = schemeMapper.release(validReleaseObject2)
    t.deepEqual(mapped2, {
        name: 'axelrindle/github-version-checker',
        tag: {
            name: 'v2.0.0'
        },
        isPrerelease: false,
        publishedAt: '1. May 2018',
        url: 'https://github.com/axelrindle/github-version-checker/releases/tag/v2.0.0'
    })
})

test('scheme-mapper#release fails with invalid object', t => {
    const error = t.throws(() => {
        return schemeMapper.release(null)
    })
    t.is(error.message, 'The object to map must not be falsy!')

    const error2 = t.throws(() => {
        return schemeMapper.release(undefined)
    })
    t.is(error2.message, 'The object to map must not be falsy!')
})

test('scheme-mapper#tag maps correctly', t => {
    const mapped = schemeMapper.tag(validReleaseObject)
    t.deepEqual(mapped, {
        name: 'axelrindle/github-version-checker'
    })

    const mapped2 = schemeMapper.tag(validReleaseObject2)
    t.deepEqual(mapped2, {
        name: 'axelrindle/github-version-checker'
    })
})

test('scheme-mapper#tag fails with invalid object', t => {
    const error = t.throws(() => {
        return schemeMapper.tag(null)
    })
    t.is(error.message, 'The object to map must not be falsy!')

    const error2 = t.throws(() => {
        return schemeMapper.tag(undefined)
    })
    t.is(error2.message, 'The object to map must not be falsy!')
})
