import Link from "next/link"
import { Home, Compass, PlaySquare, Clock, ThumbsUp, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
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
    <aside className="w-60 yt-bg-base border-r border-border h-[calc(100vh-64px)] overflow-y-auto sidebar hidden md:block transition-all duration-300 ease-out">
      <div className="p-3">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-6 h-10 px-3 transition-all duration-200 ease-out hover:scale-[1.02] yt-text-primary ${
                  item.active ? "yt-bg-raised hover:yt-bg-menu" : "hover:yt-bg-raised"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <hr className="my-3 border-border" />

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium yt-text-secondary px-3">Library</h3>
        </div>

        <nav className="space-y-1">
          {libraryItems.map((item, index) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-6 h-10 px-3 transition-all duration-200 ease-out hover:scale-[1.02] hover:yt-bg-raised yt-text-primary"
                style={{ animationDelay: `${(index + 3) * 50}ms` }}
              >
                <item.icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
