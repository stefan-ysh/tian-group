import type { Metadata } from 'next';
import { getMessages, getLocale, getTranslations } from 'next-intl/server';

import NewsPageClient from './NewsPageClient';
import { generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema } from '~/components/seo/JsonLd';
import { loadAllAsNewsItems } from '~/utils/contentLoader';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages: any = await getMessages({ locale });
  const t = messages.Metadata?.News || messages.News || {};

  return generateSEOMetadata({
    title: t.Title || t.title || '新闻动态',
    description: t.Description || t.description || '田甜课题组最新动态与科研进展，包含学术会议、研究成果发布、团队活动与重要通知等内容数据。',
    path: '/news',
    type: 'website',
  });
}

export default async function Page() {
  const t = await getTranslations('News');
  const common = await getTranslations('Common');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const locale = await getLocale();
  const allNews = await loadAllAsNewsItems(locale);
  const sortedNews = allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const initialLimit = 10;
  const initialNews = sortedNews.slice(0, initialLimit);
  const counts = sortedNews.reduce(
    (acc, item) => {
      acc.all += 1;
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    },
    { all: 0 } as Record<string, number>
  );
  
  return (
    <>
      <BreadcrumbSchema items={[
        { name: common('Home'), url: siteUrl }, 
        { name: t('title'), url: `${siteUrl}/news` }
      ]} />
      <NewsPageClient initialNews={initialNews} initialTotal={sortedNews.length} initialCounts={counts} />
    </>
  );
}
