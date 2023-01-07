#!/usr/bin/env node
import sade from 'sade'
import action from './action'

const program = sade('version-checker', true)

program
    .version('dev')
    .option('-o, --owner', 'The repository owner. May be a username or organization name.')
    .option('-r, --repository', 'The repository name.')
    .option('-c, --current-version', 'The current application version.')
    .option('-t, --tags', 'Fetches tags instead of releases.')
    .option('--no-pre-releases', 'Excludes pre-releases.', false)
    .option('--token', 'A PAT to use.')
    .option('--json', 'Outputs the raw result data as JSON.', false)
    .option('--verbose', 'Enables verbose logging.', false)
    .action(action)

program.parse(process.argv)
