import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovie } from "../redux/actions/selectedMovieActionCreator";
import { loadPerson } from "../redux/actions/personActionCreator";
import { Link } from "react-router-dom";
import RatingBar from './RatingBar';
import { loadMovieCast } from "../redux/actions/movieCastActionCreator";
import { loadDirector } from "../redux/actions/directorActionCreator";
import { getVideoKey } from "../redux/actions/trailerActionCreator";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/index';
import { addComment, addRatingToUser } from "../firebase/actions";
import { addCommentToUser } from "../firebase/actions";
import { getAuth } from 'firebase/auth';


const SelectedMovie = () => {
    const dispatch = useDispatch();
    const auth = getAuth();
    const user = auth.currentUser;
    const { isAuthenticated } = useSelector((state) => {
        return {
          isAuthenticated: state.auth.isAuthenticated
        };
    });
    //const usersCommentsCollection = collection(db, `${user}_comment`);
    const movie = useSelector((state) => state.selectedMovie);
    const movieCommentsCollection = collection(db, `comments_${movie.id}`);
    const movieCast = useSelector((state) => state.movieCast);
    const director = useSelector((state) => state.director);
    const videoKey = useSelector((state) => state.trailer);
    const [viewMore, setViewMore] = useState(5);
    const [moreless, setMoreless] = useState('todos >>');
    const [newNick, setNewNick] = useState('');
    const [newComment, setNewComment] = useState('');
    const [users, setUsers] = useState([]);
    const [movieComments, setMovieComments] = useState([]);

    useEffect(() => {
        dispatch(loadMovie(movie));
        dispatch(loadMovieCast(movie.id));
        dispatch(loadDirector(movie.id));
        dispatch(getVideoKey(movie.id));
        rate();
        const getComments = async () => {
            const data = await getDocs(movieCommentsCollection);
            setMovieComments(data.docs.map((doc) => ({...doc.data(), id:doc.id})));   
        }
        getComments();
       
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
    const postComment = async () => {
        if (isAuthenticated === true){
            await addComment(movie.id, {
                comment: newComment,
                nick: newNick,  
                createdAt: new Date(),
            });
        saveCommentToUser();
        onClear();
        }
        else if (isAuthenticated === false || isAuthenticated === undefined){
            alert('Es necesario iniciar sesión para poder comentar.');
        }
    }
    const saveCommentToUser = async () => {
            await addCommentToUser(user, {
                user: user.displayName,
                comment: newComment,
                createdAt: new Date(),
                movieTitle: movie.title,
                nick: newNick,  
            })
    }
    const onClear = () => {
        setNewNick('');
        setNewComment('');
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
                        <Link to='/personSelected' onClick={() => handleSelectedPerson(director?.id)} className='director__card'>
                            <img className='director__picture' src={`https://image.tmdb.org/t/p/w400${director?.profile_path}`} title={director?.name} alt='movie-director'></img>
                            <span className='director__name'>{director?.name}</span>
                        </Link>
                    </div>
                    <hr />
                    <span className='movie__date'>
                        <strong>
                            Estreno: 
                        </strong>
                        {movie.release_date.substr(movie.release_date.length-2,2)}
                        -{movie.release_date.substr(movie.release_date.length-5,2)}
                        -{movie.release_date.substr(movie.release_date.length-movie.release_date.length,4)}
                    </span>
                    <span className='votes'><strong>Votaciones: </strong> {movie.vote_count}</span>
                    <span className='rating'><strong>Rating: </strong>&#11088; {movie.vote_average.toFixed(1)}<span className='emoji__rating' id='emoji-rating'></span></span>
                    <span className='user__vote'><strong>Tu valoración: </strong></span>
                    <RatingBar />
                    <div className='trailer__container'>
                        <iframe className='trailer' id='iframe1' src={`https://www.youtube.com/embed/${videoKey?.key}`} title={movie.title}>
                        </iframe> 
                    </div>
                    <div className='comment--container'>
                        <div className='comment--title__container'>
                            <span className='comment__title'>
                                Deja tu comentario:
                            </span>
                        </div>                        
                    </div>
                    <br />
                    <label for='nick'>Nick: </label>
                    <input type='text' className='nick__area' value={newNick} onInput={(event) => {setNewNick(event.target.value)}}/>
                    <br />
                    <label for='comment'>Comentario: </label>
                    <textarea  className='comment__area'value={newComment} onInput={(event) => {setNewComment(event.target.value)}}></textarea>
                    <br></br>
                    <div className='comments__instructions'>
                        <span>No spoilers - No spam - No insultos</span>
                    </div>
                    <button onClick={postComment} type='submit' value='Enviar' className='comment__submit'>Enviar</button>
                    <div className='postings' id='posting'>
                        {movieComments
                        .sort(function (a, b) {
                            return a.createdAt - b.createdAt;
                        })
                        .map((movieComment) => {
                            return(
                                <Fragment key={movieComment.id}>
                                    <div className='comment__card'>
                                        <span className='comment__date'>El {new Date(movieComment.createdAt.seconds * 1000).toLocaleDateString("es-ES")} </span>
                                        <span className='nick__posted'>{movieComment.nick} dice: </span>
                                        <span> {movieComment.comment}</span>
                                    </div>
                                </Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectedMovie;