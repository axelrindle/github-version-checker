# Async / Await

The future is now! Futuristic approach leveraging top-level await.

```js showLineNumbers title="src/util/version-check.js"
const versionCheck = require('github-version-checker')
const options = {
    // token: '...',
    repo: 'github-version-checker',
    owner: 'axelrindle',
    currentVersion: require('../package.json').version
}

try {
    // highlight-next-line
    const update = await versionCheck(options)
    if (update) { // update is null if there is no update available, so check here
        console.log('An update is available! ' + update.name)
        console.log('You are on version ' + options.currentVersion + '!')
    } else {
        console.log('You are up to date.')
    }
} catch (e) {
    console.error(e)
}
```
