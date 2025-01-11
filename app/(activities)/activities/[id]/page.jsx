import md from 'markdown-it';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { findActivitiesByName, findLatestActivities } from '~/utils/activities';

export const dynamicParams = false;

const getFormattedDate = (date) => date;



export async function generateMetadata({ params }) {
  const activity = await findActivitiesByName(params.id);
  if (!activity) {
    return notFound();
  }
  const title = `${activity.name} - ${activity.position}`;
  return { title, description: activity.description };
}

export async function generateStaticParams() {
  return (await findLatestActivities()).map(({ id }) => ({ id }));
}

export default async function Page({ params }) {
  const activity = await findActivitiesByName(params.id);

  if (!activity) {
    return notFound();
  }

  return (
    <section className="mx-auto py-8 sm:py-16 lg:py-20">
      <article>
        <header className={activity.image ? 'text-center' : ''}>
          <h1 className="leading-tighter font-heading mx-auto mb-2 max-w-3xl px-4 text-1xl font-bold tracking-tighter sm:px-6 md:text-2xl">
            👋 Hi there, I&apos;m {activity.name}
          </h1>
          {activity.image ? (
            <Image
              src={activity.image}
              className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-6xl"
              sizes="(max-width: 900px) 400px, 900px"
              alt={activity.description}
              loading="eager"
              priority
              width={900}
              height={480}
            />
          ) : (
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <div className="border-t dark:border-slate-700" />
            </div>
          )}
        </header>
        <div
          className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl"
          dangerouslySetInnerHTML={{
            __html: md({
              html: true,
            }).render(activity.content),
          }}
        />
      </article>
    </section>
  );
}
