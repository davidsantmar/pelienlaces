import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState, useRef } from "react";
import { GetMoviesByName } from "../redux/actions/movieDataActionCreator";
import { loadMovie } from "../redux/actions/selectedMovieActionCreator";
import { loadMovieCast } from "../redux/actions/movieCastActionCreator";
import { Link } from "react-router-dom";
import { loadDirector } from "../redux/actions/directorActionCreator";
import { getVideoKey } from "../redux/actions/trailerActionCreator";
 
const InputMovie = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [show, setShow] = useState(false);
  const movieFound = useSelector((state) => state.movies.results);
  const dispatch = useDispatch();
  const inputElement = useRef(null);

  useEffect(() => {   
    //ios prevent input scroll down when keyboard appears    
    inputElement.current.onfocus = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.getElementById('input-field').focus = true;
      };
  });
  
  const handleModalClose = (e) => {
    setShow(false);
  };
  const handleEnterPressed = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  const handleChannel = (event) => {
    setMovieTitle(event.target.value);
  }
  const handleClick = () => {
    dispatch(GetMoviesByName(movieTitle));
    setShow(true);
    //document.getElementById('input-movie-container').add('drop-in');
  }
  const handleMovieSelected = (movie) =>{
    dispatch(loadMovie(movie));
    dispatch(loadMovieCast(movie.id));
    dispatch(loadDirector(movie.id));
    dispatch(getVideoKey(movie.id));
  }

  return (
    <>
      <div className="input--movie--container drop-in" id='input-movie-container'>
        <input
          type="search"
          className="input__field"
          id='input-field'
          ref={inputElement}//iOS prevent input scroll down
          onChange={handleChannel}
          value={movieTitle}
          placeholder=" Película"
          onKeyPress={handleEnterPressed}
          autoFocus 
        />
        <button type='submit' className="search__button" id='search-button' onClick={handleClick}>
          Buscar
        </button>
      </div>
    
      <div hidden={!show}>
        <div className="modal--background" onClick={handleModalClose}>
          <div>
            <div className="modal--card">
              {movieFound?.length > 0 &&
                movieFound.map((movie) => (
                  <>
                    <div className="modal__result">
                      <Link
                          to='/selectedMovie'
                          className="modal__button"
                          onClick={() => handleMovieSelected(movie)}
                          type="button"
                        >
                          <div className="movie__title">
                            <div key={movie.id} title={movie.title} className='title'>
                              {movie.title}
                            </div>
                          </div>
                          <div
                            className="poster__movie__modal"
                            style={{
                              backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                            }}
                            title={movie.title}
                          >
                          </div>
                      </Link>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default InputMovie;
