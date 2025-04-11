import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function generateMetadata({ params: { locale }}: any) {
  const t = await getTranslations({ locale, namespace: 'ResearchPage' });
  
  return {
    title: `${t('pageTitle')} | 田甜科研小组`,
    description: t('pageDescription'),
    keywords: '钙钛矿太阳能电池, 有机非线性光学材料, 发光材料, 生物成像, 光谱表征, 扬州大学, 田甜科研组',
  };
}

export default function ResearchPage() {
  const t = useTranslations('ResearchPage');
  
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <p className="text-center text-foreground/70 mb-10 max-w-3xl mx-auto">
        {t('pageDescription')}
      </p>
      
      <div className="space-y-16">
        {/* 钙钛矿光伏材料与器件 */}
        <section>
          <div className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-primary border-l-4 border-primary pl-4 flex items-center">
              {t('perovskiteTitle')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-foreground/90 leading-relaxed">
                  {t('perovskiteDescription')}
                </p>
                
                <h3 className="text-xl font-medium text-primary/90 mt-6 mb-3">{t('researchContent')}</h3>
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
          <div className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-8 shadow-md">
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
                
                <h3 className="text-xl font-medium text-primary/90 mt-6 mb-3">{t('researchContent')}</h3>
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
          <div className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-primary border-l-4 border-primary pl-4 flex items-center">
              {t('luminTitle')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <p className="text-foreground/90 leading-relaxed">
                  {t('luminDescription')}
                </p>
                
                <h3 className="text-xl font-medium text-primary/90 mt-6 mb-3">{t('researchContent')}</h3>
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
          <div className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-8 shadow-md">
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
                
                <h3 className="text-xl font-medium text-primary/90 mt-6 mb-3">{t('researchContent')}</h3>
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
        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
          <h3 className="text-xl font-medium text-primary mb-4">{t('outlookTitle')}</h3>
          <p className="text-foreground/80 leading-relaxed">
            {t('outlookContent')}
          </p>
        </div>
      </div>
    </div>
  );
}
