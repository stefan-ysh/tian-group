import { findPublicationsByName, findLatestPublications } from '~/utils/publications';
import { PublicationClientPage } from './PublicationClientPage';

export const dynamicParams = false;

// 生成页面元数据 - 修复build时URL错误
export async function generateMetadata({ params }) {
  try {
    const slug = decodeURIComponent(params.slug);
    const publication = await findPublicationsByName(slug);
    
    if (!publication) {
      return {
        title: '出版物未找到',
        description: '请求的出版物信息不存在'
      };
    }
    
    return {
      title: publication.title,
      description: publication.abstract || publication.description || '田甜科研小组发表的学术论文',
      keywords: [
        publication.title,
        '田甜',
        '扬州大学',
        '化学学院',
        ...(publication.tags || []),
        ...(publication.authors || []),
      ].filter(Boolean),
      authors: publication.authors?.map(author => ({ name: author })) || [{ name: '田甜科研小组' }],
      openGraph: {
        title: publication.title,
        description: publication.abstract || publication.description || '田甜科研小组发表的学术论文',
        type: 'article',
        publishedTime: publication.publishDate || publication.date,
        authors: publication.authors || ['田甜科研小组'],
        tags: publication.tags || [],
        images: publication.image ? [{
          url: publication.image,
          width: 1200,
          height: 630,
          alt: publication.title,
        }] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: publication.title,
        description: publication.abstract?.slice(0, 200) || publication.description,
      },
      alternates: {
        canonical: `https://tiantian.group/publications/${encodeURIComponent(slug)}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '出版物',
      description: '论文详情页面'
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
