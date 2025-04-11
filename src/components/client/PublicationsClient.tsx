'use client';

import { useState } from 'react';
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
}

export function PublicationsClient({ publications }: PublicationsClientProps) {
  const t = useTranslations('Publications');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="flex items-center gap-2 mb-8">
          <Book className="text-primary" size={24} />
          <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
        </div>
        <ButtonGroup variant="flat" className="w-full md:w-auto">
          <Button
            startContent={<Grid size={18} />}
            color={viewMode === 'grid' ? 'primary' : 'default'}
            className="w-full md:w-auto"
            onClick={() => setViewMode('grid')}
          >
            {t('gridView')}
          </Button>
          <Button
            startContent={<Clock size={18} />}
            color={viewMode === 'timeline' ? 'primary' : 'default'}
            className="w-full md:w-auto"
            onClick={() => setViewMode('timeline')}
          >
            {t('timelineView')}
          </Button>
        </ButtonGroup>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 py-4 lg:grid-cols-2">
          {publications.map((publication: Publication) => (
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
        <PublicationsTimeline publications={publications} initialDisplayCount={10} showLoadMoreButton={true} />
      )}
    </div>
  );
}
