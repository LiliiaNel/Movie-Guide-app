import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import { useEffect, useState } from "react";
import { fetchMovieList } from "../../services/tmdb-api";
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

export default function HomePage() {

    const [moviesList, setMoviesList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const getMovieList = async () => {
            try {
                setIsError(false);
                setIsLoading(true);

                const data = await fetchMovieList(page);

                if (!data?.results?.length) {
                    if (page === 1) {
                        setMoviesList([]);
                        setTotalPages(0);
                    }
                    setIsError(true);
                    return;
                    }

               setMoviesList(prevMovies => {
                   const prevIds = new Set(prevMovies.map(movie => movie.id));
                   const newUnique = data.results.filter(movie => !prevIds.has(movie.id));
                   return [...prevMovies, ...newUnique];
               });
               setTotalPages(data.total_pages);

            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }
        getMovieList();
    }, [page]);


      const handleLoadMore = () => {
        if (isLoading) return;
        if (page >= totalPages) return; 
        setPage(prev => prev + 1);
    };


    const showLoadMore = moviesList.length > 0 && page < totalPages && !isLoading;

    const noResults = !isLoading && !isError && (!moviesList || moviesList.length === 0);

    return <div className={css.container} >
        {!isError && <h1 className={css.title}>Trending today</h1>}
        {isLoading && <Loader />}
        {moviesList.length > 0 && <MovieList movies={moviesList} />}
        {isLoading ? ( <Loader />) : (showLoadMore && <LoadMoreBtn onPaginate={handleLoadMore} />)}
        {noResults && <p className={css.noResults}>No movies found.</p>}
        {isError && <NotFoundPage />}
    </div >
}