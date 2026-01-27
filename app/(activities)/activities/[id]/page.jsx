import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import ActivityDetailClientPage from './ActivityDetailClientPage';
import { generateSEOMetadata } from '~/lib/seo';
import { findActivitiesByName, findLatestActivities } from '~/utils/activities';
import { BreadcrumbSchema, EventSchema } from '~/components/seo/JsonLd';

export async function generateMetadata({ params }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';
  const activity = await findActivitiesByName(params.id, locale);

  if (!activity) {
    return generateSEOMetadata({
      title: locale === 'en' ? 'Activity Not Found' : '活动未找到',
      description: locale === 'en' ? 'Sorry, the activity content you requested was not found.' : '抱歉，您请求的活动内容未找到。',
      path: `/activities/${params.id}`,
      noindex: true,
    });
  }

  return generateSEOMetadata({
    title: activity.title || (locale === 'en' ? 'Group Activity' : '组内活动'),
    description: activity.description || (locale === 'en' ? 'Activity detail of Prof. Tian\'s research group' : '田甜课题组组内活动详情'),
    keywords: locale === 'en' 
      ? ['Group Activities', 'Seminar', 'Lab Safety', 'Meeting', ...(activity.tags || [])]
      : ['组内活动', '学术研讨会', '安全培训', '组会', ...(activity.tags || [])],
    image: activity.avatar,
    path: `/activities/${activity.id}`,
    type: 'article',
    publishedTime: activity.date,
    authors: [locale === 'en' ? 'Tian Research Group' : '田甜课题组'],
  });
}

// Generate static params for all activity items
export async function generateStaticParams() {
  try {
    const activities = await findLatestActivities(100);
    return activities.map(({ id }) => ({
      id,
    }));
  } catch (error) {
    console.error('Error generating static params for activities:', error);
    return [];
  }
}

export default async function Page({ params }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';
  const activity = await findActivitiesByName(params.id, locale);
  const t = await getTranslations({ locale, namespace: 'Header.NavMenu' });
  const commonT = await getTranslations({ locale, namespace: 'Common' });
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const url = `${siteUrl}/activities/${params.id}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: commonT('Home'), url: siteUrl },
          { name: t('activities'), url: `${siteUrl}/activities` },
          { name: activity?.title || params.id, url },
        ]}
      />
      {activity ? <EventSchema activity={activity} /> : null}
      <ActivityDetailClientPage id={params.id} />
    </>
  );
}
