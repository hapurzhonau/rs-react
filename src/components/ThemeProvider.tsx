'use client';
import { ThemeContext } from '../context/ThemeContext';
import { PropsWithChildren, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const handleToggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeContext
      value={{ theme: currentTheme, toggleTheme: handleToggleTheme }}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <div
          className={`${currentTheme} bg-gray-900 text-white dark:bg-gray-100 min-h-dvh dark:text-black flex`}
        >
          <div className="max-w-7xl w-full mx-auto">{children}</div>
        </div>
      </QueryClientProvider>
    </ThemeContext>
  );
};
