import type { Metadata } from 'next';
import { findLatestPublications } from '~/utils/publications';
import { PublicationsClient, Publication } from '~/components/client/PublicationsClient';

export type TimelineView = 'grid' | 'timeline';

export const metadata: Metadata = {
  title: '成果及论文 | 田甜科研小组',
  description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  openGraph: {
    title: '成果及论文 | 田甜科研小组',
    description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  }
}

export default async function PublicationsPage() {
  const publications = await findLatestPublications();
  
  // 按照发布日期排序
  const sortedPublications = [...publications].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  return (
    <section className="mx-auto px-0 md:px-20 py-12 pt-0">
      <PublicationsClient publications={sortedPublications} />
    </section>
  );
}
