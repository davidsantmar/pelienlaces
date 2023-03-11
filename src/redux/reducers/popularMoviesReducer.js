import popularMoviesActionTypes from "../actions/popularMoviesActionTypes";

function popularMoviesReducer(movies = [], action) {
  switch (action.type) {
    case popularMoviesActionTypes.LOAD_MOVIES:
      return action.movies;

    default:
      return movies;
  }
}

export default popularMoviesReducer;