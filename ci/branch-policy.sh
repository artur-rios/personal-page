#!/bin/sh
# The part of the old Branch Policy workflow that yggdrasil's common branch policy does not know: a pull request from
# release/x.y.z into main must carry that version in package.json, which the footer shows (next.config.ts) and
# CONTRIBUTING.md asks to set when the changelog is finalized. yggdrasil.yml runs it as `branchPolicy`, after
# scripts/branch-policy.sh, in a small image from the root of the pull request's head checkout, with HEAD_REF and
# BASE_REF set. Without them -- on your machine -- pass the two refs as arguments:
#   sh ci/branch-policy.sh release/1.3.0 main
# Anything but a pull request into main from release/<major>.<minor>.<patch> is already judged by
# scripts/branch-policy.sh.
set -eu
cd "$(dirname "$0")/.."

head_ref=${1:-${HEAD_REF:-}}
base_ref=${2:-${BASE_REF:-}}

case $base_ref:$head_ref in
  main:release/[0-9]*.[0-9]*.[0-9]*) ;;
  *) echo "'$head_ref' -> '$base_ref': nothing more to check."; exit 0 ;;
esac
version=${head_ref#release/}

# The first "version" of package.json is the package's own (top level, before any dependency).
found=$(sed -n 's/^[[:space:]]*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' package.json | head -n 1)
if [ "$found" != "$version" ]; then
  echo "package.json says version '${found:-<none>}', but this releases $version. Set it on develop (with the changelog) and cut the release branch again." >&2
  exit 1
fi
echo "package.json says $version, as the release does."
