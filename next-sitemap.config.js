const SITE = require('./src/config.js').SITE;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `${SITE.origin}${SITE.basePathname}`,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  sourceDir: '.next',
  // 自动生成lastmod
  autoLastmod: true,
  generateIndexSitemap: false,
  // Robots.txt配置
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/blank/'],
      },
    ],
    additionalSitemaps: [`${SITE.origin}/sitemap.xml`],
  },
  exclude: ['/api/*', '/blank/*'],
  // 页面优先级配置
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';
    
    // 首页 - 最高优先级，每日更新
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // 详情页 - 中等优先级，月度更新
    else if (path.includes('/publications/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    else if (path.includes('/members/') || path.includes('/news/') || path.includes('/activities/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // 主要导航页面 - 高优先级，每周更新
    else if (['/publications', '/members', '/research', '/news', '/activities', '/joinus', '/contact'].some(p => path === p)) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // 其他页面
    else {
      priority = 0.6;
      changefreq = 'yearly';
    }

    if (path.startsWith('/api/')) {
      return null;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
