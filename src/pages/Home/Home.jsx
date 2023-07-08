import { useState, useEffect } from 'react';

import { getTrendingMovies } from 'utils/moviesAPI';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';
import css from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        setMovies(await getTrendingMovies());
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // console.log(movies);

  return (
    <>
      <h1 className={css.title}>Trending movies</h1>
      {isLoading && <Loader />}
      {movies && <MoviesList movies={movies} />}
    </>
  );
};

export default Home;
