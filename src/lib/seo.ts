/**
 * SEO工具函数
 * 提供统一的metadata生成和优化功能
 */

import type { Metadata } from 'next';

const SITE_CONFIG = {
  name: '田甜科研小组',
  nameEn: 'Tian Tian Research Group',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group',
  description:
    '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池、发光材料研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  keywords: [
    '田甜',
    '扬州大学',
    '化学学院',
    '庞欢课题组',
    '科研实验室',
    '环糊精',
    '钙钛矿',
    '太阳能电池',
    '发光材料',
    '教授',
    'Angew',
    'NC',
    'Wiley',
    'Advanced Materials',
    'Advanced Functional Materials',
    'ACS Nano',
    'ACS Energy Letters',
  ],
  ogImage: '/og-image.jpg',
  publisher: '扬州大学化学学院',
} as const;

function normalizePath(path: string) {
  if (!path) return '';
  if (path === '/') return '';
  return path.startsWith('/') ? path : `/${path}`;
}

function toAbsoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) return SITE_CONFIG.url;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
  return `${SITE_CONFIG.url}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

function toOpenGraphLocale(locale?: string) {
  // next-intl is configured with locales: 'zh' | 'en' and localePrefix: 'never'
  if (!locale) return 'zh_CN';
  if (locale.toLowerCase().startsWith('en')) return 'en_US';
  return 'zh_CN';
}

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
  noindex?: boolean;
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
  locale,
  noindex = false,
}: GenerateMetadataOptions = {}): Metadata {
  const pageTitle = title 
    ? `${title} | ${SITE_CONFIG.name}` 
    : SITE_CONFIG.name;
  
  const cleanPath = normalizePath(path);
  const url = `${SITE_CONFIG.url}${cleanPath}`;
  const imageUrl = toAbsoluteUrl(image);
  
  const allKeywords = Array.from(new Set([...SITE_CONFIG.keywords, ...keywords]));
  const ogLocale = toOpenGraphLocale(locale);

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: allKeywords,
    authors: authors?.map(name => ({ name })) || [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.publisher,
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: ogLocale,
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
  slug?: string;
}): Metadata {
  const canonicalPath = publication.slug
    ? `/publications/${encodeURIComponent(publication.slug)}`
    : `/publications/${encodeURIComponent(publication.title)}`;

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
    path: canonicalPath,
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
  tags?: string[];
}): Metadata {
  return generateSEOMetadata({
    title: news.title,
    description: news.excerpt || news.content?.slice(0, 160),
    keywords: ['新闻', '科研动态', '研究进展', ...(news.tags || [])],
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
  // localePrefix is configured as 'never', so URL is locale-agnostic.
  const cleanPath = normalizePath(path);
  return `${SITE_CONFIG.url}${cleanPath}`;
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
