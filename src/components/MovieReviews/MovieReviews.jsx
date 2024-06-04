import { getMovieReviews } from "../../tmdbApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const openDetails = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    openDetails();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {movieReviews.length > 0 ? (
        movieReviews.map((list) => (
          <li className={css.item} key={list.id}>
            <h4 className={css.name}>{list.author}</h4>
            <p className={css.text}>{list.content}</p>
          </li>
        ))
      ) : (
        <li>
          <p>We don`t have any reviews for this movie.</p>
        </li>
      )}
    </ul>
  );
}