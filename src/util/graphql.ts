export const releases = `
{
    repository(name: "$repo", owner: "$owner") {
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

export const tags = `
{
    repository(name: "$repo", owner: "$owner") {
        refs(last: 1, refPrefix: "refs/tags/", orderBy: { field: TAG_COMMIT_DATE, direction: ASC }) {
            nodes {
                name
            }
        }
    }
}
`
