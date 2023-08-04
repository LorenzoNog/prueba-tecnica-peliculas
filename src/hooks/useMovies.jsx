import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/movies.js";

export function useMovies({ search, sortMovies }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      throw new Error("Error capo");
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    return sortMovies
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sortMovies, movies]);

  return { getMovies, movies: sortedMovies, loading };
}
