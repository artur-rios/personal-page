# Personal Page

Source for Artur Rios' personal website: a short bio, the technologies and cloud
providers he works with, a catalogue of open source projects and a contact form.
The site is available in English and Brazilian Portuguese.

The repository lives at <https://git.techcraftsmen.net/artur-rios/personal-page>; the GitHub
repository is a read-only mirror of it.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, server-rendered, run from its standalone output in a Docker image)
- [React](https://react.dev) 19 and [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) 4 with [shadcn/ui](https://ui.shadcn.com) components
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev) for the contact form

## Getting started

Requires Node.js 20.9 or later.

```bash
git clone https://git.techcraftsmen.net/artur-rios/personal-page.git
cd personal-page
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the development server             |
| `npm run build`        | Create a production build                |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Lint the project with ESLint             |
| `npm run typecheck`    | Type-check the project with TypeScript   |
| `npm run format`       | Format the project with Prettier         |
| `npm run format:check` | Check formatting without writing changes |

## Project structure

```text
src/
  app/          Routes: home, /projects, /projects/[slug], /contact and /healthz
  components/   Page sections and shadcn/ui primitives (components/ui)
  lib/          Navigation links, project data and helpers
  types/        Shared content types
public/         Icons and images
ci/             The scripts Jenkins runs (yggdrasil.yml): lint-and-build and the branch policy
Dockerfile      The image the site is deployed as
```

### The image

```bash
docker build -t personal-page --build-arg GIT_COMMIT=$(git rev-parse HEAD) --build-arg YGG_ENVIRONMENT=production .
docker run --rm -p 8080:8080 personal-page
```

It serves on port 8080 as a non-root user and answers `/healthz`. `GIT_COMMIT` and `YGG_ENVIRONMENT`
set the version label in the footer.

### Editing content

- **Navigation links**: `src/lib/config.ts`
- **Projects and project groups**: `src/lib/projects.ts`. Every group gets its own
  page at `/projects/<slug>`.
- **Technologies and cloud providers**: `src/components/tech-cards.tsx`

### Languages

The active language is selected with the toggle in the navbar and kept in the
`?lang=pt` query parameter, so links to the Portuguese version can be shared.
English is the default and is used for the prerendered HTML. Use the
`Localized` component or the `useLanguage` hook to add translated text.

## Contributing

Work happens on `feature/` and `fix/` branches cut from `develop`, and releases
go to production through `release/x.y.z` pull requests into `main`. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the branching model and how to release,
and [CHANGELOG.md](CHANGELOG.md) for what changed in each version.

## License

Released under the [Artur Rios Attribution License](LICENSE).
