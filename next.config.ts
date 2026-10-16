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
