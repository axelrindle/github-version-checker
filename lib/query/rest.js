// Require modules
const semver = require('semver')
const schemeMapper = require('../util/scheme-mapper')
const pkg = require('../../package.json')
const { Octokit } = require('@octokit/core')

/**
 * @param {CheckOptions} options The options for the version check.
 * @param {object} json The json response from the api.
 * @returns {object|null}
 */
function compare(options, json) {
    let found = false
    let version = null
    for (let i = 0; i < json.length; i++) {
        version = json[i]

        if (options.excludePrereleases) {
            if (version['prerelease'] !== undefined && version['prerelease']) {
                continue
            }
        }

        if (semver.gt(version[options.fetchTags ? 'name' : 'tag_name'], options.currentVersion)) {
            found = true
            break
        }
    }

    return found ? version : null
}

/**
 * Executes an API call on the Github Rest API (v3) that should return the latest version.
 * The returned version is compared to the given version.
 * When the fetched version is greater than the given one, the newer version
 * is returned.
 *
 * @param {CheckOptions} options The options for the version check.
 * @param {CallbackFunction} callback The callback function.
*/
module.exports = (options, callback) => {
    // build url
    let apiUrl = '/repos/{owner}/{repo}'
    if (options.fetchTags) {
        apiUrl += '/tags'
    } else {
        apiUrl += '/releases'

        if (options.latestOnly) {
            apiUrl += '/latest'
        }
    }

    const octokit = new Octokit({
        auth: options.token
    })

    octokit.request(apiUrl, {
        owner: options.owner,
        repo: options.repo,
        headers: {
            'user-agent': `${pkg.name} v${pkg.version}`
        }
    })
        .then(response => {
            // 404 error occurs, when no releases are found
            if (response.status === 404) {
                return callback(null, null)
            }

            // status codes other than 200 are treated as an error
            else if (response.status !== 200) {
                return callback(new Error(response.data.message), null)
            }

            // Compare versions
            const version = compare(options, response.data)
            if (version) {
                const mapped = schemeMapper[options.fetchTags ? 'tag' : 'release'](version)
                callback(null, mapped)
            } else {
                callback(null, null)
            }
        })
}
