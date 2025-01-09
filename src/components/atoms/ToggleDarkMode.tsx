'use client';

import { useState, useEffect, useCallback } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';

const ToggleThemeMode = () => {
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
        <Switch
          onChange={handleOnClick}
          defaultSelected={document.documentElement.classList.contains('light')}
          color="success"
          size="md"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? <IconSun size={16} className={className} /> : <IconMoon size={16} className={className} />
          }
        />
      ) : (
        null
      )}
    </>
  );
};

export default ToggleThemeMode;
