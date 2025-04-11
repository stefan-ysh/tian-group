import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // Get translations
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  const title = t('contactTitle', { default: '组内活动 | 田甜科研小组' });
  const description = t('contactDescription', {
    default:
      '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  });

  return {
    title,
    description,
    keywords: '田甜, 扬州大学, 化学学院 庞欢课题组, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授',
    openGraph: {
      title,
      description,
    },
  };
}
