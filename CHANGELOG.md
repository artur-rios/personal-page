# Changelog

All notable changes to the personal page are recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Project pages link to the documentation site of the project as a whole, for Alexandria, Heimdall
  and Fortuna.
- A Fortuna project, with its API and UI repositories, and the Heimdall UI repository under
  Heimdall.
- A Rust card among the technologies on the home page.

### Changed

- The JavaScript and TypeScript cards on the home page are one card.
- The Heimdall project page moved from `/projects/heimdall-api` to `/projects/heimdall`; the old
  address redirects to it.

## [1.0.0] - 2026-10-16

### Added

- The footer shows the version of the site that is running, linked to its GitHub release, in place
  of the copyright year, name and license line. Preview deployments also show the commit they were
  built from.

### Changed

- Pages are prerendered with their content, so it shows before scripts load and the light or
  dark theme no longer flashes on first paint.
- The language choice no longer adds browser history entries, so the back button leaves the page
  on the first press. English pages no longer carry `?lang=en`.
- Each page has its own title in the browser tab, and project pages their own description.
- The theme menu, the "show more" tags and the menu buttons are translated into Portuguese.
- Updated all dependencies to their latest releases.

### Fixed

- Footer links to the blog, the manifesto and the resume open the Portuguese version when the
  site is in Portuguese, and external footer links open in a new tab.
- Contact form messages containing `&`, `#` or line breaks reach the e-mail client intact.
- A typo in the Portuguese description of Alexandria UI.

[Unreleased]: https://github.com/artur-rios/personal-page/compare/v1.0.0...develop
[1.0.0]: https://github.com/artur-rios/personal-page/releases/tag/v1.0.0
