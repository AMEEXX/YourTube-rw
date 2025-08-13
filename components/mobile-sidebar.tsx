"use client"

import { useState } from "react"
import Link from "next/link"
import { Home, Compass, PlaySquare, Clock, ThumbsUp, Folder, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Home", href: "/", active: true },
    { icon: Compass, label: "Explore", href: "/explore", active: false },
    { icon: PlaySquare, label: "Subscriptions", href: "/subscriptions", active: false },
  ]

  const libraryItems = [
    { icon: Folder, label: "Library", href: "/library" },
    { icon: Clock, label: "Watch later", href: "/watch-later" },
    { icon: ThumbsUp, label: "Liked videos", href: "/liked" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-60 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/" className="flex items-center gap-1" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white ml-1" />
            </div>
            <span className="text-xl font-bold text-foreground">YourTube</span>
          </Link>
        </div>

        <div className="p-3">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-6 h-10 px-3 ${
                    item.active ? "bg-muted hover:bg-muted" : "hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <hr className="my-3 border-border" />

          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground px-3">Library</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-1">
            {libraryItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-6 h-10 px-3 hover:bg-muted">
                  <item.icon className="h-6 w-6" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
