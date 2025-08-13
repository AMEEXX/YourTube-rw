"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { UserSettings } from "@/components/user-settings"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <UserSettings />
        </main>
      </div>
    </div>
  )
}
