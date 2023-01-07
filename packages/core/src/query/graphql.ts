import { Octokit } from '@octokit/core'
import type { GraphQlQueryResponseData } from '@octokit/graphql';
import { gt } from 'semver'
import { CheckFunction, CheckOptions, CheckResult } from '@version-checker/api'
import { releases, tags } from '../util/graphql'

/**
 * Executes a GraphQL query on the API to fetch either the latest release or tag.
 * The returned version is compared to the given version.
 * When the fetched version is greater than the given one, the newer version
 * is returned.
 *
 * @param options The options for the version check.
 */
const graphql: CheckFunction = async function(options: CheckOptions): Promise<CheckResult> {
    const theQuery = options.fetchTags ? tags : releases

    const octokit = new Octokit({
        auth: options.token,
        headers: {
            // 'user-agent': `${pkg.name} v${pkg.version}`
        }
    })

    async function fetch(cursor: string|undefined = undefined) {
        const { repository } = await octokit.graphql<GraphQlQueryResponseData>(theQuery, {
            repo: options.repo,
            owner: options.owner,
            cursor
        })
        return repository
    }

    const result: CheckResult = {
        src: 'graphql',
        type: options.fetchTags ? 'tags' : 'releases',
        update: undefined
    }

    let cursor: string|undefined = undefined
    let found = false
    while (! found) {
        const repository: any = await fetch(cursor)
        const entries: any[] = options.fetchTags ? repository.refs.nodes : repository.releases.nodes

        if (entries.length == 0) {
            return result
        }

        const skip = entries[0].isDraft || (options.excludePrereleases && entries[0].isPrerelease)
        if (! options.fetchTags && skip) {
            if (repository.releases.pageInfo.hasNextPage) {
                cursor = repository.releases.pageInfo.endCursor
                continue
            } else {
                return result
            }
        }

        // Retrieve newer version name
        const newer = entries[0]
        const fetchedVersion = options.fetchTags ? newer.name : newer.tag.name
        if (gt(fetchedVersion, options.currentVersion)) {
            result.update = newer
            found = true
        } else {
            return result
        }
    }

    return result
}

export default graphql
