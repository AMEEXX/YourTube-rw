"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoGrid } from "@/components/video-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 mobile-padding">
          <VideoGrid />
        </main>
      </div>
    </div>
  )
}
