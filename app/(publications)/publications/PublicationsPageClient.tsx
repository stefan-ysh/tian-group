'use client';

import { PublicationsClient, Publication } from '~/components/client/PublicationsClient';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PublicationsGridSkeleton, PublicationsTimelineSkeleton } from '../../components/ui/SkeletonLoader';

export type TimelineView = 'grid' | 'timeline';

export function PublicationsPageClient() {
  const t = useTranslations('Common');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [mounted, setMounted] = useState(false);

  // 添加组件挂载状态，避免初始渲染闪烁
  useEffect(() => {
    setMounted(true);
  }, []);

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
        // 添加小延迟，确保骨架屏有足够时间显示，避免闪烁
        setTimeout(() => {
          if (isMounted) {
            setLoading(false);
          }
        }, 300);
      }
    }
    
    fetchPublications();
    
    // 清理函数
    return () => {
      isMounted = false;
    };
  }, []);

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

  // 如果组件还没挂载，提前返回null避免闪烁
  if (!mounted) {
    return null;
  }

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
        <PublicationsClient 
          publications={publications} 
          onViewModeChange={handleViewModeChange}
          initialViewMode={viewMode}
        />
      )}
    </section>
  );
} 