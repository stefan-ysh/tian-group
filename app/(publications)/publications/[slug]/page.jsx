import { findPublicationsByName, findLatestPublications } from '~/utils/publications';
import { PublicationClientPage } from './PublicationClientPage';
import { generatePublicationMetadata, generateSEOMetadata } from '~/lib/seo';
import { BreadcrumbSchema, ScholarlyArticleSchema } from '~/components/seo/JsonLd';

export const dynamicParams = false;

// 生成页面元数据 - 修复build时URL错误
export async function generateMetadata({ params }) {
  try {
    const slug = decodeURIComponent(params.slug);
    const publication = await findPublicationsByName(slug);
    
    if (!publication) {
      return generateSEOMetadata({
        title: '出版物未找到',
        description: '请求的出版物信息不存在。',
        path: `/publications/${encodeURIComponent(slug)}`,
        noindex: true,
      });
    }

    return generatePublicationMetadata({
      ...publication,
      slug,
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return generateSEOMetadata({
      title: '出版物',
      description: '论文详情页面',
      path: `/publications/${encodeURIComponent(params.slug)}`,
    });
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';
  const slug = decodeURIComponent(params.slug);

  // Fetch on server for JSON-LD (SEO), UI stays client-side.
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首页', url: siteUrl },
          { name: '成果及论文', url: `${siteUrl}/publications` },
          { name: slug, url: `${siteUrl}/publications/${encodeURIComponent(slug)}` },
        ]}
      />
      <ServerPublicationJsonLd slug={slug} />
      <PublicationClientPage slug={params.slug} />
    </>
  );
}

async function ServerPublicationJsonLd({ slug }) {
  const publication = await findPublicationsByName(slug);
  if (!publication) return null;
  return <ScholarlyArticleSchema publication={{ ...publication, slug }} />;
}
