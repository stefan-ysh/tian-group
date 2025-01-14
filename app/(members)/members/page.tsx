import type { Metadata } from 'next';



import { findLatestMembers } from '~/utils/members';

import { MemberItem } from '~/components/widgets/MemberItem';

export const metadata: Metadata = {
  title: 'Members',
};

export default async function Home({}) {
  const members = await findLatestMembers();

  return (
    <section className="mx-auto px-0 md:px-20 py-12 pt-0">
      <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {members.map(({ slug, name, avatar, position }: { slug: string; name: string; avatar: string, position: string }) => (
          <MemberItem key={slug} name={name} avatar={avatar} slug={slug} position={position} />
        ))}
      </div>
    </section>
  );
}
