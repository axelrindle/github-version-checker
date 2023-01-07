import { ReleaseDescriptor, RestResponseRelease, RestResponseTag, TagDescriptor } from '@version-checker/api'

/**
 * Maps a response object into the form described here:
 * https://github.com/axelrindle/github-version-checker/wiki/API#releases
 */
export function release(obj: RestResponseRelease|undefined): ReleaseDescriptor|undefined {
    if (obj === undefined) {
        return undefined
    }

    return {
        name: obj.name,
        tag: {
            name: obj.tag_name
        },
        isPrerelease: obj.prerelease,
        isDraft: obj.draft,
        publishedAt: obj.published_at,
        url: obj.html_url
    }
}

/**
 * Maps a response object into the form described here:
 * https://github.com/axelrindle/github-version-checker/wiki/API#tags
 */
export function tag(obj: RestResponseTag|undefined): TagDescriptor|undefined {
    if (obj === undefined) {
        return undefined
    }

    return {
        name: obj.name
    }
}
