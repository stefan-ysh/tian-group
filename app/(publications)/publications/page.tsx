import { PublicationsPageClient } from './PublicationsPageClient';

import type { Metadata } from 'next';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';
import { getMessages, getLocale } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const m = await getMessages().then((m: any) => m.Metadata.Publications);
  const locale = await getLocale();
  
  return generateSEOMetadata({
    title: m.Title,
    description: m.Description,
    keywords: m.Keywords,
    path: '/publications',
    type: 'website',
    locale,
  });
}

export default async function PublicationsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const messages = await getMessages();
  const common = (messages as any).Common || {};
  const m = (messages as any).Metadata.Publications || {};

  return (
    <>
      <BreadcrumbSchema items={[
        { name: common.Home || '首页', url: siteUrl }, 
        { name: m.Title || '成果及论文', url: `${siteUrl}/publications` }
      ]} />
      <PublicationsPageClient />
    </>
  );
}
