"use client"

import { useState } from "react"
import { Edit, Settings, PlaySquare, Clock, ThumbsUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import { EditProfileDialog } from "./edit-profile-dialog"
import { CreatePlaylistDialog } from "./create-playlist-dialog"
import { AccountSwitcher } from "./account-switcher"
import Link from "next/link"

export function UserProfile() {
  const { user } = useAuth()
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [createPlaylistOpen, setCreatePlaylistOpen] = useState(false)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Please sign in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <Button variant="outline" size="sm" onClick={() => setEditProfileOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              <div className="flex items-center gap-4">
                <Badge variant="secondary">{user.subscriptions.length} Subscriptions</Badge>
                <Badge variant="secondary">{user.playlists.length} Playlists</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <AccountSwitcher />
              <Link href="/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="subscriptions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="liked">Liked Videos</TabsTrigger>
          <TabsTrigger value="history">Watch History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Subscriptions</h2>
            <Link href="/subscriptions">
              <Button variant="outline">
                <PlaySquare className="h-4 w-4 mr-2" />
                Manage Subscriptions
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.subscriptions.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No subscriptions yet.</p>
                <Link href="/subscriptions">
                  <Button className="mt-2">Browse Channels</Button>
                </Link>
              </div>
            ) : (
              user.subscriptions.map((channelId) => (
                <Card key={channelId}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/channel-plus.png?height=48&width=48&query=channel+${channelId}`} />
                        <AvatarFallback>CH</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">Channel {channelId.slice(-6)}</h3>
                        <p className="text-sm text-muted-foreground">Subscribed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Playlists</h2>
            <Button onClick={() => setCreatePlaylistOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Playlist
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.playlists.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No playlists yet.</p>
                <Button onClick={() => setCreatePlaylistOpen(true)} className="mt-2">
                  Create Your First Playlist
                </Button>
              </div>
            ) : (
              user.playlists.map((playlist) => (
                <Card key={playlist.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded mb-3 flex items-center justify-center">
                      <PlaySquare className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{playlist.videos.length} videos</span>
                      <span>Created {new Date(playlist.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Liked Videos</h2>
            <ThumbsUp className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Your liked videos will appear here.</p>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Watch History</h2>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Your watch history will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>

      <EditProfileDialog open={editProfileOpen} onOpenChange={setEditProfileOpen} />
      <CreatePlaylistDialog open={createPlaylistOpen} onOpenChange={setCreatePlaylistOpen} />
    </div>
  )
}
