"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface KeyboardShortcutsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  const shortcuts = [
    {
      category: "General",
      items: [
        { key: "/", description: "Focus search bar" },
        { key: "?", description: "Show keyboard shortcuts" },
        { key: "i", description: "Toggle miniplayer" },
        { key: "Esc", description: "Close dialogs/miniplayer" },
      ],
    },
    {
      category: "Video Player",
      items: [
        { key: "Space", description: "Play/pause video" },
        { key: "k", description: "Play/pause video" },
        { key: "←", description: "Seek backward 5 seconds" },
        { key: "→", description: "Seek forward 5 seconds" },
        { key: "j", description: "Seek backward 10 seconds" },
        { key: "l", description: "Seek forward 10 seconds" },
        { key: "↑", description: "Volume up" },
        { key: "↓", description: "Volume down" },
        { key: "m", description: "Mute/unmute" },
        { key: "f", description: "Toggle fullscreen" },
        { key: "0-9", description: "Jump to 0%-90% of video" },
      ],
    },
    {
      category: "Navigation",
      items: [
        { key: "h", description: "Go to home page" },
        { key: "s", description: "Go to subscriptions" },
        { key: "g + h", description: "Go to home" },
        { key: "g + s", description: "Go to subscriptions" },
      ],
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {shortcuts.map((category) => (
            <div key={category.category}>
              <h3 className="text-lg font-semibold mb-3">{category.category}</h3>
              <div className="grid gap-2">
                {category.items.map((shortcut) => (
                  <div key={shortcut.key} className="flex items-center justify-between py-2">
                    <span className="text-sm">{shortcut.description}</span>
                    <Badge variant="outline" className="font-mono">
                      {shortcut.key}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-4">
          <p>Note: Some shortcuts only work when the video player is focused or on the watch page.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
