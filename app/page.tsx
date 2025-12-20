import type { Metadata } from 'next';

import HomeClientPage from './HomeClientPage';
import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  description:
    '扬州大学化学学院田甜科研小组主页，专注环糊精、钙钛矿、太阳能电池、发光材料等方向研究，发布团队成员、成果论文、新闻动态与组内活动。',
  keywords: ['科研团队', '研究方向', '论文', '新闻', '活动', '成员介绍'],
  path: '/',
  type: 'website',
});

export default function Page() {
  return <HomeClientPage />;
}
