import React, { useEffect, useState, useRef } from "react";
import { useMovies } from "../hooks/useMovies";

export function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

const Form = () => {
  const { search, updateSearch, error } = useSearch();
  const { getMovies } = useMovies({ search });

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="sm:flex sm:flex-row sm:gap-5 flex flex-col gap-5 mt-10 sm:mt-0 items-center"
      >
        <input
          onChange={handleChange}
          value={search}
          name="search"
          placeholder="Avengers,Star Wars..."
          className="p-2 text-black bg-gray-200 w-[400px] rounded border-none outline-none"
          type="text"
        />
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
    </>
  );
};

export default Form;
