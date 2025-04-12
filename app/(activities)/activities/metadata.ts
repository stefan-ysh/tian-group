import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Get translations
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  const title = t('activitiesTitle', { default: '组内活动 | 田甜科研小组' });
  const description = t('activitiesDescription', {
    default:
      '扬州大学化学学院田甜科研小组的活动记录，包括学术研讨会、安全培训、国际学术会议参会、企业参观学习以及组内学术讨论等精彩活动。',
  });

  return {
    title,
    description,
    keywords: '田甜, 扬州大学, 化学学院, 组内活动, 学术研讨会, 实验室安全培训, 国际会议, 企业参观, 组会',
    openGraph: {
      title,
      description,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1000',
          width: 1200,
          height: 630,
          alt: '田甜科研小组组内活动',
        },
      ],
    },
  };
}
