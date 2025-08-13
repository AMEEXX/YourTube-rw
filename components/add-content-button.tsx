"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export function AddContentButton() {
  const { user } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  if (!user) {
    return (
      <>
        <Button onClick={() => setAuthDialogOpen(true)} className="gap-2 bg-red-600 hover:bg-red-700 text-white">
          <Plus className="h-4 w-4" />
          Add Content
        </Button>
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2 bg-red-600 hover:bg-red-700 text-white">
          <Plus className="h-4 w-4" />
          Add Content
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="yt-bg-raised border-border">
        <DropdownMenuItem asChild className="yt-text-primary hover:yt-bg-menu">
          <Link href="/subscriptions">Add Channel</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="yt-text-primary hover:yt-bg-menu">
          <Link href="/subscriptions">Add Playlist</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="yt-text-primary hover:yt-bg-menu">
          <Link href="/subscriptions">Add Video</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
