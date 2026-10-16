import type { NextConfig } from 'next';
import { version } from './package.json';

const nextConfig: NextConfig = {
  // Inlined at build time and shown in the footer (src/lib/version.ts). The commit and environment
  // come from Vercel's system environment variables and are empty in local builds.
  env: {
    APP_VERSION: version,
    APP_COMMIT: process.env.VERCEL_GIT_COMMIT_SHA ?? '',
    APP_ENVIRONMENT: process.env.VERCEL_ENV ?? 'development',
  },
  // The Heimdall group covered only the API until its UI joined it under one slug.
  async redirects() {
    return [
      {
        source: '/projects/heimdall-api',
        destination: '/projects/heimdall',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
      },
    ],
  },
};

export default nextConfig;
