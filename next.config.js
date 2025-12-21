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
    // 启用现代图片格式（AVIF 和 WebP）
    formats: ['image/avif', 'image/webp'],
    // 设备尺寸配置，优化不同设备的图片加载
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // 图片尺寸配置，用于响应式图片
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 最小缓存时间（秒）
    minimumCacheTTL: 60,
    // 远程图片域名白名单
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
      {
        protocol: 'https',
        hostname: 'media.springernature.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);