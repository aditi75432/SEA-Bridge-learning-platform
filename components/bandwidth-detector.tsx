"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

type ConnectionSpeed = "low" | "medium" | "high" | "unknown"

type BandwidthContextType = {
  connectionSpeed: ConnectionSpeed
  isOffline: boolean
}

const BandwidthContext = createContext<BandwidthContextType>({
  connectionSpeed: "unknown",
  isOffline: false,
})

export function BandwidthDetector({ children }: { children: React.ReactNode }) {
  const [connectionSpeed, setConnectionSpeed] = useState<ConnectionSpeed>("unknown")
  const [isOffline, setIsOffline] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if online/offline
    const handleOnline = () => {
      setIsOffline(false)
    }

    const handleOffline = () => {
      setIsOffline(true)
      toast({
        title: "You're offline",
        description: "You're now viewing cached lessons. Data will sync when online.",
        duration: 5000,
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Initial check
    setIsOffline(!navigator.onLine)

    // Detect connection speed
    const checkConnectionSpeed = async () => {
      if (!navigator.onLine) return

      try {
        const startTime = Date.now()
        // Fetch a small file to test connection speed
        const response = await fetch("/api/connection-test?_=" + new Date().getTime())
        const endTime = Date.now()

        const duration = endTime - startTime

        // Rough estimation of connection speed
        if (duration < 100) {
          setConnectionSpeed("high") // 4G/5G
        } else if (duration < 500) {
          setConnectionSpeed("medium") // 3G
        } else {
          setConnectionSpeed("low") // 2G or worse
        }
      } catch (error) {
        console.error("Error checking connection speed:", error)
      }
    }

    checkConnectionSpeed()

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [toast])

  return <BandwidthContext.Provider value={{ connectionSpeed, isOffline }}>{children}</BandwidthContext.Provider>
}

export const useBandwidth = () => useContext(BandwidthContext)
