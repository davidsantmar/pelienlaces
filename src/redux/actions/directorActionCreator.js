import directorActionTypes from "./directorActionTypes";
import axios from 'axios';

export function loadDirector(id){
  const API_DIRECTOR = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES`;

  return async (dispatch) => {
      try {
        const { data } = await axios(`${API_DIRECTOR}`);
        dispatch({
          type: directorActionTypes.LOAD_DIRECTOR,
          director: data.crew.filter(({job})=> job ==='Director')[0],
        });
      } catch (error) {
        console.log(error.message);
        dispatch({
          type: directorActionTypes.RESET_DIRECTOR,
          director: null,
        })
      }
  };
}
