import { useEffect, useState } from "react";
import { getMovies } from "../../tmdbApi";
import css from './HomePage.module.css'
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const { results } = await getMovies();
        setMovies(results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);
    
    
  return (
    <div className={css.container}>
      <h1 className={css.header}><span className={css.headerPart}>Trending</span> movies today!</h1>
      {isLoading && <Loader />}
      {error && <p>Something went wrong. Please, reload the page</p>}
      {movies.length > 0 && <MovieList moviesList={movies} />}
    </div>
  );
}