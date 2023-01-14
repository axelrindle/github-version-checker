# Command Line Interface (CLI)

The CLI offers to perform a version check in non-Node.js environments.
It supports plain-text and JSON-formatted output.

## Usage

```

  $ version-checker [options]

  Options
    -o, --owner              The repository owner. May be a username or organization name.
    -r, --repository         The repository name.
    -c, --current-version    The current application version.
    -t, --tags               Fetches tags instead of releases.
    --no-pre-releases        Excludes pre-releases.  (default false)
    --token                  A PAT to use.
    --json                   Outputs the raw result data as JSON.  (default false)
    --verbose                Enables verbose logging.  (default false)
    -v, --version            Displays current version
    -h, --help               Displays this message

```
