import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { BreadcrumbSchema } from '~/components/seo/JsonLd';
import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '研究方向',
  description:
    '田甜科研小组的主要研究方向包括钙钛矿太阳能电池、有机非线性光学材料、发光材料与生物成像、光谱表征与材料测试等。',
  keywords: ['研究方向', '钙钛矿太阳能电池', '有机非线性光学材料', '发光材料', '生物成像', '光谱表征', '材料测试'],
  path: '/research',
  type: 'website',
});

export default function ResearchPage() {
  const t = useTranslations('ResearchPage');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  
  return (
    <div className="container mx-auto p-0 md:py-12 md:px-4 max-w-5xl">
      <BreadcrumbSchema items={[{ name: '首页', url: siteUrl }, { name: '研究方向', url: `${siteUrl}/research` }]} />
      {/* 页面标题 */}
      <div className="text-center mb-1">
        {/* 对SEO友好的隐藏标题 */}
        <h1 className="sr-only">{t('pageTitle')}</h1>
      </div>
      
      <div className=" rounded-2xl ">
        <div className="space-y-16">
          {/* 钙钛矿光伏材料与器件 */}
          <section>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 md:p-8 hover:shadow-md transition-all">
              <h2 className="text-2xl font-semibold mb-6 text-primary border-l-4 border-primary pl-4 flex items-center">
                {t('perovskiteTitle')}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-foreground/90 leading-relaxed">
                    {t('perovskiteDescription')}
                  </p>
                  
                  <h3 className="text-xl font-medium text-primary mb-3 mt-6">{t('researchContent')}</h3>
                  <ul className="list-disc list-inside space-y-3 text-foreground/90 ml-2">
                    <li className="pl-2">
                      <span className="font-medium">{t('perovskiteStructure')}</span>：{t('perovskiteStructureContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('printablePV')}</span>：{t('printablePVContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('interfaceDesign')}</span>：{t('interfaceDesignContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('leadFreePV')}</span>：{t('leadFreePVContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('largePeovskite')}</span>：{t('largePeovskiteContent')}
                    </li>
                  </ul>
                </div>
                
                <div className="lg:col-span-1 flex justify-center items-start">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image 
                      src="https://s2.loli.net/2025/04/11/HILsVPjtMEkm9Fl.png" 
                      alt={t('perovskiteTitle')} 
                      width={400} 
                      height={300}
                      className="object-contain bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* 有机非线性光学材料 */}
          <section>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 md:p-8 hover:shadow-md transition-all">
              <h2 className="text-2xl font-semibold mb-6 text-primary border-l-4 border-primary pl-4 flex items-center">
                {t('nonlinearTitle')}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex justify-center items-start order-last lg:order-first">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image 
                      src="https://s2.loli.net/2025/03/23/OubUxzXqMp36n1N.png" 
                      alt={t('nonlinearTitle')}
                      width={400} 
                      height={300}
                      className="object-contain bg-white"
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-foreground/90 leading-relaxed">
                    {t('nonlinearDescription')}
                  </p>
                  
                  <h3 className="text-xl font-medium text-primary mb-3 mt-6">{t('researchContent')}</h3>
                  <ul className="list-disc list-inside space-y-3 text-foreground/90 ml-2">
                    <li className="pl-2">
                      <span className="font-medium">{t('heatResistant')}</span>：{t('heatResistantContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('nanowires')}</span>：{t('nanowiresContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('dastResearch')}</span>：{t('dastResearchContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('multifunctional')}</span>：{t('multifunctionalContent')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* 发光材料与生物成像 */}
          <section>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 md:p-8 hover:shadow-md transition-all">
              <h2 className="text-2xl font-semibold mb-6 text-primary border-l-4 border-primary pl-4 flex items-center">
                {t('luminTitle')}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-foreground/90 leading-relaxed">
                    {t('luminDescription')}
                  </p>
                  
                  <h3 className="text-xl font-medium text-primary mb-3 mt-6">{t('researchContent')}</h3>
                  <ul className="list-disc list-inside space-y-3 text-foreground/90 ml-2">
                    <li className="pl-2">
                      <span className="font-medium">{t('goldClusters')}</span>：{t('goldClustersContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('luminFilms')}</span>：{t('luminFilmsContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('textiles')}</span>：{t('textilesContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('bioImaging')}</span>：{t('bioImagingContent')}
                    </li>
                  </ul>
                </div>
                
                <div className="lg:col-span-1 flex justify-center items-start">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image 
                      src="https://s2.loli.net/2025/04/12/L8d5qxVXQnNIhZe.png" 
                      alt={t('luminTitle')} 
                      width={400} 
                      height={300}
                      className="object-contain bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* 光谱表征与材料测试 */}
          <section>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 md:p-8 hover:shadow-md transition-all">
              <h2 className="text-2xl font-semibold mb-6 text-primary border-l-4 border-primary pl-4 flex items-center">
                {t('spectroTitle')}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex justify-center items-start order-last lg:order-first">
                  <div className="rounded-lg overflow-hidden shadow-md">
                    <Image 
                      src="https://s2.loli.net/2025/04/12/2EwDxbTWt64L3Aq.png" 
                      alt={t('spectroTitle')} 
                      width={400} 
                      height={300}
                      className="object-contain bg-white"
                    />
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-foreground/90 leading-relaxed">
                    {t('spectroDescription')}
                  </p>
                  
                  <h3 className="text-xl font-medium text-primary mb-3 mt-6">{t('researchContent')}</h3>
                  <ul className="list-disc list-inside space-y-3 text-foreground/90 ml-2">
                    <li className="pl-2">
                      <span className="font-medium">{t('spectroTech')}</span>：{t('spectroTechContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('interfaceMonitor')}</span>：{t('interfaceMonitorContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('characterization')}</span>：{t('characterizationContent')}
                    </li>
                    <li className="pl-2">
                      <span className="font-medium">{t('insituTech')}</span>：{t('insituTechContent')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* 小结 */}
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <h3 className="text-xl font-medium text-primary mb-4">{t('outlookTitle')}</h3>
            <p className="text-foreground/80 leading-relaxed">
              {t('outlookContent')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
