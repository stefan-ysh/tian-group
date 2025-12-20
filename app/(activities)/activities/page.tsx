import type { Metadata } from 'next';

import ActivitiesPageClient from './ActivitiesPageClient';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';

export const metadata: Metadata = generateSEOMetadata({
  title: '组内活动',
  description:
    '田甜科研小组组内活动记录，包括学术研讨会、实验室安全培训、国际学术会议参会、企业参观学习与组会讨论等。',
  keywords: ['组内活动', '学术研讨会', '安全培训', '国际会议', '企业参观', '组会'],
  path: '/activities',
  type: 'website',
});

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  return (
    <>
      <BreadcrumbSchema items={[{ name: '首页', url: siteUrl }, { name: '组内活动', url: `${siteUrl}/activities` }]} />
      <ActivitiesPageClient />
    </>
  );
}
