import { Suspense, useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';

import { getMovieDetails } from 'utils/moviesAPI';
import { BASE_IMG_URL, DEFAULT_IMG_URL } from 'utils/constants';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();

  // console.log(location);
  // console.log(movie);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        setMovie(await getMovieDetails(movieId));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  return (
    <>
      <Link to={location.state?.from ?? '/'} className={css.backLink}>
        Back to movies
      </Link>
      {isLoading && <Loader />}
      {movie && (
        <>
          <div className={css.box}>
            <img
              src={
                movie.poster_path
                  ? `${BASE_IMG_URL}${movie.poster_path}`
                  : DEFAULT_IMG_URL
              }
              alt=""
            />
            <div className={css.descreption}>
              <h2>{movie.original_title}</h2>
              <p>User score: {movie.vote_average.toFixed(1) * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(genre => genre.name + ' ')}</p>
            </div>
          </div>

          <div className={css.additional}>
            <h4>Additional information</h4>
            <div className={css.additionalLinks}>
              <p>
                <Link to="cast" state={{ from: location.state?.from }}>
                  Cast
                </Link>
              </p>
              <p>
                <Link to="reviews" state={{ from: location.state?.from }}>
                  Reviews
                </Link>
              </p>
            </div>
          </div>

          <Suspense fallback={<p>Please, wait...</p>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetails;
