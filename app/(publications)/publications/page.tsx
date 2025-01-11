import type { Metadata } from 'next';
// import Link from 'next/link';
import { findLatestPublications } from '~/utils/publications';

import { PublicationItem } from '~/components/widgets/PublicationItem';
// import NextImage from "next/image";
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
            journal,
            tags,
            description,
          }: Publication) => (
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
    </section>
  );
}
