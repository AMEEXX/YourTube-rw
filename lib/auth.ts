"use client"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  subscriptions: string[]
  playlists: Playlist[]
  preferences: {
    theme: "light" | "dark" | "system"
    autoplay: boolean
    notifications: boolean
  }
}

export interface Playlist {
  id: string
  name: string
  description: string
  videos: string[]
  createdAt: string
}

// Mock authentication functions - in a real app, these would call your backend
export const authService = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === "demo@yourtube.com" && password === "demo123") {
      const user: User = {
        id: "1",
        email: "demo@yourtube.com",
        name: "Demo User",
        avatar: "/diverse-user-avatars.png",
        subscriptions: ["UC_x5XG1OV2P6uZZ5FSM9Ttw", "UCWv7vMbMWH4-V0ZXdmDpPBA"],
        playlists: [
          {
            id: "1",
            name: "Coding Tutorials",
            description: "My favorite programming tutorials",
            videos: ["dQw4w9WgXcQ", "jNQXAC9IVRw"],
            createdAt: "2024-01-15",
          },
        ],
        preferences: {
          theme: "system",
          autoplay: true,
          notifications: true,
        },
      }
      localStorage.setItem("yourtube_user", JSON.stringify(user))
      return user
    }
    throw new Error("Invalid credentials")
  },

  async signup(email: string, password: string, name: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      avatar: `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(name)}+avatar`,
      subscriptions: [],
      playlists: [],
      preferences: {
        theme: "system",
        autoplay: true,
        notifications: true,
      },
    }
    localStorage.setItem("yourtube_user", JSON.stringify(user))
    return user
  },

  async logout(): Promise<void> {
    localStorage.removeItem("yourtube_user")
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem("yourtube_user")
    return userData ? JSON.parse(userData) : null
  },

  async updateUser(updates: Partial<User>): Promise<User> {
    const currentUser = this.getCurrentUser()
    if (!currentUser) throw new Error("No user logged in")

    const updatedUser = { ...currentUser, ...updates }
    localStorage.setItem("yourtube_user", JSON.stringify(updatedUser))
    return updatedUser
  },
}
