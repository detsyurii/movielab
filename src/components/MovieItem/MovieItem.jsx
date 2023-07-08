import { Link, useLocation } from 'react-router-dom';

import { BASE_IMG_URL, DEFAULT_IMG_URL } from 'utils/constants';
import css from './MovieItem.module.css';

export const MovieItem = ({
  movie: { poster_path, title, vote_average, id },
}) => {
  const location = useLocation();

  return (
    <>
      <li className={css.movieItem}>
        <Link to={`/movie/${id}`} state={{ from: location }}>
          <img
            src={
              poster_path ? `${BASE_IMG_URL}${poster_path}` : DEFAULT_IMG_URL
            }
            alt={title}
          />
          <h3>{title}</h3>
          <p>Rate: {vote_average.toFixed(1)}</p>
        </Link>
      </li>
    </>
  );
};
