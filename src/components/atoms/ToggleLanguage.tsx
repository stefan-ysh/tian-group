'use client';

import { setUserLocale } from '~/services/locale';
import { Button, Switch } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import { useTransition, useState, useEffect } from 'react';

const Header = () => {
  const locale = useLocale();
  const [mounted, setMounted] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setMounted(true);
  });
  const handleOnClick = () => {
    startTransition(() => {
      setUserLocale(locale === 'en' ? 'zh' : 'en');
    });
  };

  return (
    <>
      {mounted ? (
        <Button onPress={handleOnClick} size="sm" isIconOnly aria-label="Toggle dark mode" variant="light">
          {locale === 'en' ? ' EN' : '中'}
        </Button>
      ) : null}
    </>
  );
};

export default Header;
