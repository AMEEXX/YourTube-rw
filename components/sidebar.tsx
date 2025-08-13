import Link from "next/link"
import { Home, PlaySquare, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const menuItems = [
    { icon: Home, label: "Home", href: "/", active: true },
    { icon: PlaySquare, label: "Subscriptions", href: "/subscriptions", active: false },
  ]

  const whitelistedChannels = [
    { icon: Users, label: "Tech Academy", href: "/channel/tech-academy" },
    { icon: Users, label: "Code Masters", href: "/channel/code-masters" },
    { icon: Users, label: "Web Dev Pro", href: "/channel/web-dev-pro" },
    { icon: Clock, label: "Watch later", href: "/watch-later" },
  ]

  return (
    <aside className="fixed left-0 top-16 w-60 bg-white dark:bg-[#181818] border-r border-gray-200 dark:border-gray-700 h-[calc(100vh-64px)] overflow-y-auto hidden md:block transition-all duration-300 ease-out z-10">
      <div className="p-3">
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-6 h-10 px-3 transition-all duration-200 ease-out hover:scale-[1.02] text-black dark:text-white ${
                  item.active
                    ? "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <hr className="my-3 border-gray-200 dark:border-gray-700" />

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 px-3">Whitelisted Channels</h3>
        </div>

        <nav className="space-y-1">
          {whitelistedChannels.map((item, index) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-6 h-10 px-3 transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
                style={{ animationDelay: `${(index + 2) * 50}ms` }}
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
