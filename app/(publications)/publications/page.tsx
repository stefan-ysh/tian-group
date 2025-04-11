import type { Metadata } from 'next';
// import Link from 'next/link';
import { findLatestPublications } from '~/utils/publications';
import { Timeline } from '~/components/ui/timeline';
import { Card, CardBody, Switch } from "@heroui/react";
import { PublicationItem } from '~/components/widgets/PublicationItem';

import NextImage from 'next/image';

export const metadata: Metadata = {
  title: '成果及论文 | 田甜科研小组',
  description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  openGraph: {
    title: '成果及论文 | 田甜科研小组',
    description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  }
}

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
    <section className="mx-auto px-0 md:px-20 py-12 pt-0">
      {showMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2 pt-0">
          {sortResult.map(
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
