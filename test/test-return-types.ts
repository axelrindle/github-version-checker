import test from 'ava'
import versionCheck from '../src/index'

const options = {
    repo: 'github-version-checker',
    owner: 'axelrindle',
    currentVersion: '1.0.0'
}

test('one parameter returns a promise', t => {
    const promise = versionCheck(options)
    t.false(promise === undefined)
    t.true(promise instanceof Promise)
})

test('two parameters return a null', t => {
    const nothing = versionCheck(options, (_error, _update) => {
        // ¯\_(ツ)_/¯
    })
    t.true(nothing === undefined)
})
