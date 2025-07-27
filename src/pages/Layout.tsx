import { Outlet } from 'react-router-dom';
import { HeaderNavbar } from '../components/navigation/HeaderNavbar';

export const Layout = () => {
  return (
    <div>
      <header className="p-4 bg-gray-700 text-white flex gap-4">
        <HeaderNavbar />
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
