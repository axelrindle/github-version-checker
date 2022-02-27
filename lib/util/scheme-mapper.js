function validate(obj) {
    if (!obj) {
        throw new Error('The object to map must not be falsy!')
    }
}

/**
 * Maps a response object into the form described here:
 * https://github.com/axelrindle/github-version-checker/wiki/API#releases
 *
 * @returns {ReleaseDescriptor}
 */
module.exports.release = obj => {
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
 *
 * @returns {TagDescriptor}
 */
module.exports.tag = obj => {
    validate(obj)

    return {
        name: obj.name
    }
}
