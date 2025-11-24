import { useLocation } from "react-router-dom";
// import css from './MovieList.module.css';
import MovieItem from '../MovieItem/MovieItem';

export default function MovieList({movies}) {
  const location = useLocation();
  

  return (
    <div className="flex justify-center mb-8">
      <ul className="grid gap-6 w-full max-w-7xl justify-center grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="
              w-44
              bg-yellow-400/5
              text-gray-100
              rounded-lg
              shadow-[0_0_0_1px_rgba(255,179,71,0.4)]
              transition-all duration-300
              hover:bg-yellow-400/15
              hover:scale-105
              cursor-pointer
            "
          >
            <MovieItem movie={movie} location={location} />
          </li>
        ))}
      </ul>
    </div>
  );
}