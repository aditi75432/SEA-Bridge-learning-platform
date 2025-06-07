"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, HardDrive, FolderSyncIcon as Sync, Database, Cloud, BookOpen, Play, Brain } from "lucide-react"

interface OfflineContent {
  id: string
  type: "course" | "quiz" | "video" | "audio" | "document"
  title: string
  size: number
  downloadedAt: Date
  lastAccessed: Date
  priority: "high" | "medium" | "low"
  language: string
  culturalContext: string
}

interface SyncQueue {
  id: string
  action: "create" | "update" | "delete"
  type: "progress" | "quiz_result" | "certificate" | "peer_interaction"
  data: any
  timestamp: Date
  retryCount: number
}

interface OfflineContextType {
  isOnline: boolean
  storageUsed: number
  storageLimit: number
  downloadedContent: OfflineContent[]
  syncQueue: SyncQueue[]
  downloadContent: (contentId: string) => Promise<void>
  removeContent: (contentId: string) => Promise<void>
  syncData: () => Promise<void>
  addToSyncQueue: (item: Omit<SyncQueue, "id" | "timestamp" | "retryCount">) => void
}

const OfflineContext = createContext<OfflineContextType | null>(null)

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)
  const [storageUsed, setStorageUsed] = useState(0)
  const [storageLimit] = useState(2048) // 2GB limit
  const [downloadedContent, setDownloadedContent] = useState<OfflineContent[]>([])
  const [syncQueue, setSyncQueue] = useState<SyncQueue[]>([])

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("SW registered:", registration))
        .catch((error) => console.log("SW registration failed:", error))
    }

    // Monitor online status
    const handleOnline = () => {
      setIsOnline(true)
      syncData()
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load offline data from IndexedDB
    loadOfflineData()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const loadOfflineData = async () => {
    try {
      // Simulate loading from IndexedDB
      const mockContent: OfflineContent[] = [
        {
          id: "1",
          type: "course",
          title: "AI Fundamentals (Offline)",
          size: 156,
          downloadedAt: new Date("2024-01-20"),
          lastAccessed: new Date(),
          priority: "high",
          language: "Filipino",
          culturalContext: "Philippines",
        },
        {
          id: "2",
          type: "video",
          title: "Rice Terraces Engineering",
          size: 89,
          downloadedAt: new Date("2024-01-18"),
          lastAccessed: new Date("2024-01-22"),
          priority: "medium",
          language: "English",
          culturalContext: "Philippines",
        },
      ]

      setDownloadedContent(mockContent)
      setStorageUsed(mockContent.reduce((total, item) => total + item.size, 0))
    } catch (error) {
      console.error("Failed to load offline data:", error)
    }
  }

  const downloadContent = async (contentId: string) => {
    // Simulate content download
    const newContent: OfflineContent = {
      id: contentId,
      type: "course",
      title: `Course ${contentId}`,
      size: Math.floor(Math.random() * 200) + 50,
      downloadedAt: new Date(),
      lastAccessed: new Date(),
      priority: "medium",
      language: "Filipino",
      culturalContext: "Philippines",
    }

    setDownloadedContent((prev) => [...prev, newContent])
    setStorageUsed((prev) => prev + newContent.size)
  }

  const removeContent = async (contentId: string) => {
    const content = downloadedContent.find((c) => c.id === contentId)
    if (content) {
      setDownloadedContent((prev) => prev.filter((c) => c.id !== contentId))
      setStorageUsed((prev) => prev - content.size)
    }
  }

  const addToSyncQueue = (item: Omit<SyncQueue, "id" | "timestamp" | "retryCount">) => {
    const syncItem: SyncQueue = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date(),
      retryCount: 0,
    }
    setSyncQueue((prev) => [...prev, syncItem])
  }

  const syncData = async () => {
    if (!isOnline || syncQueue.length === 0) return

    try {
      // Process sync queue
      for (const item of syncQueue) {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        console.log("Syncing:", item)
      }

      setSyncQueue([])
    } catch (error) {
      console.error("Sync failed:", error)
    }
  }

  const value: OfflineContextType = {
    isOnline,
    storageUsed,
    storageLimit,
    downloadedContent,
    syncQueue,
    downloadContent,
    removeContent,
    syncData,
    addToSyncQueue,
  }

  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>
}

export function useOffline() {
  const context = useContext(OfflineContext)
  if (!context) {
    throw new Error("useOffline must be used within OfflineProvider")
  }
  return context
}

export function OfflineManager() {
  const { isOnline, storageUsed, storageLimit, downloadedContent, syncQueue, removeContent, syncData } = useOffline()

  const storagePercentage = (storageUsed / storageLimit) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">Offline Learning</h2>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Badge variant="default" className="bg-forest text-white">
              <Wifi className="h-3 w-3 mr-1" />
              Online
            </Badge>
          ) : (
            <Badge variant="destructive">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </Badge>
          )}
        </div>
      </div>

      {/* Storage Overview */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-primary" />
            Storage Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Used Storage</span>
              <span>
                {storageUsed} MB / {storageLimit} MB
              </span>
            </div>
            <Progress value={storagePercentage} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{downloadedContent.length}</div>
              <div className="text-xs text-gray-600">Downloaded Items</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-secondary">{syncQueue.length}</div>
              <div className="text-xs text-gray-600">Pending Sync</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-forest">{Math.round(storagePercentage)}%</div>
              <div className="text-xs text-gray-600">Storage Used</div>
            </div>
          </div>

          {syncQueue.length > 0 && (
            <Button
              onClick={syncData}
              disabled={!isOnline}
              className="w-full bg-gradient-to-r from-secondary to-forest"
            >
              <Sync className="h-4 w-4 mr-2" />
              Sync Now ({syncQueue.length} items)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Downloaded Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-secondary" />
            Downloaded Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {downloadedContent.map((content) => (
              <div key={content.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                    {content.type === "course" && <BookOpen className="h-5 w-5" />}
                    {content.type === "video" && <Play className="h-5 w-5" />}
                    {content.type === "quiz" && <Brain className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="font-medium">{content.title}</div>
                    <div className="text-sm text-gray-600">
                      {content.size} MB • {content.language} • {content.culturalContext}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      content.priority === "high"
                        ? "border-red-200 text-red-700"
                        : content.priority === "medium"
                          ? "border-yellow-200 text-yellow-700"
                          : "border-gray-200 text-gray-700"
                    }
                  >
                    {content.priority}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => removeContent(content.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sync Status */}
      {syncQueue.length > 0 && (
        <Card className="border-2 border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-accent" />
              Pending Sync
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {syncQueue.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span>
                    {item.type} - {item.action}
                  </span>
                  <Badge variant="outline">{item.retryCount > 0 ? `Retry ${item.retryCount}` : "Pending"}</Badge>
                </div>
              ))}
              {syncQueue.length > 3 && <div className="text-sm text-gray-600">+{syncQueue.length - 3} more items</div>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
