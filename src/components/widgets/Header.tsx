'use client';

import { useState } from 'react';
import ToggleThemeMode from '~/components/atoms/ToggleDarkMode';
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
} from '@nextui-org/react';

const Header = ({ toggleTheme }: any) => {
  const { links, actions, isSticky, showToggleTheme, showRssFeed, position } = headerData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="max-w-full">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        {isMenuOpen}
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links &&
          links.map(({ label, href, icon: Icon, links }, index) => (
            <NavbarItem key={`item-link-${index}`} isActive={pathname === href}>
              <span
                onClick={() => {
                  router.push(href as string);
                }}
                className="cursor-pointer w-full hover:border-b-2 hover:border-primary-500"
                style={{
                  borderBottom: pathname === href ? '2px solid #333' : '',
                }}
              >
                {label}
              </span>
            </NavbarItem>
          ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="hidden fixed bottom-0 left-0 w-full justify-end p-3 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0 md:bg-transparent md:dark:bg-transparent md:border-none  dark:bg-slate-900 border-t border-gray-200 dark:border-slate-600">
            <div className="flex w-full items-center justify-between md:w-auto">
              {showToggleTheme && <ToggleThemeMode toggleTheme={toggleTheme} />}
            </div>
          </div>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {links &&
          links.map(({ label, href, icon: Icon, links: subLinks }, index) => (
            <NavbarMenuItem key={`${label}-${index}`}>
              <span
                onClick={() => {
                  router.push(href as string);
                }}
                className="w-full cursor-pointer"
                style={{
                  borderBottom: pathname === href ? '2px solid #333' : '',
                }}
              >
                {label}
              </span>
            </NavbarMenuItem>
          ))}
        <div className="fixed bottom-0 left-0 w-full justify-end p-3 md:static md:mb-0 md:flex md:w-auto md:self-center md:p-0 md:bg-transparent md:dark:bg-transparent md:border-none  dark:bg-transparent border-t border-gray-200 dark:border-slate-600">
          <div className="flex w-full items-center justify-between md:w-auto">
            {showToggleTheme && <ToggleThemeMode toggleTheme={toggleTheme} />}
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
