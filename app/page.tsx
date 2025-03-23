"use client";
import { Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Mail, School, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NextImage from 'next/image';
import React from 'react';

export default function App() {
  const t = useTranslations('HomePage');
  return (
    <div className="min-h-[calc(100vh-70px)] flex flex-col justify-center items-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[900px] mx-auto" shadow="md">
          <CardBody className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
              {/* 左侧个人信息 */}
              <motion.div 
                className="md:col-span-5 flex flex-col items-center md:items-start gap-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div 
                  className="relative rounded-lg overflow-hidden shadow-lg border-2 border-primary/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <NextImage
                    src="https://s2.loli.net/2025/01/29/6vOktfKD38m9TZj.png"
                    className="w-[220px] h-[220px] object-cover"
                    width={220}
                    height={220}
                    alt="扬州大学 化学学院 教授 田甜"
                    priority
                  />
                </motion.div>

                <div className="w-full">
                  <motion.div 
                    className="flex flex-col items-center md:items-start mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground">{t('Name')}</h2>
                    <p className="text-foreground/70 font-medium mt-1">{t('Title')}</p>
                  </motion.div>

                  <motion.div 
                    className="flex flex-col gap-2.5 text-sm mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.div 
                      className="flex items-center gap-2.5"
                      whileHover={{ x: 5, color: "var(--color-primary)" }}
                    >
                      <Mail className="text-primary" size={18} />
                      <a href="mailto:tiant91@yzu.edu.cn" className="hover:text-primary transition-colors">
                        tiant91@yzu.edu.cn
                      </a>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2.5"
                      whileHover={{ x: 5, color: "var(--color-primary)" }}
                    >
                      <School className="text-primary" size={18} />
                      <span>{t('Address')}</span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* 右侧研究组介绍 */}
              <motion.div 
                className="md:col-span-7 flex flex-col gap-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* 研究方向部分 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-primary">
                    <BookOpen size={18} />
                    <span>{t('researchDirection')}</span>
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                    {t('researchDirectionContent')}
                  </p>
                </motion.div>

                {/* 研究团队部分 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-primary">
                    <Users size={18} />
                    <span>{t('researchTeam')}</span>
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                   {t('researchTeamContent')}
                  </p>
                </motion.div>

                {/* 研究成果部分 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-primary">
                    <Award size={18} />
                    <span>{t('researchAchievements')}</span>
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
                    {t('researchAchievementsContent')}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
