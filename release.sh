#!/bin/bash

set -ex

# increment version
npx lerna version --no-push --no-git-tag-version

# version docs
VERSION=$(jq -r .version lerna.json)
cd docs
npx docusaurus docs:version "$VERSION"

# commit & push
cd ..
git add .
git commit --amend -m "chore(release): v$VERSION ✨"
git tag "v$VERSION"
git push
git push --tags

# publish
npx lerna publish --no-private from-package
