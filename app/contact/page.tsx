import { Button, Card, CardBody, Image, Slider } from '@heroui/react';
import { Mail, School } from 'lucide-react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import NextImage from 'next/image';
import React from 'react';

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

export default function Contact() {
  const t = useTranslations('HomePage');
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mx-auto my-10"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col z-50">
          <div className="w-full text-sm">
            <div className="flex items-start md:items-center flex-col md:flex-row gap-2 my-10">
              <Mail size={16} />
              <a href="mailto:tiant91@yzu.edu.cn" className="whitespace-nowrap">
                tiant91@yzu.edu.cn
              </a>
            </div>
            <div className="flex items-start md:items-center flex-col md:flex-row gap-2 my-10">
              <School size={16} />
              <span>{t('Address')}</span>
            </div>
          </div>
        </div>
        {/* <Globe /> */}
      </CardBody>
    </Card>
  );
}
