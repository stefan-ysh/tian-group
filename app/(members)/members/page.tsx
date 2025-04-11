import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { findLatestMembers } from '~/utils/members';
import { MemberItem } from '~/components/widgets/MemberItem';

// Static metadata for SEO
export const metadata: Metadata = {
  title: '组内成员 | 田甜科研小组',
  description: '田甜科研小组成员介绍，包括硕士、博士、博士后等各层次科研人员。',
  keywords: '田甜, 扬州大学, 化学学院, 科研团队, 组内成员, 研究生, 教授, 博士后',
  openGraph: {
    title: '组内成员 | 田甜科研小组',
    description: '田甜科研小组成员介绍，包括硕士、博士、博士后等各层次科研人员。'
  }
};

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
