# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased
### Security

-  Bump minimist from 1.2.5 to 1.2.6 (#10).

## 2.3.0 - 2022-03-18
### Added

- An option to exclude pre-releases from the check. Currently only works with the REST API (#9).

### Removed

- Dropped support for Node.js below version 10.

## 2.2.0 - 2020-05-02
### Added

- A new option `latestOnly` has been added: Setting it to `true` will only fetch the latest release.

### Removed

- The `reduceTraffic` option.

## 2.1.2 - 2019-06-15
### Fixed

- ReferenceError: version is not defined (#6).

## 2.1.1 - 2019-06-08
### Added

- Added an option `reduceTraffic` to decide whether the traffic should be reduced using [axelrindle/gvc-json-reduce](https://github.com/axelrindle/gvc-json-reduce).

### Changed

- The codebase has been migrated to plain JavaScript.

### Security

- Bump coffeescript from 1.12.7 to 2.3.2 (#5).

## 2.1.0 - 2018-09-25
### Added

- Support GitHub's REST API again.

## 2.0.1 - 2018-05-01

Addendum to 2.0.0

Clean up 🥴

## 2.0.0 - 2018-05-01
### Added

- Support for GitHub's GraphQL API.

### Changed

- The `options` object changed and requires using a [personal access token](https://blog.github.com/2013-05-16-personal-api-tokens/). See [here](https://github.com/axelrindle/github-version-checker#the-options-object).
- The `callback` structure changed. I decided to apply a node convention called **Error-First** in which a callback function's first parameter is the `error`. See [here](https://github.com/axelrindle/github-version-checker#the-callback-function-optional).

## 1.2.0 - 2018-01-02
### Changed

- Now using [semver](https://github.com/npm/node-semver) instead of [semver-compare](https://github.com/substack/semver-compare/)

## 1.1.0 - 2017-08-30
### Added

- Added an option to fetch latest release only (excluding pre-releases) or all releases (including pre-releases).

## 1.0.1 - 2017-04-01
### Fixed

- Fixed removing all dots from the remote version string.

## 1.0.0 - 2017-04-01

Initial release.
