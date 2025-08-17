import { getTranslations } from 'next-intl/server';
import { Link } from '../i18n/navigation';

export const AboutPage = async () => {
  const t = await getTranslations('About');

  return (
    <div>
      <h1>{t('title')}</h1>
      <div className="gap-4 flex">
        <p>{t('author')}:</p>
        <Link
          className="text-gray-500"
          href="https://github.com/hapurzhonau"
          target="_blank"
          rel="noopener noreferrer"
        >
          hapurzhonau
        </Link>
      </div>
      <div className="gap-4 flex">
        <p>{t('recourses')}:</p>
        <Link
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500"
        >
          RS School 2025
        </Link>
      </div>
    </div>
  );
};
