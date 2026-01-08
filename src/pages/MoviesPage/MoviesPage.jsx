import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Loader from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchSearchedMovies } from '../../services/tmdb-api';


export default function MoviesPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [debouncedQuery] = useDebounce(query, 500);

  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      setIsError(false); 
      return;
    }

    async function getMoviesOnSearch() {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await fetchSearchedMovies(debouncedQuery);
        setMovies(results);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
    }
    }

    getMoviesOnSearch();
  }, [debouncedQuery]);

  const noResults = !isLoading && !isError && movies.length === 0 && query;

  return <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">       
    <SearchForm />
    {isLoading && <Loader />}
    {movies.length > 0 && <MovieList movies={movies} />}
    {isError && <NotFoundPage />}
    {noResults && <p className="mx-auto text-center text-[#e3e0dc]">No results found for "{query}"</p>}
    </div>
 }
