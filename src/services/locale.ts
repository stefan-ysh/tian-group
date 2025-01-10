'use server';

import { cookies } from 'next/headers';
import { routing, Locale } from '~/i18n/routing';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || routing.defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  console.log('[ locale ] >', locale);
  cookies().set(COOKIE_NAME, locale);
}
