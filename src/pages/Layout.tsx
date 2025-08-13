import { Outlet } from 'react-router-dom';
import { HeaderNavbar } from '../components/navigation/HeaderNavbar';
import { ThemeContext } from '../context/ThemeContext';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Layout = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const handleToggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeContext
      value={{ theme: currentTheme, toggleTheme: handleToggleTheme }}
    >
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <div
        className={`${currentTheme} bg-gray-900 text-white dark:bg-gray-100 min-h-dvh dark:text-black flex`}
      >
        <div className="max-w-7xl w-full mx-auto">
          <header className="p-4 bg-gray-700 flex gap-4 dark:bg-gray-300">
            <HeaderNavbar />
          </header>

          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeContext>
  );
};
