"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { UserProfile } from "@/components/user-profile"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <UserProfile />
        </main>
      </div>
    </div>
  )
}
