import type { Metadata } from 'next';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';

import Link from 'next/link';
import { findLatestPublications } from '~/utils/publications';

export const metadata: Metadata = {
  title: 'Publications',
};

export default async function Home({}) {
  const publications = await findLatestPublications();
  // console.log('[ publications ] >', publications)
  return (
    <section className="mx-auto px-20 py-12 sm:px-20 sm:py-16 lg:py-20">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          Publications
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-6  p-4 lg:grid-cols-2">
        {publications.map(
          ({
            slug,
            title,
            image,
            link,
            author,
            description,
          }: {
            slug: string;
            title: string;
            image: string;
            link: string;
            description: string;
            author: string[];
          }) => (
            <div
              key={slug}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg hover:shadow-none transition-all duration-500"
            >
              <Link href={link} target="_blank" className="pt-0 flex flex-col md:flex-row">
                <Image
                  isBlurred
                  isZoomed
                  alt={title}
                  src={`${image}`}
                  // className='!w-[200px] !h-[200px] mx-auto'
                />
                <h2 className="p-4 font-bold">{title}</h2>
              </Link>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
