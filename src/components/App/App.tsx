import style from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMassage/ErrorMassage';
import MovieModal from '../MovieModal/MovieModal';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

import { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
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

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage), // Спрощена queryFn
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  // Використовуємо useEffect для обробки побічних ефектів після успішного запиту
  useEffect(() => {
    if (isSuccess && data?.results.length === 0 && query !== '') {
      toast.error('No movies found for your request.');
    }
  }, [isSuccess, data, query]);

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  const handleSearch = (query: string) => {
    setQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className={style.app}>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={style.pagination}
          activeClassName={style.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && movies && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={openModal} />
      )}
      <Toaster />
      {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
