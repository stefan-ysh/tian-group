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
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme);
        document.documentElement.classList?.add(storedTheme);
      } else {
        const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const newTheme = darkMode ? 'dark' : 'light';
        document.documentElement.classList?.add(newTheme);
      }
    }
    setMounted(true);
  }, [setTheme]);

  const handleOnClick = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    const classList = document.documentElement.classList;
    // 切换 html 的 class,如果存在dark 则删除 dark
    if (classList.contains('dark')) {
      classList.remove('dark');
    } else {
      classList.add(newTheme);
    }
    localStorage.setItem('theme', newTheme);
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
