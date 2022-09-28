// Require modules
const { Octokit } = require('@octokit/core')
const semver = require('semver')
const pkg = require('../../package.json')
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
module.exports = async (options, callback) => {
    const theQuery = options.fetchTags ? query.tags(options.repo, options.owner) : query.releases(options.repo, options.owner)
    const octokit = new Octokit({
        auth: options.token,
        headers: {
            'user-agent': `${pkg.name} v${pkg.version}`
        }
    })

    octokit.graphql(theQuery)
        .then(res => {
            // Retrieve newer version name
            const newer = options.fetchTags ? res.repository.refs.nodes[0] : res.repository.releases.nodes[0]

            // Compare versions
            if (semver.gt((options.fetchTags ? newer.name : newer.tag.name), options.currentVersion)) {
                callback(null, newer)
            } else {
                callback(null, null)
            }
        })
        .catch(err => callback(err, null))
}
