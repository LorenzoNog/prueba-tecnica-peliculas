import React, { useState } from "react";

function ListMovies({ movies }) {
  return (
    <div className="sm:grid sm:grid-cols-4 gap-[3%] ">
      {movies.map((movie) => {
        return (
          <div
            key={movie.id}
            className="flex flex-col justify-center items-center"
          >
            <img
              className="w-[250px] h-[350px] rounded-xl border-white border-[1px] mb-3"
              src={movie.image}
            />
            <h2 className="edu font-bold text-gray-100 mb-3 text-[25px] w-[80%] text-center">
              {movie.title}
            </h2>
            <div className="edu flex flex-row gap-5 font-bold text-gray-100">
              <span className="text-[15px] font-bold">{movie.type}</span> |
              <span className="text-[15px] font-bold">{movie.year}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NoMovies() {
  return (
    <p className="text-[40px] text-red-500 text-center oswald uppercase">
      No hay movies para mostrar.
    </p>
  );
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;
  return hasMovies ? <ListMovies movies={movies} /> : <NoMovies />;
}
