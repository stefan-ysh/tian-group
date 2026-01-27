import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { CheckCircle, GraduationCap, Book, Mail, BriefcaseBusiness, Users, Lightbulb } from 'lucide-react';

import { BreadcrumbSchema } from '~/components/seo/JsonLd';
import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '加入我们',
  description:
    '加入田甜课题组，我们欢迎有志于从事钙钛矿太阳能电池、有机非线性光学材料、发光材料等领域研究的博士后和研究生。',
  keywords: ['加入我们', '招聘', '博士后', '研究生', '人才招募', '科研团队', '扬州大学', '化学学院'],
  path: '/joinus',
  type: 'website',
});

export default function JoinUsWrapper({}) {
  const t = useTranslations('JoinUs');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';

  return (
    <section className="mx-auto max-w-5xl p-0 md:px-6 md:py-12">
      <BreadcrumbSchema items={[{ name: '首页', url: siteUrl }, { name: '加入我们', url: `${siteUrl}/joinus` }]} />
      {/* 页面标题 */}
      <div className="text-center mb-1">
        {/* 对SEO友好的隐藏标题 */}
        <h1 className="sr-only">{t('title')}</h1>
      </div>
      
      {/* 主要内容 */}
      <div className="bg-white/90 dark:bg-gray-800/80 rounded-2xl p-4 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        {/* 介绍部分 */}
        <div className="flex items-start mb-10">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-foreground/90 leading-relaxed text-lg">{t('description')}</p>
          </div>
        </div>

        {/* 申请要求 */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <GraduationCap className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-primary">{t('requirements')}</h2>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((num) => (
                <li key={num} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-foreground/90">{t(`positionRequirements.${num}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 研究方向 */}
        <div className="mb-10">
          <div className="flex items-center mb-6">
            <Lightbulb className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-primary">{t('researchDirection')}</h2>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl hover:shadow-md transition-all"
              >
                <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-full mb-4">
                  <Book className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground/90">{t(`researchDetails.${num}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 申请方式 */}
        <div>
          <div className="flex items-center mb-6">
            <Mail className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-primary">{t('applicationMethod')}</h2>
          </div>
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <div className="flex items-center">
              <BriefcaseBusiness className="w-8 h-8 text-primary mr-4" />
              <p className="text-foreground/90 text-lg">{t('email')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
