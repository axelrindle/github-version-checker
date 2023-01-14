[![npm](https://img.shields.io/npm/v/github-version-checker?logo=npm)](https://www.npmjs.com/package/github-version-checker)
[![GitHub Workflow Status (CI)](https://img.shields.io/github/actions/workflow/status/axelrindle/github-version-checker/ci.yml?branch=main&logo=github)](https://github.com/axelrindle/github-version-checker/actions/workflows/ci.yml)
[![GitHub Workflow Status (Docs)](https://img.shields.io/github/actions/workflow/status/axelrindle/github-version-checker/docs.yml?branch=main&label=Docs&logo=github)](https://github.com/axelrindle/github-version-checker/actions/workflows/docs.yml)
[![Codacy grade](https://img.shields.io/codacy/grade/f82826738d2b43b1b8ba40dd780d1784?logo=codacy)](https://www.codacy.com/gh/axelrindle/github-version-checker/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=axelrindle/github-version-checker&amp;utm_campaign=Badge_Grade)
[![Codacy coverage](https://img.shields.io/codacy/coverage/f82826738d2b43b1b8ba40dd780d1784?logo=codacy)](https://www.codacy.com/gh/axelrindle/github-version-checker/dashboard?utm_source=github.com&utm_medium=referral&utm_content=axelrindle/github-version-checker&utm_campaign=Badge_Coverage)

---

🚧 **Notice** 🚧

*This project is being renamed to just **version-checker** as I plan to support other platforms than Github in the future.*

---

# github-version-checker

> Simple **version checker** working with **GitHub releases** and the **GitHub API**.

## Supported Node.js versions

`>= 14`

While versions below 14.x are not officially tested they might work anyway.

The build works on 12.x so usage should be safe.

Everything below 12.x is not guaranteed to work.

## Is this ESM only?

**No.**

This module may be require'd (CommonJS) or imported (ESM).

I do not plan on making this an ESM only module in the near future.

## Install

```bash
$ npm install @version-checker/core
```

## Documentation

[version-checker (axelrindle.github.io)](https://axelrindle.github.io/github-version-checker/)

## Contributing

Feel free to contribute to this project in any form.
Just make sure to read the [Code of Conduct](https://github.com/axelrindle/github-version-checker/blob/main/CODE_OF_CONDUCT.md).

[Open an issue](https://github.com/axelrindle/github-version-checker/issues/new) if there is anything you're having problems with.

### Setup

First of all clone the git repository :)

```shell
$ git clone https://github.com/axelrindle/github-version-checker.git
```

and then install the dependencies

```shell
$ npm ci
```

By running [`npm ci`](https://docs.npmjs.com/cli/v9/commands/npm-ci) instead of [`npm i`](https://docs.npmjs.com/cli/v9/commands/npm-install) it is ensured that the dependency tree is installed exactly as stated in the [`package-lock.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json) file. That guarantees the usage of identical dependency trees throughout development.

### Working on the packages

1. Bootstrap the Lerna environment

```shell
$ npx lerna bootstrap
```

2. Do your changes on a seperate branch, e.g. `feature/my-bug-fix`

3. When done, run tests using the following command:

```shell
$ npx lerna run test
```

### Contributing to the documentation

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

## License

[MIT](LICENSE)
