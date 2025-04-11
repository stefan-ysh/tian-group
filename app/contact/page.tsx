'use client';

import { Mail, MapPin, School, Globe, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Contact() {
  const t = useTranslations('HomePage');
  const common = useTranslations('common');
  const header = useTranslations('Header');
  
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">{common('ContactUs')}</h1>
        <div className="h-1 w-32 bg-primary mx-auto rounded-full"></div>
      </div>
      
      {/* 主要内容 */}
      <div className="bg-white/90 dark:bg-gray-800/80 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        {/* 介绍部分 */}
        <div className="flex items-start mb-10">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-foreground/90 leading-relaxed text-lg">
              {common('GetInTouch')}
            </p>
          </div>
        </div>

        {/* 联系方式卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Contact */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary">{common('Email')}</h3>
            <a 
              href="mailto:tiant91@yzu.edu.cn" 
              className="text-foreground/90 hover:text-primary transition-colors"
            >
              tiant91@yzu.edu.cn
            </a>
          </div>
          
          {/* Address */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary">{common('Address')}</h3>
            <p className="text-foreground/90">
              {t('Address')}
            </p>
          </div>
          
          {/* School */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
              <School className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary">{common('College')}</h3>
            <p className="text-foreground/90">{t('College')}</p>
          </div>
        </div>
        
        {/* 地图 */}
        <div className="mt-10 p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-primary">{common('Location')}</h2>
          </div>
          <div className="aspect-video w-full bg-gray-100 dark:bg-gray-700/30 flex items-center justify-center rounded-lg">
            <p className="text-foreground/70">{common('MapPlaceholder')}</p>
            {/* 如果有地图组件，可以在这里添加 */}
          </div>
        </div>
      </div>
    </section>
  );
}
