# github-version-checker
Simple **version checker** working with **GitHub releases** and the **GitHub API**.

## Install
```bash
npm install --save github-version-checker
```

## Usage
### JavaScript
```javascript
// require modules
const versionCheck = require('github-version-checker');
const pkg = require('./package.json'); // or whereever your package.json lies

// version check options
const options = {
  repo: 'axelrindle/github-version-checker', // will be expanded to https://api.github.com/repos/axelrindle/github-version-checker/releases
  currentVersion: pkg.version
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

### CoffeeScript
```coffeescript
# require modules
versionCheck = require('github-version-checker')
pkg = require('./package.json') # or whereever your package.json lies

# version check options
options =
  repo: 'axelrindle/github-version-checker'
  currentVersion: pkg.version

versionCheck options, (update) -> # callback function
  if update # print some update info if an update is available
    console.log 'An update is available!'
    console.log 'New version: ' + update.tag_name
    console.log 'Details here: ' + update.html_url

  # start your app
  console.log 'Starting app...'
  #...
```

## The `update` object
The object you receive in the callback function, follows the format specified here:
https://developer.github.com/v3/repos/releases/#get-a-single-release
