// Require modules
const graphql = require('./query/graphql')
const rest = require('./query/rest')

/**
 * Checks whether a new version is available. Depending on whether a token is given, the
 * Github GraphQL API (v4) will be used. Otherwise we rely on the Github Rest API (v3), which
 * does not require authentication.
 *
 * @param {CheckOptions} options The options for the version check.
 * @param {CallbackFunction} callback The callback function.
 */
module.exports = (options, callback) => {
    if (options === null || options === undefined) {
        throw new Error('options object must not be null or undefined!')
    }

    // get options
    options.token = options.token || process.env.GITHUB_API_TOKEN || undefined
    if (options.reduceTraffic) {
        console.warn('The "reduceTraffic" option is deprecated! Consider updating "github-version-checker" to a newer version.')
    }

    // check if required options are defined
    if (!options.repo) {
        callback('no repository specified', null)
        return
    }
    if (!options.owner) {
        callback('no owner specified', null)
        return
    }
    if (!options.currentVersion) {
        callback('no current version given', null)
        return
    }

    // decide what to do
    // when we have a token supplied, we will call the GraphQL api
    if (options.token) {

        if (options.excludePrereleases) {
            throw new Error('excludePrereleases option currently unsupported when specifying a token.')
        }

        graphql(options, callback)
    } else {
        rest(options, callback)
    }
}
