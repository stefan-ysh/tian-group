/**
 * JSON-LD 结构化数据组件
 * 用于提供搜索引擎可理解的结构化数据
 */

import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// 组织机构 Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: '田甜课题组',
    alternateName: ['Tian Tian Research Group', '田甜教授课题组', '扬州大学田甜课题组'],
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    image: `${SITE_URL}/og-image.jpg`,
    description: '扬州大学化学与材料学院田甜课题组，专注环糊精、钙钛矿、太阳能电池、发光材料研究',
    email: 'tiant91@yzu.edu.cn',
    inLanguage: ['zh-CN', 'en'],
    sameAs: ['https://www.yzu.edu.cn/'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'tiant91@yzu.edu.cn',
      contactType: 'research inquiries',
      availableLanguage: ['zh-CN', 'en'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      addressRegion: '江苏省',
      addressLocality: '扬州市',
      streetAddress: '扬州大学化学与材料学院',
    },
    location: {
      '@type': 'Place',
      name: '扬州大学化学与材料学院',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 32.398812,
        longitude: 119.423332,
      },
    },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: '扬州大学',
      alternateName: 'Yangzhou University',
    },
    department: {
      '@type': 'Organization',
      name: '化学与材料学院',
      alternateName: 'School of Chemistry and Materials',
    },
    member: {
      '@type': 'Person',
      name: '田甜',
      alternateName: ['田甜教授', '扬州大学田甜', 'Tian Tian', 'Professor Tian Tian'],
      jobTitle: '教授',
    },
    knowsAbout: [
      '环糊精',
      '钙钛矿',
      '太阳能电池',
      '发光材料',
      '超分子化学',
      '光电功能材料',
      'cyclodextrin',
      'perovskites',
      'solar cells',
      'luminescent materials',
      'supramolecular chemistry',
      'optoelectronic materials',
    ],
    mainEntityOfPage: `${SITE_URL}/geo.json`,
  };

  return <JsonLd data={schema} />;
}

// 学术文章 Schema
export function ScholarlyArticleSchema({ publication }: { publication: any }) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    abstract: publication.abstract,
    datePublished: publication.publishDate || publication.date,
    author: publication.authors?.map((author: string) => ({
      '@type': 'Person',
      name: author,
    })) || [{ '@type': 'Person', name: '田甜' }],
    publisher: {
      '@type': 'Organization',
      name: publication.journal || '田甜课题组',
    },
    isPartOf: publication.journal
      ? {
          '@type': 'Periodical',
          name: publication.journal,
        }
      : undefined,
    keywords: publication.tags?.join(', '),
    url: `${SITE_URL}/publications/${encodeURIComponent(publication.slug || publication.title)}`,
  };

  if (publication.doi) {
    schema['@id'] = `https://doi.org/${publication.doi}`;
    schema.identifier = `doi:${publication.doi}`;
    schema.sameAs = `https://doi.org/${publication.doi}`;
  }

  if (publication.image) {
    schema['image'] = publication.image;
  }

  return <JsonLd data={schema} />;
}

// 面包屑导航 Schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={schema} />;
}

// 个人信息 Schema
export function PersonSchema({ member }: { member: any }) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    ...(member.name === '田甜'
      ? { alternateName: ['田甜教授', '扬州大学田甜', 'Tian Tian', 'Professor Tian Tian'] }
      : {}),
    jobTitle: member.position,
    affiliation: {
      '@type': 'Organization',
      name: '扬州大学化学与材料学院',
      url: 'https://www.yzu.edu.cn/',
    },
    worksFor: {
      '@type': 'Organization',
      name: '田甜课题组',
      url: SITE_URL,
    },
    alumniOf: '扬州大学',
    knowsAbout: member.research || member.tags,
    description: member.description,
    url: `${SITE_URL}/members/${encodeURIComponent(member.slug)}`,
  };

  if (member.email) {
    schema['email'] = member.email;
  }

  if (member.image) {
    schema['image'] = member.image;
  }

  return <JsonLd data={schema} />;
}

// 网站 Schema
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: '田甜课题组',
    alternateName: ['Tian Tian Research Group', '田甜教授', '扬州大学田甜'],
    url: SITE_URL,
    description: '扬州大学化学与材料学院田甜课题组，专注环糊精、钙钛矿、太阳能电池、发光材料研究',
    publisher: {
      '@type': 'ResearchOrganization',
      name: '田甜课题组',
      '@id': `${SITE_URL}/#organization`,
    },
    mainEntity: {
      '@id': `${SITE_URL}/#organization`,
    },
    hasPart: [
      `${SITE_URL}/research`,
      `${SITE_URL}/publications`,
      `${SITE_URL}/members`,
      `${SITE_URL}/news`,
      `${SITE_URL}/activities`,
      `${SITE_URL}/joinus`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/llms.txt`,
      `${SITE_URL}/geo.json`,
    ],
  };

  return <JsonLd data={schema} />;
}

// 新闻文章 Schema
export function NewsArticleSchema({ news }: { news: any }) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: news.title,
    description: news.summary || news.excerpt,
    datePublished: news.date,
    author: (news.authors || ['田甜课题组']).map((name: string) => ({
      '@type': 'Person',
      name,
    })),
    publisher: {
      '@type': 'Organization',
      name: '田甜课题组',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/news/${news.id}`,
    },
  };

  if (news.imageUrl) {
    schema.image = [news.imageUrl];
  }

  if (news.tags?.length) {
    schema.keywords = news.tags.join(', ');
  }

  return <JsonLd data={schema} />;
}

// 组内活动（事件） Schema
export function EventSchema({ activity }: { activity: any }) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: activity.title,
    description: activity.description,
    startDate: activity.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    organizer: {
      '@type': 'Organization',
      name: '田甜课题组',
      url: SITE_URL,
    },
    location: activity.location
      ? {
          '@type': 'Place',
          name: activity.location,
        }
      : undefined,
    url: `${SITE_URL}/activities/${activity.id}`,
  };

  if (activity.avatar) {
    schema.image = [activity.avatar];
  }

  if (activity.tags?.length) {
    schema.keywords = activity.tags.join(', ');
  }

  return <JsonLd data={schema} />;
}
