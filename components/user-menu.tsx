"use client"

import { useState } from "react"
import { User, LogOut, Settings, PlaySquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { AuthDialog } from "./auth/auth-dialog"
import Link from "next/link"

export function UserMenu() {
  const { user, logout } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  if (!user) {
    return (
      <>
        <Button variant="ghost" size="icon" onClick={() => setAuthDialogOpen(true)}>
          <User className="h-6 w-6 yt-text-primary" />
        </Button>
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="yt-bg-raised yt-text-primary">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 yt-bg-raised border-border">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="yt-bg-menu yt-text-primary">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium yt-text-primary">{user.name}</span>
            <span className="text-xs yt-text-secondary">{user.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem asChild className="yt-text-primary hover:yt-bg-menu">
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            Your Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="yt-text-primary hover:yt-bg-menu">
          <Link href="/subscriptions">
            <PlaySquare className="mr-2 h-4 w-4" />
            Your Subscriptions
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="yt-text-primary hover:yt-bg-menu">
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem onClick={logout} className="yt-text-primary hover:yt-bg-menu">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
