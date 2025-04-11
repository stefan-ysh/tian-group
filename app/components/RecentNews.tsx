'use client';

import React from 'react';
import { Card, CardBody, Button, Chip } from '@heroui/react';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
import { NewsItem, getTypeIcon, getTypeColor } from './NewsTimeline';

interface RecentNewsProps {
  news: NewsItem[];
}

export function RecentNews({ news }: RecentNewsProps) {
  const t = useTranslations('News');
  
  // Format date
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{t('title')}</h2>
          <Link href="/news" className="text-primary hover:underline flex items-center gap-1">
            {t('viewAll')}
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="border border-primary/10 hover:shadow-md transition-shadow">
              <CardBody className="p-4">
                {/* News type and date */}
                <div className="flex justify-between items-center mb-3">
                  <Chip 
                    variant="flat" 
                    color={getTypeColor(item.type)} 
                    size="sm"
                    startContent={getTypeIcon(item.type)}
                  >
                    {t(`types.${item.type}`)}
                  </Chip>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="text-primary" size={14} />
                    <span className="text-xs text-foreground/70">{formatDate(item.date)}</span>
                  </div>
                </div>
                
                {/* Image */}
                {item.imageUrl && (
                  <div className="relative h-40 w-full mb-3 rounded-md overflow-hidden">
                    <NextImage
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  <Link href={`/news/${item.id}`} className="hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </h3>
                
                {/* Summary */}
                <p className="text-sm text-foreground/80 mb-4 line-clamp-3">
                  {item.summary}
                </p>
                
                {/* Read more */}
                <div className="mt-auto">
                  <Link 
                    href={`/news/${item.id}`}
                    className="text-primary text-sm hover:underline flex items-center gap-1"
                  >
                    {t('readMore')}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        
        {/* View all button */}
        <div className="mt-8 text-center">
          <Link href="/news">
            <Button 
              color="primary" 
              variant="flat"
              className="px-6" 
              endContent={<ArrowRight size={16} />}
            >
              {t('viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 