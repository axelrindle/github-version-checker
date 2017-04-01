# require npm modules
request = require 'request'
semcmp = require 'semver-compare'
chalk = require 'chalk'
sprintf = require('sprintf-js').sprintf

baseApiUrl = 'https://api.github.com/repos/%s/releases'

module.exports = (options, callback) ->

  # get options
  repo = options.repo
  currentVersion = options.currentVersion

  # check if required options are defined
  error 'no repository specified' if repo is undefined
  error 'no current version given' if currentVersion is undefined

  apiUrl = sprintf baseApiUrl, repo

  # request options
  reqOpts =
    url: apiUrl
    headers:
      'User-Agent': options.useragent or 'github-version-checker'

  request reqOpts, (error, response, body) ->
    throw error if error

    # parse the response body into an object
    releases = JSON.parse body

    found = false

    # loop through releases
    # if a remote version is higher than the installed one, the callback
    # will be called with the release object
    for release in releases
      tag = release.tag_name.replace(/\D/g, '')
      if semcmp(currentVersion, tag) is -1
        found = true
        callback release
        break

    callback null if not found

# error method
error = (cause) ->
  throw chalk.bgRed.bold('Error!') + ' ' + cause
