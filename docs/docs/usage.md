---
sidebar_position: 2
sidebar_label: 🎈 Usage
---

# Usage

```javascript
// require modules
const versionCheck = require('github-version-checker');
const pkg = require('./package.json'); // or whereever your package.json lies

// version check options (for details see below)
const options = {
  token: 'PUT-YOUR-TOKEN-HERE',                      // personal access token (can be omitted to use the v3 api)
  repo: 'github-version-checker',                    // repository name
  owner: 'axelrindle',                               // repository owner
  currentVersion: pkg.version,                       // your app's current version
};
versionCheck(options, function (error, update) { // callback function
  if (error) throw error;
  if (update) { // print some update info if an update is available
    console.log('An update is available! ' + update.name);
  }

  // start your app
  console.log('Starting app...');
  //...
});
```
Check the [examples](/docs/examples/) for more examples.

### Personal Access Token

As of **v2.0.0** you can supply an access token for working with Github's GraphQL API. This token may be supplied directly via the options object, **OR** it can be supplied using an **environment variable** called `GITHUB_TOKEN`.

Consider using this method when working in a private environment, as it reduces traffic and increases the checking speed.

### Note on semantic versioning

Always try to follow a clear [semver format](http://semver.org/). This helps to avoid parsing mistakes and getting a clear result. Also read [here](https://github.com/npm/node-semver#versions).
