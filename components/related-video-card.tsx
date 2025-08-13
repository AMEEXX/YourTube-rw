"use client"

import { useState } from "react"
import Image from "next/image"
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

interface RelatedVideoCardProps {
  video: Video
}

export function RelatedVideoCard({ video }: RelatedVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex gap-2 cursor-pointer group p-2 rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0">
        <div className="w-40 h-24 relative rounded-lg overflow-hidden bg-gray-800">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className={`object-cover transition-transform duration-200 ${isHovered ? "scale-105" : "scale-100"}`}
          />
          {/* Duration Badge */}
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
            {video.duration}
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm leading-5 mb-1 transition-colors duration-200">
          <span className="line-clamp-2 text-white">{video.title}</span>
        </h3>
        <p className="text-xs mb-1 text-[#aaaaaa]">{video.channel}</p>
        <p className="text-xs text-[#aaaaaa]">
          {video.views} • {video.timestamp}
        </p>
      </div>

      {/* More Options */}
      <Button
        variant="ghost"
        size="icon"
        className={`h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 hover:bg-[#3a3a3a] ${
          isHovered ? "opacity-100" : ""
        }`}
      >
        <MoreVertical className="h-3 w-3 text-white" />
      </Button>
    </div>
  )
}
