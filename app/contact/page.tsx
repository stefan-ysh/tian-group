import type { Metadata } from 'next';

import ContactPageClient from './ContactPageClient';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';
import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '联系我们',
  description:
    '田甜课题组联系方式与地址信息，欢迎科研合作、学术交流与加入团队。包含邮箱、地址与地图定位等信息。',
  keywords: ['联系方式', '联系', '地址', '邮箱', '科研合作', '学术交流', '加入我们', '扬州大学', '化学学院'],
  path: '/contact',
  type: 'website',
});

export default function Page() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';

  return (
    <>
      <BreadcrumbSchema items={[{ name: '首页', url: siteUrl }, { name: '联系我们', url: `${siteUrl}/contact` }]} />
      <ContactPageClient />
    </>
  );
}
