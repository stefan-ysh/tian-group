'use client';

import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardBody, 
  CardFooter,
  Button,
  Tab, 
  Tabs,
  Accordion,
  AccordionItem
} from "@heroui/react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  FileText, 
  ExternalLink, 
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import NextImage from 'next/image';
import Link from 'next/link';
import { formatDate } from '../../src/utils/utils';

export interface EventSpeaker {
  id?: string;
  name: string;
  affiliation: string;
  imageUrl?: string;
}

export interface AcademicEvent {
  id: string;
  title: string;
  startDate: string;  // ISO string
  endDate?: string;   // ISO string
  location: string;
  description: string;
  type: 'conference' | 'seminar' | 'workshop' | 'meeting' | 'other';
  speakers?: EventSpeaker[];
  organizer?: string;
  registrationUrl?: string;
  imageUrl?: string;
  attachments?: {
    name: string;
    url: string;
  }[];
  externalUrl?: string;
}

interface AcademicCalendarProps {
  events: AcademicEvent[];
}

export function AcademicCalendar({ events }: AcademicCalendarProps) {
  const t = useTranslations('AcademicCalendar');
  const [activeTab, setActiveTab] = useState("upcoming");
  const locale = useLocale();
  
  // 将日期对象移入useMemo内部，以避免依赖变化
  // 将事件分为未来和过去
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date(); // 移到内部
    const upcoming: AcademicEvent[] = [];
    const past: AcademicEvent[] = [];
    
    events.forEach(event => {
      const eventDate = new Date(event.startDate);
      if (eventDate >= now) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });
    
    // 按日期排序：未来事件按时间升序，过去事件按时间降序
    upcoming.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    past.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    
    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]); // 移除 now 依赖项，因为现在它在内部创建
  
  // 根据年份归类过去的事件
  const pastEventsByYear = useMemo(() => {
    const groupedEvents: Record<string, AcademicEvent[]> = {};
    
    pastEvents.forEach(event => {
      const year = new Date(event.startDate).getFullYear().toString();
      if (!groupedEvents[year]) {
        groupedEvents[year] = [];
      }
      groupedEvents[year].push(event);
    });
    
    // 将结果转换为按年份降序排列的数组
    return Object.entries(groupedEvents)
      .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA));
  }, [pastEvents]);
  
  // 格式化时间范围
  const formatDateRange = (startDate: string, endDate?: string): string => {
    const start = new Date(startDate);
    
    if (!endDate) {
      return formatDate(startDate, 'medium', locale);
    }
    
    const end = new Date(endDate);
    
    // 如果是同一天的活动
    if (start.toDateString() === end.toDateString()) {
      return `${formatDate(startDate, 'medium', locale)} ${start.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // 多天活动
    return `${formatDate(startDate, 'medium', locale)} - ${formatDate(endDate, 'medium', locale)}`;
  };
  
  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="text-primary" size={24} />
          <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
        </div>
        
        <div className="mb-8">
          <Tabs 
            aria-label="Academic Calendar Tabs" 
            selectedKey={activeTab} 
            onSelectionChange={setActiveTab as any}
            className="w-full"
            variant="underlined"
            classNames={{
              tabList: "gap-6",
              cursor: "bg-primary",
              tab: "max-w-fit px-2 h-10 data-[selected=true]:text-primary"
            }}
          >
            <Tab 
              key="upcoming" 
              title={
                <div className="flex items-center gap-2">
                  <span>{t('upcomingEvents')}</span>
                  {upcomingEvents.length > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/10 text-primary text-xs rounded-full">
                      {upcomingEvents.length}
                    </span>
                  )}
                </div>
              }
            >
              <div className="py-4">
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map(event => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        formatDateRange={formatDateRange} 
                        t={t}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-foreground/60">
                    <Calendar size={40} className="mx-auto mb-4 opacity-50" />
                    <p>{t('noUpcomingEvents')}</p>
                  </div>
                )}
              </div>
            </Tab>
            <Tab 
              key="past" 
              title={
                <div className="flex items-center gap-2">
                  <span>{t('pastEvents')}</span>
                  {pastEvents.length > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/10 text-primary text-xs rounded-full">
                      {pastEvents.length}
                    </span>
                  )}
                </div>
              }
            >
              <div className="py-4">
                {pastEvents.length > 0 ? (
                  <Accordion 
                    variant="splitted" 
                    selectionMode="multiple"
                    defaultExpandedKeys={[pastEventsByYear[0]?.[0]]}
                  >
                    {pastEventsByYear.map(([year, yearEvents]) => (
                      <AccordionItem
                        key={year}
                        aria-label={`${year} Events`}
                        title={
                          <div className="flex items-center">
                            <span className="text-lg font-semibold">{year}</span>
                            <span className="ml-2 text-sm text-foreground/60">
                              ({yearEvents.length} {t('events')})
                            </span>
                          </div>
                        }
                        startContent={<Calendar className="text-primary" size={20} />}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2 pb-4">
                          {yearEvents.map(event => (
                            <EventCard 
                              key={event.id} 
                              event={event} 
                              formatDateRange={formatDateRange} 
                              t={t}
                              isPast
                            />
                          ))}
                        </div>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="py-12 text-center text-foreground/60">
                    <Calendar size={40} className="mx-auto mb-4 opacity-50" />
                    <p>{t('noPastEvents')}</p>
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function EventCard({ 
  event, 
  formatDateRange, 
  t, 
  isPast = false 
}: { 
  event: AcademicEvent; 
  formatDateRange: (start: string, end?: string) => string; 
  t: any;
  isPast?: boolean;
}) {
  return (
    <Card className={`border ${isPast ? 'border-gray-200 dark:border-gray-700' : 'border-primary/10'} hover:shadow-md transition-shadow`}>
      {event.imageUrl && (
        <div className="relative h-40 w-full">
          <NextImage
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-2 left-3 right-3">
            <span className={`px-2 py-1 text-xs rounded ${getEventTypeColor(event.type)}`}>
              {t(`eventTypes.${event.type}`)}
            </span>
          </div>
        </div>
      )}
      <CardBody className="p-5">
        <h3 className="text-lg font-semibold mb-3">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <Calendar className="text-primary flex-shrink-0 mt-0.5" size={16} />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="text-primary flex-shrink-0 mt-0.5" size={16} />
            <span>{event.location}</span>
          </div>
          
          {event.speakers && event.speakers.length > 0 && (
            <div className="flex items-start gap-2">
              <Users className="text-primary flex-shrink-0 mt-0.5" size={16} />
              <div>
                {event.speakers.length <= 2 ? (
                  <span>
                    {event.speakers.map((speaker, index) => (
                      <React.Fragment key={speaker.id || index}>
                        {speaker.name}
                        {index < event.speakers!.length - 1 && ', '}
                      </React.Fragment>
                    ))}
                  </span>
                ) : (
                  <span>
                    {event.speakers[0].name} {t('andOthers', { count: event.speakers.length - 1 })}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-foreground/80 line-clamp-3">
            {event.description}
          </p>
        </div>
      </CardBody>
      <CardFooter className="p-3 pt-0 border-t border-gray-200 dark:border-gray-700">
        <div className="w-full flex justify-between items-center">
          {event.organizer && (
            <span className="text-xs text-foreground/60">{t('organizedBy')}: {event.organizer}</span>
          )}
          <Link 
            href={`/activities/${event.id}`}
            className="ml-auto text-primary text-sm hover:underline flex items-center gap-1"
          >
            {t('details')}
            <ChevronRight size={16} />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

// 获取活动类型对应的颜色
function getEventTypeColor(type: AcademicEvent['type']): string {
  switch (type) {
    case 'conference':
      return 'bg-blue-500/90 text-white';
    case 'seminar':
      return 'bg-green-500/90 text-white';
    case 'workshop':
      return 'bg-purple-500/90 text-white';
    case 'meeting':
      return 'bg-amber-500/90 text-white';
    default:
      return 'bg-gray-500/90 text-white';
  }
} 