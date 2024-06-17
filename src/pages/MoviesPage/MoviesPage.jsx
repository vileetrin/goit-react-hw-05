import { useSearchParams, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesByQuery } from '../../tmdbApi';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import css from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movieName') ?? ''; 
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieName) return;
    setSearchedMovies([]);
    setLoading(true);

    const fetchMovies = async (movieName) => {
      try {
        const searchedMovies = await getMoviesByQuery(movieName);
        if (!searchedMovies.results.length) {
          setIsError(true);
          toast.error('There are no movies. Please try again')
          return;
        }
        setSearchedMovies(searchedMovies.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
        setIsError(false);
      }
    };
    fetchMovies(movieName);
  }, [movieName]);

  const handleSubmit = e => {
    e.preventDefault();
    const searchForm = e.currentTarget;
    const newMovieName = searchForm.elements.movieName.value.trim();
    if (!newMovieName) {
      toast.error('Please enter a keyword!');
      return;
    }
    setSearchParams({ movieName: newMovieName });
    searchForm.reset();
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />
      {searchedMovies.length > 0 && <MovieList moviesList={searchedMovies} location={location} />}
      {loading && <Loader />}
      {isError && <ErrorMsg />}
    </div>
  );
}
