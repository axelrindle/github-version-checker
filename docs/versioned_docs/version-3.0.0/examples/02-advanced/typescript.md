# TypeScript

```ts showLineNumbers title="src/util/version-check.ts"
import versionCheck from '@version-checker/core'

const currentVersion = getAppVersion()
const { update } = await versionCheck({
    token: 'my-token',
    repo: 'version-checker',
    owner: 'axelrindle',
    currentVersion,
})

if (update) {
    console.log('An update is available! ' + update.name)
    console.log('You are on version ' + currentVersion + '!')
} else {
    console.log('You are up to date.')
}
```
