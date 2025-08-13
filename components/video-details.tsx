"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function VideoDetails() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  return (
    <div className="mb-6">
      {/* Video Title */}
      <h1 className="text-xl font-semibold yt-text-primary mb-3 leading-6">
        How to Build Amazing Web Applications - Complete Tutorial
      </h1>

      {/* Video Stats and Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-sm yt-text-secondary">
          <span>1,234,567 views</span>
          <span>•</span>
          <span>Dec 15, 2024</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Like/Dislike */}
          <div className="flex items-center yt-bg-raised rounded-full">
            <Button variant="ghost" className="rounded-full px-4 py-2 h-9 hover:bg-accent yt-text-primary">
              <ThumbsUp className="h-4 w-4 mr-2" />
              12K
            </Button>
            <div className="w-px h-6 bg-border" />
            <Button variant="ghost" className="rounded-full px-4 py-2 h-9 hover:bg-accent yt-text-primary">
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Share */}
          <Button variant="ghost" className="rounded-full px-4 py-2 h-9 yt-bg-raised hover:bg-accent yt-text-primary">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>

          {/* Download */}
          <Button variant="ghost" className="rounded-full px-4 py-2 h-9 yt-bg-raised hover:bg-accent yt-text-primary">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>

          {/* More */}
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 yt-bg-raised hover:bg-accent">
            <MoreHorizontal className="h-4 w-4 yt-text-primary" />
          </Button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="flex items-start gap-3 p-4 yt-bg-raised rounded-xl">
        <Link href="/channel/techacademy">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 hover:shadow-md transition-shadow duration-200">
            <span className="text-white font-semibold">TA</span>
          </div>
        </Link>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <Link href="/channel/techacademy">
                <h3 className="font-semibold yt-text-primary hover:yt-text-secondary transition-colors">
                  Tech Academy
                </h3>
              </Link>
              <p className="text-sm yt-text-secondary">2.1M subscribers</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`rounded-full px-6 py-2 h-9 font-medium transition-colors ${
                  isSubscribed ? "yt-bg-menu yt-text-primary hover:bg-accent" : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm yt-text-secondary">
            <p className={showFullDescription ? "" : "line-clamp-2"}>
              Learn how to build amazing web applications from scratch! In this comprehensive tutorial, we'll cover
              everything from setting up your development environment to deploying your finished application. Perfect
              for beginners and intermediate developers looking to enhance their skills.
              {showFullDescription && (
                <>
                  <br />
                  <br />🔗 Resources mentioned in this video:
                  <br />- GitHub repository: https://github.com/example
                  <br />- Documentation: https://docs.example.com
                  <br />- Discord community: https://discord.gg/example
                  <br />
                  <br />📚 Chapters:
                  <br />
                  0:00 Introduction
                  <br />
                  2:30 Setting up the environment
                  <br />
                  8:15 Building the frontend
                  <br />
                  15:45 Backend development
                  <br />
                  22:30 Database integration
                  <br />
                  28:10 Deployment
                  <br />
                  30:00 Conclusion
                </>
              )}
            </p>
            <Button
              variant="ghost"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="p-0 h-auto text-sm font-medium yt-text-primary hover:bg-transparent mt-2"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
