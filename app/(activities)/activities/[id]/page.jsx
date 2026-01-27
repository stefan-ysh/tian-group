import ActivityDetailClientPage from './ActivityDetailClientPage';
import { generateSEOMetadata } from '~/lib/seo';
import { findActivitiesByName } from '~/utils/activities';
import { BreadcrumbSchema, EventSchema } from '~/components/seo/JsonLd';

export async function generateMetadata({ params }) {
  const activity = await findActivitiesByName(params.id);

  if (!activity) {
    return generateSEOMetadata({
      title: '活动未找到',
      description: '抱歉，您请求的活动内容未找到。',
      path: `/activities/${params.id}`,
      noindex: true,
    });
  }

  return generateSEOMetadata({
    title: activity.title || '组内活动',
    description: activity.description || '田甜课题组组内活动详情',
    keywords: ['组内活动', '学术研讨会', '安全培训', '组会', ...(activity.tags || [])].filter(Boolean),
    image: activity.avatar,
    path: `/activities/${activity.id}`,
    type: 'article',
    publishedTime: activity.date,
    authors: ['田甜课题组'],
  });
}

// Generate static params for all activity items
export async function generateStaticParams() {
  try {
    const activities = await findLatestActivities();
    return activities.map(({ id }) => ({
      id,
    }));
  } catch (error) {
    console.error('Error generating static params for activities:', error);
    return [];
  }
}

export default async function Page({ params }) {
  const activity = await findActivitiesByName(params.id);
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group'}/activities/${params.id}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group' },
          { name: '组内活动', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group'}/activities` },
          { name: activity?.title || params.id, url },
        ]}
      />
      {activity ? <EventSchema activity={activity} /> : null}
      <ActivityDetailClientPage id={params.id} />
    </>
  );
}
