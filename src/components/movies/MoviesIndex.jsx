import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch";
import "../shows/ShowsIndex.css";
import MovieListing from "./MovieListing";

function filterMovies(search, movies) {
  return movies.filter((movie) => {
    return movie.title.toLowerCase().match(search.toLowerCase());
  });
}

export default function MoviesIndex() {
  const [loadingError, setLoadingError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const handleTextChange = (e) => {
    const inputTitle = e.target.value;
    const result = inputTitle.length
      ? filterMovies(inputTitle, allMovies)
      : allMovies;
    setSearchTitle(inputTitle);
    setMovies(result);
  };

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data);
        setAllMovies(data);
        setLoadingError(false);
      })
      .catch((error) => {
        setLoadingError(true);
      });
  }, []);

  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/movies/new">Add a new movie</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Movies:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="shows-index">
            {movies.map((movie) => {
              return <MovieListing movie={movie} key={movie.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}