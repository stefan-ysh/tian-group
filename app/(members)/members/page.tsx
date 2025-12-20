import type { Metadata } from 'next';

import MembersPageClient from './MembersPageClient';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';

export const metadata: Metadata = generateSEOMetadata({
  title: '组内成员',
  description: '田甜科研小组成员介绍，包括博士后、博士研究生、硕士研究生及其他团队成员。',
  keywords: ['组内成员', '科研团队', '博士后', '博士研究生', '硕士研究生', '导师团队'],
  path: '/members',
  type: 'website',
});

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  return (
    <>
      <BreadcrumbSchema items={[{ name: '首页', url: siteUrl }, { name: '组内成员', url: `${siteUrl}/members` }]} />
      <MembersPageClient />
    </>
  );
}
