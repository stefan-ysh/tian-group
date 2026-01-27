import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { findNewsItemById, loadAllAsNewsItems } from '../../../src/utils/contentLoader';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NewsDetailContent } from './NewsDetailContent';
import { BreadcrumbSchema, NewsArticleSchema } from '~/components/seo/JsonLd';
import { generateNewsMetadata, generateSEOMetadata } from '~/lib/seo';

// Force dynamic rendering to avoid issues with server/client components
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';
    const newsItem = await findNewsItemById(params.id, locale);
    
    if (!newsItem) {
      return generateSEOMetadata({
        title: locale === 'en' ? 'News Not Found' : '新闻未找到',
        description: locale === 'en' ? 'Sorry, the news content you requested was not found.' : '抱歉，您请求的新闻内容未找到。',
        path: `/news/${params.id}`,
        noindex: true,
      });
    }

    return generateNewsMetadata({
      id: newsItem.id,
      title: newsItem.title,
      excerpt: newsItem.summary || undefined,
      date: newsItem.date || undefined,
      image: newsItem.imageUrl || undefined,
      tags: newsItem.tags || [],
    });
  } catch (error) {
    console.error('Error generating metadata for news item:', error);
    return generateSEOMetadata({
      title: '新闻详情',
      description: '田甜课题组新闻详情页面。',
      path: `/news/${params.id}`,
    });
  }
}

// Generate static params for all news items
export async function generateStaticParams() {
  const news = await loadAllAsNewsItems();
  
  return news.filter(item => item !== null).map((item) => ({
    id: item.id
  }));
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';
  const newsItem = await findNewsItemById(params.id, locale);
  const t = await getTranslations({ locale, namespace: 'Header.NavMenu' });
  const newsT = await getTranslations({ locale, namespace: 'News' });
  const commonT = await getTranslations({ locale, namespace: 'Common' });
  
  // If news item not found, show 404
  if (!newsItem) {
    notFound();
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const url = `${siteUrl}/news/${params.id}`;
  
  return (
    <section className="w-full mx-auto">
      <BreadcrumbSchema
        items={[
          { name: commonT('Home'), url: siteUrl },
          { name: newsT('title'), url: `${siteUrl}/news` },
          { name: newsItem.title, url },
        ]}
      />
      <NewsArticleSchema news={{ ...newsItem, id: params.id, imageUrl: newsItem.imageUrl }} />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-foreground/60 hover:text-primary">
              {commonT('Home')}
            </Link>
            <span className="mx-2 text-foreground/60">/</span>
            <Link href="/news" className="text-foreground/60 hover:text-primary">
              {newsT('title')}
            </Link>
            <span className="mx-2 text-foreground/60">/</span>
            <span className="text-foreground">
              {newsItem.title.length > 20 ? `${newsItem.title.substring(0, 20)}...` : newsItem.title}
            </span>
          </nav>
        </div>
        
        {/* Use client component for rendering content */}
        <NewsDetailContent newsItem={newsItem} />
        
        {/* Back to news */}
        <div className="mt-8 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/10 rounded-md hover:bg-foreground/20 transition-colors"
          >
            {newsT('allNews')}
          </Link>
        </div>
      </div>
    </section>
  );
}
 