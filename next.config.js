const SITE = require('./src/config.js').SITE;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  trailingSlash: SITE.trailingSlash,
  basePath: SITE.basePathname !== '/' ? SITE.basePathname : '',

  swcMinify: true,
  poweredByHeader: false,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.optimization.minimize = false;
    return config;
  },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pubs.acs.org',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  }
};
