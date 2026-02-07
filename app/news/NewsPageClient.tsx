'use client';

import { useTranslations } from 'next-intl';
import { NewsClient, type NewsCounts } from './NewsClient';
import type { NewsItem } from '../components/NewsTimeline';

interface NewsPageClientProps {
  initialNews: NewsItem[];
  initialTotal: number;
  initialCounts: NewsCounts;
}

export default function NewsPageClient({ initialNews, initialTotal, initialCounts }: NewsPageClientProps) {
  const t = useTranslations('News');
  return (
    <section className="mx-auto max-w-5xl p-0 md:py-12 md:px-6">
      <div className="text-center mb-1">
        <h1 className="sr-only">{t('title')}</h1>
      </div>

      {/* News Timeline Component */}
      <NewsClient initialNews={initialNews} initialTotal={initialTotal} initialCounts={initialCounts} />
    </section>
  );
}
