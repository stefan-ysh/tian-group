'use client';

import { CalendarDays, MapPin } from 'lucide-react';
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
  const { activities, isLoading, isError } = useActivities();
  const t = useTranslations('Header.NavMenu');
  const locale = useLocale();

  // 按日期排序活动（最新的在前）
  const sortedActivities = [...activities].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-center text-red-500">加载活动数据失败，请稍后重试</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl p-0 md:py-12 md:px-6">
      <header className="text-center mb-1">
        {/* 对SEO友好的隐藏标题 */}
        <h1 className="sr-only">{t('activities')}</h1>
      </header>

      <div className="space-y-16">
        {years.map((year) => (
          <div key={year} className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white dark:bg-gray-900 pr-3 text-2xl font-semibold text-gray-900 dark:text-white">
                  {locale === 'zh' ? `${year}年` : year}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
              {groupedActivities[year].map(({ id, name, avatar, position, title, description, date, tags }: Activity) => (
                <div key={id} className="flex flex-col h-full">
                  <ActivityItem
                    id={id}
                    name={name}
                    avatar={avatar}
                    position={position}
                    title={title}
                    description={description}
                    tags={tags}
                  />
                  <div className="mt-3 flex items-center gap-4 px-1 justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      {formatDate(date, 'short', locale)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
