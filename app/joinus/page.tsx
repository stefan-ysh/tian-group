import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '加入我们 | 田甜科研小组',
  description:
    '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  keywords:
    '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  openGraph: {
    title: '加入我们 | 田甜科研小组',
    description:
      '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  },
};

export default function JoinUsWrapper({}) {
  const t = useTranslations('JoinUs');

  return (
    <section className="mx-auto max-w-3xl px-6 pt-0">
      {/* 招聘启示 */}
      <section>
        <div className="bg-white/90 dark:bg-gray-800/80 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-primary border-l-4 border-primary pl-4 flex items-center">
            {t('title')}
          </h2>

          <p className="text-foreground/90 leading-relaxed mb-6">{t('description')}</p>

          <h3 className="text-2xl font-semibold text-primary/90 mt-6 mb-4">{t('requirements')}</h3>
          <ul className="list-disc list-inside space-y-3 text-foreground/90 ml-5">
            <li className="pl-2">{t('positionRequirements.1')}</li>
            <li className="pl-2">{t('positionRequirements.2')}</li>
            <li className="pl-2">{t('positionRequirements.3')}</li>
            <li className="pl-2">{t('positionRequirements.4')}</li>
          </ul>

          <h3 className="text-2xl font-semibold text-primary/90 mt-6 mb-4">{t('researchDirection')}</h3>
          <p className="text-foreground/90 leading-relaxed mb-4">{t('researchDetails.1')}</p>
          <p className="text-foreground/90 leading-relaxed mb-4">{t('researchDetails.2')}</p>
          <p className="text-foreground/90 leading-relaxed mb-4">{t('researchDetails.3')}</p>

          <h3 className="text-2xl font-semibold text-primary/90 mt-6 mb-4">{t('applicationMethod')}</h3>
          <p className="text-foreground/90 leading-relaxed mb-4">{t('email')}</p>
        </div>
      </section>
    </section>
  );
}
