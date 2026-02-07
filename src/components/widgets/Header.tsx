'use client';

import { useState } from 'react';
import ToggleTheme from '~/components/atoms/ToggleTheme';
import ToggleLanguage from '~/components/atoms/ToggleLanguage';
import { headerData } from '~/shared/data/global.data';
import { usePathname, Link as IntlLink } from '~/i18n/routing';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/react";
import { useTranslations } from 'next-intl';

const Header = () => {
  const { links, actions, isSticky, showToggleTheme, showRssFeed, position } = headerData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Header.NavMenu');

  return (
    <Navbar 
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen} 
      className="max-w-full"
    >
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        {/* <NavbarBrand>
          <Logo />
        </NavbarBrand> */}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links &&
          links.map(({ label, href, icon: Icon, links: subLinks, code }, index) => {
            const isCurrentPage = pathname === href;
            return (
              <NavbarItem key={`item-link-${index}`} isActive={isCurrentPage}>
                <IntlLink 
                  href={href || '/'}
                  prefetch={true}
                  className="cursor-pointer hover:border-b-2 hover:border-primary-500 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 rounded-sm"
                  aria-current={isCurrentPage ? 'page' : undefined}
                  style={{
                    borderBottom: isCurrentPage ? '2px solid #333' : '',
                  }}
                  aria-label={t(code)}
                >
                  {t(code)}
                </IntlLink>
              </NavbarItem>
            );
          })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="hidden fixed bottom-0 left-0 w-full justify-end p-3 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0 md:bg-transparent md:dark:bg-transparent md:border-none  dark:bg-slate-900 border-t border-gray-200 dark:border-slate-600">
            {/* switch theme */}
            <div className="flex w-full items-center justify-between md:w-auto">
              {showToggleTheme && <ToggleTheme />}
            </div>
            {/* switch language */}
            <div className="flex w-full items-center justify-between md:w-auto">
              <ToggleLanguage />
            </div>
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        {links &&
          links.map(({ label, href, icon: Icon, links: subLinks, code }, index) => {
            const isCurrentPage = pathname === href;
            return (
              <NavbarMenuItem key={`${label}-${index}`}>
                <IntlLink
                  href={href || '/'}
                  prefetch={true}
                  className="cursor-pointer hover:border-b-2 hover:border-primary-500 text-primary-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 rounded-sm"
                  aria-current={isCurrentPage ? 'page' : undefined}
                  style={{
                    borderBottom: isCurrentPage ? '2px solid #333' : '',
                  }}
                  aria-label={t(code)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(code)}
                </IntlLink>
              </NavbarMenuItem>
            );
          })}
        <div className="fixed bottom-0 left-0 w-full flex justify-end p-3 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0 md:bg-transparent md:dark:bg-transparent md:border-none  dark:bg-transparent border-t border-gray-200 dark:border-slate-600">
          {/* switch theme when mobile */}
          <div className="flex w-1/2 items-center justify-between md:w-auto">
            {showToggleTheme && <ToggleTheme />}
          </div>
          {/* switch language when mobile */}
          <div className="flex w-1/2 items-center justify-between md:w-auto">
            <ToggleLanguage />
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
