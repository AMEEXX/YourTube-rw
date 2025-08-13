"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { Miniplayer } from "@/components/miniplayer"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"

export function GlobalKeyboardShortcuts() {
  const router = useRouter()
  const [miniplayerVisible, setMiniplayerVisible] = useState(false)
  const [shortcutsDialogOpen, setShortcutsDialogOpen] = useState(false)

  const globalShortcuts = [
    {
      key: "/",
      description: "Focus search bar",
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
          searchInput.select()
        }
      },
    },
    {
      key: "?",
      description: "Show keyboard shortcuts",
      action: () => {
        setShortcutsDialogOpen(true)
      },
    },
    {
      key: "i",
      description: "Toggle miniplayer",
      action: () => {
        setMiniplayerVisible(!miniplayerVisible)
      },
    },
    {
      key: "Escape",
      description: "Close dialogs/miniplayer",
      action: () => {
        setMiniplayerVisible(false)
        setShortcutsDialogOpen(false)
      },
    },
    {
      key: "h",
      description: "Go to home page",
      action: () => {
        router.push("/")
      },
    },
    {
      key: "s",
      description: "Go to subscriptions",
      action: () => {
        router.push("/subscriptions")
      },
    },
  ]

  useKeyboardShortcuts(globalShortcuts)

  return (
    <>
      <Miniplayer
        isVisible={miniplayerVisible}
        onClose={() => setMiniplayerVisible(false)}
        title="React Tutorial - Learn React in 30 Minutes"
      />
      <KeyboardShortcutsDialog open={shortcutsDialogOpen} onOpenChange={setShortcutsDialogOpen} />
    </>
  )
}
