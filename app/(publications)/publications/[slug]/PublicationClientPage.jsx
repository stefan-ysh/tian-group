'use client';

import md from 'markdown-it';
import katex from 'katex';
import tm from 'markdown-it-texmath';
import { useEffect, useState } from 'react';
import { ScholarlyArticleSchema } from '~/components/seo/JsonLd';

// 错误展示组件
function PublicationError() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-xl font-bold mb-2">数据加载失败</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        无法获取出版物数据，请稍后再试
      </p>
    </div>
  );
}

export function PublicationClientPage({ slug }) {
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPublication() {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(false);
        
        // 客户端fetch可以使用相对URL，但我们确保不会重复编码slug
        const response = await fetch(`/api/publications/${slug}`);
        
        if (!response.ok) {
          throw new Error(`Publication fetch failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.publication) {
          throw new Error('Invalid publication data');
        }
        
        setPublication(data.publication);
      } catch (error) {
        console.error('Error fetching publication:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPublication();
  }, [slug]);
  
  if (error) {
    return <PublicationError />;
  }

  return (
    <section className="mx-auto max-w-6xl py-8 sm:py-16 lg:py-20 px-6">
      {/* 添加 JSON-LD 结构化数据 */}
      {publication && <ScholarlyArticleSchema publication={publication} />}
      
      <article className={loading ? 'opacity-60 transition-opacity duration-300' : 'transition-opacity duration-300'}>
        {loading ? (
          // 加载中的骨架屏
          <div className="animate-pulse">
            <div className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 space-y-4">
              <div className="h-8 bg-primary/20 rounded-md w-3/4 mx-auto"></div>
              <div className="h-4 bg-primary/10 rounded w-full"></div>
              <div className="h-4 bg-primary/10 rounded w-full"></div>
              <div className="h-4 bg-primary/10 rounded w-3/4"></div>
              <div className="h-4 bg-primary/10 rounded w-5/6"></div>
              <div className="h-4 bg-primary/10 rounded w-full"></div>
              <div className="h-4 bg-primary/10 rounded w-full"></div>
              <div className="h-64 bg-primary/10 rounded-md my-8"></div>
              <div className="h-4 bg-primary/10 rounded w-full"></div>
              <div className="h-4 bg-primary/10 rounded w-full"></div>
              <div className="h-4 bg-primary/10 rounded w-5/6"></div>
            </div>
          </div>
        ) : publication?.content ? (
          <div
            className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 lg:prose-xl font-serif"
            dangerouslySetInnerHTML={{
              __html: md({
                html: true,
              })
                .use(tm, {
                  engine: katex,
                  delimiters: 'dollars',
                  katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
                })
                .render(publication.content),
            }}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-xl">Publication content not found</div>
          </div>
        )}
      </article>
    </section>
  );
} 