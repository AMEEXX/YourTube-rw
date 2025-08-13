// YouTube Data API v3 integration
// Note: In production, you'll need to add YOUTUBE_API_KEY to your environment variables

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"

interface YouTubeVideo {
  id: string
  snippet: {
    title: string
    description: string
    channelTitle: string
    publishedAt: string
    thumbnails: {
      medium: { url: string }
      high: { url: string }
    }
  }
  statistics: {
    viewCount: string
    likeCount: string
    commentCount: string
  }
  contentDetails: {
    duration: string
  }
}

interface YouTubeChannel {
  id: string
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: { url: string }
      high: { url: string }
    }
  }
  statistics: {
    subscriberCount: string
    videoCount: string
  }
}

interface YouTubeSearchResult {
  id: {
    videoId?: string
    channelId?: string
  }
  snippet: {
    title: string
    description: string
    channelTitle: string
    publishedAt: string
    thumbnails: {
      medium: { url: string }
    }
  }
}

// Convert ISO 8601 duration to readable format
function parseDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return "0:00"

  const hours = Number.parseInt(match[1]?.replace("H", "") || "0")
  const minutes = Number.parseInt(match[2]?.replace("M", "") || "0")
  const seconds = Number.parseInt(match[3]?.replace("S", "") || "0")

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// Format view count
function formatViewCount(count: string): string {
  const num = Number.parseInt(count)
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M views`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K views`
  }
  return `${num} views`
}

// Format time ago
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  return `${Math.floor(diffInSeconds / 2419200)} months ago`
}

export class YouTubeAPI {
  private apiKey: string

  constructor() {
    // In a real app, this would come from environment variables
    // For demo purposes, we'll use a placeholder
    this.apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "YOUR_API_KEY_HERE"
  }

  private async makeRequest(endpoint: string, params: Record<string, string>) {
    const url = new URL(`${YOUTUBE_API_BASE}/${endpoint}`)
    url.searchParams.append("key", this.apiKey)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    try {
      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error("YouTube API request failed:", error)
      throw error
    }
  }

  async getVideoDetails(videoIds: string[]) {
    const response = await this.makeRequest("videos", {
      part: "snippet,statistics,contentDetails",
      id: videoIds.join(","),
      maxResults: "50",
    })

    return (
      response.items?.map((video: YouTubeVideo) => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url,
        channel: video.snippet.channelTitle,
        views: formatViewCount(video.statistics.viewCount),
        timestamp: formatTimeAgo(video.snippet.publishedAt),
        duration: parseDuration(video.contentDetails.duration),
        description: video.snippet.description,
        likes: Number.parseInt(video.statistics.likeCount || "0"),
        comments: Number.parseInt(video.statistics.commentCount || "0"),
      })) || []
    )
  }

  async getChannelDetails(channelIds: string[]) {
    const response = await this.makeRequest("channels", {
      part: "snippet,statistics",
      id: channelIds.join(","),
      maxResults: "50",
    })

    return (
      response.items?.map((channel: YouTubeChannel) => ({
        id: channel.id,
        name: channel.snippet.title,
        description: channel.snippet.description,
        thumbnail: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.medium?.url,
        subscribers: formatViewCount(channel.statistics.subscriberCount),
        videoCount: Number.parseInt(channel.statistics.videoCount || "0"),
      })) || []
    )
  }

  async searchVideos(query: string, maxResults = 25) {
    const response = await this.makeRequest("search", {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: maxResults.toString(),
      order: "relevance",
    })

    const videoIds = response.items?.map((item: YouTubeSearchResult) => item.id.videoId).filter(Boolean) || []

    if (videoIds.length === 0) return []

    // Get detailed video information
    return await this.getVideoDetails(videoIds)
  }

  async getChannelVideos(channelId: string, maxResults = 25) {
    const response = await this.makeRequest("search", {
      part: "snippet",
      channelId: channelId,
      type: "video",
      maxResults: maxResults.toString(),
      order: "date",
    })

    const videoIds = response.items?.map((item: YouTubeSearchResult) => item.id.videoId).filter(Boolean) || []

    if (videoIds.length === 0) return []

    return await this.getVideoDetails(videoIds)
  }

  async searchChannels(query: string, maxResults = 25) {
    const response = await this.makeRequest("search", {
      part: "snippet",
      q: query,
      type: "channel",
      maxResults: maxResults.toString(),
      order: "relevance",
    })

    const channelIds = response.items?.map((item: YouTubeSearchResult) => item.id.channelId).filter(Boolean) || []

    if (channelIds.length === 0) return []

    return await this.getChannelDetails(channelIds)
  }
}

// Singleton instance
export const youtubeAPI = new YouTubeAPI()

// Mock data fallback for when API is not available
export const mockVideoData = [
  {
    id: "1",
    title: "How to Build Amazing Web Applications",
    thumbnail: "/coding-tutorial-thumbnail.png",
    channel: "Tech Academy",
    views: "1.2M views",
    timestamp: "2 days ago",
    duration: "15:30",
    description: "Learn how to build amazing web applications from scratch!",
    likes: 12000,
    comments: 1247,
  },
  {
    id: "2",
    title: "React Best Practices for 2024",
    thumbnail: "/react-programming-thumbnail.png",
    channel: "Dev Channel",
    views: "850K views",
    timestamp: "1 week ago",
    duration: "22:15",
    description: "Discover the latest React best practices and patterns.",
    likes: 8500,
    comments: 892,
  },
  {
    id: "3",
    title: "JavaScript Tips Every Developer Should Know",
    thumbnail: "/javascript-tips-thumbnail.png",
    channel: "Code Masters",
    views: "2.1M views",
    timestamp: "3 days ago",
    duration: "18:45",
    description: "Essential JavaScript tips and tricks for developers.",
    likes: 21000,
    comments: 2156,
  },
]

export const mockChannelData = [
  {
    id: "1",
    name: "Tech Academy",
    description: "Learn programming and web development with our comprehensive tutorials",
    thumbnail: "/placeholder.svg",
    subscribers: "2.1M subscribers",
    videoCount: 156,
  },
  {
    id: "2",
    name: "Dev Channel",
    description: "React, JavaScript, and modern web development tutorials",
    thumbnail: "/placeholder.svg",
    subscribers: "1.8M subscribers",
    videoCount: 89,
  },
]
