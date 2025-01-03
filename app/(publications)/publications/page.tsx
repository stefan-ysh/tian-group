import type { Metadata } from 'next';
import {Button} from '~/components/ui/button';

import Image from 'next/image';
import Link from 'next/link';
import { findLatestPublications } from '~/utils/publications';

export const metadata: Metadata = {
  title: 'Publications',
};

export default async function Home({}) {
  const publications = await findLatestPublications();
  // console.log('[ publications ] >', publications)
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          Publications
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-6  p-4 md:p-0 lg:grid-cols-2">
        {publications.map(
          ({ slug, title, image, link }: { slug: string; title: string; image: string; link: string }) => (
            <div key={slug} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 shadow-lg hover:shadow-none transition-all duration-500">
              <Link href={link} target='_blank' className='pt-5'>
                <img alt={title} src={`${image}`} className='w-full h-[200px] object-cover mx-auto' />
                <h2 className="p-4 font-bold">{title}</h2>
              </Link>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
