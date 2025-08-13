"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Video {
  id: string
  title: string
  thumbnail: string
  channel: string
  views: string
  timestamp: string
  duration: string
}

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="cursor-pointer group w-full yt-font-primary transition-all duration-300 ease-out hover:bg-[#2a2a2a] rounded-lg p-2 -m-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/watch?v=${video.id}`}>
        {/* Thumbnail Container */}
        <div className="relative mb-3 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 ease-out">
          <div className="aspect-video relative">
            <Image
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              fill
              className={`object-cover transition-all duration-700 ease-out ${
                isHovered ? "scale-[1.05]" : "scale-100"
              }`}
            />
            {/* Duration Badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white yt-text-caption px-2 py-1 rounded-md font-medium">
              {video.duration}
            </div>
            <div
              className={`absolute inset-0 bg-black/5 dark:bg-white/5 transition-opacity duration-300 ease-out ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </Link>

      {/* Video Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <Link href={`/channel/${video.channel.toLowerCase().replace(/\s+/g, "")}`}>
          <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
            <span className="text-white yt-text-metadata font-medium">{video.channel.charAt(0)}</span>
          </div>
        </Link>

        {/* Video Details */}
        <div className="flex-1 min-w-0">
          <Link href={`/watch?v=${video.id}`}>
            <h3 className="yt-text-body font-medium leading-5 mb-1 transition-colors duration-200 ease-out yt-text-primary hover:yt-text-secondary">
              <span className="line-clamp-2">{video.title}</span>
            </h3>
          </Link>
          <Link href={`/channel/${video.channel.toLowerCase().replace(/\s+/g, "")}`}>
            <p className="yt-text-metadata mb-1 yt-text-secondary transition-colors duration-200 cursor-pointer hover:yt-text-primary">
              {video.channel}
            </p>
          </Link>
          <p className="yt-text-metadata yt-text-secondary">
            {video.views} • {video.timestamp}
          </p>
        </div>

        {/* More Options */}
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-all duration-200 ease-out ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } group-hover:opacity-100 group-hover:scale-100 hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
          <MoreVertical className="h-4 w-4 yt-text-secondary" />
        </Button>
      </div>
    </div>
  )
}
