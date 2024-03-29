/* eslint-disable @typescript-eslint/no-var-requires */
import test from 'ava'
import versionCheck from '../src/index'

let counter = 0
const tester = options => {
    counter++

    test(`one parameter and correct options returns without errors (${counter})`, t => {
        t.notThrows(() => {
            versionCheck(options).then(({update}) => {
                t.truthy(update)
                t.is(update.name, 'axelrindle/github-version-checker')
            })
        })
    })

    test(`fails without options (${counter})`, async t => {
        const error = await t.throwsAsync(async () => {
            await versionCheck(null)
        })
        t.is(error.message, 'options object must not be null or undefined!')

        const error2 = await t.throwsAsync(async () => {
            await versionCheck()
        })
        t.is(error2.message, 'options object must not be null or undefined!')
    })

    test(`fails with invalid options (${counter})`, async t => {
        const opts1 = Object.assign({}, options)
        delete opts1.repo
        try {
            await versionCheck(opts1)
        } catch (e) {
            t.is(e.message, 'no repository specified')
        }

        const opts2 = Object.assign({}, options)
        delete opts2.owner
        try {
            await versionCheck(opts2)
        } catch (e) {
            t.is(e.message, 'no owner specified')
        }

        const opts3 = Object.assign({}, options)
        delete opts3.currentVersion
        try {
            await versionCheck(opts3)
        } catch (e) {
            t.is(e.message, 'no version specified')
        }
    })
}

const opts1 = {
    token: process.env.GITHUB_TOKEN,
    repo: 'github-version-checker',
    owner: 'axelrindle',
    currentVersion: require('../package.json').version
}

const opts2 = {
    repo: 'github-version-checker',
    owner: 'axelrindle',
    currentVersion: require('../package.json').version
}

tester(opts1)
tester(opts2)
