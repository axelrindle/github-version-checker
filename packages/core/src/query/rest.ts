import { Octokit } from '@octokit/core'
import { CheckFunction, CheckOptions, CheckResult, RestResponseTag } from '@github-version-checker/api'
import { compareReleases, compareTags } from '../util/comparator'
import { release, tag } from '../util/scheme-mapper'
import semver from 'semver'

/**
 * Executes an API call on the Github Rest API (v3) that should return the latest version.
 * The returned version is compared to the given version.
 * When the fetched version is greater than the given one, the newer version
 * is returned.
 *
 * @param options The options for the version check.
*/
const rest: CheckFunction = async function(options: CheckOptions): Promise<CheckResult> {
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

    const result: CheckResult = {
        src: 'rest',
        type: options.fetchTags ? 'tags' : 'releases',
        update: undefined
    }

    // 404 error occurs, when no releases are found
    if (response.status === 404) {
        return result
    }

    // status codes other than 200 are treated as an error
    else if (response.status !== 200) {
        throw new Error(response.data.message)
    }

    if (options.fetchTags) {
        result.update = tag(compareTags(options, response.data))
    }
    else {
        result.update = release(compareReleases(options, response.data))
    }

    return result
}

export default rest
