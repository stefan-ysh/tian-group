'use client';

import { useState } from 'react';
import ToggleTheme from '~/components/atoms/ToggleTheme';
import ToggleLanguage from '~/components/atoms/ToggleLanguage';
import Logo from '~/components/atoms/Logo';
import { headerData } from '~/shared/data/global.data';
import { usePathname, Link as IntlLink } from '~/i18n/routing';
import {
  CalendarDays,
  FileText,
  Home,
  Mail,
  Menu,
  Microscope,
  Newspaper,
  UserPlus,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const navIcons: Record<string, LucideIcon> = {
  home: Home,
  research: Microscope,
  publications: FileText,
  members: UsersRound,
  news: Newspaper,
  activities: CalendarDays,
  joinus: UserPlus,
  contact: Mail,
};

const Header = () => {
  const { links = [], showToggleTheme } = headerData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Header.NavMenu');
  const tMetadata = useTranslations('Metadata');
  const tHomePage = useTranslations('HomePage');

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/[0.82] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/[0.76]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-3 sm:px-4 lg:px-6" aria-label="Primary">
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 dark:text-slate-200 dark:hover:text-teal-200 xl:hidden"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          {isMenuOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>

        <IntlLink
          href="/"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
          aria-label={t('home')}
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo
            textClassName="hidden 2xl:block"
            subtitle={tHomePage('School')}
            title={tMetadata('Creator')}
          />
        </IntlLink>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
          {links.map(({ href, code }) => {
            const isCurrentPage = pathname === href;
            const NavIcon = navIcons[code] || FileText;

            return (
              <IntlLink
                key={code}
                href={href || '/'}
                prefetch={true}
                title={t(code)}
                className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium transition duration-200 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 dark:hover:bg-white/10 dark:hover:text-teal-200 2xl:gap-2 2xl:px-3 2xl:text-sm ${
                  isCurrentPage
                    ? 'bg-primary/10 text-primary dark:bg-teal-300/10 dark:text-teal-200'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                aria-current={isCurrentPage ? 'page' : undefined}
                aria-label={t(code)}
              >
                <span className="whitespace-nowrap">{t(code)}</span>
              </IntlLink>
            );
          })}
        </div>

        <div className="ml-auto hidden shrink-0 items-center gap-1 xl:flex">
          {showToggleTheme && <ToggleTheme />}
          <ToggleLanguage />
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white/96 px-3 py-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/96 xl:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {links.map(({ href, code }) => {
              const isCurrentPage = pathname === href;
              const NavIcon = navIcons[code] || FileText;

              return (
                <IntlLink
                  key={code}
                  href={href || '/'}
                  prefetch={true}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 ${
                    isCurrentPage
                      ? 'bg-primary/10 text-primary dark:bg-teal-300/10 dark:text-teal-200'
                      : 'text-slate-700 hover:bg-primary/10 hover:text-primary dark:text-slate-200 dark:hover:text-teal-200'
                  }`}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  aria-label={t(code)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <NavIcon aria-hidden className="h-5 w-5 shrink-0" />
                  <span>{t(code)}</span>
                </IntlLink>
              );
            })}
            <div className="mt-2 flex items-center justify-end gap-2 border-t border-slate-200 pt-3 dark:border-white/10">
              {showToggleTheme && <ToggleTheme />}
              <ToggleLanguage />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
