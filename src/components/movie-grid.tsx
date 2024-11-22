'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import Link from "next/link"
import { Movie, ApiResponse, tmdb, getImageUrl } from "@/lib/tmdb"

type CategoryData = {
  name: string
  fetchFn: () => Promise<ApiResponse>
}

const categories: CategoryData[] = [
  { name: "Popular", fetchFn: tmdb.getPopularMovies },
  { name: "Top Rated", fetchFn: tmdb.getTopRatedMovies },
  { name: "Now Playing", fetchFn: tmdb.getNowPlayingMovies },
  { name: "Upcoming", fetchFn: tmdb.getUpcomingMovies },
]

interface MovieCategoryProps {
  category: CategoryData
  searchQuery: string
  selectedGenre: number | null
}

function MovieCategory({ category, searchQuery, selectedGenre }: MovieCategoryProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let data: ApiResponse
        if (searchQuery) {
          data = await tmdb.searchMovies(searchQuery)
        } else if (selectedGenre) {
          data = await tmdb.getMoviesByGenre(selectedGenre)
        } else {
          data = await category.fetchFn()
        }
        setMovies(data.results)
      } catch (error) {
        console.error(`Error fetching ${category.name} movies:`, error)
      }
    }
    fetchMovies()
  }, [category, searchQuery, selectedGenre])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (movies.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <div className="relative">
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
        >
          {movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <Card className="bg-[#262626] border-gray-800/50 flex-shrink-0 w-[220px] h-[400px] group hover:bg-gray-900 transition-all duration-300">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative h-[260px]">
                    <img
                      src={getImageUrl(movie.poster_path, 'w500') || '/placeholder.svg?height=750&width=500'}
                      alt={movie.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
                    <div>
                      <h3 className="font-semibold text-base leading-tight line-clamp-2">
                        {movie.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(movie.release_date).toLocaleDateString('en-US', { 
                          month: 'long',
                          day: 'numeric', 
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        <svg className="w-10 h-10">
                          <circle
                            className="text-gray-700"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="transparent"
                            r="18"
                            cx="20"
                            cy="20"
                          />
                          <circle
                            className="text-green-500"
                            strokeWidth="4"
                            strokeDasharray={18 * 2 * Math.PI}
                            strokeDashoffset={18 * 2 * Math.PI * (1 - movie.vote_average / 10)}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="18"
                            cx="20"
                            cy="20"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                          {Math.round(movie.vote_average * 10)}%
                        </span>
                      </div>
                      <button 
                        className="p-2 hover:text-primary transition-colors"
                        aria-label={`Add ${movie.title} to favorites`}
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

interface MovieGridProps {
  searchQuery: string
  selectedGenre: number | null
}

export function MovieGrid({ searchQuery, selectedGenre }: MovieGridProps) {
  return (
    <div>
      {categories.map((category) => (
        <MovieCategory 
          key={category.name} 
          category={category} 
          searchQuery={searchQuery}
          selectedGenre={selectedGenre}
        />
      ))}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

