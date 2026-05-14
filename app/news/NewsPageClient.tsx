'use client';

import { useTranslations } from 'next-intl';
import { NewsClient, type NewsCounts } from './NewsClient';
import type { NewsItem } from '../components/NewsTimeline';
import { useLocale } from 'next-intl';

interface NewsPageClientProps {
  initialNews: NewsItem[];
  initialTotal: number;
  initialCounts: NewsCounts;
}

export default function NewsPageClient({ initialNews, initialTotal, initialCounts }: NewsPageClientProps) {
  const t = useTranslations('News');
  const locale = useLocale();
  return (
    <section className="w-full mx-auto max-w-5xl p-0 md:py-12 md:px-6">
      <div className="mb-8 border-b border-slate-200/80 pb-5 dark:border-white/10">
        <p className="academic-kicker">Lab Updates</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          {locale === 'zh'
            ? '记录课题组论文发表、获奖、活动与合作动态。'
            : 'Publications, awards, events, and collaboration updates from the group.'}
        </p>
      </div>

      {/* News Timeline Component */}
      <NewsClient initialNews={initialNews} initialTotal={initialTotal} initialCounts={initialCounts} />
    </section>
  );
}
