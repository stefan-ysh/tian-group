'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody } from "@heroui/react";
import NextImage from 'next/image';
import { Timeline } from '~/components/ui/timeline';
import { PublicationItem } from '~/components/widgets/PublicationItem';
import { PublicationsSkeletonLoader } from '../components/ui/SkeletonLoader';

interface Publication {
  slug: string;
  title: string;
  image: string;
  link: string;
  publishDate: string;
  description: string;
  author: string[];
  journal: string;
  journalShort: string;
  tags: string[];
}

export type TimelineView = 'grid' | 'timeline';

export function PublicationsClient() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMode, setShowMode] = useState<TimelineView>('grid');

  useEffect(() => {
    async function fetchPublications() {
      try {
        const response = await fetch('/api/publications');
        if (!response.ok) throw new Error('Failed to fetch publications');
        const data = await response.json();
        setPublications(data);
      } catch (error) {
        console.error('Error fetching publications:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPublications();
  }, []);

  if (loading) {
    return <PublicationsSkeletonLoader />;
  }

  // 按发布日期排序
  const sortedPublications = [...publications].sort((a: Publication, b: Publication) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  const timeLineData = sortedPublications.map((item: Publication) => {
    return {
      title: item.publishDate,
      content: (
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50" shadow="sm">
          <CardBody>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
              <div className="relative col-span-6 md:col-span-4">
                <NextImage
                  alt={item.title}
                  src={item.image}
                  width={200}
                  height={200}
                  className="w--full h-auto mx-auto !object-contain"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col col-span-6 md:col-span-8 ml-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-foreground/90">{item.title}</h3>
                </div>
                <div className="w-full mt-2 text-xs">
                  <span>{item.description}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ),
    };
  });

  return (
    <section className="mx-auto px-0 md:px-20 py-12 pt-0">
      {showMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2 pt-0">
          {sortedPublications.map(
            ({ slug, title, image, link, publishDate, author, journal, journalShort, tags, description }: Publication) => (
              <PublicationItem
                title={title}
                image={image}
                slug={slug}
                publishDate={publishDate}
                link={link}
                key={slug}
                journal={journal}
                author={author}
                journalShort={journalShort}
              />
            ),
          )}
        </div>
      ) : (
        <Timeline data={timeLineData} />
      )}
    </section>
  );
} 