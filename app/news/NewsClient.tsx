'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
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
export interface NewsCounts {
  all: number;
  publication?: number;
  award?: number;
  event?: number;
  media?: number;
  announcement?: number;
  [key: string]: number | undefined;
}

interface NewsClientProps {
  initialNews?: NewsItem[];
  initialTotal?: number;
  initialCounts?: NewsCounts;
}

export function NewsClient({ initialNews = [], initialTotal, initialCounts }: NewsClientProps) {
  const hasInitialData = initialNews.length > 0;
  const initialLimit = hasInitialData ? initialNews.length : 10;
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [loading, setLoading] = useState(!hasInitialData);
  const [currentLimit, setCurrentLimit] = useState(initialLimit); // 替换page为limit
  const [hasMore, setHasMore] = useState(
    hasInitialData ? initialNews.length < (initialTotal ?? initialNews.length) : true
  );
  const [newsCounts, setNewsCounts] = useState<NewsCounts>(
    initialCounts ?? { all: initialTotal ?? initialNews.length }
  );
  const [totalNewsItems, setTotalNewsItems] = useState(initialTotal ?? initialNews.length);
  const ITEMS_INCREASE = 4; // 每次点击增加4个项目
  const t = useTranslations('News');
  const locale = useLocale();
  const firstRender = useRef(true);

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
    if (firstRender.current) {
      firstRender.current = false;
      if (!hasInitialData) {
        fetchNews(currentLimit);
        fetchNewsCounts();
      }
      return;
    }

    // 语言切换时重新获取数据
    setLoading(true);
    const resetLimit = 10;
    setCurrentLimit(resetLimit);
    fetchNews(resetLimit);
    fetchNewsCounts();
  }, [locale, fetchNews, fetchNewsCounts, hasInitialData]);

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
