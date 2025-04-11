'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Globe, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NextImage from 'next/image';
import Link from 'next/link';

interface Collaborator {
  id: string;
  name: string;
  institution: string;
  country: string;
  flagUrl: string;
  description: string;
  url?: string;
}

export default function GlobalCollaboration({ collaborators }: { collaborators: Collaborator[] }) {
  const t = useTranslations('GlobalCollaboration');
  
  return (
    <section className="py-12 px-4 bg-primary/5">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Globe className="text-primary" size={24} />
          <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
        </div>
        
        <p className="mb-10 text-foreground/80 max-w-3xl">
          {t('description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaborators.map((collaborator) => (
            <Card key={collaborator.id} className="border border-primary/10 hover:shadow-lg transition-shadow">
              <CardBody className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border border-primary/10">
                    <NextImage
                      src={collaborator.flagUrl}
                      alt={collaborator.country}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{collaborator.name}</h3>
                    <p className="text-sm text-foreground/70 mb-3">{collaborator.institution}, {collaborator.country}</p>
                    <p className="text-sm text-foreground/80 mb-4">
                      {collaborator.description}
                    </p>
                    
                    {collaborator.url && (
                      <a 
                        href={collaborator.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary text-sm hover:underline"
                      >
                        {t('visitWebsite')} <ExternalLink size={14} className="ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">{t('collaborationOpportunities')}</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-primary/10">
            <p className="text-foreground/80 mb-4">
              {t('collaborationText')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/joinus/exchange-students"
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                {t('exchangeStudents')}
              </Link>
              <Link 
                href="/joinus/visiting-scholars"
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                {t('visitingScholars')}
              </Link>
              <Link 
                href="/joinus/industry-partners"
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
              >
                {t('industryPartners')}
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 bg-primary text-white text-sm hover:bg-primary/90 transition-colors"
              >
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 