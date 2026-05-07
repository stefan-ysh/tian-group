'use client';

import md from 'markdown-it';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, ChevronDown, ChevronUp, Microscope, UserRound, UsersRound } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const COLLAPSED_ADVISED_STUDENTS_COUNT = 5;

// 错误展示组件
function MemberError() {
  const t = useTranslations('Member.Detail');
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <h2 className="text-xl font-bold mb-2">{t('loadError')}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{t('tryAgain')}</p>
    </div>
  );
}

function DetailRow({ icon: Icon, label, children }) {
  return (
    <div className="grid gap-2 border-b border-gray-200/70 pb-4 last:border-b-0 last:pb-0 dark:border-gray-700/70 sm:grid-cols-[150px_1fr] sm:gap-5 items-start">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-600">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span>{label}</span>
      </div>
      <div className="flex min-h-8 items-center text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}

export function MemberClientPage({ slug, initialMember = null }) {
  const hasInitialData = !!initialMember;
  const [member, setMember] = useState(initialMember);
  const [loading, setLoading] = useState(!hasInitialData);
  const [error, setError] = useState(false);
  const [showAllAdvisedStudents, setShowAllAdvisedStudents] = useState(false);
  const t = useTranslations('Member.Detail');
  const tPosition = useTranslations('Member.Position');
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
  const hasMoreAdvisedStudents = advisedStudents.length > COLLAPSED_ADVISED_STUDENTS_COUNT;
  const visibleAdvisedStudents = showAllAdvisedStudents
    ? advisedStudents
    : advisedStudents.slice(0, COLLAPSED_ADVISED_STUDENTS_COUNT);
  const studentPositions = ['Graduate', 'Doctoral', 'Master Student', 'PhD Student'];
  const isStudent = studentPositions.includes(member?.position) || studentPositions.includes(member?.position_en);

  if (error) {
    return <MemberError />;
  }

  return (
    <section className="w-full mx-auto max-w-6xl px-6 py-8 sm:py-16 lg:py-20">
      <article className={loading ? 'opacity-60 transition-opacity duration-300' : 'transition-opacity duration-300'}>
        {loading ? (
          // 加载中的骨架屏
          <div className="animate-pulse">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
              <div className="h-[420px] rounded-2xl bg-primary/10"></div>
              <div className="space-y-5 rounded-2xl border border-gray-100 bg-primary/5 px-6 py-6 dark:border-gray-700">
                <div className="h-10 w-1/3 rounded bg-primary/10"></div>
                <div className="h-8 rounded bg-primary/10"></div>
                <div className="h-8 rounded bg-primary/10"></div>
                <div className="h-8 w-3/4 rounded bg-primary/10"></div>
              </div>
            </div>
          </div>
        ) : member ? (
          // 实际内容
          <>
            <div className="mx-auto grid max-w-5xl items-start gap-2 lg:grid-cols-[340px_minmax(0,1fr)]">
              {member.avatar || member.image ? (
                <figure className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 lg:mx-0">
                  <Image
                    src={member.avatar || member.image}
                    className="aspect-[4/5] w-full bg-gray-100 object-cover dark:bg-slate-800"
                    sizes="(max-width: 1024px) 320px, 340px"
                    alt={member.description || member.name}
                    loading="eager"
                    priority
                    width={400}
                    height={500}
                  />
                </figure>
              ) : (
                <div className="hidden border-t dark:border-slate-700 lg:block" />
              )}

              <div className="flex flex-col gap-5 rounded-2xl border border-gray-200/80 bg-gradient-to-br from-white via-amber-50/35 to-gray-50 px-5 py-6 shadow-sm dark:border-gray-700 dark:from-gray-900/80 dark:via-gray-800/70 dark:to-gray-900 sm:px-6 justify-around h-full">
                <div className="border-b border-gray-200/70 pb-4 dark:border-gray-700/70">
                  <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                    <span>{member.name}</span>
                    {isStudent && member.position && (
                      <span className="text-base font-semibold text-amber-600 dark:text-amber-300 sm:text-lg">
                        {tPosition(member.position)}
                      </span>
                    )}
                  </h1>
                </div>
                {member.joined_year && (
                  <DetailRow icon={CalendarDays} label={t('joinYear')}>
                    <span>{member.joined_year}</span>
                  </DetailRow>
                )}
                {member.leave_year && (
                  <DetailRow icon={CalendarDays} label={t('leaveYear')}>
                    <span>{member.leave_year}</span>
                  </DetailRow>
                )}
                {member.research_areas && (
                  <DetailRow icon={Microscope} label={t('researchArea')}>
                    <span>{member.research_areas}</span>
                  </DetailRow>
                )}
                {member.advisorName && (
                  <DetailRow icon={UserRound} label={t('advisor')}>
                    {member.advisorSlug ? (
                      <Link
                        href={`/members/${member.advisorSlug}`}
                        className="font-medium text-primary-600 transition-colors hover:text-primary-700"
                      >
                        {member.advisorName}
                      </Link>
                    ) : (
                      <span>{member.advisorName}</span>
                    )}
                  </DetailRow>
                )}
                {/* {member.email && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                   <span className="text-sm font-bold text-amber-600 uppercase tracking-wider min-w-[100px]">{t('email')}</span>
                   <a href={`mailto:${member.email}`} className="text-primary-600 hover:text-primary-700 transition-colors">{member.email}</a>
                </div>
              )} */}
                {advisedStudents.length > 0 && (
                  <DetailRow icon={UsersRound} label={t('advisedStudents')}>
                    <div className="flex w-full flex-col gap-4">
                      <div className="flex flex-wrap gap-3">
                        {visibleAdvisedStudents.map((student) => (
                          <Link
                            key={student.slug}
                            href={`/members/${student.slug}`}
                            title={student.name}
                            className="group flex w-20 shrink-0 flex-col items-center gap-2 rounded-xl p-2 text-center  transition hover:-translate-y-0.5 hover:bg-amber-50/80 hover:shadow-[0_12px_28px_rgba(180,83,9,0.12)]  dark:hover:bg-gray-800 border-none"
                          >
                            {student.avatar && (
                              <Image
                                src={student.avatar}
                                alt={student.name}
                                width={56}
                                height={56}
                                className="h-14 w-14 rounded-full object-cover ring-1 ring-gray-200 transition group-hover:ring-amber-300 dark:ring-gray-700 dark:group-hover:ring-amber-500/70"
                              />
                            )}
                            <span className="line-clamp-1 w-full text-xs font-medium text-gray-700 group-hover:text-amber-700 dark:text-gray-300">
                              {student.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                      {hasMoreAdvisedStudents && (
                        <button
                          type="button"
                          onClick={() => setShowAllAdvisedStudents((value) => !value)}
                          className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-xs font-semibold text-amber-700 transition hover:border-amber-300 hover:bg-amber-50 dark:border-amber-500/30 dark:bg-gray-900/40 dark:text-amber-300 dark:hover:border-amber-400/60"
                        >
                          {showAllAdvisedStudents ? (
                            <>
                              {locale === 'zh' ? '收起' : 'Show less'}
                              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                            </>
                          ) : (
                            <>
                              {locale === 'zh'
                                ? `查看全部 ${advisedStudents.length} 人`
                                : `Show all ${advisedStudents.length}`}
                              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </DetailRow>
                )}
              </div>
            </div>

            {member.content && (
              <div
                className="prose-md prose-headings:font-heading prose-headings:leading-tighter container mx-auto prose-lg  mt-12 px-0 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-6 lg:prose-xl leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: md({
                    html: true,
                  }).render(member.content),
                }}
              />
            )}
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
