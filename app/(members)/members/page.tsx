import type { Metadata } from 'next';

import MembersPageClient from './MembersPageClient';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';
import { getLocale } from 'next-intl/server';
import { findLatestMembers } from '~/utils/members';

export const metadata: Metadata = generateSEOMetadata({
  title: '组内成员',
  description: '田甜课题组人员介绍，包括博士后、博士研究生、硕士研究生及其他团队成员。',
  keywords: ['组内成员', '科研团队', '博士后', '博士研究生', '硕士研究生', '导师团队'],
  path: '/members',
  type: 'website',
});

export default async function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const locale = await getLocale();
  const members = await findLatestMembers({ locale });
  const sortedMembers = (members || []).filter(Boolean).sort((a: { order?: number }, b: { order?: number }) => {
    return (a.order || 0) - (b.order || 0);
  });
  return (
    <>
      <BreadcrumbSchema items={[{ name: '首页', url: siteUrl }, { name: '组内成员', url: `${siteUrl}/members` }]} />
      <MembersPageClient initialMembers={sortedMembers} />
    </>
  );
}
