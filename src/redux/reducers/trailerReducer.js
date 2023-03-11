import trailerActionTypes from "../actions/trailerActionTypes";

function trailerReducer(data = [], action) {
  switch (action.type) {
    case trailerActionTypes.GET_VIDEO_KEY:
      console.log(action.data);
      return  action.data;
    default:
      return data;
  }
}

export default trailerReducer;
                       