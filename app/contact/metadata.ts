import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Get translations
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  const title = t('contactTitle', { default: 'Contact Us | Tian Research Group' });
  const description = t('contactDescription', { 
    default: 'Contact Tian Research Group, located at the School of Chemistry, Yangzhou University. We welcome collaboration and those interested in joining our research team.' 
  });

  return {
    title,
    description,
    keywords: '田甜, 扬州大学, 化学学院, 联系方式, 科研合作, 招聘, 地址, 邮箱, 电话, Tian Tian, Yangzhou University, School of Chemistry, contact information',
    openGraph: {
      title,
      description,
    },
  };
} 