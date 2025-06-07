"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define user type
export interface User {
  id: string
  name: string
  email: string
  country: string
  language: string
  avatar?: string
}

// Define auth context type
interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>
}

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
})

// Demo users for testing
const demoUsers = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@seabridge.com",
    password: "demo123",
    country: "Singapore",
    language: "en",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@student.com",
    password: "demo123",
    country: "Philippines",
    language: "fil",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Nguyen Van A",
    email: "nguyen@student.com",
    password: "demo123",
    country: "Vietnam",
    language: "vi",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Find user in demo users
      const foundUser = demoUsers.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        // Create user object without password
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("user", JSON.stringify(userWithoutPassword))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Register function
  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if email already exists
      if (demoUsers.some((u) => u.email === userData.email)) {
        return false
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        country: userData.country,
        language: userData.language,
        avatar: userData.avatar || "/placeholder.svg?height=40&width=40",
      }

      // Set user and store in localStorage
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)
