#!/bin/sh
# The Lint and build job of the old GitHub workflow (ci.yml): install, lint, formatting, types, then the
# production build. Runs from the repository's root in the pinned Node image of yggdrasil.yml (the workflow's
# Node 24, Alpine, which has sh and no bash), so it runs the same on your own machine:
#   docker run --rm --user "$(id -u):$(id -g)" -e HOME=/tmp -v "$PWD:$PWD" -w "$PWD" <image> sh ci/lint-and-build.sh
set -eu

npm ci
npm run lint
npm run format:check
npm run typecheck
npm run build
