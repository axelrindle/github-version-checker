import { ReleaseDescriptor, TagDescriptor } from '../types'

function validate(obj: any) {
    if (! obj) {
        throw new Error('The object to map must not be falsy!')
    }
}

/**
 * Maps a response object into the form described here:
 * https://github.com/axelrindle/github-version-checker/wiki/API#releases
 */
export function release(obj: any): ReleaseDescriptor {
    validate(obj)

    return {
        name: obj.name,
        tag: {
            name: obj.tag_name
        },
        isPrerelease: obj.prerelease,
        publishedAt: obj.published_at,
        url: obj.html_url
    }
}

/**
 * Maps a response object into the form described here:
 * https://github.com/axelrindle/github-version-checker/wiki/API#tags
 */
export function tag(obj: any): TagDescriptor {
    validate(obj)

    return {
        name: obj.name
    }
}
