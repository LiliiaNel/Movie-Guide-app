import { useLocation } from "react-router-dom";
import MovieItem from '../MovieItem/MovieItem';

export default function MovieList({movies}) {
  const location = useLocation();
  

  return (
   <div className="mb-8">
        <ul
          className="
            grid gap-6 w-full max-w-full mx-auto
            grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
          "
        >
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="
                box-border min-w-0 w-full
                bg-yellow-400/5 text-gray-100 rounded-lg
                shadow-[0_0_0_1px_rgba(255,179,71,0.4)]
                transition-all duration-300 hover:bg-yellow-400/15 hover:scale-105
                cursor-pointer overflow-hidden
              "
            >
              <div className="min-w-0">
                <MovieItem movie={movie} location={location} />
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
}