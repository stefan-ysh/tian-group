'use client';

import { useState, useEffect } from 'react';
import { MemberItem } from '~/components/widgets/MemberItem';
import { MembersSkeletonLoader } from '../../../app/components/ui/SkeletonLoader';
import { useTranslations } from 'next-intl';

interface Member {
  slug: string;
  name: string;
  avatar: string;
  position: string;
  order: number;
}

interface MembersClientProps {
  members: Member[];
}

export function MembersClient({ members }: MembersClientProps) {
  const t = useTranslations('Members');
  const [isLoading, setIsLoading] = useState(true);
  
  // 模拟初始加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // 按照order字段排序成员
  const sortedMembers = [...members].sort((a, b) => a.order - b.order);

  if (isLoading) {
    return <MembersSkeletonLoader />;
  }

  return (
    <section className="mx-auto max-w-5xl">
      {/* 对SEO友好的隐藏标题 */}
      <h1 className="sr-only">田甜科研小组组内成员</h1>
      
      <div className="grid grid-cols-1 gap-4 p-5 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedMembers.map(({ slug, name, avatar, position }) => (
          <MemberItem key={slug} name={name} avatar={avatar} slug={slug} position={position} />
        ))}
      </div>
    </section>
  );
} 