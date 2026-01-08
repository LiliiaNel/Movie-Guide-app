import { Link } from 'react-router-dom';
import defaultImg from '../../constants/images';

export default function MovieItem({ movie, location }) {
    
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      : defaultImg;
      
  return (
    <Link
      to={`/movies/${movie.id}`}
      state={{ from: location }}
      className="block w-full h-full p-2 cursor-pointer text-inherit no-underline"
    >
      <div className="relative overflow-hidden rounded-xl p-2">
        <img
          src={imageUrl}
          alt={`${movie.title} poster`}
          loading="lazy"
          draggable={false}
          className="
            w-full max-w-full object-cover block rounded-xl
            min-h-[180px] sm:min-h-[200px] md:min-h-[220px]
           aspect-2/3"
        />
        <span className="absolute top-4 right-4 badge badge-sm badge-outline text-xs font-medium bg-[#2e3c51]/50 text-[#ffb347]">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : '—'}
                </span>
      </div>

      <div className="w-full py-5 flex justify-center items-center text-center font-medium text-[16px] transition-colors duration-300">
        <span className="text-[#e3e0dc] truncate hover:text-[#ffb347] block w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {movie.title}
        </span>
      </div>
    </Link>
  );
}