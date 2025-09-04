import axios, { type AxiosRequestConfig } from 'axios';
import type { Movie } from '../types/movie';

const myKey: string = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

// export const fetchMovies = async (
//   query: string,
//   page: number
// ): Promise<MoviesHttpResponse> => {
//   const options: AxiosRequestConfig = {
//     method: 'GET',
//     url: `https://api.themoviedb.org/3/search/movie`,
//     headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${myKey}`,
//     },
//     params: { query, page, include_adult: false, language: 'en-US' },
//   };
//   const response = await axios.request<MoviesHttpResponse>(options);

//   return response.data;
// };

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesHttpResponse> => {
  if (!myKey) {
    throw new Error(
      'API key is missing. Please check your VITE_TMDB_TOKEN environment variable.'
    );
  }

  const options: AxiosRequestConfig = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${myKey}`,
    },
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  };

  try {
    const response = await axios.get<MoviesHttpResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      options
    );
    return response.data;
  } catch (error) {
    // Детальна обробка помилок Axios
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching movies:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // Повторно викидаємо помилку, щоб її міг обробити react-query
  }
};
