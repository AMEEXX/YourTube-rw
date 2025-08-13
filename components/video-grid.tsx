"use client"

import { VideoCard } from "@/components/video-card"
import { VideoCardSkeleton } from "@/components/video-card-skeleton"
import { AddContentButton } from "@/components/add-content-button"
import { useYouTubeVideos } from "@/hooks/use-youtube-data"
import { useSearch } from "@/hooks/use-search"

export function VideoGrid() {
  const { videos, loading, error } = useYouTubeVideos()
  const { hasQuery, searchResults, query } = useSearch()

  // Show search results if there's a query, otherwise show all whitelisted videos
  const displayVideos = hasQuery ? searchResults : videos
  const isSearchMode = hasQuery

  if (loading && !isSearchMode) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Recommended</h1>
          <AddContentButton />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
              <VideoCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error && !isSearchMode) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Recommended</h1>
          <AddContentButton />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Failed to load videos</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Using demo content instead</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {isSearchMode ? `Search results for "${query}"` : "All Videos"}
        </h1>
        {!isSearchMode && <AddContentButton />}
      </div>

      {displayVideos.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center max-w-md mx-auto px-4">
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">
              {isSearchMode ? "No videos found" : "No videos available"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {isSearchMode
                ? "Try searching with different keywords from your whitelisted content"
                : "Add some channels and playlists to your whitelist to see videos here"}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {displayVideos.map((video, index) => (
            <div key={video.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
