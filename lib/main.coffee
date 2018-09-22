# Require modules
graphql = require 'github-graphql-client'
semver = require 'semver'
query = require './query'

###
  The exported checking function.

  @param options {object} The options for the version check.
  @param callback {function|undefined} An optional callback to pass the result to.
                                       Can be omitted to return a Promise.
  @return undefined or a Promise.
###
module.exports = (options, callback) ->
  if callback
    check options, callback
  else
    return new Promise (resolve, reject) ->
      check options, (error, update) ->
        reject error if error
        if update then resolve update else resolve null

###
  The actual checking function. Executes a GraphQL query on the API to fetch
  either the latest release or tag. The returned version is compared to the given
  version. When to fetched version is greated than the given one, the newer version
  is returned.

  @param options {object} The options for the version check.
  @param callback {function|undefined} An optional callback to pass the result to.
                                       Can be omitted to return a Promise.
###
check = (options, callback) ->
  # get options
  token = options.token ? ''
  repo = options.repo ? ''
  owner = options.owner ? ''
  currentVersion = options.currentVersion ? ''
  fetchTags = options.fetchTags || false

  # check if required options are defined
  if token is ''
    callback('no token specified', null)
    return
  if repo is ''
    callback('no repository specified', null)
    return
  if owner is ''
    callback('no owner specified', null)
    return
  if currentVersion is ''
    callback('no current version given', null)
    return

  # build the query
  query = if fetchTags then query.tags repo, owner else query.releases repo, owner

  # do the api call
  graphql (token: token, query: query), (err, res) ->
    if err
      callback err, null
    else
      # Retrieve newer version name
      newer =
      	if fetchTags
          res.data.repository.refs.nodes[0]
        else
          res.data.repository.releases.nodes[0]

      # Compare versions
      if semver.gt (if fetchTags then newer.name else newer.tag.name), currentVersion
        callback null, newer
      else
        callback null, null

  return
