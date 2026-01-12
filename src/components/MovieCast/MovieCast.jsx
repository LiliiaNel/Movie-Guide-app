import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/tmdb-api";
import defaultImg from "../../constants/images";
import CastItem from "../CastItem/CastItem";
import Loader from '../Loader/Loader';
import Button from "../Button/Button";


export default function MovieCast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const INITIAL_COUNT = 12; // show first 12
    const LOAD_MORE_STEP = 12;
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    useEffect(() => {
        async function getMovieCast() {
            try {
                setIsLoading(true);
                const data = await fetchMovieCast(movieId);
                setCast(Array.isArray(data) ? data : []);
                setVisibleCount(INITIAL_COUNT); 
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
            getMovieCast();
        
    }, [movieId]);
    

    const noCast = !isLoading && cast.length === 0;
    const hasCast = !isLoading && cast.length > 0;

    const handleShowMore = () => {
        setVisibleCount((prevCount) => Math.min(cast.length, prevCount + LOAD_MORE_STEP));
    }

    const handleShowAll = () => {
        setVisibleCount(cast.length);
    }

    const handleShowLess = () => {
      setVisibleCount(INITIAL_COUNT);
    }

    const visibleItems = cast.slice(0, visibleCount);

  return (
    <section className="pt-10" aria-labelledby="cast-heading">
        <h2 id="cast-heading" className="text-2xl text-[#ffb347] mb-6 text-center">
          The Cast
        </h2>

        {isLoading && <Loader />}
        {isError && <NotFoundPage />}

        {hasCast && (
          <>
            <ul className="grid gap-5 p-0 list-none w-full
               grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
               max-w-full mx-auto mb-6">
            {visibleItems.map(({ id, name, character, profile_path }) => (
                <li
                key={`${id}-${character}`}
                className="
                    bg-yellow-400/8 border border-yellow-400/20 rounded-lg
                    p-3 text-center
                    max-w-40 min-h-[310px] md:max-w-none mx-auto
                    transition-transform duration-200
                    hover:bg-yellow-400/10 hover:border-yellow-400/30
                "
                >
                <CastItem
                    name={name}
                    character={character}
                    profile_path={profile_path}
                    defaultImg={defaultImg}
                />
                </li>
            ))}
            </ul>
            
            {cast.length > INITIAL_COUNT && (
              <div className="flex items-center justify-center gap-3">
                {visibleCount < cast.length ? (
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

        {noCast && (
          <p className="text-sm leading-6 text-[#f4f4f9] text-center pr-1 mb-3">
            No cast information available.
          </p>
        )}
    </section>
  );
}
