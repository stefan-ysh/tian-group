'use client';

import { Award, BookOpen, FlaskConical, Mail, MapPin, Microscope, MoveRight, Sparkles, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import NextImage from 'next/image';
import React from 'react';
import FadeIn from '~/components/atoms/FadeIn';
import { Link } from '~/i18n/routing';

export default function HomeClientPage() {
  const t = useTranslations('HomePage');
  const tMentor = useTranslations('Member.ListPage');
  const researchCards = [
    {
      icon: Microscope,
      title: t('researchDirection'),
      content: t('researchDirectionContent'),
    },
    {
      icon: Users,
      title: t('researchTeam'),
      content: t('researchTeamContent'),
    },
    {
      icon: Award,
      title: t('researchAchievements'),
      content: t('researchAchievementsContent'),
    },
  ];

  const metrics = [
    { value: '10+', label: t('statsPublications') },
    { value: '5', label: t('statsProjects') },
    { value: '3', label: t('statsFields') },
  ];
  const mentorHighlights = [1, 2, 3, 4, 5].map((item) => tMentor(`mentorPoint${item}`));

  return (
    <div className="site-shell">
      <section className="relative overflow-hidden px-4 py-5 sm:px-6 md:py-5 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(43,124,133,0.16),transparent_30%),radial-gradient(circle_at_84%_12%,rgba(15,44,89,0.14),transparent_28%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.12),transparent_30%),radial-gradient(circle_at_84%_12%,rgba(96,165,250,0.10),transparent_28%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn delay={0.1} duration={0.6} direction="up" className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-primary/15 bg-white/70 px-3 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-teal-200">
              <Sparkles aria-hidden size={16} />
              <span>{t('eyebrow')}</span>
            </div>
            <h1 className="font-serif text-4xl font-semibold leading-[1.08] text-slate-950 text-balance sm:text-5xl lg:text-6xl dark:text-white">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 text-pretty dark:text-slate-300">
              {t('heroLead')}
            </p>
            <div className="mt-8 flex flex-row justify-around gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(15,44,89,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 active:translate-y-0"
              >
                {t('primaryCta')}
              </Link>
              <Link
                href="/publications"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 active:translate-y-0 dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:hover:text-teal-200"
              >
                {t('secondaryCta')}
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} duration={0.6}>
            <div className="relative mx-auto max-w-xl lg:mr-0">
              <div className="absolute -left-4 top-8 h-28 w-28 rounded-full border border-primary/20" />
              <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-950 shadow-[0_30px_80px_rgba(15,44,89,0.22)]">
                <NextImage
                  src="/images/p14.webp"
                  width={900}
                  height={620}
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  priority
                  className="h-[340px] w-full object-cover opacity-90 sm:h-[420px]"
                  alt={t('HeroImageAlt')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/[0.82] via-slate-950/[0.18] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-200">{t('imageKicker')}</p>
                  <p className="mt-2 max-w-md text-xl font-semibold leading-snug">{t('imageCaption')}</p>
                </div>
              </div>
              <div className="absolute -bottom-6 right-4 grid w-[min(92%,420px)] grid-cols-3 overflow-hidden rounded-xl border border-white/70 bg-white/90 shadow-[0_18px_45px_rgba(15,44,89,0.16)] backdrop-blur dark:border-white/10 dark:bg-slate-900/[0.88]">
                {metrics.map((metric) => (
                  <div key={metric.label} className="px-4 py-4 text-center">
                    <div className="font-mono text-2xl font-semibold text-primary dark:text-teal-200">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs font-medium leading-4 text-slate-600 dark:text-slate-300">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 pb-16 pt-10 sm:px-6 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-6 lg:space-y-8">
            <FadeIn direction="right" delay={0.1}>
              <aside className="lab-profile-panel grid gap-6 md:grid-cols-[220px_1fr] md:items-stretch md:gap-0 md:overflow-hidden md:p-0 lg:grid-cols-[240px_1fr]">
                {/* 左侧：头像 */}
                <div className="flex items-center justify-center md:justify-start">
                  <NextImage
                    src="/images/avatar/tiantian.jpg"
                    className="w-full h-full rounded-2xl object-cover shadow-lg ring-1 ring-slate-200 md:h-full md:w-full md:rounded-none md:rounded-l-[calc(1rem-1px)] md:shadow-none md:ring-0 dark:ring-white/10"
                    width={480}
                    height={480}
                    sizes="(min-width: 768px) 240px, 176px"
                    alt={t('AvatarAlt')}
                  />
                </div>
                {/* 右侧：介绍信息 */}
                <div className="flex flex-col justify-center md:px-6 md:py-5 lg:px-8 lg:py-6">
                  {/* 姓名 & 职称 */}
                  <div className="mb-4">
                    <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">{t('Name')}</h2>
                    <p className="mt-1.5 text-base font-semibold text-primary dark:text-teal-200">{t('Title')}</p>
                  </div>
                  {/* 联系方式 */}
                  <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <a
                      href="mailto:tiant91@yzu.edu.cn"
                      className="inline-flex items-center gap-2 transition hover:text-primary dark:hover:text-teal-200"
                    >
                      <Mail aria-hidden className="shrink-0 text-primary dark:text-teal-200" size={16} />
                      <span>tiant91@yzu.edu.cn</span>
                    </a>
                    <div className="inline-flex items-center gap-2">
                      <MapPin aria-hidden className="shrink-0 text-primary dark:text-teal-200" size={16} />
                      <span>{t('Address')}</span>
                    </div>
                  </div>
                  {/* 亮点介绍 */}
                  <ul className="space-y-2.5 border-t border-slate-200/80 pt-4 text-sm leading-6 text-slate-700 dark:border-white/10 dark:text-slate-300">
                    {mentorHighlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary dark:bg-teal-200" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </FadeIn>

            <div className="grid content-start items-stretch gap-4 md:grid-cols-3">
              {researchCards.map(({ icon: Icon, title, content }, index) => (
                <FadeIn key={title} direction="up" delay={0.15 + index * 0.08} className="flex">
                  <article className="research-card flex h-full flex-col">
                    <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-teal-300/10 dark:text-teal-200">
                      <Icon aria-hidden size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-600 text-pretty dark:text-slate-300">{content}</p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.25} direction="up">
            <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur md:grid-cols-[1fr_auto] md:items-center md:p-6 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex items-start gap-4">
                <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary sm:flex">
                  <FlaskConical aria-hidden size={23} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{t('joinTitle')}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300">{t('joinLead')}</p>
                </div>
              </div>
              <Link
                href="/joinus"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                {t('joinCta')}
                <BookOpen aria-hidden size={17} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
