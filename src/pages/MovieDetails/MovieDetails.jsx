import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { getMovieDetails } from 'utils/moviesAPI';
import { BASE_IMG_URL, DEFAULT_IMG_URL } from 'utils/constants';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetails.module.css';
import { animateScroll as scroll } from 'react-scroll';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();

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

  useEffect(() => {
    if (location.hash === '#cast') {
      scroll.scrollToTop({
        duration: 800,
        smooth: 'easeInOutQuart',
      });
    } else if (location.hash === '#reviews') {
      scroll.scrollToTop({
        duration: 800,
        smooth: 'easeInOutQuart',
      });
    }
  }, [location.pathname, location.hash]);

  const handleScrollTo = elementId => {
    scroll.scrollTo(document.getElementById(elementId).offsetTop, {
      duration: 800,
      smooth: 'easeInOutQuart',
    });
  };

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
            <div className={css.description}>
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
                <Link
                  to="cast"
                  state={{ from: location.state?.from }}
                  onClick={() => handleScrollTo('cast')}
                >
                  Cast
                </Link>
              </p>
              <p>
                <Link
                  to="reviews"
                  state={{ from: location.state?.from }}
                  onClick={() => handleScrollTo('reviews')}
                >
                  Reviews
                </Link>
              </p>
            </div>
          </div>

          <div id="cast">
            <Outlet />
          </div>

          <div id="reviews">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetails;
