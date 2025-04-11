import { Metadata } from 'next';
import { findNewsById, fetchNews } from '../../../src/utils/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NewsDetailContent } from './NewsDetailContent';
import { DetailNewsItem } from '../../../src/types/content';

// Let Next.js decide the best rendering strategy
export const dynamic = 'auto';
export const dynamicParams = true;

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const newsItem = await findNewsById(params.id);
  
  if (!newsItem) {
    return {
      title: '新闻未找到 | 田甜科研小组',
      description: '抱歉，您请求的新闻内容未找到。'
    };
  }
  
  return {
    title: `${newsItem.title} | 田甜科研小组`,
    description: newsItem.summary,
    openGraph: {
      title: `${newsItem.title} | 田甜科研小组`,
      description: newsItem.summary,
      images: newsItem.imageUrl ? [{ url: newsItem.imageUrl }] : []
    }
  };
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
  
  return (
    <section className="w-full mx-auto">
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