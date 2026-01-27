import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useLocale } from 'next-intl';

interface ActivityItem {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  position: string;
  date: string;
  location?: string;
  tags?: string[];
  content?: string;
}

interface ActivitiesResponse {
  items: ActivityItem[];
  total: number;
}

interface UseActivitiesOptions {
  count?: number;
  page?: number;
  limit?: number;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('加载活动数据失败');
  }
  return response.json();
};

export function useActivities({ count, page, limit }: UseActivitiesOptions = {}) {
  const locale = useLocale();
  // 构建URL和查询参数
  let url = '/api/activities';
  const params = new URLSearchParams();
  
  if (count) params.append('count', count.toString());
  if (page) params.append('page', page.toString());
  if (limit) params.append('limit', limit.toString());
  
  const queryString = params.toString();
  // Include locale in the SWR key to force re-fetch when locale changes
  const fullUrl = queryString ? `${url}?${queryString}&locale=${locale}` : `${url}?locale=${locale}`;
  
  // 使用SWR进行数据获取
  const { data, error, isLoading, mutate } = useSWR<ActivitiesResponse>(
    fullUrl, 
    fetcher, 
    { 
      revalidateOnFocus: false,
      dedupingInterval: 30000 // 30秒内不重复请求
    }
  );
  
  return {
    activities: data?.items || [],
    total: data?.total || 0,
    isLoading,
    isError: !!error,
    error,
    mutate
  };
}

// 获取单个活动的钩子
export function useActivity(id: string) {
  const locale = useLocale();
  const url = id ? `/api/activities?id=${id}&locale=${locale}` : null;
  
  const { data, error, isLoading } = useSWR<ActivityItem>(
    url, 
    fetcher, 
    { 
      revalidateOnFocus: false,
      dedupingInterval: 30000
    }
  );
  
  return {
    activity: data,
    isLoading,
    isError: !!error
  };
}
 