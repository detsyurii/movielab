import { useState, useEffect } from 'react';

import { getTrendingMovies } from 'utils/moviesAPI';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';
import css from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async page => {
      setIsLoading(true);
      try {
        const newMovies = await getTrendingMovies(page);
        setMovies(prevMovies => [...prevMovies, ...newMovies]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <h1 className={css.title}>Trending movies</h1>
      {isLoading && <Loader />}
      {movies.length > 0 && <MoviesList movies={movies} />}
      <div className={css.loadMoreContainer}>
        <button onClick={handleLoadMore} className={css.loadMoreButton}>
          Load more
        </button>
      </div>
    </>
  );
};

export default Home;
