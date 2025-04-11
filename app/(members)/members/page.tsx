import type { Metadata } from 'next';

import { findLatestMembers } from '~/utils/members';

import { MemberItem } from '~/components/widgets/MemberItem';

export const metadata: Metadata = {
  title: '组内成员 | 田甜科研小组',
  description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, NC, Wiley, Advanced Materials, Advanced Functional Materials, ACS Nano,  ACS Energy Letters',
  openGraph: {
    title: '组内成员 | 田甜科研小组',
    description: '扬州大学化学学院，田甜'
  }
}

export default async function Home({}) {
  const members = await findLatestMembers();
  const renderData = members.sort((a: any, b: any) => { return (a.order - b.order) })

  return (
    <section className="mx-auto px-0 md:px-20 py-12 pt-0">
      <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {renderData.map(({ slug, name, avatar, position }: { slug: string; name: string; avatar: string, position: string }) => (
          <MemberItem key={slug} name={name} avatar={avatar} slug={slug} position={position} />
        ))}
      </div>
    </section>
  );
}
