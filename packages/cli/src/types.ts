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
