import movieCastActionTypes from "../actions/movieCastActionTypes";

function movieCastReducer(movieCast = [], action) {
  switch (action.type) {
    case movieCastActionTypes.LOAD_MOVIE_CAST:
      return action.movieCast.cast;

    default:
      return movieCast;
  }
}

export default movieCastReducer;