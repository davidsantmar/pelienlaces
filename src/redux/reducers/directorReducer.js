import directorActionTypes from "../actions/directorActionTypes";

function directorReducer(director = {}, action) {
  switch (action.type) {
    case directorActionTypes.LOAD_DIRECTOR:
      return action.director;
    case directorActionTypes.RESET_DIRECTOR:
      return action.director;
    default:
      return director;
  }
}

export default directorReducer;
