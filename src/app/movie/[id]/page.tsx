import { ArrowLeft, Heart, Play } from 'lucide-react'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { tmdb, getImageUrl } from "@/lib/tmdb"

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movieId = parseInt(params.id)
  const [movie, recommendations, trailers] = await Promise.all([
    tmdb.getMovieDetails(movieId),
    tmdb.getMovieRecommendations(movieId),
    tmdb.getMovieTrailers(movieId)
  ])

  const trailer = trailers.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')

  function formatRuntime(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}min`
  }

  return (
    <div className="min-h-screen bg-black/90">
      <div className="relative min-h-screen">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path) || '/placeholder.svg?height=1080&width=1920'})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

        {/* Content */}
        <div className="relative z-10">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 text-white/80 hover:text-white transition-colors absolute top-4 left-4 z-20"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Movie Poster */}
              <div className="w-full md:w-1/4">
                <img
                  src={getImageUrl(movie.poster_path, 'w500') || '/placeholder.svg?height=750&width=500'}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-2xl"
                />
                {trailer && (
                  <Button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-black" size="lg">
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" /> Official Trailer
                    </a>
                  </Button>
                )}
              </div>

              {/* Movie Details */}
              <div className="flex-1 text-white">
                <div className="space-y-6">
                  {/* Title and Release Date */}
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
                    <div className="flex items-center gap-4 text-white/60">
                      <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                      {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Overview:</h2>
                    <p className="text-white/80 leading-relaxed">{movie.overview}</p>
                  </div>

                  {/* User Score */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <svg className="w-16 h-16">
                        <circle
                          className="text-gray-700"
                          strokeWidth="5"
                          stroke="currentColor"
                          fill="transparent"
                          r="30"
                          cx="32"
                          cy="32"
                        />
                        <circle
                          className="text-green-500"
                          strokeWidth="5"
                          strokeDasharray={30 * 2 * Math.PI}
                          strokeDashoffset={30 * 2 * Math.PI * (1 - movie.vote_average / 10)}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="30"
                          cx="32"
                          cy="32"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                        {Math.round(movie.vote_average * 10)}%
                      </span>
                    </div>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Tags/Genres */}
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge
                        key={genre.id}
                        variant="secondary"
                        className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-white">Recommendations</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {recommendations.results.slice(0, 6).map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`} className="block group">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                      <img
                        src={getImageUrl(movie.poster_path, 'w500') || '/placeholder.svg?height=750&width=500'}
                        alt={movie.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                      {movie.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

