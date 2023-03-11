import personActionTypes from "./personActionTypes";
import axios from 'axios';

export function loadPerson(id){
  const API_PERSON = `https://api.themoviedb.org/3/person/${id}?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES`;

  return async (dispatch) => {
      try {
        const { data } = await axios(`${API_PERSON}`);
        dispatch({
          type: personActionTypes.LOAD_PERSON,
          person: data,
        });
      } catch (error) {
        console.log(error.message);
      }
  };
}
