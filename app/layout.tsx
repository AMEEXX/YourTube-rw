import type React from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/auth-context"
import { GlobalKeyboardShortcuts } from "@/components/global-keyboard-shortcuts"
import "./globals.css"

export const metadata: Metadata = {
  title: "YourTube - Productivity Video Platform",
  description: "A productivity-focused YouTube clone for curated content",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="yt-font-primary bg-[#0f0f0f] yt-text-primary">
        <AuthProvider>
          <GlobalKeyboardShortcuts />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
