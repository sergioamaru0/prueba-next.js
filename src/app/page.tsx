"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { MovieGrid } from "@/components/movie-grid"
import { Sidebar } from "@/components/sidebar"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedGenre(null)
  }

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenre(genreId)
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <div className="flex">
          <Sidebar 
            className="w-[240px] hidden lg:block" 
            onSearch={handleSearch}
            onGenreSelect={handleGenreSelect}
          />
          <div className="flex-1 p-6 overflow-x-hidden">
            <MovieGrid searchQuery={searchQuery} selectedGenre={selectedGenre} />
          </div>
        </div>
      </main>
    </div>
  )
}

