import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ moviesList }) {
  const location = useLocation();
    const defaultImg = "https://stock.adobe.com/ua/search?k=default";
    
  return (
    <ul className={css.moviesList}>
      {moviesList.map(
        ({ id, title, vote_average, poster_path, release_date }) => {
          return (
            <li className={css.moviesItem} key={id}>
              <Link to={`/movies/${id}`} state={{from: location}}  className={css.link}>
                <img
                  className={css.moviesImage}
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : defaultImg
                  }
                  alt={title}
                />
                <h2>Rating: {vote_average}</h2>
                <p>
                  Release date:<br></br>
                  {release_date}
                </p>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}