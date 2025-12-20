import type { Metadata } from 'next';
import { findNewsById, fetchNews } from '../../../src/utils/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NewsDetailContent } from './NewsDetailContent';
import { DetailNewsItem } from '../../../src/types/content';

import { BreadcrumbSchema, NewsArticleSchema } from '~/components/seo/JsonLd';
import { generateNewsMetadata, generateSEOMetadata } from '~/lib/seo';

// Force dynamic rendering to avoid issues with server/client components
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generate metadata for the page - This approach is working correctly so we'll keep it
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const newsItem = await findNewsById(params.id);
    
    if (!newsItem) {
      return generateSEOMetadata({
        title: '新闻未找到',
        description: '抱歉，您请求的新闻内容未找到。',
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
      description: '田甜科研小组新闻详情页面。',
      path: `/news/${params.id}`,
    });
  }
}

// Generate static params for all news items
export async function generateStaticParams() {
  const news = await fetchNews();
  
  return news.filter(item => item !== null).map((item) => ({
    id: item.id
  }));
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsItem = await findNewsById(params.id);
  
  // If news item not found, show 404
  if (!newsItem) {
    notFound();
  }
  
  // Create a safe version of the news item for the client component
  const safeNewsItem = {
    id: newsItem.id,
    title: newsItem.title,
    date: newsItem.date || '',
    summary: newsItem.summary || '',
    type: newsItem.type || '',
    imageUrl: newsItem.imageUrl,
    link: newsItem.link,
    tags: newsItem.tags || [],
    authors: newsItem.authors || [],
    publication: newsItem.publication || undefined
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const url = `${siteUrl}/news/${params.id}`;
  
  return (
    <section className="w-full mx-auto">
      <BreadcrumbSchema
        items={[
          { name: '首页', url: siteUrl },
          { name: '新闻动态', url: `${siteUrl}/news` },
          { name: newsItem.title, url },
        ]}
      />
      <NewsArticleSchema news={{ ...safeNewsItem, id: params.id, imageUrl: newsItem.imageUrl }} />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm">
            <Link href="/" className="text-foreground/60 hover:text-primary">
              首页
            </Link>
            <span className="mx-2 text-foreground/60">/</span>
            <Link href="/news" className="text-foreground/60 hover:text-primary">
              新闻动态
            </Link>
            <span className="mx-2 text-foreground/60">/</span>
            <span className="text-foreground">
              {newsItem.title.length > 20 ? `${newsItem.title.substring(0, 20)}...` : newsItem.title}
            </span>
          </nav>
        </div>
        
        {/* Use client component for rendering content */}
        <NewsDetailContent newsItem={safeNewsItem} />
        
        {/* Back to news */}
        <div className="mt-8 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/10 rounded-md hover:bg-foreground/20 transition-colors"
          >
            返回新闻列表
          </Link>
        </div>
      </div>
    </section>
  );
} 