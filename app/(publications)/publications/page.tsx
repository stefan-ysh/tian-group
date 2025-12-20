import { PublicationsPageClient } from './PublicationsPageClient';

import type { Metadata } from 'next';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';

export const metadata: Metadata = generateSEOMetadata({
  title: '成果及论文',
  description:
    '田甜科研小组发表的学术论文与研究成果，涵盖环糊精、钙钛矿、太阳能电池、发光材料等方向，包含期刊信息、作者、摘要与标签等。',
  keywords: ['科研成果', '论文发表', '学术论文', '期刊论文', '钙钛矿', '太阳能电池', '发光材料', '环糊精'],
  path: '/publications',
  type: 'website',
});

export default function PublicationsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  return (
    <>
      <BreadcrumbSchema items={[{ name: '首页', url: siteUrl }, { name: '成果及论文', url: `${siteUrl}/publications` }]} />
      <PublicationsPageClient />
    </>
  );
}
