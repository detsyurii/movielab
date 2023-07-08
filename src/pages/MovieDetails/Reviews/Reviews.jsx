import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getReviews } from 'utils/moviesAPI';
import { Loader } from 'components/Loader/Loader';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        setReviews(await getReviews(movieId));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  // console.log(reviews);

  if (reviews.length === 0) {
    return (
      <p className={css.noReviews}>We don't have any review for this movie...</p>
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      {reviews && (
        <ul className={css.reviews}>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Reviews;
