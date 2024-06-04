import { useParams } from "react-router-dom";
import { getMovieCast } from "../../tmdbApi";
import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const defaultImg = 'https://cdn-icons-png.flaticon.com/512/6522/6522586.png';

  useEffect(() => {
    const openDetails = async () => {
      try {
        const data = await getMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        console.log(error);
      }
    };
    openDetails();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {movieCast.length > 0 &&
        movieCast.map((castMember) => (
          <li className={css.item} key={castMember.id}>
            {castMember.profile_path ? (
              <img
                className={css.img}
                src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                alt={castMember.name}
              />
            ) : (
              <img
                className={css.img}
                src={defaultImg}
                alt={castMember.name}
              />
            )}
            <h4 className={css.name}>{castMember.name}</h4>
            {castMember.character && <p className={css.descr}>as {castMember.character}</p>}
          </li>
        ))}
    </ul>
  );
}

