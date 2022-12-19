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
                tagName
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
            last: 1
            refPrefix: "refs/tags/"
            orderBy: { field: ALPHABETICAL, direction: ASC }
        ) {
            nodes {
                name
            }
        }
    }
}
`
