"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Bell, CheckCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useYouTubeChannels, useChannelVideos } from "@/hooks/use-youtube-data"

export default function ChannelPage() {
  const params = useParams()
  const channelId = params.channelId as string
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [activeTab, setActiveTab] = useState("videos")

  const { channels, loading: channelLoading, error: channelError } = useYouTubeChannels([channelId])
  const { videos, loading: videosLoading, error: videosError } = useChannelVideos(channelId)

  const channel = channels[0]

  if (channelLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 ml-60">
            {" "}
            {/* Added ml-60 to account for fixed sidebar width */}
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (channelError || !channel) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 ml-60">
            {" "}
            {/* Added ml-60 to account for fixed sidebar width */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Channel not found</h1>
              <p className="text-gray-600 dark:text-gray-400">
                This channel is not in your whitelist or doesn't exist.
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-60">
          {" "}
          {/* Added ml-60 to account for fixed sidebar width */}
          <div className="relative">
            {/* Banner Image */}
            <div className="relative h-48 md:h-64 bg-gradient-to-r from-purple-600 via-purple-700 to-blue-800 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-800/90" />
              <div className="relative h-full flex items-center justify-center px-8">
                <div className="text-white text-center">
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">Welcome to</h1>
                  <h2 className="text-2xl md:text-4xl font-bold text-yellow-300 mb-4">{channel.name}</h2>
                  <p className="text-xl md:text-2xl text-yellow-300 font-semibold">Quality Content Creator</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#181818] px-6 py-6">
              <div className="flex items-start gap-6">
                {/* Channel Avatar */}
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                  {channel.thumbnail ? (
                    <img
                      src={channel.thumbnail || "/placeholder.svg"}
                      alt={channel.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-4xl font-bold">
                      {channel.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Channel Info */}
                <div className="flex-1 min-w-0">
                  {/* Channel Name */}
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-4xl font-bold text-black dark:text-white">{channel.name}</h1>
                    <CheckCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>

                  {/* Channel Handle and Stats */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                    <span className="font-medium text-black dark:text-white">
                      @{channel.name.toLowerCase().replace(/\s+/g, "")}
                    </span>
                    <span>•</span>
                    <span>{channel.subscribers}</span>
                    <span>•</span>
                    <span>{channel.videoCount} videos</span>
                  </div>

                  {/* Channel Description */}
                  <div className="mb-3">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {channel.description.length > 100
                        ? `${channel.description.substring(0, 100)}...`
                        : channel.description}
                      {channel.description.length > 100 && (
                        <button className="text-gray-600 dark:text-gray-400 font-medium ml-1 hover:text-gray-800 dark:hover:text-gray-200">
                          ...more
                        </button>
                      )}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      onClick={() => setIsSubscribed(!isSubscribed)}
                      className={`px-6 py-2 rounded-full font-medium transition-colors ${
                        isSubscribed
                          ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                          : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                      }`}
                    >
                      {isSubscribed ? (
                        <>
                          <Bell className="h-4 w-4 mr-2" />
                          Subscribed
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="px-6 py-2 rounded-full border-gray-300 dark:border-gray-600 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#181818] border-b border-gray-200 dark:border-gray-700 sticky top-14 z-10">
              <div className="px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <button
                      onClick={() => setActiveTab("videos")}
                      className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "videos"
                          ? "border-black dark:border-white text-black dark:text-white"
                          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      }`}
                    >
                      Videos
                    </button>
                    <button
                      onClick={() => setActiveTab("playlists")}
                      className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "playlists"
                          ? "border-black dark:border-white text-black dark:text-white"
                          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      }`}
                    >
                      Playlists
                    </button>
                  </div>

                  {/* Search Icon */}
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Content Sections */}
          <div className="bg-white dark:bg-[#0f0f0f] px-6 py-6">
            {activeTab === "videos" && (
              <div>
                {videosLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                ) : videos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {videos.map((video) => (
                      <div key={video.id} className="group cursor-pointer">
                        <div className="relative mb-3 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                          <div className="aspect-video relative">
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-medium text-sm text-black dark:text-white mb-1 line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {video.views} • {video.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">No videos available for this channel.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "playlists" && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">Playlists feature coming soon.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
