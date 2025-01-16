import type { Metadata } from 'next';

import { findLatestMembers } from '~/utils/members';

import { MemberItem } from '~/components/widgets/MemberItem';

export const metadata: Metadata = {
  title: '组内成员 | 田甜科研小组',
  description: '扬州大学化学学院，田甜的科研小组，主要研究方向包括环糊精、钙钛矿、太阳能电池等, 多项科研成果发布在Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  openGraph: {
    title: '组内成员 | 田甜科研小组',
    description: '扬州大学化学学院，田甜'
  }
}

export default async function Home({}) {
  const members = await findLatestMembers();

  return (
    <section className="mx-auto px-0 md:px-20 py-12 pt-0">
      <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {members.map(({ slug, name, avatar, position }: { slug: string; name: string; avatar: string, position: string }) => (
          <MemberItem key={slug} name={name} avatar={avatar} slug={slug} position={position} />
        ))}
      </div>
    </section>
  );
}
