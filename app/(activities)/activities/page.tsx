import { findLatestActivities } from '~/utils/activities';
import { ActivityItem } from '~/components/widgets/ActivityItem';

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
