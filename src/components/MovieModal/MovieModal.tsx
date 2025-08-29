import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  if (!movie) return null;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : `https://image.tmdb.org/t/p/original${movie.poster_path}`
          }
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>{movie.overview}</p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} / 10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
