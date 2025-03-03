'use client';

import { Mail, MapPin, School } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Contact() {
  const t = useTranslations('HomePage');
  const common = useTranslations('common');
  const header = useTranslations('Header');
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-16 ">{header('NavMenu.contact')}</h1>
      
      <div className="max-w-[900px] mx-auto">
        <div className="bg-background/10 dark:bg-default-100/5 backdrop-blur-sm rounded-xl p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Email Contact */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mail size={32} className="" />
              </div>
              <h3 className="font-medium text-xl mb-2">{common('Email')}</h3>
              <a 
                href="mailto:tiant91@yzu.edu.cn" 
                className="transition-colors"
              >
                tiant91@yzu.edu.cn
              </a>
            </div>
            
            {/* Address */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MapPin size={32} className="" />
              </div>
              <h3 className="font-medium text-xl mb-2">{common('Address')}</h3>
              <p className="text-default-600">
                {t('Address')}
              </p>
            </div>
            
            {/* School */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <School size={32} className="" />
              </div>
              <h3 className="font-medium text-xl mb-2">{common('College')}</h3>
              <p className="text-default-600">{t('College')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
