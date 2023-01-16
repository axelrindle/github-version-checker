#!/usr/bin/env node
import sade from 'sade'
import action from './action'

const version = 'v%VERSION%'
const program = sade('version-checker', true)

program
    .version(version)
    .example('-o axelrindle -r github-version-checker -c 2.3.0')
    .example('-o axelrindle -r github-version-checker -c 2.3.0 --json')
    .example('-o axelrindle -r github-version-checker -c 2.3.0 --json --token gho_abcdef1234567890')
    .option('-o, --owner', 'The repository owner. May be a username or organization name.')
    .option('-r, --repository', 'The repository name.')
    .option('-c, --current-version', 'The current application version.')
    .option('-t, --tags', 'Fetches tags instead of releases.')
    .option('--no-pre-releases', 'Excludes pre-releases.')
    .option('--token', 'A PAT to use.')
    .option('--json', 'Outputs the raw result data as JSON.')
    .option('--verbose', 'Enables verbose logging.')
    .action(action)

program.parse(process.argv)
