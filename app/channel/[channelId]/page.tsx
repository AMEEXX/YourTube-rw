"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Bell, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock channel data - in real app, this would come from API
const mockChannels = {
  techacademy: {
    id: "techacademy",
    name: "Tech Academy",
    handle: "@techacademy",
    subscribers: "2.1M",
    description: "Learn programming, web development, and technology with our comprehensive tutorials and courses.",
    banner: "/abstract-tech-banner.png",
    avatar: "/tech-avatar.png",
    verified: true,
    videos: [
      {
        id: "1",
        title: "React Hooks Complete Guide",
        thumbnail: "/react-programming-thumbnail.png",
        views: "125K",
        timestamp: "2 days ago",
        duration: "15:30",
      },
      {
        id: "2",
        title: "JavaScript ES6 Features",
        thumbnail: "/javascript-tips-thumbnail.png",
        views: "89K",
        timestamp: "1 week ago",
        duration: "12:45",
      },
    ],
    playlists: [
      {
        id: "1",
        title: "React Fundamentals",
        videoCount: 12,
        thumbnail: "/react-programming-thumbnail.png",
      },
      {
        id: "2",
        title: "JavaScript Mastery",
        videoCount: 8,
        thumbnail: "/javascript-tips-thumbnail.png",
      },
    ],
  },
}

export default function ChannelPage() {
  const params = useParams()
  const channelId = params.channelId as string
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [activeTab, setActiveTab] = useState("videos")

  const channel = mockChannels[channelId as keyof typeof mockChannels]

  if (!channel) {
    return (
      <div className="min-h-screen yt-bg-base">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold yt-text-primary mb-4">Channel not found</h1>
            <p className="yt-text-secondary">This channel is not in your whitelist or doesn't exist.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen yt-bg-base">
      {/* Channel Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-red-500 to-red-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span className="text-white text-2xl md:text-3xl font-bold">{channel.name.charAt(0)}</span>
            </div>
            <div className="flex-1 text-white">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{channel.name}</h1>
              <p className="text-white/90 text-sm md:text-base">
                {channel.handle} • {channel.subscribers} subscribers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Info & Actions */}
      <div className="border-b border-border yt-bg-base">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="yt-text-secondary text-sm md:text-base max-w-2xl">{channel.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`gap-2 ${
                  isSubscribed
                    ? "yt-bg-raised yt-text-primary hover:bg-accent"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Bell className="h-4 w-4" />
                    Subscribed
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md yt-bg-raised">
            <TabsTrigger value="videos" className="data-[state=active]:yt-bg-menu">
              Videos
            </TabsTrigger>
            <TabsTrigger value="playlists" className="data-[state=active]:yt-bg-menu">
              Playlists
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:yt-bg-menu">
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {channel.videos.map((video) => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="relative mb-3 rounded-xl overflow-hidden yt-bg-raised shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="aspect-video relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                        {video.duration}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm yt-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="yt-text-secondary text-sm">
                    {video.views} views • {video.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {channel.playlists.map((playlist) => (
                <div key={playlist.id} className="group cursor-pointer">
                  <div className="relative mb-3 rounded-xl overflow-hidden yt-bg-raised shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="aspect-video relative">
                      <img
                        src={playlist.thumbnail || "/placeholder.svg"}
                        alt={playlist.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">{playlist.videoCount} videos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-sm yt-text-primary mb-1 group-hover:text-primary transition-colors">
                    {playlist.title}
                  </h3>
                  <p className="yt-text-secondary text-sm">{playlist.videoCount} videos</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="font-semibold yt-text-primary mb-2">Description</h3>
                <p className="yt-text-secondary">{channel.description}</p>
              </div>
              <div>
                <h3 className="font-semibold yt-text-primary mb-2">Stats</h3>
                <div className="space-y-1 yt-text-secondary text-sm">
                  <p>{channel.subscribers} subscribers</p>
                  <p>{channel.videos.length} videos</p>
                  <p>Joined Dec 15, 2020</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
