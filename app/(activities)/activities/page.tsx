import type { Metadata } from 'next';


import { findLatestActivities } from '~/utils/activities';

import { ActivityItem } from '~/components/widgets/ActivityItem';

export const metadata: Metadata = {
  title: 'Activities',
};

export default async function Home({}) {
  const members = await findLatestActivities();

  return (
    <section className="mx-auto px-0 md:px-20 py-12 ">
      <div className="grid grid-cols-1 gap-6 p-4 md:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map(({ id, name, avatar, position }: { id: string; name: string; avatar: string, position: string }) => (
          <ActivityItem key={id} name={name} avatar={avatar} id={id} position={position} />
        ))}
      </div>
    </section>
  );
}
