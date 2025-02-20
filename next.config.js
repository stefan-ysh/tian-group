const SITE = require('./src/config.js').SITE;
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  trailingSlash: SITE.trailingSlash,
  basePath: SITE.basePathname !== '/' ? SITE.basePathname : '',

  swcMinify: true,
  poweredByHeader: false,
  // webpack: (config) => {
  //   config.resolve.alias.canvas = false;
  //   config.optimization.minimize = false;
  //   return config;
  // },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
      },
    },
  },
  // swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's2.loli.net',
      },
      {
        protocol: 'https',
        hostname: 'teacher.yzu.edu.cn',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);