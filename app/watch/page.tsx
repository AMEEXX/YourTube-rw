"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { VideoPlayer } from "@/components/video-player"
import { VideoDetails } from "@/components/video-details"
import { VideoDetailsSkeleton } from "@/components/video-details-skeleton"
import { RelatedVideos } from "@/components/related-videos"

export default function WatchPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6 max-w-[1800px] mx-auto">
        {/* Main Content */}
        <div className="flex-1 max-w-none lg:max-w-4xl">
          <VideoPlayer />
          {isLoading ? <VideoDetailsSkeleton /> : <VideoDetails />}
        </div>

        {/* Related Videos Sidebar */}
        <div className="w-full lg:w-[400px] lg:flex-shrink-0">
          <RelatedVideos />
        </div>
      </div>
    </div>
  )
}
