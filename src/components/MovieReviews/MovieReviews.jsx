import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import css from './MovieReviews.module.css';
import { fetchMovieReviews } from "../../services/tmdb-api";
import ReviewsItem from "../ReviewsItem/ReviewsItem";
import Loader from '../Loader/Loader';


export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  

    useEffect(() => {
        async function getMovieReviews() {
          try {
            setIsLoading(true);
            const results = await fetchMovieReviews(movieId);      
            setReviews(results);
          } catch {
              setIsError(true);
          } finally {
            setIsLoading(false);
        }
        }
        getMovieReviews();
    }, [movieId]); 
  
  const noReviews = !isLoading && reviews.length === 0;
  const hasReviews = !isLoading && reviews.length > 0;
    
    return <div className={css.reviewsWrapper}>
      <h2 className={css.title}>Reviews</h2>
      {isLoading && <Loader />}
      {hasReviews &&(
        <ul className={css.reviewsList}>
          {reviews.map(({ id, author_details, content, created_at }) => (
            <li key={id} className={css.reviewsItem}>
              <ReviewsItem
                author_details={author_details}
                content={content}
                created_at={created_at}
              />
            </li>
          ))}
        </ul>
      ) 
    }
      {noReviews && <p className={css.noReviews}>We don't have any reviews for this movie yet.</p>}
      {isError && <NotFoundPage />}
  </div>  
}