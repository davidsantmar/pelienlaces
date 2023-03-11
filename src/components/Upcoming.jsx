import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMovies } from "../redux/actions/upcomingMoviesActionCreator";
import { loadMovie } from "../redux/actions/selectedMovieActionCreator";
import { Link } from "react-router-dom";

const Upcoming = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.upcomingMovies);
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
      }, [page]);
      function handleMovieSelected(movie) {
        dispatch(loadMovie(movie));
      }
    return (
        <>
        <div className="popular--movies--section">
                <div className="popular__movies__title">
                    <h1>Próximos estrenos</h1>
                </div>
                <div className="popular--movies--container">
                    {movies.map((movie) => (
                        <div className="popular__movie__card square-in">
                        <Link
                            to='/selectedMovie'
                            className='movie__card__shown'
                            onClick={() => handleMovieSelected(movie)}
                            type="button"
                          >
                            <div
                              className="popular__movie__image"
                              style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                              }}
                              title={movie.title}
                            ></div>
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

export default Upcoming;