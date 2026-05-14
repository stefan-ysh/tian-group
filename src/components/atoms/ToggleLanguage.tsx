'use client';

import { Button } from '@heroui/react';
import { useLocale } from 'next-intl';
import { useTransition, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from '~/i18n/routing';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

const ToggleLanguage = () => {
  const locale = useLocale();
  const [mounted, setMounted] = useState<boolean>(false);
  const [targetLocale, setTargetLocale] = useState<Locale | null>(null);

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTargetLocale(null);
  }, [locale]);

  const router = useRouter();

  const handleOnClick = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    setTargetLocale(nextLocale);
    setLocaleCookie(nextLocale);

    startTransition(() => {
      router.refresh();
    });
  };

  const isSwitching = isPending || targetLocale !== null;
  const currentLabel = locale === 'en' ? 'EN' : '中';
  const pendingLocale = targetLocale ?? (locale === 'en' ? 'zh' : 'en');
  const targetLabel = pendingLocale === 'en' ? 'English' : '中文';

  return (
    <>
      {mounted ? (
        <>
          <Button
            onPress={handleOnClick}
            size="sm"
            isIconOnly
            aria-label={`Switch to ${locale === 'en' ? 'Chinese' : 'English'}`}
            aria-busy={isSwitching}
            isDisabled={isSwitching}
            variant="light"
            className="relative h-10 w-10 min-w-10 shrink-0"
          >
            {isSwitching ? (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary dark:border-teal-200/30 dark:border-t-teal-200"
              />
            ) : (
              currentLabel
            )}
          </Button>

          {isSwitching && (
            <div
              role="status"
              aria-live="polite"
              className="fixed right-4 top-20 z-50 rounded-md border border-slate-200 bg-white/95 px-3 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-900/95 dark:text-slate-100"
            >
              {locale === 'en' ? `Switching to ${targetLabel}...` : `正在切换到${targetLabel}...`}
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default ToggleLanguage;
