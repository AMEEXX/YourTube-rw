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
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <Header />
      <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 p-4 sm:p-6 w-full max-w-[2000px] mx-auto">
        {/* Main Content - Responsive sizing */}
        <div className="flex-1 min-w-0 xl:max-w-[calc(100%-424px)]">
          <VideoPlayer />
          {isLoading ? <VideoDetailsSkeleton /> : <VideoDetails />}
        </div>

        {/* Related Videos Sidebar - Responsive */}
        <div className="w-full xl:w-[400px] xl:flex-shrink-0">
          <RelatedVideos />
        </div>
      </div>
    </div>
  )
}
