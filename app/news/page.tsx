'use client';
import { useTranslations } from 'next-intl';

export default function NewsPage() {
  const t = useTranslations('News');
  return (
    <section className="w-full mx-auto py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">{t('title')}</h1>
          <div className="h-1 w-32 bg-primary mx-auto rounded-full"></div>
        </div>
        
        {/* News Timeline Component */}
        <NewsClientWrapper />
      </div>
    </section>
  );
}

// Client component wrapper to handle news data loading
import dynamic from 'next/dynamic';

const NewsClientWrapper = dynamic(() => import('./NewsClient').then(mod => mod.NewsClient), {
  ssr: true,
  loading: () => (
    <div className="py-12 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-primary/20 rounded mb-8"></div>
        <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-background/80 rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="h-6 bg-primary/20 rounded w-24"></div>
                <div className="h-4 bg-primary/10 rounded w-32"></div>
              </div>
              <div className="h-6 bg-primary/20 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-primary/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-primary/10 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});
