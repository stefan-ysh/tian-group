'use client';

import { useEffect, useState } from 'react';
import { MemberItem } from '~/components/widgets/MemberItem';
import NextImage from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

// 错误展示组件
function MembersError() {
  const t = useTranslations('Member.Detail');
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-xl font-bold mb-2">{t('loadError')}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{t('tryAgain')}</p>
    </div>
  );
}

// 成员项骨架屏
function MemberItemSkeleton() {
  return (
    <div
      className="mx-auto flex flex-col items-center animate-pulse"
    >
        <div className="w-28 h-28 rounded-full bg-primary/10 mb-3"></div>
        <div className="h-6 w-20 bg-primary/10 rounded mb-1"></div>
        <div className="h-4 w-16 bg-primary/5 rounded"></div>
    </div>
  );
}

interface Member {
  slug: string;
  name: string;
  avatar: string;
  position: string;
  description?: string;
}

export default function MembersPageClient() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Member.ListPage');
  const tPosition = useTranslations('Member.Position');

  useEffect(() => {
    async function loadMembers() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`/api/members?locale=${locale}`);

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

    loadMembers();
  }, [locale]);

  // 渲染内容，无论是否加载中都显示页面框架
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6">
      <h1 className="sr-only">{t('title')}</h1>

      {error ? (
        <MembersError />
      ) : loading ? (
        <div className="grid grid-cols-2 gap-8 pt-10 md:grid-cols-4 lg:grid-cols-5">
           {Array(8).fill(0).map((_, index) => <MemberItemSkeleton key={`skeleton-${index}`} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-12 py-10">
          {/* 导师介绍 */}
          {members.filter(m => m.slug === 'tiantian').map(mentor => (
            <div key={mentor.slug} className="flex flex-col gap-6">
              <h2 className="text-xl font-bold border-l-4 border-purple-800 pl-3 text-purple-900 dark:text-purple-300">
                {t('mentorTitle')}
              </h2>
              <Link 
                href={`/members/${mentor.slug}`}
                className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-gray-800/50 p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-900/50 transition-all duration-300 group cursor-pointer"
              >
                 <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-full border-[4px] border-orange-400 overflow-hidden shadow-md group-hover:scale-[1.02] transition-transform duration-500">
                    <NextImage 
                      width={224} 
                      height={224} 
                      src={mentor.avatar} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover" 
                    />
                 </div>
                 <div className="flex flex-col gap-4 text-left flex-1">
                    <div className="flex flex-wrap items-baseline gap-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                       <h3 className="text-3xl font-extrabold text-purple-900 dark:text-purple-300 tracking-tight group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors">
                         {mentor.name}
                       </h3>
                       <span className="text-xl text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                         {tPosition(mentor.position)}
                       </span>
                    </div>
                    
                    <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1.5 shrink-0">•</span>
                          <span>{t('mentorPoint1')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1.5 shrink-0">•</span>
                          <span>{t('mentorPoint2')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1.5 shrink-0">•</span>
                          <span>{t('mentorPoint3')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1.5 shrink-0">•</span>
                          <span>{t('mentorPoint4')}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1.5 shrink-0">•</span>
                          <span>{t('mentorPoint5')}</span>
                        </li>
                      </ul>
                    </div>
                 </div>
              </Link>
            </div>
          ))}

          {/* 当前组员 */}
          <div className="flex flex-col gap-6">
             <h2 className="text-xl font-bold border-l-4 border-purple-800 pl-3 text-purple-900 dark:text-purple-300">
                {t('studentsTitle')}
             </h2>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-y-12">
               {members
                 .filter(m => m.slug !== 'tiantian')
                 // Sort by simplified position hierarchy if needed, for now use order from API
                 .map((student) => (
                   <MemberItem key={student.slug} {...student} />
                 ))}
             </div>
          </div>
        </div>
      )}
    </section>
  );
}
