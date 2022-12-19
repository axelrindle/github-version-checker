import { Octokit } from '@octokit/core'
import { CheckOptions, ReleaseDescriptor, TagDescriptor } from '@github-version-checker/api'
import { compareReleases, compareTags } from '../util/comparator'
import { release, tag } from '../util/scheme-mapper'

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

    if (options.fetchTags) {
        return tag(compareTags(options, response.data))
    }
    else {
        return release(compareReleases(options, response.data))
    }
}
