import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HeaderNavbar } from '../components/navigation/HeaderNavbar';
import { ThemeProvider } from '../context/ThemeProvider';

export const Layout = () => {
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
};

const LayoutInner = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme} bg-gray-900 text-white dark:bg-gray-100 min-h-dvh dark:text-black flex`}
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
  );
};
