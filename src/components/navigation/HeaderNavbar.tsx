'use client';
import { Button } from '../button/Button';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import LocaleSwitcher from '../localSwitcher/LocalSwitcher';
import { Link } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';
export const HeaderNavbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const currentIcon =
    theme === 'dark' ? <SunIcon strokeWidth="1.8" /> : <MoonIcon />;
  const handleClick = () => {
    toggleTheme();
  };
  const t = useTranslations('HeaderNavBar');
  return (
    <header className="p-4 bg-gray-700 flex gap-4 dark:bg-gray-300">
      <nav className="flex justify-between max-w-full w-full">
        <div className="flex gap-8">
          <Link href="/">{t('home')}</Link>
          <Link href="/about">{t('about')}</Link>
        </div>
        <Button onClick={handleClick} className="border-0 rounded-full p-1">
          {currentIcon}
        </Button>
        <LocaleSwitcher />
      </nav>
    </header>
  );
};
