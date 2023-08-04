

const ApiKey = "d7deed03";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${ApiKey}&s=${search}`
    )
    const results = await response.json()

    const movies = results.Search

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      type: movie.Type,
      year: movie.Year,
      image: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error ");
  }
};
