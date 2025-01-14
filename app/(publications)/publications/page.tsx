import type { Metadata } from 'next';
// import Link from 'next/link';
import { findLatestPublications } from '~/utils/publications';
import { Timeline } from '~/components/ui/timeline';
import { Card, CardBody, Switch } from '@nextui-org/react';
import { PublicationItem } from '~/components/widgets/PublicationItem';

import NextImage from 'next/image';
export const metadata: Metadata = {
  title: 'Publications',
};

interface Publication {
  slug: string;
  title: string;
  image: string;
  link: string;
  publishDate: string;
  description: string;
  author: string[];
  journal: string;
  tags: string[];
}

export type TimelineView = 'grid' | 'timeline';

export default async function Home({}) {
  const publications = await findLatestPublications();
  const showMode: TimelineView = 'grid';
  // result by publishDate
  const sortResult = publications.sort((a: Publication, b: Publication) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  const timeLineData = sortResult.map((item: Publication) => {
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
    <section className="mx-auto px-0 md:px-20 py-12 ">
      {showMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
          {sortResult.map(
            ({ slug, title, image, link, publishDate, author, journal, tags, description }: Publication) => (
              <PublicationItem
                title={title}
                image={image}
                slug={slug}
                publishDate={publishDate}
                link={link}
                key={slug}
                journal={journal}
                author={author}
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
