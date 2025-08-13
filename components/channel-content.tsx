"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff, Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoGrid } from "@/components/video-grid"

interface ChannelContentProps {
  channelId: string
}

const mockChannelData = {
  "1": {
    name: "Tech Academy",
    avatar: "TA",
    subscribers: "2.1M subscribers",
    description:
      "Learn programming and web development with our comprehensive tutorials. We cover everything from basic HTML/CSS to advanced React and Node.js development.",
    banner: "/tech-academy-banner.png",
    videoCount: 156,
    isSubscribed: true,
  },
  "2": {
    name: "Dev Channel",
    avatar: "DC",
    subscribers: "1.8M subscribers",
    description: "React, JavaScript, and modern web development tutorials for developers of all skill levels.",
    banner: "/placeholder-9ryme.png",
    videoCount: 89,
    isSubscribed: true,
  },
}

export function ChannelContent({ channelId }: ChannelContentProps) {
  const [channel, setChannel] = useState<any>(null)
  const [notifications, setNotifications] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(true)

  useEffect(() => {
    // Simulate fetching channel data
    const channelData = mockChannelData[channelId as keyof typeof mockChannelData]
    if (channelData) {
      setChannel(channelData)
      setIsSubscribed(channelData.isSubscribed)
    }
  }, [channelId])

  if (!channel) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Channel not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The channel you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Channel Banner */}
      <div className="relative h-32 sm:h-48 bg-gradient-to-r from-red-500 to-red-600 rounded-lg mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold">{channel.name}</h1>
        </div>
      </div>

      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-2xl font-semibold">{channel.avatar}</span>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{channel.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {channel.subscribers} • {channel.videoCount} videos
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">{channel.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isSubscribed ? "outline" : "default"}
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={
              isSubscribed
                ? "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                : "bg-red-600 hover:bg-red-700 text-white"
            }
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setNotifications(!notifications)}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Channel Content Tabs */}
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="videos" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="playlists" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            <List className="h-4 w-4 mr-2" />
            Playlists
          </TabsTrigger>
          <TabsTrigger value="about" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
            About
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
          <VideoGrid searchQuery={`channel:${channel.name}`} />
        </TabsContent>

        <TabsContent value="playlists" className="mt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No playlists yet</h3>
            <p className="text-gray-600 dark:text-gray-400">This channel hasn't created any playlists.</p>
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">About {channel.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{channel.description}</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Subscribers</h4>
                <p className="text-gray-600 dark:text-gray-400">{channel.subscribers}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Videos</h4>
                <p className="text-gray-600 dark:text-gray-400">{channel.videoCount} videos</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
