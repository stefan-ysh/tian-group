import type { Metadata } from 'next';

import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '新闻动态',
  description: '田甜科研小组最新动态，包括研究进展、学术会议、活动等实时新闻与重要通知。',
  keywords: ['新闻动态', '科研进展', '学术活动', '会议', '讲座', '团队活动', '扬州大学', '化学学院'],
  path: '/news',
  type: 'website',
});