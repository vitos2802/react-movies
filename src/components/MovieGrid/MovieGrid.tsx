import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <div className={css.grid}>
      {movies.map(movie => (
        <div
          key={movie.id}
          className={css.card}
          onClick={() => onSelect(movie)}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            }
            alt={movie.title}
            className={css.poster}
            loading="lazy"
          />
          <div className={css.info}>
            <h3 className={css.title}>{movie.title}</h3>
            <p className={css.date}>{movie.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
