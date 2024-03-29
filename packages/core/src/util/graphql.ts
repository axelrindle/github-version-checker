// editorconfig-checker-disable-file

export const releases = `
query($repo: String!, $owner: String!, $cursor: String = null) {
    repository(name: $repo, owner: $owner) {
        releases(
          	after: $cursor,
            first: 1,
            orderBy: { field: CREATED_AT, direction: DESC }
        ) {
            pageInfo {
              	hasNextPage
              	endCursor
            }
            nodes {
                name
                tag {
                    name
                }
                isPrerelease
              	isDraft
                publishedAt
                url
            }
        }
    }
}
`

export const tags = `
query($repo: String!, $owner: String!) {
    repository(name: $repo, owner: $owner) {
        refs(
            refPrefix: "refs/tags/"
            first: 1
            orderBy: { field: TAG_COMMIT_DATE, direction: DESC }
        ) {
            nodes {
                name
            }
        }
    }
}
`
