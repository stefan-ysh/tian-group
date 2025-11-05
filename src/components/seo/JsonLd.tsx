/**
 * JSON-LD 结构化数据组件
 * 用于提供搜索引擎可理解的结构化数据
 */

import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// 组织机构 Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: '田甜科研小组',
    alternateName: 'Tian Tian Research Group',
    url: 'https://tiantian.group',
    logo: 'https://tiantian.group/logo.png',
    description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池、发光材料研究',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      addressRegion: '江苏省',
      addressLocality: '扬州市',
    },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: '扬州大学',
      alternateName: 'Yangzhou University',
    },
    department: {
      '@type': 'Organization',
      name: '化学学院',
    },
    member: {
      '@type': 'Person',
      name: '田甜',
      jobTitle: '教授',
    },
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
      name: publication.journal || '田甜科研小组',
    },
    keywords: publication.tags?.join(', '),
    url: `https://tiantian.group/publications/${encodeURIComponent(publication.title)}`,
  };

  if (publication.doi) {
    schema['@id'] = `https://doi.org/${publication.doi}`;
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
    jobTitle: member.position,
    affiliation: {
      '@type': 'Organization',
      name: '扬州大学化学学院',
    },
    description: member.description,
    url: `https://tiantian.group/members/${member.slug}`,
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
    name: '田甜科研小组',
    alternateName: 'Tian Tian Research Group',
    url: 'https://tiantian.group',
    description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池、发光材料研究',
    publisher: {
      '@type': 'ResearchOrganization',
      name: '田甜科研小组',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://tiantian.group/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={schema} />;
}
