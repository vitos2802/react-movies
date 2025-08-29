import style from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMassage/ErrorMassage';
import MovieModal from '../MovieModal/MovieModal';

import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(data);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieGrid movies={movies} onSelect={openModal} />
      <Toaster />
      {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
