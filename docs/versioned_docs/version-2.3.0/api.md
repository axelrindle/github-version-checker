---
sidebar_position: 2
sidebar_label: 🧩 API
---

# API

```js
// Require the module
const versionCheck = require('github-version-checker');
```

### `function versionCheck(options, [callback])`
Performs an update check with the given options. The `callback` is optional, can be omitted to return a `Promise`.

#### The `options` object
Option | Description | Default Value | Introduction
--- | --- | --- | ---
token | A [personal access token](https://blog.github.com/2013-05-16-personal-api-tokens/) used to access the **Github GraphQL API (v4)**. Can be omitted and instead be read from an env variable called `GITHUB_API_TOKEN`. When no token can be found, the module will fall back to the **Github Rest API (v3)**. | `undefined` | `v2.0.0`
repo | The name of your Github repository.| **None. Required.** | `v1.0.0`
owner | The owner of your Github repository (usually your username).| **None. Required.** | `v1.0.0`
currentVersion | Your app's current version. | **None. Required.** | `v1.0.0`
fetchTags | Whether to fetch the repositories' git tags instead of the GitHub releases. Useful when no releases are created, but only tags. | `false` | `v1.0.0`
latestOnly | Setting this to `true` will fetch the latest release only | `false` | `v2.2.0`
excludePrereleases | Excludes pre-releases from checks. Currently only works when no token is specified. | `false` | `v2.3.0`

#### The `callback` function (optional)
Should be of the following form:
```javascript
function(error, update) {
  // ...your code
}
```
* `error`:
  * If an error occurs, this holds the error message. `null` if no error occurs.
* `update`:
  * An object in the format specified below. `null` if no update was found.

#### Using `Promise`
You can omit the `callback` function to return a `Promise`, which resolves with the `update` object.

### Object schemes
#### Releases
When fetching releases, an object with the following structure will be returned:
```js
Object {
  name
  tag {
    name
  }
  isPrerelease
  publishedAt
  url
}
```

#### Tags
When fetching tags, you will receive an object with the following structure:
```js
Object {
  name
}
```
