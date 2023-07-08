import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getMovieBySearch } from 'utils/moviesAPI';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';
import css from './SearchMovies.module.css';

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (searchQuery === '' || searchQuery === null) {
      return;
    }
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const fetchedMovies = await getMovieBySearch(searchQuery);
        if (fetchedMovies.length === 0) {
          return toast.warn('No movies found', {
            autoClose: 3000,
          });
        }
        setMovies(await getMovieBySearch(searchQuery));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  const handleSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      return toast.warn('Please, enter something to search.', {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      setSearchParams({ query: search });
      setSearch('');
    }
  };

  const handleInputChange = event => {
    setSearch(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter movie to search..."
          name="input"
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit" className={css.formButton}>
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {movies && <MoviesList movies={movies} />}

      <ToastContainer />
    </>
  );
};

export default SearchMovies;
