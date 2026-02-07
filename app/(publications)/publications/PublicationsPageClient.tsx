'use client';

import { PublicationsClient, Publication } from '~/components/client/PublicationsClient';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { PublicationsGridSkeleton, PublicationsTimelineSkeleton } from '../../components/ui/SkeletonLoader';
import FadeIn from '~/components/atoms/FadeIn';

export type TimelineView = 'grid' | 'timeline';

interface PublicationsPageClientProps {
  initialPublications?: Publication[];
}

export function PublicationsPageClient({ initialPublications = [] }: PublicationsPageClientProps) {
  const t = useTranslations('Common');
  const locale = useLocale();
  const hasInitialData = initialPublications.length > 0;
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [loading, setLoading] = useState(!hasInitialData);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const firstRender = useRef(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchPublications() {
      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch('/api/publications');
        
        if (!response.ok) {
          throw new Error('Failed to fetch publications');
        }
        
        const data = await response.json();
        
        if (!data || !data.publications || !Array.isArray(data.publications)) {
          throw new Error('Invalid data format');
        }
        
        // 避免组件卸载后的状态更新
        if (isMounted) {
          setPublications(data.publications);
        }
      } catch (error) {
        console.error('Error fetching publications:', error);
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    if (firstRender.current) {
      firstRender.current = false;
      if (!hasInitialData) {
        fetchPublications();
      }
      return;
    }

    fetchPublications();
    
    // 清理函数
    return () => {
      isMounted = false;
    };
  }, [hasInitialData, locale]);

  // 监听子组件的视图模式变化
  const handleViewModeChange = (mode: 'grid' | 'timeline') => {
    setViewMode(mode);
  };

  // 根据当前视图模式选择适当的骨架屏
  const getSkeletonLoader = () => {
    return viewMode === 'grid' ? 
      <PublicationsGridSkeleton /> : 
      <PublicationsTimelineSkeleton />;
  };

  return (
    <section className="mx-auto max-w-6xl py-0 sm:py-16 lg:py-20 px-6 min-h-[70vh]">
      {error ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <h2 className="text-xl font-bold mb-2">{t('LoadingFailed')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('LoadingFailedDesc')}
          </p>
        </div>
      ) : loading ? (
        // 骨架屏集中在这里显示
        getSkeletonLoader()
      ) : (
        <FadeIn direction="up" duration={0.6}>
          <PublicationsClient 
            publications={publications} 
            onViewModeChange={handleViewModeChange}
            initialViewMode={viewMode}
          />
        </FadeIn>
      )}
    </section>
  );
} 
