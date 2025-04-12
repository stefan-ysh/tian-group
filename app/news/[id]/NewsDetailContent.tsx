'use client';

import React from 'react';
import { Calendar, ExternalLink, Newspaper, FileText, Award } from 'lucide-react';
import { Card, CardBody, Chip, Divider } from '@heroui/react';
import { getTypeIcon, getTypeColor, NewsType } from '../../components/NewsTimeline';
import NextImage from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { DetailNewsItem } from '../../../src/types/content';

interface NewsDetailContentProps {
  newsItem: DetailNewsItem;
}

export function NewsDetailContent({ newsItem }: NewsDetailContentProps) {
  const t = useTranslations('News');
  
  // 内部处理日期格式化
  const formatDate = (dateStr: string): string => {
    const locale = useLocale();
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return dateStr; // Return original if invalid date
      }
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).replace(/\//g, '-');
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateStr; // Return original on error
    }
  };
  
  // Safely assert the newsItem.type as NewsType for use with our type-specific functions
  const newsType = newsItem.type as NewsType;
  
  // Determine news type icon component
  let TypeIcon = Newspaper;
  if (newsItem.type === 'publication') TypeIcon = FileText;
  if (newsItem.type === 'award') TypeIcon = Award;
  if (newsItem.type === 'event') TypeIcon = Calendar;
  
  return (
    <Card className="border border-primary/10">
      <CardBody className="p-6 md:p-8">
        {/* News metadata */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Chip
            variant="flat"
            color={getTypeColor(newsType)}
            size="sm"
            startContent={getTypeIcon(newsType)}
          >
            {newsItem.type === 'publication' ? '论文发表' : 
             newsItem.type === 'award' ? '荣誉奖项' : 
             newsItem.type === 'event' ? '学术活动' : 
             newsItem.type === 'media' ? '媒体报道' : '公告'}
          </Chip>
          
          <div className="flex items-center gap-1 text-foreground/70">
            <Calendar size={16} />
            <span>{formatDate(newsItem.date)}</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">{newsItem.title}</h1>
        
        {/* Image */}
        {newsItem.imageUrl && (
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-md overflow-hidden">
            <NextImage
              src={newsItem.imageUrl}
              alt={newsItem.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        {/* Publication authors */}
        {newsItem.type === 'publication' && newsItem.authors && newsItem.authors.length > 0 && (
          <div className="mb-4 text-lg">
            <h2 className="font-semibold mb-2">作者</h2>
            <div className="flex flex-wrap gap-2">
              {newsItem.authors.map((author, index) => (
                <span 
                  key={author.id || `author-${index}`}
                  className="px-3 py-1 bg-primary/10 rounded-full"
                >
                  {author.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Publication details */}
        {newsItem.type === 'publication' && newsItem.publication && (
          <div className="mb-6">
            <h2 className="font-semibold mb-2">发表信息</h2>
            <div className="text-lg italic text-foreground/80">
              {newsItem.publication.journal}
              {newsItem.publication.volume && `, ${newsItem.publication.volume}`}
              {newsItem.publication.issue && `(${newsItem.publication.issue})`}
              {newsItem.publication.doi && (
                <div className="mt-2 text-primary non-italic">
                  <Link
                    href={`https://doi.org/${newsItem.publication.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    DOI: {newsItem.publication.doi}
                    <ExternalLink size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        
        <Divider className="my-6" />
        
        {/* Summary/content */}
        <div className="text-lg mb-8 leading-relaxed">
          <p>{newsItem.summary}</p>
          
          {/* Here we would typically include more detailed content 
              For now we're just using the summary */}
        </div>
        
        {/* Tags */}
        {newsItem.tags && newsItem.tags.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm text-foreground/70 mb-2">标签</h3>
            <div className="flex flex-wrap gap-2">
              {newsItem.tags.map((tag) => (
                <Chip key={tag} variant="flat" size="sm">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        )}
        
        {/* External link */}
        {newsItem.link && (
          <div className="mt-8">
            <Link
              href={newsItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {t('readPaper')}
              <ExternalLink size={16} />
            </Link>
          </div>
        )}
      </CardBody>
    </Card>
  );
} 