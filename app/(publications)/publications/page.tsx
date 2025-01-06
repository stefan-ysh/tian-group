import type { Metadata } from 'next';
// import Link from 'next/link';
import { findLatestPublications } from '~/utils/publications';

import { PublicationItem } from '~/components/widgets/PublicationItem';
// import NextImage from "next/image";
export const metadata: Metadata = {
  title: 'Publications',
};

export default async function Home({}) {
  const publications = await findLatestPublications();
  return (
    <section className="mx-auto px-0 md:px-20 py-12 ">
      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
        {publications.map(
          ({
            slug,
            title,
            image,
            link,
            publishDate,
            author,
            tags,
            description,
          }: {
            slug: string;
            title: string;
            image: string;
            link: string;
            publishDate: string;
            description: string;
            author: string[];
            tags: string[];
          }) => (
            <PublicationItem title={title} image={image} slug={slug} publishDate={publishDate} link={link} key={slug} author={author} />
          ),
        )}
      </div>
    </section>
  );
}
