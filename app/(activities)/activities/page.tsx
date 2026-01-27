import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import ActivitiesPageClient from './ActivitiesPageClient';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  // 这里的 Metadata 文件可能还没有 activities 的翻译，我们先直接用通用的或者手动写
  // 建议在 en.json 和 zh.json 的 Metadata 增加 Activities 部分
  return generateSEOMetadata({
    title: t('Activities.Title') || (locale === 'en' ? 'Group Activities' : '组内活动'),
    description: t('Activities.Description') || (locale === 'en' 
      ? 'Records of group activities in Prof. Tian\'s lab, including academic seminars, lab safety training, international conferences, industrial visits, and group meetings.' 
      : '田甜课题组组内活动记录，包括学术研讨会、实验室安全培训、国际学术会议参会、企业参观学习与组会讨论等。'),
    keywords: locale === 'en' 
      ? ['Group Activities', 'Academic Seminars', 'Safety Training', 'International Conferences', 'Industrial Visits', 'Group Meetings']
      : ['组内活动', '学术研讨会', '安全培训', '国际会议', '企业参观', '组会'],
    path: '/activities',
    type: 'website',
  });
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';
  const t = await getTranslations({ locale, namespace: 'Header.NavMenu' });
  const commonT = await getTranslations({ locale, namespace: 'Common' });
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: commonT('Home'), url: siteUrl }, 
          { name: t('activities'), url: `${siteUrl}/activities` }
        ]} 
      />
      <ActivitiesPageClient />
    </>
  );
}
