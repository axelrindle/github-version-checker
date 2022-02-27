const versionCheck = require('../lib/main')
const options = {
    token: require('./token'),
    repo: 'github-version-checker',
    owner: 'axelrindle',
    currentVersion: require('../package.json').version
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
