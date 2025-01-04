import type { Metadata } from 'next';

import { Link, Chip, Image } from '@nextui-org/react';

import { findLatestMembers } from '~/utils/members';

export const metadata: Metadata = {
  title: 'Members',
};

export default async function Home({}) {
  const members = await findLatestMembers();
  return (
    <section className="mx-auto px-0 md:px-20 py-12 ">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter">Members</h1>
      </header>
      <div className="grid grid-cols-1 gap-6  p-4 md:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map(({ slug, name, avatar }: { slug: string; name: string; avatar: string }) => (
          <div key={slug} className="flex flex-col overflow-hidden rounded-xl shadow-lg pt-10">
            <Link href={`/${slug}`} className="flex flex-col items-center justify-center">
              <Image
                isZoomed
                width={200}
                height={200}
                isBlurred
                alt={name}
                src={`${avatar}`}
                className="w-full h-full md:w-[300px] md:h-[300px] p-0 sm:p-1 md:p-2 !object-contain"
              />
              <div className="w-full flex justify-around items-center">
                <Chip color="warning" variant="light">研究生</Chip>
                <h2 className="p-4 font-bold">{name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
