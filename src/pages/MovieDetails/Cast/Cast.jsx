import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCast } from 'utils/moviesAPI';
import { BASE_IMG_URL, DEFAULT_IMG_URL } from 'utils/constants';
import { Loader } from 'components/Loader/Loader';
import css from './Cast.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      try {
        setCast(await getCast(movieId));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  // console.log(cast);

  return (
    <>
      {isLoading && <Loader />}
      {cast && (
        <ul className={css.cast}>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `${BASE_IMG_URL}${actor.profile_path}`
                    : DEFAULT_IMG_URL
                }
                alt={actor.name}
              />
              <h3>{actor.name}</h3>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
