import axios from 'axios';
import { ApiResponse, Movie, MovieDetail, Genre, Video } from '@/models/apiResponse';

const API_KEY = 'cf7b6a22b5215a7cc9f29f6a383c7d83';
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getImageUrl = (path: string | null, size: string = 'original') => 
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const tmdb = {
  async getPopularMovies(): Promise<ApiResponse> {
    const response = await axiosInstance.get('/movie/popular');
    return response.data;
  },

  async getTopRatedMovies(): Promise<ApiResponse> {
    const response = await axiosInstance.get('/movie/top_rated');
    return response.data;
  },

  async getNowPlayingMovies(): Promise<ApiResponse> {
    const response = await axiosInstance.get('/movie/now_playing');
    return response.data;
  },

  async getUpcomingMovies(): Promise<ApiResponse> {
    const response = await axiosInstance.get('/movie/upcoming');
    return response.data;
  },

  async searchMovies(query: string): Promise<ApiResponse> {
    const response = await axiosInstance.get('/search/movie', {
      params: { query },
    });
    return response.data;
  },

  async getMovieDetails(movieId: number): Promise<MovieDetail> {
    const response = await axiosInstance.get(`/movie/${movieId}`);
    return response.data;
  },

  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    const response = await axiosInstance.get('/genre/movie/list');
    return response.data;
  },

  async getMoviesByGenre(genreId: number): Promise<ApiResponse> {
    const response = await axiosInstance.get('/discover/movie', {
      params: { with_genres: genreId },
    });
    return response.data;
  },

  async getSimilarMovies(movieId: number): Promise<ApiResponse> {
    const response = await axiosInstance.get(`/movie/${movieId}/similar`);
    return response.data;
  },

  async getMovieRecommendations(movieId: number): Promise<ApiResponse> {
    const response = await axiosInstance.get(`/movie/${movieId}/recommendations`);
    return response.data;
  },

  async getMovieTrailers(movieId: number): Promise<{ id: number; results: Video[] }> {
    const response = await axiosInstance.get(`/movie/${movieId}/videos`);
    return response.data;
  },
};

export type { ApiResponse, Movie, MovieDetail, Genre };

