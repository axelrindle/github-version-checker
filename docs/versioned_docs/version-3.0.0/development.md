---
sidebar_position: 99
sidebar_label: 👨‍💻 Development & Contributing
---

# Development & Contributing

Be sure to read the [Code of Conduct](https://github.com/axelrindle/github-version-checker/blob/main/CODE_OF_CONDUCT.md)

## Setup

First of all clone the git repository :)

```shell
$ git clone https://github.com/axelrindle/github-version-checker.git
```

and then install the dependencies

```shell
$ npm ci
```

By running [`npm ci`](https://docs.npmjs.com/cli/v9/commands/npm-ci) instead of [`npm i`](https://docs.npmjs.com/cli/v9/commands/npm-install) it is ensured that the dependency tree is installed exactly as stated in the [`package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) file. That guarantees the usage of identical dependency trees throughout development.

## Working on the packages

1. Bootstrap the Lerna environment

```shell
$ npx lerna bootstrap
```

2. Do your changes on a seperate branch, e.g. `feature/my-bug-fix`

## Contributing to the documentation

All documentation resided within the `docs/` directory. Is is built upon [Docusaurus](https://docusaurus.io/) and primarily written in Markdown.

Install dependencies using

```shell
$ npm ci
```

and start the development server by running

```shell
$ npm start
```

To produce a production build, run

```shell
$ npm run build
```

That produces a static site which can be served using

```shell
$ npm run serve
```
