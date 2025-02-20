import { Button, Card, CardBody, Image, Slider } from "@heroui/react";
import { Mail, School } from 'lucide-react';
import { Metadata } from 'next';
import NextImage from 'next/image';
import React from 'react';
import { useTranslations } from "next-intl";

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
  const t = useTranslations('HomePage')
  return (
    <div className="h-[calc(100vh-70px)] flex flex-1 justify-center items-center">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mx-auto my-10"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <NextImage
                src="https://s2.loli.net/2025/01/29/6vOktfKD38m9TZj.png"
                className="w-full h-full md:w-[200px] md:h-[200px] object-cover"
                width={200}
                height={200}
                alt="扬州大学 化学学院 教授 田甜"
              />
            </div>
            <div className="flex flex-col col-span-6 md:col-span-8 ml-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <div className="flex items-end gap-2">
                    <h3 className="font-semibold text-foreground/90">{t('Name')}</h3>
                    <p className="text-small text-foreground/80">{t('Title')}</p>
                  </div>

                  {/* <h1 className="text-large font-medium mt-2">{t('School')}</h1> */}
                </div>
              </div>
              <div className="w-full mt-2 text-xs">
                <div className="flex items-center gap-2 mt-4">
                  <Mail size={16} />
                  <a href="mailto:tiant91@yzu.edu.cn">tiant91@yzu.edu.cn</a>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <School size={16} />
                  <span>{t('Address')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
