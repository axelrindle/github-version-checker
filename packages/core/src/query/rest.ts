import { Octokit } from '@octokit/core'
import semver from 'semver'
import { CheckOptions, ReleaseDescriptor, TagDescriptor } from '../types'
import { release, tag } from '../util/scheme-mapper'

/**
 * @param options The options for the version check.
 * @param json The json response from the api.
 */
function compare(options: CheckOptions, json: any) {
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
 * @param options The options for the version check.
*/
export default async function rest(options: CheckOptions): Promise<ReleaseDescriptor|TagDescriptor|undefined> {
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

    const response = await octokit.request(apiUrl, {
        owner: options.owner,
        repo: options.repo,
        headers: {
            // 'user-agent': `${pkg.name} v${pkg.version}`
        }
    })

    // 404 error occurs, when no releases are found
    if (response.status === 404) {
        return undefined
    }

    // status codes other than 200 are treated as an error
    else if (response.status !== 200) {
        throw new Error(response.data.message)
    }

    // Compare versions
    const version = compare(options, response.data)
    if (version) {
        const mapper = options.fetchTags ? tag : release
        return mapper(version)
    } else {
        return undefined
    }
}
