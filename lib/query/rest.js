// Require modules
const https = require('https')
const semver = require('semver')
const schemeMapper = require('../util/scheme-mapper')
const pkg = require('../../package.json')

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
 * @param {CheckOptions} options The options for the version check.
 * @param {CallbackFunction} callback The callback function.
 * @returns {RestHandlerFunction}
 */
function makeHandler(options, callback) {
    return res => {
        const chunks = []
        res.on('data', chunk => {
            return chunks.push(chunk.toString())
        })
        res.on('end', () => {
            // parse response string into an object
            const response = chunks.join('')
            let json = null
            try {
                json = JSON.parse(response)
            } catch (error) {
                return callback(error, null)
            }

            // 404 error occurs, when no releases are found
            if (res.statusCode === 404) {
                return callback(null, null)
            }

            // status codes other than 200 are treated as an error
            else if (res.statusCode !== 200) {
                return callback(new Error(json.message), null)
            }

            // Compare versions
            const version = compare(options, json)

            if (version) {
                const mapped = schemeMapper[options.fetchTags ? 'tag' : 'release'](version)
                callback(null, mapped)
            } else {
                callback(null, null)
            }
        })
    }
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
    let apiUrl = `/repos/${options.owner}/${options.repo}`
    if (options.fetchTags) {
        apiUrl += '/tags'
    } else {
        apiUrl += '/releases'

        if (options.latestOnly) {
            apiUrl += '/latest'
        }
    }

    // define request options
    /** @type {https.RequestOptions} */
    const opts = {
        hostname: 'api.github.com',
        path: apiUrl,
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': `${pkg.name} v${pkg.version}`
        }
    }

    // execute request
    let req = https.get(opts, makeHandler(options, callback))
    req.on('error', err => {
        callback(err, null)
    })
    req.end()
}
