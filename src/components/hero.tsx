"use client"

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Movie, tmdb, getImageUrl } from '@/lib/tmdb'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await tmdb.getPopularMovies()
        setPopularMovies(data.results.slice(0, 5))
      } catch (error) {
        console.error('Error fetching popular movies:', error)
      }
    }

    fetchPopularMovies()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === popularMovies.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(timer)
  }, [popularMovies])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? popularMovies.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === popularMovies.length - 1 ? 0 : prevIndex + 1
    )
  }

  if (popularMovies.length === 0) {
    return <div className="h-[60vh] bg-gray-900 animate-pulse"></div>
  }

  const currentMovie = popularMovies[currentIndex]

  return (
    <div className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform scale-105"
        style={{
          backgroundImage: `url(${getImageUrl(currentMovie.backdrop_path)})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handlePrev}
          aria-label="Previous movie"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={handleNext}
          aria-label="Next movie"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h2 className="text-4xl font-bold mb-2">{currentMovie.title}</h2>
        <p className="text-lg mb-4 line-clamp-2">{currentMovie.overview}</p>
        <Link href={`/movie/${currentMovie.id}`}>
          <Button variant="default" size="lg">
            Ver detalles
          </Button>
        </Link>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {popularMovies.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}

