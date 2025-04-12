import { findLatestActivities } from '~/utils/activities';
import { ActivityItem } from '~/components/widgets/ActivityItem';
import { CalendarDays, Clock, Calendar, MapPin } from 'lucide-react';
import { Chip } from '@heroui/react';

interface Activity {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  position: string;
  date: string;
  tags: string[];
}

// Helper function to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function Activities() {
  const activities = await findLatestActivities();

  // Sort activities by date in descending order
  const sortedActivities = activities.sort((a: Activity, b: Activity) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Group activities by year
  const groupedActivities: Record<string, Activity[]> = {};
  sortedActivities.forEach((activity: Activity) => {
    const year = new Date(activity.date).getFullYear().toString();
    if (!groupedActivities[year]) {
      groupedActivities[year] = [];
    }
    groupedActivities[year].push(activity);
  });

  // Get years in descending order
  const years = Object.keys(groupedActivities).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <section className="mx-auto max-w-6xl py-12 px-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">组内活动</h1>
        <div className="h-1 w-32 bg-primary mx-auto rounded-full"></div>
      </header>

      <div className="space-y-16">
        {years.map((year) => (
          <div key={year} className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-start">
                <span className="bg-white dark:bg-gray-900 pr-3 text-2xl font-semibold text-gray-900 dark:text-white">
                  {year}年
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
              {groupedActivities[year].map(({ id, name, avatar, position, title, description, date, tags }: Activity) => (
                <div key={id} className="flex flex-col h-full">
                  <ActivityItem
                    id={id}
                    name={name}
                    avatar={avatar}
                    position={position}
                    title={title}
                    description={description}
                    tags={tags}
                  />
                  <div className="mt-3 flex items-center gap-4 px-1 justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      {formatDate(date)}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{position}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
