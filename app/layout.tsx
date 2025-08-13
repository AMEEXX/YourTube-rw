import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <GlobalKeyboardShortcuts />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
