import React, { useRef } from "react";
import { Movie } from "@/models/apiResponse";

interface MovieListProps {
  title: string;
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ title, movies }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="movie-list space-y-4">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-700"
        >
          &#8249;
        </button>

        <div
          ref={listRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ padding: "0 40px" }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[300px] flex-shrink-0 bg-gray-800 rounded-md overflow-hidden"
              style={{ width: "320px", height: "381px" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h3 className="text-lg text-white font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md z-10 hover:bg-gray-700"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};
