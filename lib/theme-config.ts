import type React from "react"
// YouTube Theme Configuration Object
export const youtubeTheme = {
  light: {
    colors: {
      background: {
        primary: "#ffffff",
        secondary: "#f9f9f9",
        hover: "#f0f0f0",
      },
      text: {
        primary: "#000000",
        secondary: "#555555",
        tertiary: "#888888",
      },
      border: {
        default: "#dddddd",
        light: "#e5e5e5",
      },
    },
  },
  dark: {
    colors: {
      background: {
        primary: "#181818",
        secondary: "#0f0f0f", // Video page background
        hover: "#282828",
      },
      text: {
        primary: "#ffffff",
        secondary: "#aaaaaa",
        tertiary: "#888888",
      },
      border: {
        default: "#303030",
        light: "#404040",
      },
    },
  },
} as const

// Theme utility functions
export const getThemeColors = (theme: "light" | "dark") => {
  return youtubeTheme[theme].colors
}

// CSS-in-JS theme object for dynamic styling
export const createThemeStyles = (theme: "light" | "dark") => {
  const colors = getThemeColors(theme)

  return {
    backgroundColor: colors.background.primary,
    color: colors.text.primary,
    "--yt-bg-primary": colors.background.primary,
    "--yt-bg-secondary": colors.background.secondary,
    "--yt-bg-hover": colors.background.hover,
    "--yt-text-primary": colors.text.primary,
    "--yt-text-secondary": colors.text.secondary,
    "--yt-text-tertiary": colors.text.tertiary,
    "--yt-border": colors.border.default,
    "--yt-border-light": colors.border.light,
  } as React.CSSProperties
}
