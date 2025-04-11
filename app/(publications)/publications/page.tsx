import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { findLatestPublications } from '~/utils/publications';
import { PublicationsClient, Publication } from '~/components/client/PublicationsClient';

export type TimelineView = 'grid' | 'timeline';

// Use 'force-dynamic' to avoid prerendering issues
export const dynamic = 'force-dynamic';

// Static metadata for SEO
export const metadata: Metadata = {
  title: '成果及论文 | 田甜科研小组',
  description: '田甜科研小组发表的学术论文及研究成果，包括Angew、NC、Wiley、Advanced Materials等国际权威期刊上的文章。',
  keywords: '田甜, 扬州大学, 化学学院, 科研成果, 论文发表, Angew, NC, Wiley, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Energy Letters',
  openGraph: {
    title: '成果及论文 | 田甜科研小组',
    description: '田甜科研小组发表的学术论文及研究成果，包括Angew、NC、Wiley、Advanced Materials等国际权威期刊上的文章。'
  }
};

export default async function PublicationsPage() {
  const publications = await findLatestPublications();
  
  // 按照发布日期排序并创建安全副本
  const safePublications = [...publications].map(pub => ({
    ...pub,
    publishDate: pub.publishDate || '',
    // Ensure all fields are safe
  })).sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  return (
    <section className="mx-auto px-0 md:px-20 py-12 pt-0">
      <PublicationsClient publications={safePublications} />
    </section>
  );
}
