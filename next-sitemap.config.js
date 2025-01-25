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
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/Emission and Absorption Spectroscopic Techniques for Characterizing Perovskite Solar Cells',
    //   ),
    // );
    // result.push(
    //   await config.transform(config, '/publications/Advancing Perspectives on Large-Area Perovskite Luminescent Films'),
    // );
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/Unlocking multi-photon excited luminescence in pyrazolate trinuclear gold clusters for dynamic cell imaging',
    //   ),
    // );
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/Durable organic nonlinear optical membranes for thermotolerant lightings and in vivo%',
    //   ),
    // );
    // result.push(
    //   await config.transform(config, '/publications/Large-area waterproof and durable perovskite luminescent textiles'),
    // );
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/Chemical Linkage and Passivation at Buried Interface for Thermally Stable Inverted Perovskite Solar Cells with Efficiency over 22 percent',
    //   ),
    // );
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/Multidentate Chelation Heals Structural Imperfections for Minimized Recombination Loss in Lead‐Free Perovskite Solar Cells',
    //   ),
    // );
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/Carbon Electrode Endows High‐Efficiency Perovskite Photovoltaics Affordable, Fully Printable, and Durable',
    //   ),
    // );
    // result.push(
    //   await config.transform(config, '/publications/Custom Molecular Design of Ligands for Perovskite Photovoltaics'),
    // );
    // result.push(
    //   await config.transform(config, '/publications/Stabilizing black-phase CsPbI3 under over 70 percent humidity'),
    // );
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/Interfacial Linkage and Carbon Encapsulation Enable Full Solution‐Printed Perovskite Photovoltaics with Prolonged Lifespan',
    //   ),
    // );
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/DAST Optical Damage Tolerance Enhancement and Robust Lasing via Supramolecular Strategy',
    //   ),
    // );
    // result.push(
    //   await config.transform(
    //     config,
    //     '/publications/One-Drop Self-Assembly of Ultra-Fine Second-Order Organic Nonlinear Optical Crystal Nanowires',
    //   ),
    // );
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
