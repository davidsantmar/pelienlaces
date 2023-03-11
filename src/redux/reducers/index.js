import { combineReducers } from 'redux';
import movieDataReducer from './movieDataReducer';
import authReducer from "./authReducer";
import messagesReducer from './messagesReducer';
import selectedMovieReducer from './selectedMovieReducer';
import trailerReducer from './trailerReducer';
import personReducer from './personReducer';
import popularMoviesReducer from './popularMoviesReducer';
import upcomingMoviesReducer from './upcomingMoviesReducer';
import nowPlayingMoviesReducer from './nowPlayingMoviesReducer';
import movieCastReducer from './movieCastReducer';

const rootReducer = combineReducers ({
    movies: movieDataReducer,
    auth: authReducer,
    messages: messagesReducer,
    selectedMovie: selectedMovieReducer,
    trailer: trailerReducer,
    person: personReducer,
    popularMovies: popularMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    nowPlayingMovies: nowPlayingMoviesReducer,
    movieCast: movieCastReducer,
})

export default rootReducer;