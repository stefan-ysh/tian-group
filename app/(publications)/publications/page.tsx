import type { Metadata } from 'next';
// import Link from 'next/link';
import { findLatestPublications } from '~/utils/publications';
import { Calendar, ExternalLink } from 'lucide-react';
import { Link, Chip, Image } from '@nextui-org/react';
import NextImage from "next/image";
export const metadata: Metadata = {
  title: 'Publications',
};

export default async function Home({}) {
  const publications = await findLatestPublications();
  return (
    <section className="mx-auto px-0 md:px-20 py-12 ">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          Publications
        </h1>
      </header>
      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
        {publications.map(
          ({
            slug,
            title,
            image,
            link,
            publishDate,
            author,
            description,
          }: {
            slug: string;
            title: string;
            image: string;
            link: string;
            publishDate: string;
            description: string;
            author: string[];
          }) => (
            <div
              key={slug}
              className="flex flex-col md:flex-row overflow-hidden rounded-xl border border-gray-200 shadow-lg hover:shadow-none transition-all duration-500 p-5 md:p-2"
            >
              <Link
                href={link}
                target="_blank"
                className="w-full flex flex-col md:flex-row mx-auto md:m-auto items-center justify-center"
              >
                <Image
                  alt={title}
                  height={300}
                  isZoomed
                  width={300}
                  src={`https://s2.loli.net/2025/01/04/Bb9rf2KDxUMsXYa.jpg`}
                  className="w-full h-full md:w-[300px] md:h-[300px] p-10 md:p-1 !object-contain"
                />
              </Link>
              <div className="w-full md:w-11/12 flex flex-col justify-between">
                <h2 className="text-md font-semibold ">{title}</h2>
                <div className='flex items-center'>
                  <Chip color="secondary" startContent={<Calendar size={16} />} size="sm">
                    <span className="text-xs">{publishDate}</span>
                  </Chip>
                  <Link
                    isExternal
                    showAnchorIcon
                    anchorIcon={<ExternalLink size={16} />}
                    href={link}
                    className='ml-1 text-xs'
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
