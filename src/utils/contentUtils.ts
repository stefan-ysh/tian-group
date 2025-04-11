'use client';

import { NewsItem } from '../types/content';

/**
 * 按照日期排序新闻项（最新的在前）
 * @param news 新闻项数组
 * @returns 按日期排序的新闻项数组
 */
export function sortNewsByDate(news: NewsItem[]): NewsItem[] {
  return [...news].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * 按照年份对新闻项进行分组
 * @param news 新闻项数组
 * @returns 按年份分组的新闻项
 */
export function groupNewsByYear(news: NewsItem[]): Record<number, NewsItem[]> {
  const grouped: Record<number, NewsItem[]> = {};
  
  news.forEach(item => {
    const year = new Date(item.date).getFullYear();
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(item);
  });
  
  return grouped;
}

/**
 * 过滤特定类型的新闻项
 * @param news 新闻项数组
 * @param type 新闻类型
 * @returns 过滤后的新闻项数组
 */
export function filterNewsByType(news: NewsItem[], type: string): NewsItem[] {
  if (type === 'all') return news;
  return news.filter(item => item.type === type);
}

/**
 * 搜索新闻项
 * @param news 新闻项数组
 * @param query 搜索关键词
 * @returns 搜索结果
 */
export function searchNews(news: NewsItem[], query: string): NewsItem[] {
  if (!query) return news;
  
  const lowerQuery = query.toLowerCase();
  return news.filter(item => {
    return (
      item.title.toLowerCase().includes(lowerQuery) ||
      item.summary.toLowerCase().includes(lowerQuery) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) ||
      (item.authors && item.authors.some(author => author.name.toLowerCase().includes(lowerQuery)))
    );
  });
}

/**
 * 分页获取新闻项
 * @param news 新闻项数组
 * @param page 页码（从1开始）
 * @param itemsPerPage 每页项目数
 * @returns 分页后的新闻项
 */
export function paginateNews(news: NewsItem[], page: number, itemsPerPage: number): NewsItem[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return news.slice(startIndex, endIndex);
}

/**
 * 获取最近的新闻项
 * @param news 新闻项数组
 * @param count 获取数量
 * @returns 最近的新闻项
 */
export function getRecentNews(news: NewsItem[], count: number): NewsItem[] {
  return sortNewsByDate(news).slice(0, count);
}

/**
 * 格式化日期
 * @param dateStr ISO格式的日期字符串
 * @param locale 区域设置
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateStr: string, locale: string = 'zh-CN'): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 