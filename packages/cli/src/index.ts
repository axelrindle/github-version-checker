#!/usr/bin/env node
import { readFileSync } from 'fs'
import sade from 'sade'
import action from './action'

const { version } = JSON.parse(readFileSync('./package.json').toString())
const program = sade('version-checker', true)

program
    .version(version)
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
