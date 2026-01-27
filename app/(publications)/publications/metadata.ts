import type { Metadata } from 'next';

import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '成果及论文',
  description:
    '田甜课题组发表的学术论文及研究成果，涵盖环糊精、钙钛矿、太阳能电池、发光材料等领域，包含作者、期刊与摘要等信息。',
  keywords: ['科研成果', '论文发表', '学术论文', '环糊精', '钙钛矿', '太阳能电池', '发光材料'],
  path: '/publications',
  type: 'website',
});