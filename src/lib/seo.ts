/**
 * SEO工具函数
 * 提供统一的metadata生成和优化功能
 */

import type { Metadata } from 'next';

const SITE_CONFIG = {
  name: '田甜科研小组',
  nameEn: 'Tian Tian Research Group',
  url: 'https://tiantian.group',
  description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池、发光材料研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  keywords: ['田甜', '扬州大学', '化学学院', '庞欢课题组', '科研实验室', '环糊精', '钙钛矿', '太阳能电池', '发光材料', '教授', 'Angew', 'NC', 'Wiley', 'Advanced Materials'],
  ogImage: '/og-image.jpg',
};

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  locale?: string;
}

/**
 * 生成完整的页面metadata
 */
export function generateSEOMetadata({
  title,
  description = SITE_CONFIG.description,
  keywords = [],
  image = SITE_CONFIG.ogImage,
  path = '',
  type = 'website',
  publishedTime,
  authors,
  locale = 'zh-CN',
}: GenerateMetadataOptions = {}): Metadata {
  const pageTitle = title 
    ? `${title} | ${SITE_CONFIG.name}` 
    : SITE_CONFIG.name;
  
  const url = `${SITE_CONFIG.url}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`;
  
  const allKeywords = Array.from(new Set([...SITE_CONFIG.keywords, ...keywords]));

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: allKeywords,
    authors: authors?.map(name => ({ name })) || [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: '扬州大学化学学院',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale,
      alternateLocale: locale === 'zh-CN' ? ['en-US'] : ['zh-CN'],
      url,
      siteName: SITE_CONFIG.name,
      title: pageTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description.slice(0, 200),
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
      languages: {
        'zh-CN': `${SITE_CONFIG.url}/zh${path}`,
        'en-US': `${SITE_CONFIG.url}/en${path}`,
      },
    },
  };

  // 文章类型添加发布时间和作者
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      authors: authors || [SITE_CONFIG.name],
    };
  }

  return metadata;
}

/**
 * 生成论文详情页metadata
 */
export function generatePublicationMetadata(publication: {
  title: string;
  abstract?: string;
  description?: string;
  authors?: string[];
  tags?: string[];
  publishDate?: string;
  date?: string;
  image?: string;
  doi?: string;
}): Metadata {
  return generateSEOMetadata({
    title: publication.title,
    description: publication.abstract || publication.description || '田甜科研小组发表的学术论文',
    keywords: [
      ...(publication.tags || []),
      ...(publication.authors || []),
      '学术论文',
      '研究成果',
    ],
    image: publication.image,
    path: `/publications/${encodeURIComponent(publication.title)}`,
    type: 'article',
    publishedTime: publication.publishDate || publication.date,
    authors: publication.authors,
  });
}

/**
 * 生成成员详情页metadata
 */
export function generateMemberMetadata(member: {
  name: string;
  position?: string;
  description?: string;
  image?: string;
  slug: string;
}): Metadata {
  const title = member.position 
    ? `${member.name} - ${member.position}` 
    : member.name;

  return generateSEOMetadata({
    title,
    description: member.description || `${member.name}的个人资料`,
    keywords: [member.name, member.position || '', '团队成员', '研究人员'],
    image: member.image,
    path: `/members/${member.slug}`,
  });
}

/**
 * 生成新闻详情页metadata
 */
export function generateNewsMetadata(news: {
  title: string;
  content?: string;
  excerpt?: string;
  date?: string;
  image?: string;
  id: string;
}): Metadata {
  return generateSEOMetadata({
    title: news.title,
    description: news.excerpt || news.content?.slice(0, 160),
    keywords: ['新闻', '科研动态', '研究进展'],
    image: news.image,
    path: `/news/${news.id}`,
    type: 'article',
    publishedTime: news.date,
  });
}

/**
 * 获取页面的canonical URL
 */
export function getCanonicalUrl(path: string, locale?: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const localePath = locale ? `/${locale}${cleanPath}` : cleanPath;
  return `${SITE_CONFIG.url}${localePath}`;
}

/**
 * 生成结构化面包屑数据
 */
export function generateBreadcrumbs(items: Array<{ name: string; path: string }>) {
  return items.map((item, index) => ({
    name: item.name,
    url: getCanonicalUrl(item.path),
    position: index + 1,
  }));
}
