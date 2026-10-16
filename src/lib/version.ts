const repositoryUrl = 'https://github.com/artur-rios/personal-page';

const version = process.env.APP_VERSION ?? '0.0.0';
const commit = (process.env.APP_COMMIT ?? '').slice(0, 7);
const isProduction = process.env.APP_ENVIRONMENT === 'production';

export interface BuildVersion {
  /** What the footer shows: v<version>, plus the short commit outside production */
  label: string;
  /** The GitHub release in production, the commit in a preview, none in a local build */
  href?: string;
}

/**
 * The version of the running build, from package.json. Previews of develop and of a release
 * candidate carry the same version as the last release, so they also show the commit they were
 * built from.
 */
export const buildVersion: BuildVersion = isProduction
  ? { label: `v${version}`, href: `${repositoryUrl}/releases/tag/v${version}` }
  : commit
    ? { label: `v${version} (${commit})`, href: `${repositoryUrl}/commit/${commit}` }
    : { label: `v${version}` };
