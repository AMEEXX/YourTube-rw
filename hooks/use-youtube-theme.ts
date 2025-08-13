"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { getThemeColors, createThemeStyles } from "@/lib/theme-config"

export function useYouTubeTheme() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (mounted ? theme : "light") as "light" | "dark"
  const colors = getThemeColors(currentTheme)
  const styles = createThemeStyles(currentTheme)

  const toggleTheme = () => {
    setTheme(currentTheme === "light" ? "dark" : "light")
  }

  return {
    theme: currentTheme,
    colors,
    styles,
    toggleTheme,
    mounted,
    // Utility functions for common styling patterns
    getBackgroundClass: () => `yt-bg-primary`,
    getTextClass: (variant: "primary" | "secondary" | "tertiary" = "primary") => `yt-text-${variant}`,
    getHoverClass: () => `yt-hover`,
    getBorderClass: () => `yt-border`,
  }
}
