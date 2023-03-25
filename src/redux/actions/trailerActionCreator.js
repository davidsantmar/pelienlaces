import trailerActionTypes from "./trailerActionTypes";
import axios from 'axios';

export function getVideoKey(id){
  //español
  const API_VIDEO_KEY = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES`;

  return async (dispatch) => {
      try {
        const { data } = await axios(`${API_VIDEO_KEY}`);
        dispatch({
          type: trailerActionTypes.GET_VIDEO_KEY,
          data: data?.results[0],
        });
      } catch (error) {
        console.log(error.message);
        dispatch({
          type: trailerActionTypes.RESET_TRAILER,
          data: null,
        })
      }
  };
}