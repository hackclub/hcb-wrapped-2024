#!/bin/bash

cd "$(dirname "$0")"
npm version patch
npm publish --tag beta --access public
echo "Version patched!"