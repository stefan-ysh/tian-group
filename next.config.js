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
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'teacher.yzu.edu.cn',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'p26.toutiaoimg.com',
      },
      {
        protocol: 'https',
        hostname: 'ts1.tc.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'tc.lepubiopharma.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);