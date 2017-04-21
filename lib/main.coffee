# require npm modules
request = require 'request'
semcmp = require 'semver-compare'
chalk = require 'chalk'
sprintf = require('sprintf-js').sprintf
Promise = require 'promise'

baseApiUrl = 'https://api.github.com/repos/%s/releases'

module.exports = (options, callback) ->
  if callback
    check options, callback
  else
    return new Promise (resolve, reject) ->
      check options, (release, error) ->
        reject error if error
        if release then resolve release
        else resolve null

check = (options, callback) ->

  # get options
  repo = options.repo
  currentVersion = options.currentVersion

  # check if required options are defined
  callback(null, 'no repository specified') if repo is undefined
  callback(null, 'no current version given') if currentVersion is undefined

  apiUrl = sprintf baseApiUrl, repo

  # request options
  reqOpts =
    url: apiUrl
    headers:
      'User-Agent': 'github-version-checker'

  request reqOpts, (error, response, body) ->
    callback(null, error) if error

    # parse the response body into an object
    releases = JSON.parse body

    found = false

    # loop through releases
    # if a remote version is higher than the installed one, the callback
    # will be called with the release object
    for release in releases
      tag = release.tag_name.replace(/[^0-9$.,]/g, '')
      if semcmp(currentVersion, tag) is -1
        found = true
        callback release, null
        break

    callback(null, null) if not found

  return null
