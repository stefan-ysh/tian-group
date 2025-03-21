import { Card, CardBody } from '@heroui/react';
import { Mail, School, BookOpen, Users, Award } from 'lucide-react';
import { Metadata } from 'next';
import NextImage from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: '田甜科研小组 | 扬州大学化学学院',
  description:
    '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、JACS、JPC、NC、Wiley、Nature、Science、Advanced Materials等众多权威期刊。',
  keywords:
    '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  openGraph: {
    title: '田甜科研小组 | 扬州大学化学学院',
    description:
      '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、JACS、JPC、NC、Wiley、Nature、Science、Advanced Materials等众多权威期刊。',
  },
};

export default function App() {
  const t = useTranslations('HomePage');
  return (
    <div className="min-h-[calc(100vh-70px)] flex flex-col justify-center items-center py-12 px-5">
      <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[900px] mx-auto" shadow="md">
        <CardBody className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
            {/* 左侧个人信息 */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start gap-5">
              <div className="relative rounded-lg overflow-hidden shadow-lg border-2 border-primary/10">
                <NextImage
                  src="https://s2.loli.net/2025/01/29/6vOktfKD38m9TZj.png"
                  className="w-[220px] h-[220px] object-cover"
                  width={220}
                  height={220}
                  alt="扬州大学 化学学院 教授 田甜"
                  priority
                />
              </div>

              <div className="w-full">
                <div className="flex flex-col items-center md:items-start mb-3">
                  <h2 className="text-2xl font-bold text-foreground">{t('Name')}</h2>
                  <p className="text-foreground/70 font-medium mt-1">{t('Title')}</p>
                </div>

                <div className="flex flex-col gap-2.5 text-sm mt-4">
                  <div className="flex items-center gap-2.5">
                    <Mail className="text-primary" size={18} />
                    <a href="mailto:tiant91@yzu.edu.cn" className="hover:text-primary transition-colors">
                      tiant91@yzu.edu.cn
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <School className="text-primary" size={18} />
                    <span>{t('Address')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧研究组介绍 */}
            <div className="md:col-span-7 flex flex-col gap-5">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-primary">
                  <BookOpen size={18} />
                  <span>{t('researchDirection')}</span>
                </h3>
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                  {t('researchDirectionContent')}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-primary">
                  <Users size={18} />
                  <span>{t('researchTeam')}</span>
                </h3>
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                 {t('researchTeamContent')}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-primary">
                  <Award size={18} />
                  <span>{t('researchAchievements')}</span>
                </h3>
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                  {t('researchAchievementsContent')}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
