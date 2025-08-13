import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { SearchBar } from "@/components/search-bar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import Link from "next/link"

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white dark:bg-[#181818] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <Link href="/" className="flex items-center gap-1">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white ml-1" />
          </div>
          <span className="text-xl font-bold text-black dark:text-white">YourTube</span>
        </Link>
      </div>

      <SearchBar />

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
