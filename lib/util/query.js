/**
 * Query for fetching the latest github release.
 *
 * @param {string} repo The repository name.
 * @param {string} owner The owner of the repository.
 */
module.exports.releases = (repo, owner) => {
    return `
		{
			repository(name: "${repo}", owner: "${owner}") {
				releases(last: 1, { field: CREATED_AT, direction: ASC }) {
					nodes {
						name
						tag {
							name
						}
						isPrerelease
						publishedAt
						url
					}
				}
			}
		}
	`
}

/**
 * Query for fetching the latest git tag.
 *
 * @param {string} repo The repository name.
 * @param {string} owner The owner of the repository.
 */
module.exports.tags = (repo, owner) => {
    return `
		{
			repository(name: "${repo}", owner: "${owner}") {
				refs(last: 1, refPrefix: "refs/tags/", orderBy: { field: TAG_COMMIT_DATE, direction: ASC }) {
					nodes {
						name
					}
				}
			}
		}
	`
}
