import movieDataActionTypes from "./movieDataActionTypes";
import axios from 'axios';

export function GetMoviesByName(movieName){
  //español
  const API_BASE = `https://api.themoviedb.org/3/search/movie?api_key=4edc87782c375367d2a7b9637f00bfd3&query=${movieName}&language=es-ES`;

  return async (dispatch) => {
      try {
        const { data } = await axios(`${API_BASE}`);
  
        dispatch({
          type: movieDataActionTypes.LOAD_MOVIES_BY_NAME,
          movies: data,
        });
      } catch (error) {
        console.log(error.message);
      }
  };
}
