# Promise

Modern version using a Promise-based approach.

```js showLineNumbers title="src/util/version-check.js"
const versionCheck = require('@github-version-checker/core')
const options = {
    // token: '...',
    repo: 'github-version-checker',
    owner: 'axelrindle',
    currentVersion: require('../package.json').version
}

versionCheck(options)
    .then(function (result) {
        const { update } = result
        if (update) { // update is null if there is no update available, so check here
            console.log('An update is available! ' + update.name)
            console.log('You are on version ' + options.currentVersion + '!')
        } else {
            console.log('You are up to date.')
        }
    })
    .catch(function (error) {
        console.error(error)
    })
```
