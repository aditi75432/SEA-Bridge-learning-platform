"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { SimpleAuth, type User } from "@/lib/simple-auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (userData: Omit<User, "id" | "createdAt">) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
  updateUser: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = SimpleAuth.getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    const result = await SimpleAuth.signIn(email, password)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return { success: result.success, error: result.error }
  }

  const signUp = async (userData: Omit<User, "id" | "createdAt">) => {
    const result = await SimpleAuth.signUp(userData)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return { success: result.success, error: result.error }
  }

  const signOut = () => {
    SimpleAuth.signOut()
    setUser(null)
  }

  const updateUser = (updates: Partial<User>) => {
    const updatedUser = SimpleAuth.updateUser(updates)
    if (updatedUser) {
      setUser(updatedUser)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
