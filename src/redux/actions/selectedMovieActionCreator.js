import selectedMovieActionTypes from "./selectedMovieActionTypes";

export function loadMovie(movie) {
  return {
    type: selectedMovieActionTypes.LOAD_MOVIE,
    movie,
  };
}
