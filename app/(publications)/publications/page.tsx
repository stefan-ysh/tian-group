import { PublicationsPageClient } from './PublicationsPageClient';

import type { Metadata } from 'next';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';
import { getMessages, getLocale } from 'next-intl/server';
import { findLatestPublications } from '~/utils/publications';
import type { Publication } from '~/components/client/PublicationsClient';

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
  const locale = await getLocale();
  const publications = await findLatestPublications({ locale });
  const safePublications = (publications || [])
    .filter(Boolean)
    .map((pub: Publication) => ({
      ...pub,
      publishDate: pub.publishDate || '',
    }))
    .sort((a: Publication, b: Publication) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return (
    <>
      <BreadcrumbSchema items={[
        { name: common.Home || '首页', url: siteUrl }, 
        { name: m.Title || '成果及论文', url: `${siteUrl}/publications` }
      ]} />
      <PublicationsPageClient initialPublications={safePublications} />
    </>
  );
}
