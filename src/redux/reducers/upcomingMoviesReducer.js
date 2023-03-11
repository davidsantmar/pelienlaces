import upcomingMoviesActionTypes from "../actions/upcomingMoviesActionTypes";

function upcomingMoviesReducer(movies = [], action) {
  switch (action.type) {
    case upcomingMoviesActionTypes.LOAD_MOVIES:
      return action.movies;

    default:
      return movies;
  }
}

export default upcomingMoviesReducer;