'use client';

import { Suspense } from 'react';
import { MemberItem } from '~/components/widgets/MemberItem';
import { MembersSkeletonLoader } from '../../../app/components/ui/SkeletonLoader';
import { useEffect, useState } from 'react';

// 错误展示组件
function MembersError() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-xl font-bold mb-2">数据加载失败</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        无法获取成员数据，请稍后再试
      </p>
    </div>
  );
}

// 成员项骨架屏
function MemberItemSkeleton() {
  return (
    <div className="mx-auto w-4/5 sm:w-full flex flex-col overflow-hidden rounded-xl drop-shadow-sm p-5 aspect-square 
      bg-gray-50 dark:bg-gray-700/50 animate-pulse">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* 头像骨架 */}
        <div className="w-5/6 h-5/6 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="w-1/2 h-1/2 rounded-full bg-primary/5"></div>
        </div>
        
        {/* 姓名和职位骨架 */}
        <div className="w-full flex justify-between items-center mt-2 gap-1">
          <div className="h-6 w-16 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-full"></div>
          <div className="h-5 w-16 bg-primary/20 rounded"></div>
        </div>
      </div>
    </div>
  );
}

interface Member {
  slug: string;
  name: string;
  avatar: string;
  position: string;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch('/api/members');
        
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        
        const data = await response.json();
        
        if (!data || !data.members || !Array.isArray(data.members)) {
          throw new Error('Invalid data format');
        }
        
        setMembers(data.members);
      } catch (error) {
        console.error('Error fetching members:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMembers();
  }, []);

  // 渲染内容，无论是否加载中都显示页面框架
  return (
    <section className="mx-auto max-w-5xl">
      {/* 对SEO友好的隐藏标题 */}
      <h1 className="sr-only">田甜科研小组组内成员</h1>
      
      {error ? (
        <MembersError />
      ) : (
        <div className="grid grid-cols-1 gap-4 pt-0 p-5 md:pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            // 显示8个骨架项
            Array(8).fill(0).map((_, index) => (
              <MemberItemSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            // 显示实际成员数据
            members.map(({ slug, name, avatar, position }: Member) => (
              <MemberItem key={slug} name={name} avatar={avatar} slug={slug} position={position} />
            ))
          )}
        </div>
      )}
    </section>
  );
}
