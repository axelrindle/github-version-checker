---
sidebar_position: 1
---

# 🔜 Unreleased
## Added

- A brand new CLI interface for usage in non Node.js projects.

## Changed

- `undefined` is returned instead of `null` in case of no found updates.
- The usage of the GraphQL API may be explicitly disabled by passing `false` for the `token`.
- The GraphQL queries have been optimized in terms of stability and reliability.
- Using [Octokit](https://github.com/octokit) under the hood.

## Removed

- The `reduceTraffic` option.
- Official support for Node.js below version 12. Older version might work but are not tested.

## Security

- Dependencies have been updated.
- The project is officially built and released with Node.js 18.

## Other

- Documentation an other stuff is now hosted at https://axelrindle.github.io/version-checker/
- Moved to TypeScript.
- Using [Lerna](https://lerna.js.org/) for monorepo management.
