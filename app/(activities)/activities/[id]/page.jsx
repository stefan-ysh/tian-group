import md from 'markdown-it';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { findActivitiesByName, findLatestActivities } from '~/utils/activities';
import { Chip, Button } from "@heroui/react";
import { CalendarDays, MapPin, Users, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamicParams = false;

const getFormattedDate = (date) => {
  if (!date) return '';
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper function to get position color
function getPositionColor(position) {
  switch (position?.toLowerCase()) {
    case 'academic':
      return 'primary';
    case 'training':
      return 'success';
    case 'conference':
      return 'warning';
    case 'field trip':
      return 'danger';
    default:
      return 'default';
  }
}

export async function generateMetadata({ params }) {
  const activity = await findActivitiesByName(params.id);
  if (!activity) {
    return notFound();
  }
  const title = `${activity.title} | 组内活动`;
  return { title, description: activity.description };
}

export async function generateStaticParams() {
  const activities = await findLatestActivities();
  return activities.map(({ id }) => ({ id }));
}

export default async function Page({ params }) {
  const activity = await findActivitiesByName(params.id);

  if (!activity) {
    return notFound();
  }

  const formattedDate = getFormattedDate(activity.date);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16 lg:py-20">
      <div className="mb-6">
        <Link href="/activities" passHref>
          <Button
            variant="light"
            startContent={<ArrowLeft size={18} />}
            className="mb-4"
          >
            返回活动列表
          </Button>
        </Link>
      </div>
      <article>
        <header className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {activity.tags && activity.tags.map((tag, index) => (
              <Chip key={index} color="warning" variant="flat" className="capitalize bg-gray-900 text-white border-none">
                {tag}
              </Chip>
            ))}
          </div>
          <h1 className="leading-tighter font-heading text-center mx-auto mb-6 max-w-3xl text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
            {activity.title}
          </h1>
          <div className="mb-6 flex justify-center flex-wrap gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <CalendarDays size={18} className="text-primary" />
              <span>{formattedDate}</span>
            </div>
            {activity.location && (
              <div className="flex items-center gap-1">
                <MapPin size={18} className="text-primary" />
                <span>{activity.location}</span>
              </div>
            )}
          </div>
          <p className="mx-auto max-w-3xl text-center text-xl text-gray-600 dark:text-gray-400">
            {activity.description}
          </p>
          {activity.avatar && (
            <div className="mt-8 mx-auto max-w-4xl overflow-hidden rounded-lg shadow-lg">
              <Image
                src={activity.avatar}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                alt={activity.description || ''}
                width={1024}
                height={576}
                priority
              />
            </div>
          )}
        </header>
        <div
          className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl prose-headings:text-primary"
          dangerouslySetInnerHTML={{
            __html: md({
              html: true,
              linkify: true,
              typographer: true,
            }).render(activity.content || ''),
          }}
        />
      </article>
    </section>
  );
}
