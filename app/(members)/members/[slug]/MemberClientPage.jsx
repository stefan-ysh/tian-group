'use client';

import md from 'markdown-it';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// 错误展示组件
function MemberError() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-xl font-bold mb-2">数据加载失败</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        无法获取成员数据，请稍后再试
      </p>
    </div>
  );
}

export function MemberClientPage({ slug }) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMember() {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch(`/api/members/${slug}`);
        
        if (!response.ok) {
          throw new Error(`Member fetch failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.member) {
          throw new Error('Invalid member data');
        }
        
        setMember(data.member);
      } catch (error) {
        console.error('Error fetching member:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMember();
  }, [slug]);
  
  if (error) {
    return <MemberError />;
  }

  return (
    <section className="mx-auto max-w-5xl py-8 sm:py-16 lg:py-20 px-6">
      <article className={loading ? 'opacity-60 transition-opacity duration-300' : 'transition-opacity duration-300'}>
        {loading ? (
          // 加载中的骨架屏
          <div className="animate-pulse">
            <header className="text-center">
              <div className="leading-tighter font-heading mx-auto mb-2 max-w-3xl px-4 h-8 bg-primary/10 rounded w-48 mx-auto"></div>
              <div className="h-64 md:h-96 max-w-3xl mx-auto mt-4 mb-6 bg-primary/10 rounded-md"></div>
            </header>
            <div className="mx-auto max-w-3xl px-6 space-y-4">
              <div className="h-5 bg-primary/10 rounded w-full"></div>
              <div className="h-5 bg-primary/10 rounded w-full"></div>
              <div className="h-5 bg-primary/10 rounded w-3/4"></div>
              <div className="h-5 bg-primary/10 rounded w-full"></div>
              <div className="h-5 bg-primary/10 rounded w-5/6"></div>
            </div>
          </div>
        ) : member ? (
          // 实际内容
          <>
            <header className={member.image ? 'text-center' : ''}>
              <h1 className="sr-only">👋 Hi there, I&apos;m {member.name}</h1>
              <div className="leading-tighter font-heading mx-auto mb-2 max-w-3xl px-4 text-1xl font-bold tracking-tighter sm:px-6 md:text-2xl">
                👋 Hi there, I&apos;m {member.name}
              </div>
              {member.image ? (
                <Image
                  src={member.image}
                  className="mx-auto mt-4 mb-6 max-w-full bg-gray-400 dark:bg-slate-700 sm:rounded-md lg:max-w-5xl"
                  sizes="(max-width: 900px) 400px, 900px"
                  alt={member.description || member.name}
                  loading="eager"
                  priority
                  width={900}
                  height={480}
                />
              ) : (
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                  <div className="border-t dark:border-slate-700" />
                </div>
              )}
            </header>
            <div
              className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl"
              dangerouslySetInnerHTML={{
                __html: md({
                  html: true,
                }).render(member.content || ''),
              }}
            />
          </>
        ) : (
          // 空状态
          <div className="text-center py-12">
            <div className="h-8 w-56 bg-primary/20 rounded mb-8 mx-auto"></div>
          </div>
        )}
      </article>
    </section>
  );
} 