import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh'],
  // Used when no locale matches
  defaultLocale: 'zh',
  // 不在URL中显示locale前缀，通过cookie管理
  localePrefix: 'never'
});

export const locales = ['zh', 'en'] as const;

export type Locale = (typeof locales)[number];

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
