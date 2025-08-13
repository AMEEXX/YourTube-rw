"use client"

import { RelatedVideoCard } from "@/components/related-video-card"
import { RelatedVideoSkeleton } from "@/components/related-video-skeleton"
import { useYouTubeVideos } from "@/hooks/use-youtube-data"

export function RelatedVideos() {
  const { videos, loading } = useYouTubeVideos(undefined, "programming tutorials")

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Related videos</h2>
      <div className="space-y-2">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <RelatedVideoSkeleton key={i} />)
          : videos.slice(0, 10).map((video) => <RelatedVideoCard key={video.id} video={video} />)}
      </div>
    </div>
  )
}
