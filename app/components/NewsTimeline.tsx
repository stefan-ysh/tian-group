'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Card, 
  CardBody, 
  Chip,
  Tab,
  Tabs,
  Button,
  Divider
} from "@heroui/react";
import { 
  Calendar, 
  Newspaper, 
  FileText, 
  Award,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Megaphone
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import NextImage from 'next/image';
import Link from 'next/link';

// Export the NewsType type so it can be used in other components
export type NewsType = 'publication' | 'award' | 'event' | 'media' | 'announcement';

export interface NewsItem {
  id: string;
  title: string;
  date: string;  // ISO string
  summary: string;
  type: NewsType;
  imageUrl?: string;
  link?: string;
  aspect?: string;
  tags?: string[];
  authors?: {
    id: string;
    name: string;
  }[];
  publication?: {
    journal: string;
    volume?: string;
    issue?: string;
    doi?: string;
  };
}

interface NewsTimelineProps {
  news: NewsItem[];
  initialDisplayCount?: number;
  // New props for controlling pagination
  showLoadMoreButton?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
  // 总新闻数，用于显示在tab中
  totalNewsCount?: number;
  // 各类型新闻的数量
  typeCounts?: {
    all: number;
    publication?: number;
    award?: number;
    event?: number;
    media?: number;
    announcement?: number;
    [key: string]: number | undefined;
  };
}

export function NewsTimeline({ 
  news, 
  initialDisplayCount = 7,
  showLoadMoreButton = true,
  onLoadMore,
  isLoading = false,
  totalNewsCount,
  typeCounts
}: NewsTimelineProps) {
  const t = useTranslations('News');
  const [activeFilter, setActiveFilter] = useState<NewsType | 'all'>('all');
  
  // 调试日志
  console.log('NewsTimeline: ', { 
    newsLength: news.length, 
    initialDisplayCount, 
    totalNewsCount 
  });
  
  // 每个标签页维护自己的显示数量
  const [displayCounts, setDisplayCounts] = useState<Record<string, number>>({
    all: initialDisplayCount,
    publication: initialDisplayCount,
    award: initialDisplayCount,
    media: initialDisplayCount,
    announcement: initialDisplayCount
  });
  
  // 确保displayCounts始终保持最新
  useEffect(() => {
    if (initialDisplayCount > 0) {
      setDisplayCounts(prevCounts => ({
        ...prevCounts,
        all: Math.max(prevCounts.all, initialDisplayCount),
        publication: Math.max(prevCounts.publication || 0, initialDisplayCount),
        award: Math.max(prevCounts.award || 0, initialDisplayCount),
        media: Math.max(prevCounts.media || 0, initialDisplayCount),
        announcement: Math.max(prevCounts.announcement || 0, initialDisplayCount)
      }));
    }
  }, [initialDisplayCount]);
  
  // 按日期排序（最新的在前面）
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [news]);
  
  // 过滤新闻
  const filteredNews = useMemo(() => {
    if (activeFilter === 'all') {
      return sortedNews;
    }
    return sortedNews.filter(item => item.type === activeFilter);
  }, [sortedNews, activeFilter]);
  
  // 当前显示的新闻
  const visibleNews = useMemo(() => {
    // 如果initialDisplayCount等于新闻总数，则显示所有过滤后的新闻
    if (displayCounts[activeFilter] >= news.length) {
      return filteredNews;
    }
    return filteredNews.slice(0, displayCounts[activeFilter]);
  }, [filteredNews, displayCounts, activeFilter, news.length]);
  
  // 处理内部加载更多 - 只增加当前活动标签页的显示数量
  const handleInternalLoadMore = () => {
    setDisplayCounts(prevCounts => ({
      ...prevCounts,
      [activeFilter]: prevCounts[activeFilter] + 3
    }));
  };
  
  // 当切换标签页时，检查是否需要重置计数
  useEffect(() => {
    // 如果使用外部加载更多函数，则不需要重置
    if (onLoadMore) return;
    
    // 如果当前标签页没有显示过，则设置初始显示数量
    if (displayCounts[activeFilter] === undefined) {
      setDisplayCounts(prevCounts => ({
        ...prevCounts,
        [activeFilter]: initialDisplayCount
      }));
    }
  }, [activeFilter, displayCounts, initialDisplayCount, onLoadMore]);
  
  // 格式化日期
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 获取每个类型的数量 - 优先使用传入的typeCounts
  const counts = useMemo(() => {
    // 如果传入了typeCounts，直接使用
    if (typeCounts) {
      return typeCounts;
    }
    
    // 否则根据当前加载的新闻计算（兼容旧的调用方式）
    const allNewsCount = totalNewsCount !== undefined ? totalNewsCount : news.length;
    const result = { all: allNewsCount } as Record<string, number>;
    
    // 计算每种类型的数量
    const typeMap: Record<string, number> = {};
    news.forEach(item => {
      if (!typeMap[item.type]) {
        typeMap[item.type] = 0;
      }
      typeMap[item.type]++;
    });
    
    // 将类型计数合并到结果中
    Object.entries(typeMap).forEach(([type, count]) => {
      result[type] = count;
    });
    
    return result;
  }, [news, totalNewsCount, typeCounts]);
  
  // 处理加载更多 - 优先使用外部处理函数
  const handleLoadMore = () => {
    if (onLoadMore) {
      onLoadMore();
    } else {
      handleInternalLoadMore();
    }
  };
  
  return (
    <div className="w-full bg-white/90 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-0">
        {/* <div className="flex items-center gap-2 mb-8">
          <Newspaper className="text-primary" size={24} />
          <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
        </div> */}
        
        {/* 过滤选项卡 */}
        <div className="mb-8">
          <Tabs 
            aria-label="News filters" 
            selectedKey={activeFilter} 
            onSelectionChange={setActiveFilter as any}
            className="w-full"
            variant="underlined"
            classNames={{
              tabList: "gap-6",
              cursor: "bg-primary",
              tab: "max-w-fit px-2 h-10 data-[selected=true]:text-primary"
            }}
          >
            <Tab 
              key="all" 
              title={
                <div className="flex items-center gap-2">
                  <span>{t('allNews')}</span>
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/10 text-primary text-xs rounded-full">
                    {counts.all}
                  </span>
                </div>
              }
            />
            <Tab 
              key="publication" 
              title={
                <div className="flex items-center gap-2">
                  <span>{t('publications')}</span>
                  {counts.publication && counts.publication > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/10 text-primary text-xs rounded-full">
                      {counts.publication}
                    </span>
                  )}
                </div>
              }
            />
            <Tab 
              key="award" 
              title={
                <div className="flex items-center gap-2">
                  <span>{t('awards')}</span>
                  {counts.award && counts.award > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/10 text-primary text-xs rounded-full">
                      {counts.award}
                    </span>
                  )}
                </div>
              }
            />
            <Tab 
              key="announcement" 
              title={
                <div className="flex items-center gap-2">
                  <span>{t('announcements')}</span>
                  {counts.announcement && counts.announcement > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/10 text-primary text-xs rounded-full">
                      {counts.announcement}
                    </span>
                  )}
                </div>
              }
            />
          </Tabs>
        </div>
        
        {/* 没有找到新闻时的提示 */}
        {filteredNews.length === 0 && (
          <div className="py-12 text-center text-foreground/60">
            <Newspaper size={40} className="mx-auto mb-4 opacity-50" />
            <p>{t('noNewsFound')}</p>
          </div>
        )}
        
        {/* 新闻时间线 */}
        <div className="relative">
          {/* 垂直时间线 */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700 md:left-8"></div>
          
          <div className="space-y-6">
            {visibleNews.map((item, index) => (
              <div key={item.id} className="relative flex items-start pl-10 md:pl-16">
                {/* 时间线上的点 */}
                <div className="absolute left-[12px] md:left-[30px] top-2 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2"></div>
                
                {/* 内容卡片 */}
                <div className="w-full">
                  <Card className="border border-primary/10 hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <CardBody className="p-5">
                      {/* 新闻类型标签和日期 */}
                      <div className="flex justify-between items-center mb-3">
                        <Chip 
                          variant="flat" 
                          color={getTypeColor(item.type)} 
                          size="sm"
                          startContent={getTypeIcon(item.type)}
                        >
                          {t(`types.${item.type}`)}
                        </Chip>
                        
                        {/* 日期（所有屏幕尺寸） */}
                        <div className="flex items-center gap-1">
                          <Calendar className="text-primary" size={14} />
                          <span className="text-xs text-foreground/70">{formatDate(item.date)}</span>
                        </div>
                      </div>
                      
                      {/* 标题 */}
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      
                      {/* 图片（如果有） */}
                      {item.imageUrl && (
                        <div className={`relative w-full mb-3 rounded-md overflow-hidde ${item.aspect ? `aspect-${item.aspect}` : ''}`}>
                          <NextImage
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      
                      {/* 论文作者（如果有） */}
                      {item.type === 'publication' && item.authors && item.authors.length > 0 && (
                        <div className="mb-2 text-sm text-foreground/80">
                          {item.authors.map((author, idx) => (
                            <React.Fragment key={author.id}>
                              {/* <Link
                                href={`/members/${author.id}`}
                                className="hover:text-primary hover:underline transition-colors"
                              > */}
                                {author.name}
                              {/* </Link> */}
                              {idx < item.authors!.length - 1 && <span>, </span>}
                            </React.Fragment>
                          ))}
                        </div>
                      )}
                      
                      {/* 论文出版信息（如果有） */}
                      {item.type === 'publication' && item.publication && (
                        <div className="mb-3 text-sm italic text-foreground/70">
                          {item.publication.journal}
                          {item.publication.volume && `, ${item.publication.volume}`}
                          {item.publication.issue && `(${item.publication.issue})`}
                        </div>
                      )}
                      
                      {/* 摘要 */}
                      <p className="text-sm text-foreground/80 mb-4">
                        {item.summary}
                      </p>
                      
                      {/* 标签（如果有） */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {item.tags.map(tag => (
                            <Chip 
                              key={tag} 
                              variant="flat" 
                              size="sm" 
                              className="text-xs"
                            >
                              {tag}
                            </Chip>
                          ))}
                        </div>
                      )}
                      
                      {/* 详细链接 */}
                      {(item.link || item.type === 'publication' || item.type === 'event') && (
                        <div className="mt-2 flex justify-end">
                          {item.link ? (
                            <Link
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary text-sm hover:underline flex items-center gap-1"
                            >
                              {item.type === 'publication' ? t('readPaper') : t('readMore')}
                              <ExternalLink size={14} />
                            </Link>
                          ) : (
                            <Link
                              href={getDetailLink(item)}
                              className="text-primary text-sm hover:underline flex items-center gap-1"
                            >
                              {t('details')}
                              <ChevronRight size={14} />
                            </Link>
                          )}
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 加载更多按钮 - 只在当前活动标签页有更多内容时显示 */}
        {showLoadMoreButton && filteredNews.length > visibleNews.length && (
          <div className="mt-8 text-center">
            <Button 
              color="primary" 
              variant="flat"
              className="px-6" 
              onClick={handleLoadMore}
              endContent={<ChevronDown size={16} />}
              isLoading={isLoading}
            >
              {t('loadMore')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Get news type icon - export function to be used in news detail page
export function getTypeIcon(type: NewsType) {
  switch (type) {
    case 'publication':
      return <FileText size={14} />;
    case 'award':
      return <Award size={14} />;
    case 'event':
      return <Calendar size={14} />;
    case 'media':
      return <Newspaper size={14} />;
    case 'announcement':
      return <Megaphone size={14} />;
    default:
      return <Newspaper size={14} />;
  }
}

// Get news type color - export function to be used in news detail page
export function getTypeColor(type: NewsType): "primary" | "secondary" | "success" | "warning" | "danger" {
  switch (type) {
    case 'publication':
      return "primary";
    case 'award':
      return "secondary";
    case 'event':
      return "success";
    case 'media':
      return "warning";
    case 'announcement':
      return "danger";
    default:
      return "primary";
  }
}

// 获取详情链接
function getDetailLink(item: NewsItem): string {
  switch (item.type) {
    case 'publication':
      return `/publications/${item.id}`;
    case 'event':
      return `/activities/${item.id}`;
    default:
      return `/news/${item.id}`;
  }
} 