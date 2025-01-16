import type { Metadata } from 'next';


import { findLatestActivities } from '~/utils/activities';

import { ActivityItem } from '~/components/widgets/ActivityItem';

export const metadata: Metadata = {
  title: '最新活动 | 田甜科研小组',
  description: '扬州大学化学学院田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、JACS、JPC、NC、Wiley、Nature、Science、Advanced Materials等众多权威期刊。',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  openGraph: {
    title: '最新活动 | 田甜科研小组',
    description: '扬州大学化学学院，田甜'
  }
}

export default async function Home({}) {
  const members = await findLatestActivities();

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20 pt-0">
      {/* <div className="grid grid-cols-1 gap-6 p-4 md:p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map(({ id, name, avatar, position }: { id: string; name: string; avatar: string, position: string }) => (
          <ActivityItem key={id} name={name} avatar={avatar} id={id} position={position} />
        ))}
      </div> */}
       <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          Activities in Progress
        </h1>
      </header>
    </section>
  );
}
