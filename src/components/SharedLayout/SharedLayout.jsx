import { NavLink } from 'react-router-dom';

import css from './SharedLayout.module.css';

export const SharedLayout = ({ children }) => {
  return (
    <>
      <nav className={css.navBox}>
        <NavLink to="" className={css.link}>
          Home
        </NavLink>

        <NavLink to="/search-movies" className={css.link}>
          Search Movies
        </NavLink>
      </nav>

      <div>{children}</div>
    </>
  );
};
