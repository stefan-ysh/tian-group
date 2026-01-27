import type { Metadata } from 'next';

import NewsPageClient from './NewsPageClient';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';

export const metadata: Metadata = generateSEOMetadata({
  title: '新闻动态',
  description:
    '田甜课题组最新动态与科研进展，包含学术会议、研究成果发布、团队活动与重要通知等内容。',
  keywords: ['新闻动态', '科研进展', '学术会议', '团队活动', '研究成果'],
  path: '/news',
  type: 'website',
});

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  return (
    <>
      <BreadcrumbSchema items={[{ name: '首页', url: siteUrl }, { name: '新闻动态', url: `${siteUrl}/news` }]} />
      <NewsPageClient />
    </>
  );
}
