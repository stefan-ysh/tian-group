'use client';

import { useState, useEffect, useCallback } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { Button } from "@heroui/react";
import { useTheme } from 'next-themes';

const ToggleTheme = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
    setMounted(true);
  }, [setTheme]);

  const handleOnClick = useCallback(() => {
    let newTheme;
    if(theme !== 'system') {
      newTheme = theme === 'dark' ? 'light' : 'dark';
    } else {
      newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
    }
    setTheme(newTheme);
  }, [theme, setTheme]);

  return (
    <>
      {mounted ? (
        <Button onPress={handleOnClick} size="sm" isIconOnly aria-label="Toggle dark mode" variant="light">
          {theme === 'light' ? <IconSun size={16} /> : <IconMoon size={16} />}
        </Button>
      ) : (
        null
      )}
    </>
  );
};

export default ToggleTheme;
