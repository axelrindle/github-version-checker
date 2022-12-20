# Fetch Git tags instead of GitHub releases

In case your repository does not use GitHub releases but just Git tags a call to the
releases api won't work.

Fetch the tags instead by setting `fetchTags` to `true`:

```js showLineNumbers title="src/util/version-check.js"
const versionCheck = require('github-version-checker')
const options = {
    token: 'my-token',
    repo: 'github-version-checker',
    owner: 'axelrindle',
    currentVersion: require('../package.json').version,
    // highlight-next-line
    fetchTags: true
}

versionCheck(options, function (error, update) {
    if (error) {
        console.error(error)
        process.exit(-1)
    }

    if (update) {
        console.log('An update is available! ' + update.name)
        console.log('You are on version ' + options.currentVersion + '!')
    } else {
        console.log('You are up to date.')
    }
})
```
