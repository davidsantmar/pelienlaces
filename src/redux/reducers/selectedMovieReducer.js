import selectedMovieActionTypes from "../actions/selectedMovieActionTypes";

function selectedMovieReducer(movie = {}, action) {
  switch (action.type) {
    case selectedMovieActionTypes.LOAD_MOVIE:
      return action.movie;
    default:
      return movie;
  }
}

export default selectedMovieReducer;
