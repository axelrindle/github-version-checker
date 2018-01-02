# require npm modules
got = require 'got'
chalk = require 'chalk'
semver = require 'semver'

baseApiUrl = 'https://api.github.com/repos/REPO/releases'

module.exports = (options, callback) ->
  if callback
    check options, callback
  else
    return new Promise (resolve, reject) ->
      check options, (update, error) ->
        reject error if error
        if update then resolve update else resolve null

check = (options, callback) ->
  # get options
  repo = options.repo
  currentVersion = options.currentVersion
  includePreReleases = options.includePreReleases || false

  # check if required options are defined
  callback(null, 'no repository specified') if repo is undefined
  callback(null, 'no current version given') if currentVersion is undefined

  # do the api call
  apiUrl = baseApiUrl.replace 'REPO', repo
  if not includePreReleases then apiUrl += '/latest'
  got(apiUrl).then((response) ->
    # parse the response body into an object
    releases = JSON.parse response.body

    found = false

    if includePreReleases
      # loop through releases
      # if a remote version is higher than the installed one, the callback
      # will be called with the release object
      for release in releases
        tag = release.tag_name
        if semver.compare(currentVersion, tag) is -1
          found = true
          callback release, null
          break
    else
      tag = releases.tag_name
      if semver.compare(currentVersion, tag) is -1
        found = true
        callback releases, null

    callback(null, null) if not found
  ).catch (error) -> callback null, error

  return null
