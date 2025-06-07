"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function UserSessionManager() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Track user activity
    const updateLastActive = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          await fetch("/api/user/activity", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        } catch (error) {
          console.error("Failed to update activity:", error)
        }
      }
    }

    // Update last active on mount and every 5 minutes
    updateLastActive()
    const interval = setInterval(updateLastActive, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [session, status])

  return null // This component doesn't render anything
}
