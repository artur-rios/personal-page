import { afterEach, describe, expect, it, vi } from 'vitest';

const REPOSITORY = 'https://github.com/artur-rios/personal-page';

/** version.ts reads the environment when it is imported, so each case imports a fresh copy. */
async function buildVersionWith(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [name, value] of Object.entries(env)) {
    vi.stubEnv(name, value);
  }
  return (await import('./version')).buildVersion;
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('buildVersion', () => {
  it('given a production build, when labelled, then it shows the version and links its release', async () => {
    const version = await buildVersionWith({
      APP_VERSION: '1.5.1',
      APP_COMMIT: '0123456789abcdef',
      APP_ENVIRONMENT: 'production',
    });

    expect(version).toEqual({
      label: 'v1.5.1',
      href: `${REPOSITORY}/releases/tag/v1.5.1`,
    });
  });

  it('given a preview build, when labelled, then it adds the short commit and links it', async () => {
    const version = await buildVersionWith({
      APP_VERSION: '1.5.1',
      APP_COMMIT: '0123456789abcdef',
      APP_ENVIRONMENT: 'homologation',
    });

    expect(version).toEqual({
      label: 'v1.5.1 (0123456)',
      href: `${REPOSITORY}/commit/0123456`,
    });
  });

  it('given a local build with no commit, when labelled, then it shows the version without a link', async () => {
    const version = await buildVersionWith({
      APP_VERSION: '1.5.1',
      APP_COMMIT: undefined,
      APP_ENVIRONMENT: undefined,
    });

    expect(version).toEqual({ label: 'v1.5.1' });
  });

  it('given no version at all, when labelled, then it falls back to 0.0.0', async () => {
    const version = await buildVersionWith({
      APP_VERSION: undefined,
      APP_COMMIT: undefined,
      APP_ENVIRONMENT: undefined,
    });

    expect(version.label).toBe('v0.0.0');
  });
});
