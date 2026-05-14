'use client';

import React, { useMemo } from 'react';
import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { Calendar, Book, ExternalLink } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import NextImage from 'next/image';
import Link from 'next/link';
import { formatDate } from '../../utils/utils';

export interface PublicationItem {
  slug: string;
  title: string;
  image: string;
  publishDate: string;
  description: string;
  link: string;
  author: string[];
  journal: string;
  journalShort: string;
  tags?: string[];
}

interface PublicationsTimelineProps {
  publications: PublicationItem[];
}

export function PublicationsTimeline({ publications }: PublicationsTimelineProps) {
  const t = useTranslations('Publications');
  const locale = useLocale();

  // Sort publications by date (newest first)
  const sortedPublications = useMemo(() => {
    return [...publications].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [publications]);

  return (
    <div className="w-full py-4">
      <div className="w-full p-0">
        {/* No publications found message */}
        {sortedPublications.length === 0 && (
          <div className="py-12 text-center text-foreground/60">
            <Book size={40} className="mx-auto mb-4 opacity-50" />
            <p>{t('noPublicationsFound')}</p>
          </div>
        )}

        {/* Publications Timeline */}
        {sortedPublications.length > 0 && (
          <div className="space-y-8">
            {sortedPublications.map((publication, index) => (
              <div key={publication.slug} className="relative">
                {/* Date marker */}
                <div className="flex items-center mb-4">
                  <div className="flex w-full items-center gap-2 border-l-2 border-secondary bg-white/72 p-2 text-sm font-semibold text-primary shadow-sm dark:bg-white/[0.04] dark:text-teal-200">
                    <Calendar size={14} />
                    <span className="whitespace-nowrap">{formatDate(publication.publishDate, 'short', locale)}</span>
                  </div>
                  <Divider className="flex-grow ml-4" />
                </div>

                {/* Publication card */}
                <Card className="publication-card ml-3 w-full overflow-hidden">
                  <CardBody className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Publication image */}
                      <div className="flex items-center justify-center border-b border-slate-200/70 bg-slate-50/80 p-4 md:col-span-3 md:border-b-0 md:border-r dark:border-white/10 dark:bg-white/[0.03]">
                        <Link
                          href={publication.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group w-full"
                        >
                          <NextImage
                            src={publication.image}
                            alt={publication.title}
                            width={180}
                            height={180}
                            sizes="(max-width: 768px) 100vw, 180px"
                            className="object-contain max-h-[180px] transition-all duration-300 group-hover:scale-105 !w-full"
                          />
                        </Link>
                      </div>

                      {/* Publication details */}
                      <div className="md:col-span-9 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="mb-2 font-serif text-lg font-semibold leading-snug">
                            <Link
                              href={publication.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-1 transition-colors duration-300 hover:text-primary"
                            >
                              {t.rich(`list.${publication.title}.title`) || publication.title}
                            </Link>
                          </h3>

                          {/* Authors */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {publication.author.map((author, idx) => (
                              <Chip key={idx} size="sm" variant="flat" color="primary" className="text-xs">
                                {author}
                              </Chip>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-sm leading-6 text-foreground/72">
                            {t.rich(`list.${publication.title}.desc`) || publication.description}
                          </p>
                        </div>

                        {/* Journal and date */}
                        <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-200/70 pt-3 text-xs text-foreground/60 dark:border-white/10">
                          <div className="flex items-center gap-1">
                            <Book size={14} />
                            <span>{publication.journal}</span>
                          </div>
                          <Link
                            href={publication.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="academic-link flex items-center gap-1 text-xs"
                          >
                            {t('readMore')}
                            <ExternalLink size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Vertical timeline line */}
                {index < sortedPublications.length - 1 && (
                  <div
                    className="absolute left-0 top-14 bottom-0 w-[1px] bg-secondary/60"
                    style={{ height: 'calc(100% + 2rem)' }}
                  >
                    <span className="absolute left-0 top-14 bottom-0 w-[1px] bg-secondary/60"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
