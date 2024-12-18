#!/bin/bash

cd "$(dirname "$0")"
npm version patch
npm publish --tag beta
echo "Version patched!"