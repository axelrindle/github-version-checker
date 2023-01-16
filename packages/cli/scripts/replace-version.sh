#!/bin/bash

VERSION=$(jq -r .version < ../../lerna.json)

find dist -type f -exec sed -i "s/%VERSION%/$VERSION/g" {} \;

echo "Replaced %VERSION% tokens with $VERSION"
