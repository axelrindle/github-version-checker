---
sidebar_position: 4
sidebar_label: 🧩 API
---

# API

```js
// Require the module
const versionCheck = require('@version-checker/core');

// Or import
import versionCheck from '@version-checker/core'
```

## `function versionCheck(options, [callback])`
Performs an update check with the given options. The `callback` is optional, can be omitted to return a `Promise`.

### The `options` object
Option | Description | Default Value | Introduction
--- | --- | --- | ---
token | A [personal access token](https://blog.github.com/2013-05-16-personal-api-tokens/) used to access the **Github GraphQL API (v4)**. Can be omitted and instead be read from an env variable called `GITHUB_API_TOKEN`. When no token can be found, the module will fall back to the **Github Rest API (v3)**. | `undefined` | `v2.0.0`
repo | The name of your Github repository.| **None. Required.** | `v1.0.0`
owner | The owner of your Github repository (usually your username).| **None. Required.** | `v1.0.0`
currentVersion | Your app's current version. | **None. Required.** | `v1.0.0`
fetchTags | Whether to fetch the repositories' git tags instead of the GitHub releases. Useful when no releases are created, but only tags. | `false` | `v1.0.0`
latestOnly | Setting this to `true` will fetch the latest release only | `false` | `v2.2.0`
excludePrereleases | Excludes pre-releases from checks. Currently only works when no token is specified. | `false` | `v2.3.0`
forceRest | Will use the Github REST API (v3) even with a supplied token. | `false` | `v3.0.0`

### The `callback` function (optional)
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

### Return type

The function returns a `CheckResult` which has the following structure:

```typescript
interface CheckResult {
    src: string
    type: string
    update: ReleaseDescriptor | TagDescriptor | undefined
}
```

#### Properties
##### `src`

States which API endpoint has been used.

Possible values:

- `rest`
- `graphql`

##### `type`

States whether releases or tags have been fetched.

Possible values:

- `releases`
- `tags`

##### `update`

Holds the actual data on a possible update. For structure details refer to [Object schemes](#object-schemes).

It is `undefined` in case no update could be found.

### Using `Promise`
You can omit the `callback` function to return a `Promise`, which resolves with the `update` object.

## Object schemes
### ReleaseDescriptor
When fetching releases, an object with the following structure will be returned:
```typescript
interface ReleaseDescriptor {
    name: string
    tag: TagDescriptor
    isPrerelease: boolean
    isDraft: boolean
    publishedAt: string
    url: string
}
```

### TagDescriptor
When fetching tags, you will receive an object with the following structure:
```typescript
interface TagDescriptor {
    name: string
}
```
