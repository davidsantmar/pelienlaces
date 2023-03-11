import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../redux/actions/popularMoviesActionCreator";
import { loadMovie } from "../redux/actions/selectedMovieActionCreator";
import { Link } from "react-router-dom";

const PopularMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.popularMovies);
    const [page, setPage] = useState(1);
    const handlePrev = () => {
        setPage(page > 1 ? page - 1 : 1);
    }
    const handleNext = () => {
        setPage(page + 1);
    }
    const pagination = (
        <>
          <div className="button--container">
            <button
              type="button"
              className="button"
              onClick={handlePrev}
            >
              {"<<"}
            </button>
            <span className="page__number">{page}</span>
            <button
              type="button"
              className="button"
              onClick={handleNext}
            >
              {">>"}
            </button>
          </div>
        </>
    );
    useEffect(() => {
        dispatch(loadMovies(page));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [page]);

    const handleMovieSelected = (movie) => {
        dispatch(loadMovie(movie));
    }
    return (
        <>
        <div className="popular--movies--section ">
                <div className="popular__movies__title">
                    <h1>Las películas mejor valoradas por los espectadores</h1>
                </div>
                <div className="popular--movies--container ">
                    {movies.map((movie) => (
                        <div className="popular__movie__card square-in" id='popular-movie-card' key={movie.title}>
                        <Link
                            to='/selectedMovie'
                            className='movie__card__shown '
                            onClick={() => handleMovieSelected(movie)}
                            type="button"
                          >
                            <div
                              className="popular__movie__image"
                              style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                              }}
                              title={movie.title}
                            >
                              <span className='vote__average'>&#9734; {movie.vote_average}</span>
                            </div>
                            <div className="popular__movie__title">
                              {movie.title}
                            </div>
                        </Link>
                      </div>
                    ))}
                </div>
                <hr />
                {movies.length > 0 && pagination}
                <hr />
        </div>
        </>
    );
};

export default PopularMovies;