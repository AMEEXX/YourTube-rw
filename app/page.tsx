"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoGrid } from "@/components/video-grid"

const demoVideos = [
  {
    id: "1",
    title: "Complete React Tutorial for Beginners - Build a Full Project",
    thumbnail: "/react-programming-thumbnail.png",
    channel: "Tech Academy",
    views: "1.2M",
    timestamp: "2 days ago",
    duration: "45:30",
  },
  {
    id: "2",
    title: "JavaScript ES6+ Features You Must Know in 2024",
    thumbnail: "/javascript-tips-thumbnail.png",
    channel: "Code Masters",
    views: "856K",
    timestamp: "1 week ago",
    duration: "28:15",
  },
  {
    id: "3",
    title: "Advanced CSS Grid and Flexbox Layouts",
    thumbnail: "/coding-tutorial-thumbnail.png",
    channel: "Web Dev Pro",
    views: "432K",
    timestamp: "3 days ago",
    duration: "32:45",
  },
  {
    id: "4",
    title: "Node.js Backend Development Complete Course",
    thumbnail: "/react-programming-thumbnail.png",
    channel: "Tech Academy",
    views: "2.1M",
    timestamp: "1 month ago",
    duration: "2:15:30",
  },
  {
    id: "5",
    title: "TypeScript for React Developers - Full Guide",
    thumbnail: "/javascript-tips-thumbnail.png",
    channel: "Code Masters",
    views: "678K",
    timestamp: "2 weeks ago",
    duration: "1:05:20",
  },
  {
    id: "6",
    title: "Modern Web Development Tools and Workflow",
    thumbnail: "/coding-tutorial-thumbnail.png",
    channel: "Web Dev Pro",
    views: "345K",
    timestamp: "5 days ago",
    duration: "38:12",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 mobile-padding ml-60">
          <div className="mb-6"></div>
          <VideoGrid videos={demoVideos} />
        </main>
      </div>
    </div>
  )
}
