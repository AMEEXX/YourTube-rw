"use client"

import type React from "react"
import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { youtubeAPI } from "@/lib/youtube-api"

interface Channel {
  name: string
  avatar: string
  subscribers: string
  description: string
  videoCount: number
  isSubscribed: boolean
}

interface AddChannelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddChannel: (channel: Channel) => void
}

export function AddChannelDialog({ open, onOpenChange, onAddChannel }: AddChannelDialogProps) {
  const [channelUrl, setChannelUrl] = useState("")
  const [channelName, setChannelName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const extractChannelId = (url: string): string | null => {
    // Extract channel ID from various YouTube URL formats
    const patterns = [
      /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
      /youtube\.com\/@([a-zA-Z0-9_-]+)/,
      /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const handleSearch = async () => {
    if (!channelName.trim()) return

    setIsLoading(true)
    try {
      if (process.env.NEXT_PUBLIC_YOUTUBE_API_KEY && process.env.NEXT_PUBLIC_YOUTUBE_API_KEY !== "YOUR_API_KEY_HERE") {
        const results = await youtubeAPI.searchChannels(channelName, 5)
        setSearchResults(results)
      } else {
        // Mock search results
        setSearchResults([
          {
            id: Date.now().toString(),
            name: channelName,
            description: "Channel found via search",
            thumbnail: "/placeholder.svg",
            subscribers: "Unknown subscribers",
            videoCount: 0,
          },
        ])
      }
    } catch (error) {
      console.error("Search failed:", error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddChannel = (channelData: any) => {
    const newChannel: Channel = {
      name: channelData.name,
      avatar: channelData.name
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase(),
      subscribers: channelData.subscribers,
      description: channelData.description,
      videoCount: channelData.videoCount,
      isSubscribed: true,
    }

    onAddChannel(newChannel)
    setChannelName("")
    setChannelUrl("")
    setSearchResults([])
    onOpenChange(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!channelName.trim()) return

    if (searchResults.length === 0) {
      await handleSearch()
    } else {
      // Add the first search result
      handleAddChannel(searchResults[0])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Channel to Whitelist</DialogTitle>
          <DialogDescription>
            Add a YouTube channel to your curated list. Search by channel name or paste a YouTube URL.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="channel-url">YouTube Channel URL (Optional)</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="channel-url"
                placeholder="https://youtube.com/@channelname"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="channel-name">Channel Name *</Label>
            <Input
              id="channel-name"
              placeholder="Enter channel name to search"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              required
            />
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <Label>Search Results</Label>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {searchResults.map((channel, index) => (
                  <div
                    key={channel.id}
                    className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleAddChannel(channel)}
                  >
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {channel.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{channel.name}</p>
                      <p className="text-xs text-gray-500 truncate">{channel.subscribers}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!channelName.trim() || isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {searchResults.length === 0 ? "Searching..." : "Adding..."}
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  {searchResults.length === 0 ? "Search" : "Add Channel"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
