import type { NextConfig } from 'next';
import { version } from './package.json';

const nextConfig: NextConfig = {
  // The image copies .next/standalone and runs its server.js (Dockerfile).
  output: 'standalone',
  // Inlined at build time and shown in the footer (src/lib/version.ts). The commit and environment
  // are the Docker build arguments GIT_COMMIT and YGG_ENVIRONMENT, empty in local builds.
  env: {
    APP_VERSION: version,
    APP_COMMIT: process.env.GIT_COMMIT || '',
    APP_ENVIRONMENT: process.env.YGG_ENVIRONMENT || 'development',
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
};

export default nextConfig;
