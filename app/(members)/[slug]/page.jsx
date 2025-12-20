import { findLatestMembers } from '~/utils/members';
import { MemberClientPage } from './MemberClientPage';
import { findMembersByName } from '~/utils/members';
import { generateMemberMetadata, generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema, PersonSchema } from '~/components/seo/JsonLd';

export const dynamicParams = false;

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
      slug: encodeURIComponent(slug),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// 服务器组件不需要使用useParams和useState等客户端hooks
export default function Page({ params }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const decodedSlug = decodeURIComponent(params.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: siteUrl },
          { name: '组内成员', url: `${siteUrl}/members` },
          { name: decodedSlug, url: `${siteUrl}/members/${encodeURIComponent(decodedSlug)}` },
        ]}
      />
      <ServerMemberJsonLd slug={decodedSlug} />
      <MemberClientPage slug={params.slug} />
    </>
  );
}

async function ServerMemberJsonLd({ slug }) {
  const member = await findMembersByName(slug);
  if (!member) return null;
  return (
    <PersonSchema
      member={{
        ...member,
        slug,
        image: member.avatar || member.image,
      }}
    />
  );
}
