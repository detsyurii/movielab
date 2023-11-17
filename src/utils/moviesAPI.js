import axios from 'axios';

const API_KEY = 'b2e2d2c8145624ba6f52acc7f816fd89';
const BASE_URL = 'https://api.themoviedb.org/3/';

export const getTrendingMovies = async page => {
  const { data } = await axios.get(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return data.results;
};

export const getMovieBySearch = async query => {
  const { data } = await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`
  );
  return data.results;
};

export const getMovieDetails = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  return data;
};

export const getCast = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
  return data.cast;
};

export const getReviews = async movieId => {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );

  return data.results;
};
