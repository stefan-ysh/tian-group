import type { Metadata } from 'next';

import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '组内成员',
  description: '田甜课题组组员介绍，包括博士后、博士研究生、硕士研究生及其他团队成员。',
  keywords: ['组内成员', '科研团队', '博士后', '博士研究生', '硕士研究生', '团队介绍'],
  path: '/members',
  type: 'website',
});