'use client';

import { setUserLocale } from '~/services/locale';
import { Button } from "@heroui/react";
import { useLocale } from 'next-intl';
import { useTransition, useState, useEffect } from 'react';

const ToggleLanguage = () => {
  const locale = useLocale();
  const [mounted, setMounted] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleOnClick = () => {
    startTransition(() => {
      setUserLocale(locale === 'en' ? 'zh' : 'en');
    });
  };

  return (
    <>
      {mounted ? (
        <Button 
          onPress={handleOnClick} 
          size="sm" 
          isIconOnly 
          aria-label={`Switch to ${locale === 'en' ? 'Chinese' : 'English'}`} 
          variant="light"
        >
          {locale === 'en' ? ' EN' : '中'}
        </Button>
      ) : null}
    </>
  );
};

export default ToggleLanguage;
