import popularMoviesActionTypes from "./popularMoviesActionTypes";
import axios from 'axios';

export function loadMovies(page = 1){
  //español
  const API_POPULAR_MOVIES = `https://api.themoviedb.org/3/movie/top_rated?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES&page=${page}`;

  return async (dispatch) => {
      try {
        const { data } = await axios(`${API_POPULAR_MOVIES}`);
  
        dispatch({
          type: popularMoviesActionTypes.LOAD_MOVIES,
          movies: data.results,
        });
      } catch (error) {
        console.log(error.message);
      }
  };
}
