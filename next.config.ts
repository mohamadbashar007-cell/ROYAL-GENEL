import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === '1';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(githubPages ? {
    output: 'export',
    basePath: '/ROYAL-GENEL',
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
