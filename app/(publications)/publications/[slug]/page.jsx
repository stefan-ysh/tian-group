import { findLatestPublications } from '~/utils/publications';
import { PublicationClientPage } from './PublicationClientPage';

export const dynamicParams = false;

// 生成页面元数据
export async function generateMetadata({ params }) {
  try {
    const { slug } = params;
    // 使用相对路径进行API请求
    const res = await fetch(`/api/publications/${slug}`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch publication with slug: ${slug}`);
    }
    
    const publication = await res.json();
    
    return {
      title: `${publication.title} | Tian Group`,
      description: publication.abstract,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Publication | Tian Group',
      description: 'Publication details',
    };
  }
}

// 用于静态生成路径
export async function generateStaticParams() {
  try {
    const publications = await findLatestPublications();
    return publications.map(({ slug }) => {
      // 不进行额外编码，直接返回slug
      return { slug };
    });
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// 服务器组件不需要使用useParams和useState等客户端hooks
export default function Page({ params }) {
  return <PublicationClientPage slug={params.slug} />;
}
