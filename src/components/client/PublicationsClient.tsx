'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, ButtonGroup } from '@heroui/react';
import { PublicationItem } from '~/components/widgets/PublicationItem';
import { PublicationsTimeline } from '~/components/widgets/PublicationsTimeline';
import { Grid, Clock } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

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
  onViewModeChange,
}: PublicationsClientProps) {
  const t = useTranslations('Publications');
  const locale = useLocale();
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
        setDisplayCount((prev) => prev + 5); // 每次增加5个
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
    setViewMode((currentMode) => (initialViewMode !== currentMode ? initialViewMode : currentMode));
  }, [initialViewMode]);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-slate-200/80 pb-5 md:flex-row dark:border-white/10">
        <div className="max-w-2xl">
          <h1 className="mt-2 font-serif text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t('summary', { count: publications.length })}
          </p>
        </div>
        <ButtonGroup
          variant="flat"
          className="w-full rounded-md border border-slate-200 bg-white/72 p-1 shadow-sm md:w-auto dark:border-white/10 dark:bg-white/[0.04]"
        >
          <Button
            startContent={<Grid size={18} />}
            color={viewMode === 'grid' ? 'primary' : 'default'}
            className={`w-full rounded md:w-auto ${viewMode === 'grid' ? '' : 'bg-transparent text-slate-700 dark:text-slate-200'}`}
            onPress={() => handleViewModeChange('grid')}
          >
            {t('gridView')}
          </Button>
          <Button
            startContent={<Clock size={18} />}
            color={viewMode === 'timeline' ? 'primary' : 'default'}
            className={`w-full rounded md:w-auto ${viewMode === 'timeline' ? '' : 'bg-transparent text-slate-700 dark:text-slate-200'}`}
            onPress={() => handleViewModeChange('timeline')}
          >
            {t('timelineView')}
          </Button>
        </ButtonGroup>
      </div>

      {/* 主内容区域 */}
      <div className="min-h-[500px]">
        {viewMode === 'grid' ? (
          // 网格视图
          <div className="grid grid-cols-1 gap-5 py-4 md:grid-cols-2">
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
          <PublicationsTimeline publications={visiblePublications} />
        )}

        {/* 统一的加载更多按钮，不论视图类型 */}
        {hasMorePublications && (
          <div className="flex justify-center mt-8">
            <Button
              color="primary"
              variant="flat"
              className="px-6"
              onPress={handleLoadMore}
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
