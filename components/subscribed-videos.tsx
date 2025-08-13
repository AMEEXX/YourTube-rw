"use client"

import { VideoCard } from "@/components/video-card"
import { VideoCardSkeleton } from "@/components/video-card-skeleton"
import { useYouTubeVideos } from "@/hooks/use-youtube-data"

export function SubscribedVideos() {
  const { videos, loading, error } = useYouTubeVideos(undefined, "programming tutorials")

  if (loading) {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Latest from your subscriptions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Latest from your subscriptions</h2>
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">Using demo content - configure YouTube API key for real data</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.slice(0, 8).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  )
}
