import { useParams,  NavLink, Link, Outlet, useLocation} from 'react-router-dom';
import { useEffect, useRef, useState, Suspense } from 'react';
import { fetchMovie } from '../../services/tmdb-api';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import defaultImg from "../../constants/images";
import Loader from '../../components/Loader/Loader';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

export default function MovieDetailsPage() {
    const location = useLocation();
    const backLink = useRef(location.state?.from || '/movies');

    const { movieId } = useParams();
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        if (!movieId) return;
        async function getMovieDetails() {
            try {
                setIsLoading(true);
                const data = await fetchMovie(movieId);      
                setMovie(data);
              } catch {
                setIsError(true);
              } finally {
                setIsLoading(false);
            }
            }
            getMovieDetails();
    }, [movieId]);

    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : defaultImg;
    const isMovieReady = !isLoading && !isError && movie;


return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
      {isLoading && <Loader />}
      {isError && <NotFoundPage />}

      {isMovieReady && (
        <article
          className="
            w-full
            bg-linear-to-b from-white/3 via-yellow-50/3 to-transparent
            border border-yellow-400/10
            shadow-lg shadow-black/20
            rounded-2xl
            p-6 md:p-8
            backdrop-blur-sm
            text-[#e9e6e1]
          "
          aria-labelledby="movie-title"
        >
          {/* header row */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-7 mb-7">
            {/* Left - poster */}
            <div className="shrink-0">
              <div className="relative rounded-xl overflow-hidden w-[160px] sm:w-[180px] md:w-[220px] mb-3">
                <img
                  src={imageUrl}
                  alt={`${movie.title} poster`}
                  className="w-full h-auto block object-cover"
                />
                <span className="absolute top-3 left-3 badge badge-sm badge-ghost text-xs text-[#f97316]">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : '—'}
                </span>
              </div>
              <p className="text-xs text-[#d9d4cc] italic flex items-center gap-2">
                <FaCalendarAlt className="w-3 h-3 text-[#f97316]" />
                {movie.release_date || 'Unknown release'}
              </p>
            </div>
            {/* Right - title, badges, overview */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h1 id="movie-title" className="text-2xl sm:text-3xl font-semibold text-white leading-tight text-left mb-3">
                    {movie.title}
                  </h1>
                  <p className="text-sm text-[#d9d4cc] text-left mb-3">{movie.tagline || ''}</p>
                  <div className="flex flex-wrap gap-2 items-center mb-5">
                    {movie.genres?.slice(0, 4).map(g => (
                      <span key={g.id} className="badge badge-xs badge-outline text-[#ffd7a8] border-yellow-400/40">
                        {g.name}
                      </span>
                    ))}
                    {movie.runtime && (
                      <span className="badge badge-xs text-sm bg-transparent border border-yellow-400/20 text-[#ffd7a8]">
                        <FaClock className="w-3 h-3 inline mr-1" /> {movie.runtime}m
                      </span>
                    )}
                  </div>
                </div>

                {/* back btn*/}
                <div className="flex items-center gap-3">
                  <Link
                    to={backLink.current}
                    className="inline-flex items-center justify-center w-20 rounded-md border border-[#cd8e37] bg-transparent text-[#e3e0dc] text-xs px-4 py-2 transition-colors duration-300 hover:bg-[#cd8e37]/15 hover:border-[#ffaa4d] active:scale-[0.97]"
                    aria-label="Go back"
                  >
                    ← Back
                  </Link>
                </div>
              </div>

              {/* overview */}
              <p className="text-base leading-relaxed text-[#e3dfd7] text-left">
                {movie.overview || 'No overview available.'}
              </p>
            </div>
          </div>

          {/* tabs nav */}
          <div>
            <div className="tabs tabs-boxed bg-transparent rounded-md p-1">
              <NavLink
                to="cast"
                end
                className={({ isActive }) =>
                  `tab tab-md px-4 ${isActive ? 'tab-active bg-yellow-50/10 rounded text-[#f97316]' : 'text-[#ffd7a8]'}`
                }
              >
                Cast
              </NavLink>

              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  `tab tab-md px-4 ${isActive ? 'tab-active bg-yellow-50/10 rounded text-[#f97316]' : 'text-[#ffd7a8]'}`
                }
              >
                Reviews
              </NavLink>

            <div className="mt-5">
              <Suspense fallback={<p className="text-sm text-[#d9d4cc]">Loading...</p>}>
                <Outlet />
              </Suspense>
            </div>
          </div>
          </div>
        </article> 
        )}
    </div>
  );
}