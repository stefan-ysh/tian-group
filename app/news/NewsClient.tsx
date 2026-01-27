'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@heroui/react';
import { ChevronDown } from 'lucide-react';
import { NewsSkeletonLoader } from '../components/ui/SkeletonLoader';
import { useTranslations, useLocale } from 'next-intl';
import type { NewsTimeline as NewsTimelineType, NewsItem } from '../components/NewsTimeline';

// 懒加载 NewsTimeline 组件以减少初始包大小
const NewsTimeline = dynamic(
  () => import('../components/NewsTimeline').then((mod) => ({ default: mod.NewsTimeline })),
  {
    loading: () => <NewsSkeletonLoader />,
    ssr: true,
  }
);
// 定义计数类型
interface NewsCounts {
  all: number;
  publication?: number;
  award?: number;
  event?: number;
  media?: number;
  announcement?: number;
  [key: string]: number | undefined;
}

export function NewsClient() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLimit, setCurrentLimit] = useState(10); // 替换page为limit
  const [hasMore, setHasMore] = useState(true);
  const [newsCounts, setNewsCounts] = useState<NewsCounts>({ all: 0 });
  const [totalNewsItems, setTotalNewsItems] = useState(0);
  const ITEMS_INCREASE = 4; // 每次点击增加4个项目
  const t = useTranslations('News');
  const locale = useLocale();

  // 获取各类型新闻数量
  const fetchNewsCounts = useCallback(async () => {
    try {
      const response = await fetch(`/api/news/count`);
      if (!response.ok) throw new Error('Failed to fetch news counts');
      const data = await response.json();
      setNewsCounts(data);
    } catch (error) {
      console.error('Error fetching news counts:', error);
    }
  }, []);

  const fetchNews = useCallback(async (limit: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news?page=1&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      
      const newsItems = data.items || data;
      const total = data.total || newsItems.length;
      
      setTotalNewsItems(total);
      setNews(newsItems);
      setHasMore(newsItems.length < total);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(currentLimit);
    fetchNewsCounts();
  }, [locale, currentLimit, fetchNews, fetchNewsCounts]);

  const handleLoadMore = () => {
    const newLimit = currentLimit + ITEMS_INCREASE;
    setCurrentLimit(newLimit);
    fetchNews(newLimit);
  };

  if (loading && news.length === 0) {
    return <NewsSkeletonLoader />;
  }

  return (
    <div className="w-full" role="region" aria-label={t('title')}>
      <NewsTimeline 
        news={news} 
        initialDisplayCount={news.length}
        showLoadMoreButton={false}
        totalNewsCount={totalNewsItems}
        typeCounts={{
          ...newsCounts,
          all: totalNewsItems
        }}
      />
      
      {hasMore && (
        <div className="mt-8 mb-12 text-center">
          <Button
            color="primary"
            variant="flat"
            className="px-6"
            onClick={handleLoadMore}
            endContent={<ChevronDown size={16} aria-hidden="true" />}
            isLoading={loading}
            aria-label={loading ? (t('loading') || 'Loading...') : t('loadMore')}
          >
            {t('loadMore')}
            {/* ({news.length}/{totalNewsItems}) */}
          </Button>
        </div>
      )}
    </div>
  );
} 