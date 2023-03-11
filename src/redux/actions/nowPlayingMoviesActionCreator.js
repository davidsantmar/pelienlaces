import nowPlayingMoviesActionTypes from "./nowPlayingMoviesActionTypes";
import axios from 'axios';

export function loadMovies(page = 1){
  //español
  const API_NOW_PLAYING_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=4edc87782c375367d2a7b9637f00bfd3&language=es-ES&page=${page}`;

  return async (dispatch) => {
      try {
        const { data } = await axios(`${API_NOW_PLAYING_MOVIES}`);
  
        dispatch({
          type: nowPlayingMoviesActionTypes.LOAD_MOVIES,
          movies: data.results,
        });
      } catch (error) {
        console.log(error.message);
      }
  };
}


