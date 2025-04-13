'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, ButtonGroup } from '@heroui/react';
import { PublicationItem } from '~/components/widgets/PublicationItem';
import { PublicationsTimeline } from '~/components/widgets/PublicationsTimeline';
import { Grid, Clock, Book } from 'lucide-react';
import { useTranslations } from 'next-intl';

// 定义Publication类型
export interface Publication {
  slug: string;
  title: string;
  image: string;
  link: string;
  publishDate: string;
  description: string;
  author: string[];
  journal: string;
  journalShort: string;
  tags?: string[];
}

interface PublicationsClientProps {
  publications: Publication[];
  initialViewMode?: 'grid' | 'timeline';
  onViewModeChange?: (mode: 'grid' | 'timeline') => void;
}

export function PublicationsClient({ 
  publications, 
  initialViewMode = 'grid',
  onViewModeChange 
}: PublicationsClientProps) {
  const t = useTranslations('Publications');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>(initialViewMode);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(6); // 控制显示的出版物数量

  // 跟踪组件是否已经挂载，防止不必要的重新渲染
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // 加载更多数据处理函数
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    
    // 模拟网络请求延迟
    setTimeout(() => {
      if (isMounted.current) {
        setDisplayCount(prev => prev + 5); // 每次增加5个
        setIsLoadingMore(false);
      }
    }, 800);
  }, []);
  
  // 视图切换处理函数，并通知父组件
  const handleViewModeChange = (mode: 'grid' | 'timeline') => {
    if (mode === viewMode) return;
    setViewMode(mode);
    
    // 通知父组件视图模式已更改
    if (onViewModeChange) {
      onViewModeChange(mode);
    }
  };

  // 提前计算要显示的出版物数量
  const visiblePublications = publications.slice(0, displayCount);
  
  // 检查是否还有更多出版物可以加载
  const hasMorePublications = displayCount < publications.length;

  // 同步外部视图模式变化
  useEffect(() => {
    if (initialViewMode !== viewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <h1 className="sr-only">{t('title')}</h1>
        </div>
        <ButtonGroup variant="flat" className="w-full md:w-auto">
          <Button
            startContent={<Grid size={18} />}
            color={viewMode === 'grid' ? 'primary' : 'default'}
            className="w-full md:w-auto"
            onClick={() => handleViewModeChange('grid')}
          >
            {t('gridView')}
          </Button>
          <Button
            startContent={<Clock size={18} />}
            color={viewMode === 'timeline' ? 'primary' : 'default'}
            className="w-full md:w-auto"
            onClick={() => handleViewModeChange('timeline')}
          >
            {t('timelineView')}
          </Button>
        </ButtonGroup>
      </div>

      {/* 主内容区域 */}
      <div className="min-h-[500px]">
        {viewMode === 'grid' ? (
          // 网格视图
          <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
            {visiblePublications.map((publication) => (
              <PublicationItem
                key={publication.slug}
                title={publication.title}
                image={publication.image}
                slug={publication.slug}
                publishDate={publication.publishDate}
                link={publication.link}
                journal={publication.journal}
                author={publication.author}
                journalShort={publication.journalShort}
              />
            ))}
          </div>
        ) : (
          // 时间线视图
          <PublicationsTimeline 
            publications={publications} 
            initialDisplayCount={displayCount} 
            showLoadMoreButton={hasMorePublications}
            isLoading={isLoadingMore}
            onLoadMore={handleLoadMore}
          />
        )}
        
        {/* 网格视图中的加载更多按钮 */}
        {viewMode === 'grid' && hasMorePublications && (
          <div className="flex justify-center mt-8">
            <Button
              color="primary"
              variant="flat"
              className="px-6"
              onClick={handleLoadMore}
              isLoading={isLoadingMore}
              isDisabled={isLoadingMore}
            >
              {t('loadMore')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
