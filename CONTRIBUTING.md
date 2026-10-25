# Contributing

This repository lives at <https://git.techcraftsmen.net/artur-rios/personal-page>; the GitHub repository is a
read-only mirror of it. Open pull requests on the git server.

## Prerequisites

Node.js 20.9 or later. After cloning, run `npm install`.

## Checks

The gate before every pull request is the same one Jenkins runs as the `lint-and-build` check
([`ci/lint-and-build.sh`](ci/lint-and-build.sh)), passing:

```bash
npm run lint && npm run format:check && npm run typecheck && npm run build
```

## Branching model

```
feature/<name> ─┐
fix/<name> ─────┴─▶ develop ──▶ release/x.y.z ──▶ main  (tag vx.y.z)
```

| Branch                         | Cut from  | Merges into | How                                                            |
| ------------------------------ | --------- | ----------- | -------------------------------------------------------------- |
| `feature/<name>`, `fix/<name>` | `develop` | `develop`   | Pull request, squash or merge. The branch is deleted on merge. |
| `release/x.y.z`                | `develop` | `main`      | Pull request, merge commit only.                               |
| `develop`, `main`              | —         | —           | Protected: no direct pushes, no force pushes, no deletion.     |

Names are lowercase: letters, digits, `.`, `_` and `-`. A `release/` branch is a snapshot of
`develop` and carries no commits of its own: a fix for a release lands on `develop` through a
`fix/` branch and a new release branch is cut.

Jenkins runs the **branch policy** on every pull request into `develop` or `main`, and the
`lint-and-build` check, and all of them are required. Into `develop` only from `feature/` or `fix/` branches
(or Renovate's) cut from `develop`; into `main` only from a `release/<major>.<minor>.<patch>` branch whose
every commit is already on `develop`, whose version has no tag yet and whose `package.json` says that version
([`ci/branch-policy.sh`](ci/branch-policy.sh)). Tags `v*` cannot be moved or deleted once created.

The repository owner can bypass these rules. That is for emergencies, not for routine work.

## Commits and the changelog

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) with a lowercase
subject, e.g. `feat: add the talks page` or `fix: keep the language when navigating`.

Record every change a visitor of the site would notice under `## [Unreleased]` in
[CHANGELOG.md](./CHANGELOG.md), in the same pull request that makes it.

## Versioning

The site follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). For a website, what a
version number promises is about the people who visit it and link to it:

- **Major** — a release that breaks something visitors rely on: a page is removed or moves to
  another URL, so existing links stop working, or a language is dropped.
- **Minor** — new pages, sections or capabilities that leave existing ones working as before.
- **Patch** — fixes with no new capability: a defect, a layout or wording correction, a content
  update, a dependency update.

The release version is the name of the release branch, and `version` in `package.json` must say the
same: the branch policy refuses a `release/x.y.z → main` pull request whose `package.json`
does not say `x.y.z`, or whose version already has a tag.

The footer of every page shows the running version, read from `package.json` at build time
(`next.config.ts`), so setting it is what makes the release visible on the site. The development and
homologation deployments add the short commit they were built from, since `develop` and a release
candidate carry the previous release's version until the changelog is finalized.

## Releasing

The site is built into an image by its [`Dockerfile`](Dockerfile) and deployed by Jenkins, from the commit it
is deploying (`GIT_COMMIT` and `YGG_ENVIRONMENT` are the build arguments the footer's version label reads):

| Event                                | Deploys to                                                          |
| ------------------------------------ | ------------------------------------------------------------------- |
| Push to `develop`                    | **development** (`https://www-dev.artur-rios.tech`)                 |
| Push of a `release/x.y.z` branch     | **homologation** (`https://www-hml.artur-rios.tech`), the candidate |
| Merge of `release/x.y.z` into `main` | **production** (`https://www.artur-rios.tech`), then tag            |

`https://artur-rios.tech` redirects to `https://www.artur-rios.tech`.

Before cutting the release, finalize [CHANGELOG.md](./CHANGELOG.md) on `develop` through a normal
`feature/` or `fix/` pull request, since the release branch can carry no commits of its own: rename
`## [Unreleased]` to `## [1.4.0] - <yyyy-mm-dd>` above a fresh, empty `## [Unreleased]`, update the
compare links at the bottom, and set `1.4.0` as `version` in `package.json` (`npm version 1.4.0
--no-git-tag-version` also updates `package-lock.json`).

1. `git switch develop && git pull && git switch -c release/1.4.0 && git push -u origin release/1.4.0`
   — Jenkins deploys the release candidate to homologation. Check it there before step 2.
2. Open a pull request `release/1.4.0 → main`.
3. When the branch policy and the checks on the pull request pass, Jenkins deploys the release to
   production. Once that succeeds it merges the pull request (a merge commit, and the release branch is
   deleted) and tags the merge commit `v1.4.0`. Nobody merges or tags by hand.
4. If the production deployment fails, nothing is merged or tagged. Fix it on `develop` through a `fix/`
   branch and cut a new release; production keeps running the previous version meanwhile.
