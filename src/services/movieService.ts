import axios, { type AxiosRequestConfig } from 'axios';
import type { Movie } from '../types/movie';

const myKey: string = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesHttpResponse> => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
    params: { query, page, include_adult: false, language: 'en-US' },
  };
  const response = await axios.request<MoviesHttpResponse>(options);
  // console.log(response.data);

  return response.data;
};
