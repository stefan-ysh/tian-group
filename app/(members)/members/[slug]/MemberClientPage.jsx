'use client';

import md from 'markdown-it';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

// 错误展示组件
function MemberError() {
  const t = useTranslations('Member.Detail');
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-xl font-bold mb-2">{t('loadError')}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {t('tryAgain')}
      </p>
    </div>
  );
}

export function MemberClientPage({ slug, initialMember = null }) {
  const hasInitialData = !!initialMember;
  const [member, setMember] = useState(initialMember);
  const [loading, setLoading] = useState(!hasInitialData);
  const [error, setError] = useState(false);
  const [showAllAdvisedStudents, setShowAllAdvisedStudents] = useState(false);
  const [hasHiddenAdvisedStudents, setHasHiddenAdvisedStudents] = useState(false);
  const advisedStudentsRowRef = useRef(null);
  const t = useTranslations('Member.Detail');
  const locale = useLocale();
  const firstRender = useRef(true);

  useEffect(() => {
    async function fetchMember() {
      if (!slug) return;

      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`/api/members/${slug}?locale=${locale}`);

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

    if (firstRender.current) {
      firstRender.current = false;
      if (!hasInitialData) {
        fetchMember();
      }
      return;
    }

    fetchMember();
  }, [slug, locale, hasInitialData]);

  const advisedStudents = member?.advisedStudents || [];

  useEffect(() => {
    const row = advisedStudentsRowRef.current;
    if (!row || showAllAdvisedStudents) return;

    const updateOverflow = () => {
      setHasHiddenAdvisedStudents(row.scrollHeight > row.clientHeight + 2);
    };

    updateOverflow();
    window.addEventListener('resize', updateOverflow);
    return () => window.removeEventListener('resize', updateOverflow);
  }, [advisedStudents.length, showAllAdvisedStudents]);

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
              <div className="leading-tighter font-heading mx-auto mb-2 max-w-3xl px-4 h-8 bg-primary/10 rounded w-48"></div>
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
            <header className={member.avatar || member.image ? 'text-center' : ''}>
              <div className="leading-tighter font-heading mx-auto mb-2 max-w-3xl px-4 text-2xl font-bold tracking-tighter sm:px-6 md:text-3xl text-purple-900 dark:text-purple-300">
                {t('greeting', { name: member.name })}
              </div>
              {member.avatar || member.image ? (
                <Image
                  src={member.avatar || member.image}
                  className="mx-auto mt-8 mb-6 max-w-[280px] sm:max-w-[320px] bg-gray-400 dark:bg-slate-700 rounded-xl shadow-lg border-4 border-white dark:border-gray-800"
                  sizes="(max-width: 768px) 280px, 320px"
                  alt={member.description || member.name}
                  loading="eager"
                  priority
                  width={400}
                  height={500}
                />
              ) : (
                <div className="mx-auto max-w-3xl px-4 sm:px-6">
                  <div className="border-t dark:border-slate-700" />
                </div>
              )}
            </header>

            <div className="mx-auto max-w-3xl px-6 py-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
              {member.joined_year && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-sm font-bold text-amber-600 uppercase tracking-wider min-w-[100px]">{t('joinYear')}</span>
                  <span className="text-gray-700 dark:text-gray-300">{t('yearSuffix', { year: member.joined_year })}</span>
                </div>
              )}
              {member.leave_year && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-sm font-bold text-amber-600 uppercase tracking-wider min-w-[100px]">{t('leaveYear')}</span>
                  <span className="text-gray-700 dark:text-gray-300">{member.leave_year}</span>
                </div>
              )}
              {member.research_areas && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                   <span className="text-sm font-bold text-amber-600 uppercase tracking-wider min-w-[100px]">{t('researchArea')}</span>
                   <span className="text-gray-700 dark:text-gray-300">{member.research_areas}</span>
                </div>
              )}
              {member.advisorName && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                   <span className="text-sm font-bold text-amber-600 uppercase tracking-wider min-w-[100px]">{t('advisor')}</span>
                   {member.advisorSlug ? (
                    <Link href={`/members/${member.advisorSlug}`} className="text-primary-600 transition-colors hover:text-primary-700">
                      {member.advisorName}
                    </Link>
                   ) : (
                    <span className="text-gray-700 dark:text-gray-300">{member.advisorName}</span>
                   )}
                </div>
              )}
              {member.email && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                   <span className="text-sm font-bold text-amber-600 uppercase tracking-wider min-w-[100px]">{t('email')}</span>
                   <a href={`mailto:${member.email}`} className="text-primary-600 hover:text-primary-700 transition-colors">{member.email}</a>
                </div>
              )}
              {advisedStudents.length > 0 && (
                <div className="flex flex-col gap-3">
                   <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">{t('advisedStudents')}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{advisedStudents.length}</span>
                   </div>
                   <div
                    ref={advisedStudentsRowRef}
                    className={`flex flex-wrap gap-x-2 gap-y-3 ${showAllAdvisedStudents ? '' : 'max-h-[102px] overflow-hidden sm:max-h-[116px]'}`}
                   >
                    {advisedStudents.map((student) => (
                      <Link
                        key={student.slug}
                        href={`/members/${student.slug}`}
                        title={student.name}
                        className="group flex w-16 shrink-0 flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white/60 p-1.5 text-center transition hover:border-amber-300 hover:bg-amber-50/70 dark:border-gray-700 dark:bg-gray-800/40 dark:hover:border-amber-500/70 dark:hover:bg-gray-800 sm:w-20 sm:gap-2 sm:p-2"
                      >
                        {student.avatar && (
                          <Image
                            src={student.avatar}
                            alt={student.name}
                            width={56}
                            height={56}
                            className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700 sm:h-14 sm:w-14"
                          />
                        )}
                        <span className="line-clamp-1 w-full text-[11px] font-medium text-gray-700 group-hover:text-amber-700 dark:text-gray-300 sm:text-xs">
                          {student.name}
                        </span>
                      </Link>
                    ))}
                   </div>
                   {(hasHiddenAdvisedStudents || showAllAdvisedStudents) && (
                    <button
                      type="button"
                      onClick={() => setShowAllAdvisedStudents((value) => !value)}
                      className="w-fit rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 transition hover:border-amber-300 hover:text-amber-700 dark:border-gray-700 dark:text-gray-300 dark:hover:border-amber-500/70"
                    >
                      {showAllAdvisedStudents
                        ? locale === 'zh' ? '收起' : 'Show less'
                        : locale === 'zh' ? '查看更多' : 'Show more'}
                    </button>
                   )}
                </div>
              )}
            </div>

            <div
              className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-12 max-w-3xl px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl leading-relaxed"
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
