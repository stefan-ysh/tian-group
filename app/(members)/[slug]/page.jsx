import { findLatestMembers } from '~/utils/members';
import { MemberClientPage } from './MemberClientPage';

export const dynamicParams = false;

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
  return <MemberClientPage slug={params.slug} />;
}
