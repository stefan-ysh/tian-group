import { getLocale } from 'next-intl/server';
import { findLatestMembers, findMembersByName } from '~/utils/members';
import { MemberClientPage } from './MemberClientPage';
import { generateMemberMetadata, generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema, PersonSchema } from '~/components/seo/JsonLd';
import { notFound } from 'next/navigation';

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  try {
    const slug = decodeURIComponent(params.slug);
    const member = await findMembersByName(slug);

    if (!member) {
      return generateSEOMetadata({
        title: '成员未找到',
        description: '请求的成员信息不存在。',
        path: `/members/${encodeURIComponent(slug)}`,
        noindex: true,
      });
    }

    return generateMemberMetadata({
      name: member.name || slug,
      position: member.position,
      description: member.description || member.bio,
      image: member.avatar || member.image,
      slug,
    });
  } catch (error) {
    console.error('Error generating member metadata:', error);
    return generateSEOMetadata({
      title: '团队成员',
      description: '成员详情页面',
      path: `/members/${encodeURIComponent(params.slug)}`,
    });
  }
}

// 用于静态生成路径
export async function generateStaticParams() {
  try {
    const members = await findLatestMembers();
    return members.map(({ slug }) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

async function enrichMemberRelations(member, locale) {
  if (!member) return null;

  const members = await findLatestMembers({ locale });
  const advisor = member.advisor ? members.find((item) => item.slug === member.advisor) : null;
  const advisedStudents = members
    .filter((item) => item.advisor === member.slug)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item) => ({
      slug: item.slug,
      name: item.name,
      avatar: item.avatar || item.image || '',
    }));

  return {
    ...member,
    advisorName: advisor?.name || '',
    advisorSlug: advisor?.slug || '',
    advisedStudents,
  };
}

// 服务器组件不需要使用useParams和useState等客户端hooks
export default async function Page({ params }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const locale = await getLocale();
  const decodedSlug = decodeURIComponent(params.slug);
  const member = await findMembersByName(decodedSlug, locale);

  if (!member) {
    notFound();
  }

  const initialMember = await enrichMemberRelations(member, locale);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: siteUrl },
          { name: '组内成员', url: `${siteUrl}/members` },
          { name: decodedSlug, url: `${siteUrl}/members/${encodeURIComponent(decodedSlug)}` },
        ]}
      />
      <PersonSchema
        member={{
          ...member,
          slug: decodedSlug,
          image: member.avatar || member.image,
        }}
      />
      <MemberClientPage slug={params.slug} initialMember={initialMember} />
    </>
  );
}
