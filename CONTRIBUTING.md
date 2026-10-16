# Contributing

## Prerequisites

Node.js 20.9 or later. After cloning, run `npm install`.

## Checks

The gate before every pull request is the same one CI runs, passing:

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

The **Branch Policy** workflow checks all of this on every pull request and is a required check
on `develop` and `main`, together with CI's **Lint and build**. Pull requests into `main` also need
Vercel's preview deployment of the release to have succeeded (the **Vercel** status). Tags `v*`
cannot be moved or deleted once created.

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
same: the Branch Policy workflow refuses a `release/x.y.z → main` pull request whose `package.json`
does not say `x.y.z`, or whose version already has a tag.

## Releasing

The site is hosted on [Vercel](https://vercel.com), which deploys every pushed branch:

| Event                                                  | Deploys to                                               |
| ------------------------------------------------------ | -------------------------------------------------------- |
| Push to a `feature/` or `fix/` branch, or to `develop` | a Vercel **preview** deployment                          |
| Push of a `release/x.y.z` branch                       | a Vercel **preview** deployment — the release candidate  |
| Merge of `release/x.y.z` into `main`                   | **production** (`https://www.artur-rios.tech`), then tag |

Before cutting the release, finalize [CHANGELOG.md](./CHANGELOG.md) on `develop` through a normal
`feature/` or `fix/` pull request, since the release branch can carry no commits of its own: rename
`## [Unreleased]` to `## [1.4.0] - <yyyy-mm-dd>` above a fresh, empty `## [Unreleased]`, update the
compare links at the bottom, and set `1.4.0` as `version` in `package.json` (`npm version 1.4.0
--no-git-tag-version` also updates `package-lock.json`).

1. `git switch develop && git pull && git switch -c release/1.4.0 && git push -u origin release/1.4.0`
   — Vercel builds a preview of the release. Check it there before step 2.
2. Open a pull request `release/1.4.0 → main`.
3. When every check on the pull request passes, merge it with a merge commit. The release branch is
   deleted on merge.
4. Vercel deploys `main` to production. When the deployment succeeds, the **Release** workflow tags
   the merge commit `v1.4.0` and creates the GitHub release of that name, with notes generated from
   the pull requests merged since the previous tag; CHANGELOG.md is the curated record.
5. If the production deployment fails, nothing is tagged. Fix it on `develop` through a `fix/`
   branch and cut a new release; to go back to the previous version meanwhile, promote its
   deployment again from the Vercel dashboard (Instant Rollback).

If a release's tag is missing because GitHub never received the deployment event, run the
**Release** workflow by hand on `main` (Actions → Release → Run workflow).
