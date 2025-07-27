import { NavLink } from 'react-router-dom';

export const AboutPage = () => (
  <div>
    <h1>ABOUT</h1>
    <div className="gap-4 flex">
      <p>Author:</p>
      <NavLink
        className="text-gray-500"
        to="https://github.com/hapurzhonau"
        target="_blank"
        rel="noopener noreferrer"
      >
        hapurzhonau
      </NavLink>
    </div>
    <div className="gap-4 flex">
      <p>Recourse:</p>
      <NavLink
        to="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500"
      >
        RS School 2025
      </NavLink>
    </div>
  </div>
);
