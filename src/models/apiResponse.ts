
export interface ApiResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
}

export interface MovieDetail extends Movie {
  budget: number;
  revenue: number;
  genres: Genre[];
  spoken_languages: Language[];
  production_companies: ProductionCompany[];
  status: string;
  tagline: string;
  homepage: string;
  runtime: number; // Add this line
  videos: {
    results: Video[];
  };
}


export interface Genre {
  id: number;
  name: string;
}


export interface Language {
  iso_639_1: string;
  name: string;
}


export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}


export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}
