import type { Metadata } from 'next';


import { findLatestMembers } from '~/utils/members';

import { MemberItem } from '~/components/widgets/MemberItem';

export const metadata: Metadata = {
  title: 'Members',
};

export default async function Home({}) {
  const members = await findLatestMembers();

  return (
    <section className="mx-auto px-0 md:px-20 py-12 ">
      <div className="grid grid-cols-1 gap-6 p-4 md:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map(({ slug, name, avatar }: { slug: string; name: string; avatar: string }) => (
          <MemberItem key={slug} name={name} avatar={avatar} slug={slug} />
        ))}
      </div>
    </section>
  );
}
