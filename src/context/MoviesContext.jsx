import { createContext, useContext, useState, useEffect } from "react";
import { fetchMovieList } from "../services/tmdb-api";

const MoviesContext = createContext(null);

export function MoviesProvider({ children }) {
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await fetchMovieList(page);
        const results = data?.results ?? [];

        if (!results.length) {
          if (page === 1) {
            setMoviesList([]);
            setTotalPages(0);
          }
          setIsError(true);
          return;
        }

        setMoviesList(prev => {
          const prevIds = new Set(prev.map(m => m.id));
          const unique = results.filter(m => !prevIds.has(m.id));
          return [...prev, ...unique];
        });

        setTotalPages(data.total_pages ?? 0);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [page]);

  function handleLoadMore() {
    if (isLoading) return;
    if (page >= totalPages) return;
    setPage(p => p + 1);
  }

  async function getRandomMovie() {
    if (moviesList.length > 0) {
      return moviesList[Math.floor(Math.random() * moviesList.length)];
    }

    try {
      const randomPage = Math.floor(Math.random() * 20) + 1;
      const data = await fetchMovieList(randomPage);
      const list = data?.results ?? [];
      if (!list.length) return null;
      return list[Math.floor(Math.random() * list.length)];
    } catch {
      return null;
    }
  }

  return (
    <MoviesContext.Provider
      value={{
        moviesList,
        isLoading,
        isError,
        handleLoadMore,
        getRandomMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MoviesContext);
  if (!ctx) throw new Error("useMovies must be used inside MoviesProvider");
  return ctx;
}
