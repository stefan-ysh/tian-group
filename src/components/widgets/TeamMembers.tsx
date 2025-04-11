'use client';

import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Mail, FileText, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NextImage from 'next/image';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  email: string;
  bio: string;
  research: string[];
  publications?: number;
  cv?: string;
}

export default function TeamMembers({ members }: { members: TeamMember[] }) {
  const t = useTranslations('TeamMembers');
  
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Users className="text-primary" size={24} />
          <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
        </div>
        
        <p className="mb-10 text-foreground/80 max-w-3xl">
          {t('description')}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <Card key={member.id} className="group border border-primary/10 hover:shadow-lg transition-all">
              <CardBody className="p-6">
                <div className="flex flex-col items-center">
                  <div className="mb-4 rounded-full overflow-hidden border-2 border-primary/20 h-36 w-36 transform group-hover:scale-105 transition-transform">
                    <NextImage
                      src={member.imageUrl}
                      alt={member.name}
                      width={144}
                      height={144}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-center mb-1">{member.name}</h3>
                  <p className="text-sm text-foreground/70 text-center mb-4">{member.title}</p>
                  
                  <div className="w-full space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="text-primary flex-shrink-0" size={16} />
                      <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors truncate">
                        {member.email}
                      </a>
                    </div>
                    
                    {member.cv && (
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="text-primary flex-shrink-0" size={16} />
                        <a 
                          href={member.cv} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          {t('downloadCV')}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full">
                    <h4 className="text-sm font-medium mb-2">{t('researchInterests')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.research.map((interest, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-primary/10 flex justify-center">
                  <Link 
                    href={`/members/${member.id}`}
                    className="text-primary text-sm hover:underline"
                  >
                    {t('viewProfile')}
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/members" 
            className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            {t('viewAllMembers')}
          </Link>
        </div>
      </div>
    </section>
  );
} 