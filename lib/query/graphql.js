// Require modules
const github_graphql = require('github-graphql-client')
const semver = require('semver')
const query = require('../util/query')

/**
 * Executes a GraphQL query on the API to fetch either the latest release or tag.
 * The returned version is compared to the given version.
 * When the fetched version is greater than the given one, the newer version
 * is returned.
 *
 * @param {CheckOptions} options The options for the version check.
 * @param {CallbackFunction} callback The callback function.
 */
module.exports = (options, callback) => {
    // build the query
    const theQuery = options.fetchTags ? query.tags(options.repo, options.owner) : query.releases(options.repo, options.owner)

    // do the api call
    github_graphql({
        token: options.token,
        query: theQuery
    }, (err, res) => {
        if (err) {
            callback(err, null)
        } else {
            // Retrieve newer version name
            const newer = options.fetchTags ? res.data.repository.refs.nodes[0] : res.data.repository.releases.nodes[0]

            // Compare versions
            if (semver.gt((options.fetchTags ? newer.name : newer.tag.name), options.currentVersion)) {
                callback(null, newer)
            } else {
                callback(null, null)
            }
        }
    })
}
