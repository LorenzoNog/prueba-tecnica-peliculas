import React, { useCallback, useEffect, useState } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./components/Form";
import debounce from "just-debounce-it";

const App = () => {
  const [sortMovies, setSortMovies] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sortMovies });

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  const handleSort = () => {
    setSortMovies(!sortMovies);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies();
  };

  return (
    <>
      <header className="sm:flex sm:flex-row sm:justify-around flex flex-col justify-center items-center p-5 border-b-[1px]">
        <h1 className="oswald text-[50px] text-start text-gray-200">
          Bachi moovies
        </h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="sm:flex sm:flex-row sm:gap-5 flex flex-col gap-5 mt-10 sm:mt-0 items-center"
          >
            <input
              onChange={handleChange}
              value={search}
              name="search"
              placeholder="Avengers,Star Wars..."
              className="p-2 text-black bg-gray-200 w-[300px] rounded border-none outline-none"
              type="text"
            />
            <input type="checkbox" onChange={handleSort} checked={sortMovies} />
            <button
              className="p-2 rounded bg-gray-200 text-gray-500 font-medium"
              type="submit"
            >
              Buscar
            </button>
            {error && (
              <p className="text-red-500 font-bold text-center text-[12px]">
                {error}
              </p>
            )}
          </form>
        </div>
      </header>
      <main className="mt-10">
        {loading ? (
          <p className="text-[40px] text-white oswald uppercase text-center">
            Loading...
          </p>
        ) : (
          <Movies movies={movies} />
        )}
      </main>
      <footer></footer>
    </>
  );
};

export default App;
