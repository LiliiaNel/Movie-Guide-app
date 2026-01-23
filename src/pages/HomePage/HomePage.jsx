import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import { useMovies } from '../../context/MoviesContext';

export default function HomePage() {

    const { moviesList, isLoading, isError, handleLoadMore } = useMovies();

    const showLoadMore = moviesList.length > 0 && !isLoading;

    const noResults = !isLoading && !isError && (!moviesList || moviesList.length === 0);

    return <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
        {!isError && <h1 className="text-orange-500 text-2xl leading-tight mb-10 drop-shadow-sm">Trending today</h1>}
        {isLoading && <Loader />}
        {moviesList.length > 0 && <MovieList movies={moviesList} />}
        {isLoading ? ( <Loader />) : (showLoadMore && <LoadMoreBtn onPaginate={handleLoadMore} />)}
        {noResults && <p className="text-center text-[#e3e0dc] mx-auto">No movies found.</p>}
        {isError && <NotFoundPage />}
    </div >
}