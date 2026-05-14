'use client';

import { useEffect, useRef, useState } from 'react';
import { MemberItem } from '~/components/widgets/MemberItem';
import FadeIn from '~/components/atoms/FadeIn';
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
    <div className="mx-auto flex flex-col items-center animate-pulse">
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
  advisor?: string;
  advisorName?: string;
  joined_year?: string;
  leave_year?: string;
  order?: number;
}

interface MembersPageClientProps {
  initialMembers?: Member[];
}

export default function MembersPageClient({ initialMembers = [] }: MembersPageClientProps) {
  const hasInitialData = initialMembers.length > 0;
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [loading, setLoading] = useState(!hasInitialData);
  const [error, setError] = useState(false);
  const locale = useLocale();
  const t = useTranslations('Member.ListPage');
  const tPosition = useTranslations('Member.Position');
  const firstRender = useRef(true);

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

    if (firstRender.current) {
      firstRender.current = false;
      if (!hasInitialData) {
        loadMembers();
      }
      return;
    }

    loadMembers();
  }, [locale, hasInitialData]);

  const facultySlugs = ['tiantian', 'li-wenguang', 'yang-meifang'];
  const memberBySlug = new Map(members.map((member) => [member.slug, member]));
  const mentorHighlights = [1, 2, 3, 4, 5].map((item) => t(`mentorPoint${item}`));
  const withAdvisorName = (member: Member) => ({
    ...member,
    advisorName: member.advisor ? memberBySlug.get(member.advisor)?.name : undefined,
  });

  // 渲染内容，无论是否加载中都显示页面框架
  return (
    <section className="mx-auto max-w-5xl px-4 md:px-6">
      <h1 className="sr-only">{t('title')}</h1>

      {error ? (
        <MembersError />
      ) : loading ? (
        <div className="grid grid-cols-2 gap-8 pt-10 md:grid-cols-4 lg:grid-cols-5">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <MemberItemSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-12 py-10">
          {/* 导师介绍 */}
          {members
            .filter((m) => m.slug === 'tiantian')
            .map((mentor) => (
              <div className="flex flex-col gap-6" key={mentor.slug}>
                <h2 className="academic-section-title text-xl">{t('mentorTitle')}</h2>
                <Link
                  href={`/members/${mentor.slug}`}
                  className="academic-panel group flex cursor-pointer flex-col items-center gap-8 p-6 pl-7 transition-all duration-300 md:flex-row md:p-10 md:pl-12"
                >
                  <div className="h-48 w-48 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl ring-1 ring-primary/10 transition-transform duration-500 group-hover:scale-[1.01] md:h-56 md:w-56 dark:border-white/10 dark:bg-slate-900">
                    <NextImage
                      width={224}
                      height={224}
                      src={mentor.avatar}
                      alt={mentor.name}
                      sizes="224px"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-4 text-left flex-1">
                    <div className="flex flex-wrap items-baseline gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                      <h3 className="font-serif text-3xl font-semibold tracking-normal text-gray-900 transition-colors group-hover:text-primary dark:text-white">
                        {mentor.name}
                      </h3>
                      <span className="text-xl font-medium tracking-normal text-primary">
                        {tPosition(mentor.position)}
                      </span>
                    </div>

                    <div className="text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg">
                      <ul className="grid gap-3">
                        {mentorHighlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-3">
                            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-secondary dark:bg-teal-300" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
            ))}

          {/* 教师团队 */}
          {members.filter((m) => facultySlugs.includes(m.slug) && m.slug !== 'tiantian').length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="academic-section-title text-xl">{locale === 'zh' ? '教师团队' : 'Faculty'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-y-12">
                {members
                  .filter((m) => facultySlugs.includes(m.slug) && m.slug !== 'tiantian')
                  .map((faculty) => (
                    <MemberItem key={faculty.slug} {...faculty} />
                  ))}
              </div>
            </div>
          )}

          {/* 当前组员 */}
          {members.filter((m) => !facultySlugs.includes(m.slug) && !m.leave_year).length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="academic-section-title text-xl">{t('studentsTitle')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-y-12">
                {members
                  .filter((m) => !facultySlugs.includes(m.slug) && !m.leave_year)
                  .map((student) => (
                    <MemberItem key={student.slug} {...withAdvisorName(student)} />
                  ))}
              </div>
            </div>
          )}

          {/* 往届人员 */}
          {members.filter((m) => !facultySlugs.includes(m.slug) && m.leave_year).length > 0 && (
            <FadeIn direction="up" delay={0.4}>
              <div className="flex flex-col gap-6">
                <h2 className="academic-section-title text-xl">{t('alumniTitle')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-y-12 opacity-80 hover:opacity-100 transition-opacity">
                  {members
                    .filter((m) => !facultySlugs.includes(m.slug) && m.leave_year)
                    .map((student) => (
                      <MemberItem key={student.slug} {...withAdvisorName(student)} showAvatar={false} />
                    ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      )}
    </section>
  );
}
