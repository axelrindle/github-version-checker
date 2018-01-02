# github-version-checker
Simple **version checker** working with **GitHub releases** and the **GitHub API**.

## Install
```bash
$ npm install github-version-checker
```
or
```bash
$ yarn install github-version-checker
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
versionCheck(options, function (update, error) { // callback function
  if (error) throw error;
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
Check the [examples folder](https://github.com/axelrindle/github-version-checker/tree/master/examples) for more examples.

### Note on semantic versioning
Always try to follow a clear [semver format](http://semver.org/). This helps to avoid parsing mistakes and getting a clear result. Also read [here](https://github.com/npm/node-semver#versions).

## API
### `function versionCheck(options, [callback])`
Performs an update check with the given options. The `callback` is optional, can be left out to return a `Promise`.

#### The `options` object
Option | Default value | Description
--- | --- | ---
repo | **None. Required option** | Defines from which GitHub repository to load releases from.
currentVersion | **None. Required option** | Your app's current version. Needed to check if a newer release is found.
includePreReleases | false | Whether or not to include pre-releases. **Note:** This will fetch **all** releases, which might result in high traffic, depending on how much releases your app has on GitHub.

#### The `callback` function (optional)
Should be of the following form:
```javascript
function(update, error) {
  // ...your code
}
```
* `update`:
  * An object in the format specified [here](https://developer.github.com/v3/repos/releases/#get-a-single-release). `null` if no update was found.
* `error`:
  * If an error occurs, this holds the error message. `null` if no error occurs.


## Todo

* ~~Add a sync method returning just `true` or `false`~~ Can be achieved with **async/await**
* ~~Add settings to define an own update service~~ For now, I stay with GitHub releases only
* ~~Only compare to the latest release on GitHub (see [#1](https://github.com/axelrindle/github-version-checker/issues/1))~~
