import { NavLink } from 'react-router-dom';

export const HeaderNavbar = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </>
  );
};
