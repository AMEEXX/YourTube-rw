"use client"

import { useEffect, useCallback } from "react"

export interface KeyboardShortcut {
  key: string
  description: string
  action: () => void
  global?: boolean
  preventDefault?: boolean
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") {
        // Exception: allow '/' to focus search even in inputs
        if (event.key !== "/") return
      }

      const shortcut = shortcuts.find((s) => s.key.toLowerCase() === event.key.toLowerCase())
      if (shortcut) {
        if (shortcut.preventDefault !== false) {
          event.preventDefault()
        }
        shortcut.action()
      }
    },
    [shortcuts, enabled],
  )

  useEffect(() => {
    if (enabled) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown, enabled])
}

// Global shortcuts that work across the entire app
export const globalShortcuts = [
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
    global: true,
  },
  {
    key: "?",
    description: "Show keyboard shortcuts",
    action: () => {
      // This will be handled by the component that uses this hook
    },
    global: true,
  },
]
