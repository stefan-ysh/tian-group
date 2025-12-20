'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

export default function NewsPageClient() {
  const t = useTranslations('News');
  return (
    <section className="mx-auto max-w-5xl p-0 md:py-12 md:px-6">
      <div className="text-center mb-1">
        <h1 className="sr-only">{t('title')}</h1>
      </div>

      {/* News Timeline Component */}
      <NewsClientWrapper />
    </section>
  );
}

// Client component wrapper to handle news data loading
const NewsClientWrapper = dynamic(() => import('./NewsClient').then((mod) => mod.NewsClient), {
  ssr: true,
  loading: () => (
    <div className="py-12 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-gray-50 dark:bg-gray-700/50 rounded mb-8"></div>
        <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="h-6 bg-gray-50 dark:bg-gray-700/50 rounded w-24"></div>
                <div className="h-4 bg-gray-20 dark:bg-gray-700/10 rounded w-32"></div>
              </div>
              <div className="h-6 bg-gray-50 dark:bg-gray-700/50 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-20 dark:bg-gray-700/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-20 dark:bg-gray-700/10 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
});
