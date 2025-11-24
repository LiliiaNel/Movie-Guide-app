import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/tmdb-api";
import defaultImg from "../../constants/images";
import CastItem from "../CastItem/CastItem";
import Loader from '../Loader/Loader';


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
                // setCast(data);
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
        setVisibleCount((v) => Math.min(cast.length, v + LOAD_MORE_STEP));
    }

    const handleShowAll = () => {
        setVisibleCount(cast.length);
    }

    const visibleItems = cast.slice(0, visibleCount);

  return (
    <section className="pt-5 mt-8" aria-labelledby="cast-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <h2 id="cast-heading" className="text-2xl text-[#ffb347] mb-4 text-center">
          The Cast
        </h2>

        {isLoading && <Loader />}
        {isError && <NotFoundPage />}

        {hasCast && (
          <>
            <ul className="grid gap-5 p-0 list-none w-full
               grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
               max-w-full mx-auto">
            {visibleItems.map(({ id, name, character, profile_path }) => (
                <li
                key={`${id}-${character}`}
                className="
                    bg-yellow-400/8 border border-yellow-400/20 rounded-lg
                    w-full p-3 text-center
                    shadow-[0_0_10px_rgba(255,179,71,0.12)]
                    transition-transform duration-200 hover:scale-105
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
              <div className="mt-6 flex items-center justify-center gap-3">
                {visibleCount < cast.length ? (
                  <>
                    <button
                      onClick={handleShowMore}
                      className="
                        inline-flex items-center justify-center
                        px-4 py-2
                        text-xs font-medium
                        rounded-md
                        border border-[#cd8e37]
                        text-[#e3e0dc]
                        bg-transparent
                        hover:bg-[#cd8e37]/20
                        transition-colors duration-300"
                    >
                      Show more
                    </button>
                    <button
                      onClick={handleShowAll}
                    
                    className="
                        inline-flex items-center justify-center
                        px-4 py-2
                        text-xs font-medium
                        rounded-md
                        border border-[#cd8e37]
                        text-[#e3e0dc]
                        bg-transparent
                        hover:bg-[#cd8e37]/20
                        transition-colors duration-300">
                      Show all
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setVisibleCount(INITIAL_COUNT)}
                    className="
                        inline-flex items-center justify-center
                        px-4 py-2
                        text-xs font-medium
                        rounded-md
                        border border-[#cd8e37]
                        text-[#e3e0dc]
                        bg-transparent
                        hover:bg-[#cd8e37]/20
                        transition-colors duration-300"
                  >
                    Collapse
                  </button>
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
      </div>
    </section>
  );
}
