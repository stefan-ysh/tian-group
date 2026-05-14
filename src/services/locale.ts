'use server';

import { cookies, headers } from 'next/headers';
import { routing, Locale } from '~/i18n/routing';

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE';
const supportedLocales = new Set<string>(routing.locales);

function getBrowserLocale(): Locale {
  const acceptLanguage = headers().get('accept-language');

  if (!acceptLanguage) {
    return routing.defaultLocale;
  }

  const browserLocales = acceptLanguage
    .split(',')
    .map((language) => {
      const [localeRange, qualityValue] = language.trim().split(';q=');
      return {
        locale: localeRange.toLowerCase(),
        quality: qualityValue ? Number(qualityValue) : 1,
      };
    })
    .filter(({ locale, quality }) => locale && Number.isFinite(quality))
    .sort((a, b) => b.quality - a.quality);

  for (const { locale } of browserLocales) {
    const languageCode = locale.split('-')[0];

    if (supportedLocales.has(languageCode)) {
      return languageCode as Locale;
    }
  }

  return routing.defaultLocale;
}

export async function getUserLocale() {
  const savedLocale = cookies().get(COOKIE_NAME)?.value;

  if (savedLocale && supportedLocales.has(savedLocale)) {
    return savedLocale as Locale;
  }

  return getBrowserLocale();
}
