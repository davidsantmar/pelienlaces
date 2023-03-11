import nowPlayingMoviesActionTypes from "../actions/nowPlayingMoviesActionTypes";

function nowPlayingMoviesReducer(movies = [], action) {
  switch (action.type) {
    case nowPlayingMoviesActionTypes.LOAD_MOVIES:
      return action.movies;

    default:
      return movies;
  }
}

export default nowPlayingMoviesReducer;