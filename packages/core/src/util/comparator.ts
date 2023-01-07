import { gt } from 'semver'
import { CheckOptions, RestResponseRelease, RestResponseTag } from '@version-checker/api'

export function compareTags(options: CheckOptions, data: RestResponseTag[]): RestResponseTag|undefined {
    for (const item of data) {
        if (gt(item.name, options.currentVersion)) {
            return item
        }
    }

    return undefined
}

export function compareReleases(options: CheckOptions, data: RestResponseRelease[]): RestResponseRelease|undefined {
    for (const item of data) {
        if (item.draft) {
            continue
        }

        if (options.excludePrereleases && item.prerelease) {
            continue
        }

        if (gt(item.tag_name, options.currentVersion)) {
            return item
        }
    }

    return undefined
}
