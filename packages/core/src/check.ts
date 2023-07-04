import { CheckFunction, CheckOptions, CheckResult } from '@version-checker/api'
import graphql from './query/graphql'
import rest from './query/rest'

/**
 * Checks whether a new version is available. Depending on whether a token is given, the
 * Github GraphQL API (v4) will be used. Otherwise we rely on the Github Rest API (v3), which
 * does not require authentication.
 *
 * @param options The options for the version check.
 */
const check: CheckFunction = async function(options: CheckOptions): Promise<CheckResult> {
    if (options === null || options === undefined) {
        throw new Error('options object must not be null or undefined!')
    }

    if (options.token !== false && typeof process !== 'undefined') {
        options.token = options.token || process.env['GITHUB_TOKEN'] || undefined
    }

    // check if required options are defined
    if (! options.repo) {
        throw new Error('no repository specified')
    }
    if (! options.owner) {
        throw new Error('no owner specified')
    }
    if (! options.currentVersion) {
        throw new Error('no version specified')
    }

    // decide what to do
    // when we have a token supplied, we will call the GraphQL API
    if (options.forceRest) {
        return await rest(options)
    } else if (options.token) {
        return await graphql(options)
    } else {
        return await rest(options)
    }
}

export default check
