'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ActivityItem } from '~/components/widgets/ActivityItem';
import { useActivities } from '~/hooks/useActivities';
import { ActivitiesSkeletonLoader } from '../../components/ui/SkeletonLoader';
import { formatDate } from '../../../src/utils/utils';

interface Activity {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  position: string;
  date: string;
  tags?: string[];
}

export default function ActivitiesPageClient() {
  const { activities = [], isLoading, isError } = useActivities();
  const t = useTranslations('Header.NavMenu');
  const locale = useLocale();

  // 按日期排序活动（最新的在前）
  const sortedActivities = Array.isArray(activities) ? [...activities].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }) : [];

  // 按年份分组活动
  const groupedActivities: Record<string, Activity[]> = {};
  sortedActivities.forEach((activity) => {
    const year = new Date(activity.date).getFullYear().toString();
    if (!groupedActivities[year]) {
      groupedActivities[year] = [];
    }
    groupedActivities[year].push(activity as Activity);
  });

  // 获取年份（降序排列）
  const years = Object.keys(groupedActivities).sort((a, b) => parseInt(b) - parseInt(a));

  if (isLoading) {
    return <ActivitiesSkeletonLoader />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-xl text-center text-red-500 font-medium tracking-tight">加载活动数据失败，请稍后重试</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors"
        >
          刷新重试
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 md:py-12 md:px-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-300 sr-only">
          {t('activities')}
        </h1>
      </header>

      <div className="space-y-16">
        {years.length > 0 ? (
          years.map((year) => (
            <div key={year} className="space-y-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t-[1px] border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-start">
                  <span className="bg-purple-900 text-white px-4 py-1.5 text-xl font-bold rounded-lg shadow-sm">
                    {locale === 'zh' ? `${year}年` : year}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2">
                {groupedActivities[year].map((activity: Activity) => (
                  <ActivityItem
                    key={activity.id}
                    id={activity.id}
                    name={activity.name}
                    avatar={activity.avatar}
                    position={activity.position}
                    title={activity.title}
                    description={activity.description}
                    tags={activity.tags}
                    date={activity.date}
                    formattedDate={formatDate(activity.date, 'short', locale)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
             <p className="text-gray-500 text-lg italic">暂无相关活动记录</p>
          </div>
        )}
      </div>
    </section>
  );
}
