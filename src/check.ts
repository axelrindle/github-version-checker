import graphql from './query/graphql'
import rest from './query/rest'
import { CheckOptions, ReleaseDescriptor, TagDescriptor } from './types'

/**
 * Checks whether a new version is available. Depending on whether a token is given, the
 * Github GraphQL API (v4) will be used. Otherwise we rely on the Github Rest API (v3), which
 * does not require authentication.
 *
 * @param options The options for the version check.
 */
export default async function check(options: CheckOptions): Promise<ReleaseDescriptor|TagDescriptor|undefined> {
    if (options === null || options === undefined) {
        throw new Error('options object must not be null or undefined!')
    }

    if (options.token !== false) {
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
    if (options.token) {
        if (options.excludePrereleases) {
            throw new Error('excludePrereleases option currently unsupported when specifying a token.')
        }

        return await graphql(options)
    } else {
        return await rest(options)
    }
}
