import { MovieItem } from '../MovieItem/MovieItem';
import css from './MoviesList.module.css';

export const MoviesList = ({ movies }) => {
  // console.log(movies);
  return (
    <>
      <section>
        <ul className={css.moviesList}>
          {movies.map(movie => {
            return <MovieItem movie={movie} key={movie.id} />;
          })}
        </ul>
      </section>
    </>
  );
};
