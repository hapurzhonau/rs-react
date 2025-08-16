import Link from 'next/link';

export const AboutPage = () => (
  <div>
    <h1>ABOUT</h1>
    <div className="gap-4 flex">
      <p>Author:</p>
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
      <p>Recourse:</p>
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
