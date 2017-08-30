# github-version-checker
Simple **version checker** working with **GitHub releases** and the **GitHub API**.

## Install
```bash
npm install --save github-version-checker
```

## Usage
```javascript
// require modules
const versionCheck = require('github-version-checker');
const pkg = require('./package.json'); // or whereever your package.json lies

// version check options (for details see below)
const options = {
  repo: 'axelrindle/github-version-checker', // will be expanded to https://api.github.com/repos/axelrindle/github-version-checker/releases
  currentVersion: pkg.version, // your app's current version
  includePreReleases: false // if you want to check pre-releases to
};
versionCheck(options, function (update) { // callback function
  if (update) { // print some update info if an update is available
    console.log('An update is available!');
    console.log('New version: ' + update.tag_name);
    console.log('Details here: ' + update.html_url);
  }

  // start your app
  console.log('Starting app...');
  //...
});
```

### Note on semantic versioning
Always try to follow a clear [semver format](http://semver.org/). This helps to avoid parsing mistakes and getting a clear result.

## Options
Option | Default value | Description
--- | --- | ---
repo | **None. Required option** | Defines from which GitHub repository to load releases from.
currentVersion | **None. Required option** | Your app's current version. Needed to check if a newer release is found.
includePreReleases | false | Whether or not to include pre-releases. **Note:** This will fetch **all** releases, which might result in high traffic, depending on how much releases your app has on GitHub.

## The `update` object
The object you receive in the callback function, follows the format specified here:
https://developer.github.com/v3/repos/releases/#get-a-single-release

## Todo

* Add a sync method returning just `true` or `false`
* Add settings to define an own update service
* ~~Only compare to the latest release on GitHub (see [#1](https://github.com/axelrindle/github-version-checker/issues/1))~~
