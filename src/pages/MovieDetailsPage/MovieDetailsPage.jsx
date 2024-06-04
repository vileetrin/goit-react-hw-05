import { Suspense, useEffect, useRef, useState } from 'react';
import { getMovieDetails } from '../../tmdbApi';
import Loader from '../../components/Loader/Loader';
import {Link, NavLink, Outlet, useLocation, useParams} from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.infoLink, isActive && css.active);
  };

  useEffect(() => {
    const handleMovieDetails = async () => {
      try {
        setLoading(true);
        const details = await getMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        toast.error(
          'Whoops. Something went wrong! Please try reloading this page!'
        );
      } finally {
        setLoading(false);
      }
    };
    handleMovieDetails();
  }, [movieId]);

  const { original_title, overview, genres, poster_path, vote_average } = movieDetails;
  const scoreToFixed = Number(vote_average).toFixed(2);
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current} className={css.backBtn}>
        <IoArrowBackCircleOutline className={css.icon} />
        Go back
      </Link>
      {loading && <Loader />}
      <div className={css.movieInfo}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : defaultImg
          }
          loading="lazy"
          alt="Movie poster"
          className={css.img}
        />
        <div className={css.description}>
          <h1>{original_title}</h1>
          <p>User score: {scoreToFixed}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <ul className={css.list}>
            {genres &&
              genres.length > 0 &&
              genres.map(({ id, name }) => <li key={id}>{name}</li>)}
          </ul>
        </div>
      </div>
      <div>
        <h3 className={css.infoTitle}>Additional information</h3>
        <ul className={css.infoList}>
          <li className={css.infoItem}>
            <NavLink
              to="cast"
              state={{ ...location.state }}
              className={buildLinkClass}
            >
              Cast
            </NavLink>
          </li>
          <li className={css.infoItem}>
            <NavLink
              to="reviews"
              state={{ ...location.state }}
              className={buildLinkClass}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={loading && <Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
