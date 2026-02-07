'use client';

import { Card, CardBody } from '@heroui/react';
import { Award, BookOpen, Mail, School, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NextImage from 'next/image';
import React from 'react';
import FadeIn from '~/components/atoms/FadeIn';

export default function HomeClientPage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center p-0 md:px-5 md:py-12">
        <FadeIn delay={0.1} duration={0.6} direction="up" className="w-full">
          <Card
            isBlurred
            className="border-none bg-gray-50/50 dark:bg-gray-800/50 max-w-[900px] mx-auto backdrop-blur-md"
            shadow="lg"
          >
            <CardBody className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
                {/* 左侧个人信息 */}
                <div className="md:col-span-5 flex flex-col items-center md:items-start gap-5">
                  <FadeIn direction="left" delay={0.2} duration={0.6}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700 transition-transform hover:scale-[1.02] duration-300">
                      <NextImage
                        src="/images/avatar/tiantian.jpg"
                        className="w-[240px] h-[240px] object-cover"
                        width={240}
                        height={240}
                        sizes="240px"
                        alt={t('AvatarAlt')}
                        priority
                      />
                    </div>
                  </FadeIn>

                  <div className="w-full">
                    <FadeIn direction="up" delay={0.3}>
                      <div className="flex flex-col items-center md:items-start mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{t('Name')}</h1>
                        <p className="text-primary font-semibold mt-1 text-lg">{t('Title')}</p>
                      </div>
                    </FadeIn>

                    <FadeIn direction="up" delay={0.4} className="flex flex-col gap-3 text-sm md:text-base">
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
                        <Mail className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={20} />
                        <a href="mailto:tiant91@yzu.edu.cn" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium">
                          tiant91@yzu.edu.cn
                        </a>
                      </div>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
                        <School className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={20} />
                        <span className="text-gray-600 dark:text-gray-300 font-medium">{t('Address')}</span>
                      </div>
                    </FadeIn>
                  </div>
                </div>

                {/* 右侧研究组介绍 */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  {/* 研究方向部分 */}
                  <FadeIn direction="right" delay={0.2} className="group">
                    <div className="bg-white/50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-colors">
                      <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-primary">
                        <BookOpen size={20} className="text-secondary" />
                        <span>{t('researchDirection')}</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t('researchDirectionContent')}
                      </p>
                    </div>
                  </FadeIn>

                  {/* 研究团队部分 */}
                  <FadeIn direction="right" delay={0.3} className="group">
                    <div className="bg-white/50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-colors">
                      <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-primary">
                        <Users size={20} className="text-secondary" />
                        <span>{t('researchTeam')}</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('researchTeamContent')}</p>
                    </div>
                  </FadeIn>

                  {/* 研究成果部分 */}
                  <FadeIn direction="right" delay={0.4} className="group">
                    <div className="bg-white/50 dark:bg-gray-900/50 p-5 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/20 transition-colors">
                      <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-primary">
                        <Award size={20} className="text-secondary" />
                        <span>{t('researchAchievements')}</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t('researchAchievementsContent')}
                      </p>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </CardBody>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
