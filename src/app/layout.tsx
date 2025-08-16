import type { Metadata } from 'next';
import './global.css';
import { HeaderNavbar } from '../components/navigation/HeaderNavbar';
import { ThemeProvider } from '../pages/ThemeProvider';
export const metadata: Metadata = {
  title: 'Rs-react',
  description: 'rs-react nextjs project',
};
export default function RootLayout({
  children,
  details,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div id="root">
          <ThemeProvider>
            <HeaderNavbar />
            <main className="p-4 flex gap-4">
              <div className="flex-1">{children}</div>
              {details}
            </main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
