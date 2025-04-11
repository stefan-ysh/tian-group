import type { Metadata } from 'next';

import { findLatestActivities } from '~/utils/activities';

import { ActivityItem } from '~/components/widgets/ActivityItem';

export const metadata: Metadata = {
  title: '组内活动 | 田甜科研小组',
  description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授',
  openGraph: {
    title: '组内活动 | 田甜科研小组',
    description: '扬州大学化学学院，田甜'
  }
}

interface Activity {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  position: string;
  date: string;
}

export default async function Activities() {
  const activities = await findLatestActivities();

  // Sort activities by date in descending order
  const sortedActivities = activities.sort((a: Activity, b: Activity) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <header className="mb-8 text-center md:mb-12">
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
          记录我们的精彩时刻
        </p>
      </header>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        {sortedActivities.map(({ id, name, avatar, position, title, description }: Activity) => (
          <div key={id} className="flex justify-center">
            <ActivityItem
              id={id}
              name={name}
              avatar={avatar}
              position={position}
              title={title}
              description={description}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
