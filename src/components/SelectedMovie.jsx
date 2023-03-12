import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovie } from "../redux/actions/selectedMovieActionCreator";
import { loadPerson } from "../redux/actions/personActionCreator";
import { Link } from "react-router-dom";
import RatingBar from './RatingBar';
import { GetVideoKey, GetDirector } from "../services/GetData";
import { loadMovieCast } from "../redux/actions/movieCastActionCreator";

const SelectedMovie = () => {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.selectedMovie);
    const movieCast = useSelector((state) => state.movieCast);
    const [releasedDay, setReleasedDay] = useState('');
    const [releasedMonth, setReleasedMonth] = useState('');
    const [releasedYear, setReleasedYear] = useState('');
    const [videoKey, setVideoKey] = useState('');
    const [director, setDirector] = useState('');
    const [viewMore, setViewMore] = useState(5);
    const [moreless, setMoreless] = useState('todos >>');
    const [average, setAverage] = useState(0);

    useEffect(() => {
        dispatch(loadMovie(movie));
        dispatch(loadMovieCast(movie.id));
        setReleasedDay(movie.release_date.substr(movie.release_date.length-2,2));
        setReleasedMonth(movie.release_date.substr(movie.release_date.length-5,2));
        setReleasedYear(movie.release_date.substr(movie.release_date.length-movie.release_date.length,4));
        rate();
        GetVideoKey(movie.id).then((tempJson) => setVideoKey(tempJson));
        GetDirector(movie.id).then((tempJson) => setDirector(tempJson[0]));
        setAverage(Number(movie.vote_average).toFixed(1));
        window.scrollTo(0,0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
      const rate = () => {
        if (movie.vote_average > 7.5 && movie.vote_average < 9){
            document.getElementById('emoji-rating').innerHTML = '&#128512';
        }
        else if ((movie.vote_average > 9)){
            document.getElementById('emoji-rating').innerHTML = '&#128513';
        }
        else if (movie.vote_average > 6 && movie.vote_average <= 7.5){
            document.getElementById('emoji-rating').innerHTML = '&#128527';
        }
        else if (movie.vote_average > 5 && movie.vote_average <= 6){
            document.getElementById('emoji-rating').innerHTML = '&#128528';
        }
        else if (movie.vote_average > 4 && movie.vote_average <= 5){
            document.getElementById('emoji-rating').innerHTML = '&#128530';
        }
        else if (movie.vote_average > 2 && movie.vote_average <= 4){
            document.getElementById('emoji-rating').innerHTML = '&#128534';
        }
        else if (movie.vote_average <= 2){
            document.getElementById('emoji-rating').innerHTML = '&#129393';
        }
    }
    const handleSelectedPerson =(personid) => {
        dispatch(loadPerson(personid));
    }
    const handleViewMore = () =>{
        setViewMore(movieCast.length);
        setMoreless('menos >>');
        if (moreless === 'menos >>'){
            setViewMore(5);
            setMoreless('todos >>');
        }else if (moreless === 'todos >>'){
            setViewMore(movieCast.length);
        }
    }
    
    return (
        <>
            <div className='movie--selected--section wipe-in'>
                <div className='movie--data--container'>
                    <h1 className='movie__title'>{movie.title}</h1>
                    <img className='movie__poster'  id='movie-poster' src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} title={movie.title} alt='movie poster'></img>
                    <span className='synopsis'>{movie.overview}</span>
                    <hr />
                    <div className='cast'>
                        <h3>Reparto</h3>
                        <div className='actors'>
                            {movieCast.length > 10 ? (
                            <>
                            {movieCast.slice(0,viewMore).map((cast) => (
                                <Link to='/personSelected' onClick={() => handleSelectedPerson(cast.id)} className='actor__card' key={cast.id}>
                                    <img className='actor__picture' src={`https://image.tmdb.org/t/p/w400${cast.profile_path}`} title={cast.name} alt='movie-actor'></img>
                                    <div className='actor__name__container'>
                                        <span className='actor__name'>{cast.name}</span>
                                    </div>                            
                                </Link>
                            ))}
                            <div className="viewmore__container">
                                {<button onClick={handleViewMore} className='viewmore'>Ver {moreless}</button>}
                            </div>
                            </>
                            ) : (
                                movieCast.slice(0,viewMore).map((cast) => (
                                    <Link to='/personSelected' onClick={() => handleSelectedPerson(cast.id)} className='actor__card' key={cast.id}>
                                        <img className='actor__picture' src={`https://image.tmdb.org/t/p/w400${cast.profile_path}`} title={cast.name} alt='movie-actor'></img>
                                        <div className='actor__name__container'>
                                            <span className='actor__name'>{cast.name}</span>
                                        </div>                            
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                    <div className='director'>
                        <h3>Director</h3>
                        <Link to='/personSelected' onClick={() => handleSelectedPerson(director.id)} className='director__card'>
                            <img className='director__picture' src={`https://image.tmdb.org/t/p/w400${director.profile_path}`} title={director.name} alt='movie-director'></img>
                            <span className='director__name'>{director.name}</span>
                        </Link>
                    </div>
                    <hr />
                    <span className='movie__date'><strong>Estreno: </strong>{releasedDay}-{releasedMonth}-{releasedYear}</span>
                    <span className='votes'><strong>Votaciones: </strong> {movie.vote_count}</span>
                    <span className='rating'><strong>Rating: </strong>&#11088; {average}<span className='emoji__rating' id='emoji-rating'></span></span>
                    <span className='user__vote'><strong>Tu valoración: </strong></span>
                    <RatingBar />
                    <div className='trailer__container'>
                        <iframe className='trailer' id='iframe1' src={`https://www.youtube.com/embed/${videoKey}`} title={movie.title}>
                        </iframe> 
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default SelectedMovie;