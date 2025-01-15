const SITE = require('./src/config.js').SITE;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `${SITE.origin}${SITE.basePathname}`,
  changefreq: 'daily',
  priority: 0.8,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const result = []

    // required value only
    // result.push({ loc: '/additional-page-1' })

    // all possible values
    // result.push({
    //   loc: '/additional-page-2',
    //   changefreq: 'yearly',
    //   priority: 0.7,
    //   lastmod: new Date().toISOString(),

    //   // acts only on '/additional-page-2'
    //   alternateRefs: [
    //     {
    //       href: 'https://es.example.com',
    //       hreflang: 'es',
    //     },
    //     {
    //       href: 'https://fr.example.com',
    //       hreflang: 'fr',
    //     },
    //   ],
    // })

    // using transformation from the current configuration
    result.push(await config.transform(config, '/'))
    result.push(await config.transform(config, '/research'))
    result.push(await config.transform(config, '/publications'))
    result.push(await config.transform(config, '/members'))
    result.push(await config.transform(config, '/news'))
    result.push(await config.transform(config, '/activities'))
    result.push(await config.transform(config, '/joinus'))
    result.push(await config.transform(config, '/contact'))
    return result
  },
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
