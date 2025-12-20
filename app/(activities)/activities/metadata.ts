import type { Metadata } from 'next';

import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '组内活动',
  description:
    '扬州大学化学学院田甜科研小组的活动记录，包括学术研讨会、安全培训、国际学术会议参会、企业参观学习以及组内学术讨论等精彩活动。',
  keywords: ['组内活动', '学术研讨会', '实验室安全培训', '国际会议', '企业参观', '组会'],
  path: '/activities',
  type: 'website',
});
