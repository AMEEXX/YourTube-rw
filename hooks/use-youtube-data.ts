"use client"

import { useState, useEffect } from "react"
import { youtubeAPI, mockVideoData, mockChannelData } from "@/lib/youtube-api"

interface Video {
  id: string
  title: string
  thumbnail: string
  channel: string
  views: string
  timestamp: string
  duration: string
  description?: string
  likes?: number
  comments?: number
}

interface Channel {
  id: string
  name: string
  description: string
  thumbnail: string
  subscribers: string
  videoCount: number
}

export function useYouTubeVideos(videoIds?: string[], searchQuery?: string) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true)
      setError(null)

      try {
        let result: Video[] = []

        if (
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY &&
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY !== "YOUR_API_KEY_HERE"
        ) {
          // Use real API if key is available
          if (videoIds && videoIds.length > 0) {
            result = await youtubeAPI.getVideoDetails(videoIds)
          } else if (searchQuery) {
            result = await youtubeAPI.searchVideos(searchQuery)
          }
        } else {
          // Fallback to mock data
          console.warn("YouTube API key not configured, using mock data")
          result = mockVideoData
        }

        setVideos(result)
      } catch (err) {
        console.error("Failed to fetch videos:", err)
        setError("Failed to load videos")
        // Fallback to mock data on error
        setVideos(mockVideoData)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [videoIds?.join(","), searchQuery])

  return { videos, loading, error }
}

export function useYouTubeChannels(channelIds?: string[], searchQuery?: string) {
  const [channels, setChannels] = useState<Channel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchChannels() {
      setLoading(true)
      setError(null)

      try {
        let result: Channel[] = []

        if (
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY &&
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY !== "YOUR_API_KEY_HERE"
        ) {
          // Use real API if key is available
          if (channelIds && channelIds.length > 0) {
            result = await youtubeAPI.getChannelDetails(channelIds)
          } else if (searchQuery) {
            result = await youtubeAPI.searchChannels(searchQuery)
          }
        } else {
          // Fallback to mock data
          console.warn("YouTube API key not configured, using mock data")
          result = mockChannelData
        }

        setChannels(result)
      } catch (err) {
        console.error("Failed to fetch channels:", err)
        setError("Failed to load channels")
        // Fallback to mock data on error
        setChannels(mockChannelData)
      } finally {
        setLoading(false)
      }
    }

    fetchChannels()
  }, [channelIds?.join(","), searchQuery])

  return { channels, loading, error }
}

export function useChannelVideos(channelId: string) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchChannelVideos() {
      if (!channelId) return

      setLoading(true)
      setError(null)

      try {
        let result: Video[] = []

        if (
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY &&
          process.env.NEXT_PUBLIC_YOUTUBE_API_KEY !== "YOUR_API_KEY_HERE"
        ) {
          result = await youtubeAPI.getChannelVideos(channelId)
        } else {
          // Fallback to mock data
          result = mockVideoData.filter(() => Math.random() > 0.5) // Random subset
        }

        setVideos(result)
      } catch (err) {
        console.error("Failed to fetch channel videos:", err)
        setError("Failed to load channel videos")
        setVideos([])
      } finally {
        setLoading(false)
      }
    }

    fetchChannelVideos()
  }, [channelId])

  return { videos, loading, error }
}
