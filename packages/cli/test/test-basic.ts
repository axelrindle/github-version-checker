import test from 'ava'
import { run } from './utils'
import { JsonOutput } from '../src/types'

test('json output', async (t) => {
    const opts = [
        '--owner axelrindle',
        '--repository github-version-checker',
        '--current-version 0.0.1',
        '--json'
    ]

    const result = await run(opts)
    const json: JsonOutput = JSON.parse(result.stdout)
    t.truthy(json)
    t.truthy(json.data)
    t.is(json.type, 'outdated')
})

test('plain output', async (t) => {
    const opts = [
        '--owner axelrindle',
        '--repository github-version-checker',
        '--current-version 0.0.1',
    ]

    const result = await run(opts)
    t.throws(() => JSON.parse(result.stdout))
})
