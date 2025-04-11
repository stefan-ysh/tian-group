'use client';

import React, { useEffect, useState } from 'react';
import { RecentNews } from './RecentNews';
import { NewsItem } from './NewsTimeline';
import { HomeNewsSkeletonLoader } from './ui/SkeletonLoader';

export function HomeNewsClient() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news?count=3');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return <HomeNewsSkeletonLoader />;
  }

  return <RecentNews news={news} />;
} 