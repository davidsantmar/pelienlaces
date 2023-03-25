import trailerActionTypes from "../actions/trailerActionTypes";

function trailerReducer(data = [], action) {
  switch (action.type) {
    case trailerActionTypes.GET_VIDEO_KEY:
      return  action.data;
      case trailerActionTypes.RESET_TRAILER:
        return action.data;
    default:
      return data;
  }
}

export default trailerReducer;
                       