"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, BellOff, MoreVertical, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Channel {
  id: string
  name: string
  avatar: string
  subscribers: string
  description: string
  videoCount: number
  isSubscribed: boolean
}

interface ChannelCardProps {
  channel: Channel
  onUnsubscribe: (channelId: string) => void
}

export function ChannelCard({ channel, onUnsubscribe }: ChannelCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const router = useRouter()

  const handleViewChannel = () => {
    router.push(`/channel/${channel.id}`)
  }

  const handleVideosClick = () => {
    router.push(`/channel/${channel.id}`)
  }

  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Channel Avatar and Info */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold">{channel.avatar}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-gray-900 dark:text-gray-100 truncate cursor-pointer hover:text-red-600 dark:hover:text-red-400 transition-colors"
            onClick={handleViewChannel}
          >
            {channel.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{channel.subscribers}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{channel.videoCount} videos</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isHovered ? "opacity-100" : ""
              }`}
            >
              <MoreVertical className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DropdownMenuItem
              onClick={() => onUnsubscribe(channel.id)}
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Unsubscribe
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleViewChannel}
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              View channel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-5">{channel.description}</p>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setNotifications(!notifications)}
          className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {notifications ? (
            <>
              <Bell className="h-4 w-4 mr-2" />
              All
            </>
          ) : (
            <>
              <BellOff className="h-4 w-4 mr-2" />
              None
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
          onClick={handleVideosClick}
        >
          <Play className="h-4 w-4 mr-2" />
          Videos
        </Button>
      </div>
    </div>
  )
}
