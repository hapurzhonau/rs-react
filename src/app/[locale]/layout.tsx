import type { Metadata } from 'next';
import '../global.css';
import { HeaderNavbar } from '../../components/navigation/HeaderNavbar';
import { ThemeProvider } from '../../pages/ThemeProvider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
export const metadata: Metadata = {
  title: 'Rs-react',
  description: 'rs-react nextjs project',
};
export default async function RootLayout({
  children,
  details,
  params,
  messages,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
  params: Promise<{ locale: string }>;
  messages: Promise<{ message: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider>
              <HeaderNavbar />
              <main className="p-4 flex gap-4">
                <div className="flex-1">{children}</div>
                {details}
              </main>
            </ThemeProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
