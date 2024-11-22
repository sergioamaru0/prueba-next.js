"use client"

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Genre, tmdb } from "@/lib/tmdb"

interface SidebarProps {
  className?: string
  onSearch: (query: string) => void
  onGenreSelect: (genreId: number | null) => void
}

export function Sidebar({ className, onSearch, onGenreSelect }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { genres } = await tmdb.getMovieGenres()
        setGenres(genres)
      } catch (error) {
        console.error('Error fetching genres:', error)
      }
    }
    fetchGenres()
  }, [])

  const handleSearch = () => {
    onSearch(searchQuery)
    setSelectedGenre(null)
  }

  const handleGenreClick = (genreId: number) => {
    const newSelectedGenre = selectedGenre === genreId ? null : genreId
    setSelectedGenre(newSelectedGenre)
    onGenreSelect(newSelectedGenre)
    setSearchQuery('')
  }

  return (
    <div className={cn("p-6 border-r border-gray-800", className)}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Search</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            className="pl-10 bg-[#262626] border-gray-800" 
            placeholder="Search movies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Genres</h2>
        <div className="space-y-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={cn(
                "w-full text-left px-3 py-2 rounded transition-colors",
                selectedGenre === genre.id
                  ? "bg-amber-500 text-black"
                  : "hover:bg-[#262626]"
              )}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

