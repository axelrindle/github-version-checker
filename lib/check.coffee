# Require modules
https = require 'https'
github_graphql = require 'github-graphql-client'
semver = require 'semver'
query = require './query'

###
  Executes a GraphQL query on the API to fetch either the latest release or tag.
  The returned version is compared to the given version.
  When the fetched version is greater than the given one, the newer version
  is returned.

  @param options {object} The options for the version check.
  @param callback {function|undefined} The callback function.
###
graphql = (options, callback) ->
  # build the query
  theQuery =
    if options.fetchTags
      query.tags options.repo, options.owner
    else
      query.releases options.repo, options.owner

  # do the api call
  github_graphql (token: options.token, query: theQuery), (err, res) ->
    if err
      callback err, null
    else
      # Retrieve newer version name
      newer =
        if options.fetchTags
          res.data.repository.refs.nodes[0]
        else
          res.data.repository.releases.nodes[0]

      # Compare versions
      if semver.gt (if options.fetchTags then newer.name else newer.tag.name), options.currentVersion
        callback null, newer
      else
        callback null, null

###
  Executes an API call on the Github Rest API (v3) that should return the latest version.
  The returned version is compared to the given version.
  When the fetched version is greater than the given one, the newer version
  is returned.

  @param options {object} The options for the version check.
  @param callback {function|undefined} The callback function.
###
rest = (options, callback) ->
  apiUrl = "https://api.github.com/repos/#{options.owner}/#{options.repo}/releases"
  opts =
    hostname: 'gvc-reduce-json.axelrindle.de'
    path: '/?url=' + apiUrl
    method: 'GET'
  req = https.request opts, (res) ->
    chunks = []
    res.on 'data', (chunk) -> chunks.push chunk.toString()
    res.on 'end', ->
      # Make sure there are no errors and try to parse the response
      if res.statusCode != 200 then return callback new Error(res.statusMessage), null
      response = chunks.join('')
      json = null
      try json = JSON.parse(response)
      catch err then return callback err, null
      if json.message then return callback new Error(json.message), null

      # Compare versions
      found = false
      for version in json
        if semver.gt version.tag_name, options.currentVersion
          found = true
          break

      if found
        callback null, version
      else
        callback null, null

  req.on 'error', (err) -> callback err, null
  req.end()

###
  Checks whether a new version is available. Depending on whether a token is given, the
  Github GraphQL API (v4) will be used. Otherwise we rely on the Github Rest API (v3), which
  does not require authentication.

  @param options {object} The options for the version check.
  @param callback {function|undefined} The callback function.
###
module.exports = (options, callback) ->
  # get options
  options.token = options.token ? process.env.GITHUB_API_TOKEN ? ''
  options.repo = options.repo ? ''
  options.owner = options.owner ? ''
  options.currentVersion = options.currentVersion ? ''

  # check if required options are defined
  if options.repo is ''
    callback('no repository specified', null)
    return
  if options.owner is ''
    callback('no owner specified', null)
    return
  if options.currentVersion is ''
    callback('no current version given', null)
    return

  # decide what to do
  # when we have a token supplied, we will call the GraphQL api

  if options.token isnt '' then graphql(options, callback) else rest(options, callback)