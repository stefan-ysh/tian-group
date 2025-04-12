'use client';

import { useState } from 'react';
import ToggleTheme from '~/components/atoms/ToggleTheme';
import ToggleLanguage from '~/components/atoms/ToggleLanguage';
import Logo from '~/components/atoms/Logo';
import { headerData } from '~/shared/data/global.data';
import { useRouter, usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@heroui/react";
import { useTranslations, useLocale } from 'next-intl';
import { Grid, Clock, ChevronDown } from 'lucide-react';

const Header = () => {
  const { links, actions, isSticky, showToggleTheme, showRssFeed, position } = headerData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Header.NavMenu');
  const p = useTranslations('Publications');

  // Helper function to check if path starts with a specific route
  const isActive = (path: string) => {
    return pathname.startsWith(`/${locale}${path}`) || pathname.startsWith(path);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="max-w-full">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        {/* <NavbarBrand>
          <Logo />
        </NavbarBrand> */}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links &&
          links.map(({ label, href, icon: Icon, links: subLinks, code }, index) => {
            return (
              <NavbarItem key={`item-link-${index}`} isActive={pathname === `/${locale}${href}` || pathname === href}>
                {/* <span
                  onClick={() => {
                    router.push(href as string);
                  }}
                  className="cursor-pointer w-full hover:border-b-2 hover:border-primary-500"
                  style={{
                    borderBottom: (pathname === href || pathname === `/${locale}${href}`) ? '2px solid #333' : '',
                  }}
                  role="link"
                  tabIndex={0}
                  aria-label={t(code)}
                >
                  {t(code)}
                </span> */}
                <Link href={href || '#'} className="cursor-pointer hover:border-b-2 hover:border-primary-500 text-primary-400" style={{
                  borderBottom: (pathname === href || pathname === `/${locale}${href}`) ? '2px solid #333' : '',
                }} aria-label={t(code)}>
                  {t(code)}
                </Link>
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
            return (
              <NavbarMenuItem key={`${label}-${index}`}>
                <Link
                  href={href || '#'}
                  className="cursor-pointer hover:border-b-2 hover:border-primary-500 text-primary-400"
                  style={{
                    borderBottom: (pathname === href || pathname === `/${locale}${href}`) ? '2px solid #333' : '',
                  }}
                  aria-label={t(code)}
                >
                  {t(code)}
                </Link>
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
