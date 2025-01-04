'use client';

import { useState, useEffect } from 'react';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { Switch } from '@nextui-org/react';
interface DarkModeProps {
  toggleTheme: Function;
}
const ToggleThemeMode = ({ toggleTheme }: DarkModeProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setMounted(true);
    if (storedTheme) {
      setTheme(storedTheme);

      toggleTheme(storedTheme === 'dark');
    }
  }, [setTheme]);

  const handleOnClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toggleTheme(newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <>
      {mounted ? (
        <Switch
          onChange={handleOnClick}
          defaultSelected={theme === 'light'}
          color="success"
          size="lg"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? <IconSun size={16} className={className} /> : <IconMoon size={16} className={className} />
          }
        />
      ) : (
        <div className="h-5 w-5"></div>
      )}
    </>
  );
};

export default ToggleThemeMode;
