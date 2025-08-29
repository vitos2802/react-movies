import axios, { type AxiosRequestConfig } from 'axios';
import type { Movie } from '../types/movie';

const myKey: string = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
  };
  const response = await axios.request<MoviesHttpResponse>(options);
  return response.data.results;
};
