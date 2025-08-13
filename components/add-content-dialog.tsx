"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Video, List, Users } from "lucide-react"

interface AddContentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddContentDialog({ open, onOpenChange }: AddContentDialogProps) {
  const [channelUrl, setChannelUrl] = useState("")
  const [playlistUrl, setPlaylistUrl] = useState("")
  const [videoUrl, setVideoUrl] = useState("")

  const handleAddChannel = () => {
    // Add channel logic here
    console.log("Adding channel:", channelUrl)
    setChannelUrl("")
    onOpenChange(false)
  }

  const handleAddPlaylist = () => {
    // Add playlist logic here
    console.log("Adding playlist:", playlistUrl)
    setPlaylistUrl("")
    onOpenChange(false)
  }

  const handleAddVideo = () => {
    // Add video logic here
    console.log("Adding video:", videoUrl)
    setVideoUrl("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-yt-bg-primary border-yt-border">
        <DialogHeader>
          <DialogTitle className="text-yt-text-primary">Add Content to YourTube</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="channel" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-yt-bg-secondary">
            <TabsTrigger
              value="channel"
              className="text-yt-text-secondary data-[state=active]:text-yt-text-primary data-[state=active]:bg-yt-bg-primary"
            >
              <Users className="w-4 h-4 mr-2" />
              Channel
            </TabsTrigger>
            <TabsTrigger
              value="playlist"
              className="text-yt-text-secondary data-[state=active]:text-yt-text-primary data-[state=active]:bg-yt-bg-primary"
            >
              <List className="w-4 h-4 mr-2" />
              Playlist
            </TabsTrigger>
            <TabsTrigger
              value="video"
              className="text-yt-text-secondary data-[state=active]:text-yt-text-primary data-[state=active]:bg-yt-bg-primary"
            >
              <Video className="w-4 h-4 mr-2" />
              Video
            </TabsTrigger>
          </TabsList>

          <TabsContent value="channel" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="channel-url" className="text-yt-text-primary">
                Channel URL
              </Label>
              <Input
                id="channel-url"
                placeholder="https://www.youtube.com/@channelname"
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                className="bg-yt-bg-secondary border-yt-border text-yt-text-primary placeholder:text-yt-text-secondary"
              />
            </div>
            <Button onClick={handleAddChannel} className="w-full bg-yt-red hover:bg-yt-red/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Channel
            </Button>
          </TabsContent>

          <TabsContent value="playlist" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playlist-url" className="text-yt-text-primary">
                Playlist URL
              </Label>
              <Input
                id="playlist-url"
                placeholder="https://www.youtube.com/playlist?list=..."
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                className="bg-yt-bg-secondary border-yt-border text-yt-text-primary placeholder:text-yt-text-secondary"
              />
            </div>
            <Button onClick={handleAddPlaylist} className="w-full bg-yt-red hover:bg-yt-red/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Playlist
            </Button>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-url" className="text-yt-text-primary">
                Video URL
              </Label>
              <Input
                id="video-url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="bg-yt-bg-secondary border-yt-border text-yt-text-primary placeholder:text-yt-text-secondary"
              />
            </div>
            <Button onClick={handleAddVideo} className="w-full bg-yt-red hover:bg-yt-red/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
