"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChannelCard } from "@/components/channel-card"
import { ChannelCardSkeleton } from "@/components/channel-card-skeleton"
import { SubscribedVideos } from "@/components/subscribed-videos"
import { AddChannelDialog } from "@/components/add-channel-dialog"

const mockChannels = [
  {
    id: "1",
    name: "Tech Academy",
    avatar: "TA",
    subscribers: "2.1M subscribers",
    description: "Learn programming and web development with our comprehensive tutorials",
    videoCount: 156,
    isSubscribed: true,
  },
  {
    id: "2",
    name: "Dev Channel",
    avatar: "DC",
    subscribers: "1.8M subscribers",
    description: "React, JavaScript, and modern web development tutorials",
    videoCount: 89,
    isSubscribed: true,
  },
  {
    id: "3",
    name: "Code Masters",
    avatar: "CM",
    subscribers: "3.2M subscribers",
    description: "Advanced programming concepts and best practices",
    videoCount: 234,
    isSubscribed: true,
  },
  {
    id: "4",
    name: "Design Pro",
    avatar: "DP",
    subscribers: "950K subscribers",
    description: "UI/UX design and CSS tutorials for developers",
    videoCount: 67,
    isSubscribed: true,
  },
]

export function SubscriptionsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [channels, setChannels] = useState(mockChannels)
  const [isLoading] = useState(false) // Added loading state for skeleton demo

  const filteredChannels = channels.filter((channel) => channel.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleUnsubscribe = (channelId: string) => {
    setChannels(channels.filter((channel) => channel.id !== channelId))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Subscriptions</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your whitelisted channels and videos</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Channel
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
        <Input
          placeholder="Search channels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Channels Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Your Channels ({isLoading ? "..." : filteredChannels.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ChannelCardSkeleton key={i} />)
            : filteredChannels.map((channel) => (
                <ChannelCard key={channel.id} channel={channel} onUnsubscribe={handleUnsubscribe} />
              ))}
        </div>
      </div>

      {/* Recent Videos from Subscribed Channels */}
      <SubscribedVideos />

      {/* Add Channel Dialog */}
      <AddChannelDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddChannel={(channel) => {
          setChannels([...channels, { ...channel, id: Date.now().toString() }])
        }}
      />
    </div>
  )
}
