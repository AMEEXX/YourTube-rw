"use client"

import { useState } from "react"
import { ChevronDown, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { AuthDialog } from "./auth/auth-dialog"

// Mock additional accounts for demonstration
const mockAccounts = [
  {
    id: "2",
    name: "Work Account",
    email: "work@company.com",
    avatar: "/placeholder-w4t33.png",
  },
  {
    id: "3",
    name: "Personal Alt",
    email: "alt@personal.com",
    avatar: "/personal-alt.png",
  },
]

export function AccountSwitcher() {
  const { user } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)

  if (!user) return null

  const allAccounts = [user, ...mockAccounts]

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="justify-between min-w-[200px] bg-transparent">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-xs">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="truncate">{user.name}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2">Switch Account</p>
            {allAccounts.map((account) => (
              <DropdownMenuItem key={account.id} className="flex items-center gap-3 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={account.avatar || "/placeholder.svg"} alt={account.name} />
                  <AvatarFallback className="text-xs">{account.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{account.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{account.email}</p>
                </div>
                {account.id === user.id && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setAuthDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Another Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  )
}
