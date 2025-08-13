"use client"

import { useState, useMemo } from "react"
import { useYouTubeVideos } from "./use-youtube-data"

export interface SearchResult {
  id: string
  title: string
  thumbnail: string
  channel: string
  duration: string
  views: string
  publishedAt: string
}

export function useSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { videos, loading } = useYouTubeVideos()

  // Filter whitelisted videos based on search query
  const searchResults = useMemo(() => {
    if (!query.trim()) return []

    const lowercaseQuery = query.toLowerCase()
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(lowercaseQuery) || video.channel.toLowerCase().includes(lowercaseQuery),
    )
  }, [query, videos])

  const performSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
    }, 300)
  }

  const clearSearch = () => {
    setQuery("")
    setIsSearching(false)
  }

  return {
    query,
    searchResults,
    isSearching: isSearching || loading,
    performSearch,
    clearSearch,
    hasResults: searchResults.length > 0,
    hasQuery: query.trim().length > 0,
  }
}
