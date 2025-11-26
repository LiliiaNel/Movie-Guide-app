import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { fetchMovieReviews } from "../../services/tmdb-api";
import Loader from '../Loader/Loader';
import ReviewsItem from "../ReviewsItem/ReviewsItem";
import Button from "../Button/Button";


export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // expand long reviews
    const [expanded, setExpanded] = useState(new Set());

    // pagination
    const INITIAL_COUNT = 3;
    const LOAD_MORE_STEP = 3;
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const visibleReviews = reviews.slice(0, visibleCount);

    useEffect(() => {
        async function getMovieReviews() {
          try {
            setIsLoading(true);
            const results = await fetchMovieReviews(movieId);      
            const orderedReviews = Array.isArray(results) ? [...results].reverse() : [];
            setReviews(orderedReviews);
            setExpanded(new Set());
            setVisibleCount(INITIAL_COUNT);
          } catch {
              setIsError(true);
          } finally {
            setIsLoading(false);
        }
        }
        getMovieReviews();
    }, [movieId]); 

   const toggleExpand = (reviewId) => {
    setExpanded((expandedReviews) => {
      const  updated = new Set(expandedReviews);
      if (updated.has(reviewId)) updated.delete(reviewId);
      else updated.add(reviewId);
      return updated;
    });
  }

    const handleShowMore = () => {
        setVisibleCount((prevCount) => Math.min(reviews.length, prevCount + LOAD_MORE_STEP));
    }

    const handleShowAll = () => {
        setVisibleCount(reviews.length);
    }

    const handleShowLess = () => {
      setVisibleCount(INITIAL_COUNT);
    }


  const noReviews = !isLoading && reviews.length === 0;
  const hasReviews = !isLoading && reviews.length > 0;
    
 return (
    <section className="pt-8" aria-labelledby="reviews-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <h2 id="reviews-heading" className="text-2xl text-[#ffb347] mb-6 text-center">Reviews</h2>

      {isLoading && <Loader />}
      {isError && <NotFoundPage />}

      {hasReviews && (
        <>
            <ul className="space-y-4 w-full max-w-3xl mx-auto p-0 list-none">
              {visibleReviews.map((review) => {
                const id = review.id || review.created_at;
                  return ( <li
                        key={id}
                        className="
                          bg-yellow-400/8 border border-yellow-400/20 rounded-lg
                          w-full p-3
                          shadow-[0_0_10px_rgba(255,179,71,0.12)]
                          transition-transform duration-200 hover:scale-105
                        "
                      >
                        <ReviewsItem
                          review={review}
                          expanded={expanded}
                          toggleExpand={toggleExpand}
                        />
                      </li>       
                );
              })}
            </ul>

          {/* pagination */}
          {reviews.length > INITIAL_COUNT && (
            <div className="mt-6 flex items-center justify-center gap-3">
              {visibleCount < reviews.length ? (
                <>
                  <Button onClick={handleShowMore}>Show more</Button>
                  <Button onClick={handleShowAll}>Show all</Button>
                </>
                ) : (
                  <Button onClick={handleShowLess}>Show less</Button>
                    )}
              </div>
            )}
          </>
       )}
            {noReviews && (
              <p className="text-sm leading-6 text-[#f4f4f9] text-center pr-1 mb-3">
                We don't have any reviews for this movie yet.
              </p>
            )}
        </div>
     </section>
    );
}