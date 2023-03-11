import upcomingMoviesActionTypes from "./upcomingMoviesActionTypes";
import axios from 'axios';

export function loadMovies(page = 1){
  //español
  const API_UPCOMING_MOVIES = `https://api.themoviedb.org/3/movie/upcoming?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES&page=${page}`;

  return async (dispatch) => {
      try {
        const { data } = await axios(`${API_UPCOMING_MOVIES}`);
  
        dispatch({
          type: upcomingMoviesActionTypes.LOAD_MOVIES,
          movies: data.results,
        });
      } catch (error) {
        console.log(error.message);
      }
  };
}


