import { ReleaseDescriptor, TagDescriptor } from '@version-checker/api'

export interface CliArguments {
    owner: string
    repository: string
    'current-version': string
    tags?: boolean
    'no-pre-releases': boolean
    token?: string
    json: boolean
    verbose: boolean
}

export interface JsonOutput {
    type: 'notfound'|'outdated'|'error'
    data: ReleaseDescriptor | TagDescriptor | undefined
}
