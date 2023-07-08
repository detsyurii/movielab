import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { SharedLayout } from './SharedLayout/SharedLayout';

// import { Loader } from './Loader/Loader';

const Home = lazy(() => import('pages/Home/Home'));
const SearchMovies = lazy(() => import('pages/SearchMovies/SearchMovies'));
const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('pages/MovieDetails/Cast/Cast'));
const Reviews = lazy(() => import('pages/MovieDetails/Reviews/Reviews'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

export const App = () => {
  return (
    <SharedLayout>
      <Suspense fallback={<p>Please, wait...</p>}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/search-movies" element={<SearchMovies />} />
          <Route path="/movie/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
};
