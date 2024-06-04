import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesByQuery } from '../../tmdbApi';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import toast from 'react-hot-toast';
import style from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setIsError(false);
        const searchedMovies = await getMoviesByQuery(
          searchQuery || searchParams.get('query')
        );
        setSearchedMovies(searchedMovies.results);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchQuery, searchParams]);

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
    <div className={style.container}>
      <SearchBar onSubmit={handleSubmit} />
      {searchedMovies.length > 0 && <MovieList moviesList={searchedMovies} />}
      {loading && <Loader />}
      {isError && <ErrorMsg />}
    </div>
  );
}
