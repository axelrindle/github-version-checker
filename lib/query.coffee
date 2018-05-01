###
  Query for fetching the latest github release.

  @param repo {string} The repository name.
  @param owner {string} The owner of the repository.
###
module.exports.releases = (repo, owner) ->
  "
  {
    repository(name: \"#{repo}\", owner: \"#{owner}\") {
      releases(last: 1) {
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
  "

###
  Query for fetching the latest git tag.

  @param repo {string} The repository name.
  @param owner {string} The owner of the repository.
###
module.exports.tags = (repo, owner) ->
  "
  {
    repository(name: \"#{repo}\", owner: \"#{owner}\") {
  		refs(last: 1, refPrefix: \"refs/tags/\", orderBy: { field: TAG_COMMIT_DATE, direction: ASC}) {
        nodes {
          name
        }
      }
    }
  }
  "
