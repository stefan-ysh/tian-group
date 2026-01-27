import type { Metadata } from 'next';
import { getMessages, getLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import NewsPageClient from './NewsPageClient';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages: any = await getMessages({ locale });
  const t = messages.Metadata?.News || messages.News || {};

  return generateSEOMetadata({
    title: t.title || '新闻动态',
    description: t.description || '田甜课题组最新动态与科研进展，包含学术会议、研究成果发布、团队活动与重要通知等内容。',
    path: '/news',
    type: 'website',
  });
}

export default function Page() {
  const t = useTranslations('News');
  const common = useTranslations('Common');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  
  return (
    <>
      <BreadcrumbSchema items={[
        { name: common('Home'), url: siteUrl }, 
        { name: t('title'), url: `${siteUrl}/news` }
      ]} />
      <NewsPageClient />
    </>
  );
}
