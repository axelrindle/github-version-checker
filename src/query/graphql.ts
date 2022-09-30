import { Octokit } from '@octokit/core'
import type { GraphQlQueryResponseData } from '@octokit/graphql';
import { gt } from 'semver'
import { CheckOptions, ReleaseDescriptor, TagDescriptor } from '../types'
import { releases, tags } from '../util/graphql'

/**
 * Executes a GraphQL query on the API to fetch either the latest release or tag.
 * The returned version is compared to the given version.
 * When the fetched version is greater than the given one, the newer version
 * is returned.
 *
 * @param options The options for the version check.
 */
export default async function graphql(options: CheckOptions): Promise<ReleaseDescriptor|TagDescriptor|undefined> {
    const theQuery = options.fetchTags ? tags : releases

    const octokit = new Octokit({
        auth: options.token,
        headers: {
            // 'user-agent': `${pkg.name} v${pkg.version}`
        }
    })

    const { repository } = await octokit.graphql<GraphQlQueryResponseData>(theQuery, {
        repo: options.repo,
        owner: options.owner
    })

    // Retrieve newer version name
    const newer = options.fetchTags ? repository.refs.nodes[0] : repository.releases.nodes[0]

    // Compare versions
    if (gt((options.fetchTags ? newer.name : newer.tag.name), options.currentVersion)) {
        return newer
    } else {
        return undefined
    }
}
