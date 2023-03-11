import movieCastActionTypes from "./movieCastActionTypes";
import axios from 'axios';

export function loadMovieCast(id){
  //español
  const API_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES`;
  return async (dispatch) => {
      try {
        const { data } = await axios(`${API_CAST}`);
  
        dispatch({
          type: movieCastActionTypes.LOAD_MOVIE_CAST,
          movieCast: data,
        });
      } catch (error) {
        console.log(error.message);
      }
  };
}
