---
sidebar_position: 0
---

# 🔜 Unreleased

## Added

- A new package `@version-checker/browser` for usage in browser environments (**experimental**)

## Changed

- The `@version-checker/core` package now ships CJS and ESM builds.

## Fixed

- The token will be only read from `process.env` if `process` is not `undefined`.
