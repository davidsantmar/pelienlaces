import movieDataActionTypes from "../actions/movieDataActionTypes";

function movieDataReducer(movies = [], action) {
  switch (action.type) {
    case movieDataActionTypes.LOAD_MOVIES_BY_NAME:
      return action.movies;

    default:
      return movies;
  }
}

export default movieDataReducer;