# Usage Examples

## Basic

```shell
$ version-checker \
    --owner axelrindle \
    --repository version-checker \
    --current-version 2.2.0
```

```
An update is available! v3.0.0
You are on version 2.3.0!
```

## With json output

```shell
$ version-checker --json \
    --owner axelrindle \
    --repository version-checker \
    --current-version 2.2.0
```

```json
{
  "type": "outdated",
  "data": {
    "name": "v2.3.0",
    "tag": {
      "name": "2.3.0"
    },
    "isPrerelease": false,
    "isDraft": false,
    "publishedAt": "2022-03-18T15:22:03Z",
    "url": "https://github.com/axelrindle/version-checker/releases/tag/2.3.0"
  }
}
```
