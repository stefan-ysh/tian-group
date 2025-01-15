const SITE = require('./src/config.js').SITE;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `${SITE.origin}${SITE.basePathname}`,
  changefreq: 'daily',
  priority: 0.8,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;
    // 此处设置首页的优先级和更新频率
    if (path === '/') {
      // 首页的最高优先级
      priority = 1.0;
      // 例如，每小时更新一次
      changefreq = 'hourly';
    }

    return {
      // 导出为路径 <path> 的配置
      loc: path,
      changefreq: config.changefreq,
      // 备用引用，若配置中有alternateRefs则使用，否则为空数组
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // 这里的代码用于排除特定路径
  exclude: ['/blank/*'],
};
