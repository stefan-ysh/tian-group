'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Image, Chip } from '@heroui/react';
import md from 'markdown-it';
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react';
import { useActivity } from '~/hooks/useActivities';
import { DetailPageSkeletonLoader } from '../../../components/ui/SkeletonLoader';
import { useLocale } from 'next-intl';
import { formatDate } from '../../../../src/utils/utils';

export default function Page() {
  const params = useParams();
  const { activity, isLoading, isError } = useActivity(params.id);
  const locale = useLocale();

  if (isLoading) {
    return <DetailPageSkeletonLoader />;
  }

  if (isError || !activity) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-semibold text-red-500 mb-4">未找到活动</h2>
        <Link href="/activities" passHref>
          <Button variant="light" startContent={<ArrowLeft size={18} />}>
            返回活动列表
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-16 lg:py-20">
      <div className="mb-6">
        <Link href="/activities" passHref>
          <Button
            variant="light"
            startContent={<ArrowLeft size={18} />}
            className="mb-4"
          >
            返回活动列表
          </Button>
        </Link>
      </div>
      <article>
        <h1 className="sr-only">活动详情: {activity.title}</h1>
        
        <header className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {activity.tags && activity.tags.map((tag, index) => (
              <Chip key={index} color="warning" variant="flat" className="capitalize bg-gray-900 text-white border-none">
                {tag}
              </Chip>
            ))}
          </div>
          <h2 className="leading-tighter font-heading text-center mx-auto mb-6 max-w-3xl text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
            {activity.title}
          </h2>
          <div className="mb-6 flex justify-center flex-wrap gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <CalendarDays className="text-primary" size={16} />
              <span>{formatDate(activity.date, 'long', locale)}</span>
            </div>
            {activity.location && (
              <div className="flex items-center gap-1">
                <MapPin size={18} className="text-primary" />
                <span>{activity.location}</span>
              </div>
            )}
          </div>
          <p className="mx-auto max-w-3xl text-center text-xl text-gray-600 dark:text-gray-400">
            {activity.description}
          </p>
          {activity.avatar && (
            <div className="mt-8 mx-auto max-w-4xl overflow-hidden rounded-lg shadow-lg">
              <Image
                src={activity.avatar}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                alt={activity.description || ''}
                width={1024}
                height={576}
                priority
              />
            </div>
          )}
        </header>
        <div
          className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl prose-headings:text-primary"
          dangerouslySetInnerHTML={{
            __html: md({
              html: true,
              linkify: true,
              typographer: true,
            }).render(activity.content || ''),
          }}
        />
      </article>
    </section>
  );
}
