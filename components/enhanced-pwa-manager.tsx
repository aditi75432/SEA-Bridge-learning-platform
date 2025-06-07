"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Download,
  Wifi,
  WifiOff,
  HardDrive,
  FolderSyncIcon as Sync,
  Bell,
  Settings,
  Share,
  Home,
} from "lucide-react"

interface PWAInstallPrompt {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function EnhancedPWAManager() {
  const [isOnline, setIsOnline] = useState(true)
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [offlineStorage, setOfflineStorage] = useState(0)
  const [maxStorage, setMaxStorage] = useState(100)

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches
      const isInWebAppiOS = (window.navigator as any).standalone === true
      setIsInstalled(isStandalone || isInWebAppiOS)
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as any)
    }

    // Listen for online/offline
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Check for updates
    const checkForUpdates = async () => {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration?.waiting) {
          setUpdateAvailable(true)
        }
      }
    }

    // Estimate storage usage
    const checkStorage = async () => {
      if ("storage" in navigator && "estimate" in navigator.storage) {
        const estimate = await navigator.storage.estimate()
        const used = estimate.usage || 0
        const quota = estimate.quota || 0
        setOfflineStorage(used / 1024 / 1024) // Convert to MB
        setMaxStorage(quota / 1024 / 1024) // Convert to MB
      }
    }

    checkInstalled()
    checkForUpdates()
    checkStorage()

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return

    await installPrompt.prompt()
    const choice = await installPrompt.userChoice

    if (choice.outcome === "accepted") {
      setInstallPrompt(null)
      setIsInstalled(true)
    }
  }

  const handleUpdate = async () => {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration?.waiting) {
        registration.waiting.postMessage({ type: "SKIP_WAITING" })
        window.location.reload()
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SEA Bridge - Cultural Learning",
          text: "Learn with culturally-aware education platform for Southeast Asia",
          url: window.location.origin,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        new Notification("SEA Bridge", {
          body: "Notifications enabled! You'll get learning reminders and updates.",
          icon: "/icon-192.png",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display">App Settings</h2>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Badge variant="default" className="bg-green-500">
              <Wifi className="h-3 w-3 mr-1" />
              Online
            </Badge>
          ) : (
            <Badge variant="destructive">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline
            </Badge>
          )}
          {isInstalled && (
            <Badge variant="outline" className="border-blue-200 text-blue-700">
              <Smartphone className="h-3 w-3 mr-1" />
              Installed
            </Badge>
          )}
        </div>
      </div>

      {/* Installation Card */}
      {!isInstalled && installPrompt && (
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Install SEA Bridge App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Install SEA Bridge as an app for the best learning experience. Works offline and feels like a native app!
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <WifiOff className="h-4 w-4 text-green-500" />
                <span>Works offline</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-500" />
                <span>Push notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-purple-500" />
                <span>Home screen icon</span>
              </div>
              <div className="flex items-center gap-2">
                <Sync className="h-4 w-4 text-orange-500" />
                <span>Background sync</span>
              </div>
            </div>

            <Button onClick={handleInstall} className="w-full bg-gradient-to-r from-primary to-secondary">
              <Download className="h-4 w-4 mr-2" />
              Install App
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Update Available */}
      {updateAvailable && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sync className="h-5 w-5 text-orange-600" />
                <div>
                  <h4 className="font-medium">Update Available</h4>
                  <p className="text-sm text-gray-600">A new version of SEA Bridge is ready</p>
                </div>
              </div>
              <Button onClick={handleUpdate} size="sm">
                Update Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Storage Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-secondary" />
            Offline Storage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Used Storage</span>
              <span>
                {offlineStorage.toFixed(1)} MB / {maxStorage.toFixed(0)} MB
              </span>
            </div>
            <Progress value={(offlineStorage / maxStorage) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-gray-600">Courses Offline</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-secondary">45</div>
              <div className="text-xs text-gray-600">Quizzes Cached</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-forest">8</div>
              <div className="text-xs text-gray-600">Videos Downloaded</div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Manage Offline Content
          </Button>
        </CardContent>
      </Card>

      {/* App Features */}
      <Card>
        <CardHeader>
          <CardTitle>App Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Get learning reminders and updates</p>
                </div>
              </div>
              <Button onClick={requestNotificationPermission} size="sm" variant="outline">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Share className="h-5 w-5 text-green-500" />
                <div>
                  <h4 className="font-medium">Share App</h4>
                  <p className="text-sm text-gray-600">Invite friends to learn together</p>
                </div>
              </div>
              <Button onClick={handleShare} size="sm" variant="outline">
                Share
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sync className="h-5 w-5 text-purple-500" />
                <div>
                  <h4 className="font-medium">Background Sync</h4>
                  <p className="text-sm text-gray-600">Sync progress when connection returns</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cultural Adaptation */}
      <Card className="border-2 border-forest/20 bg-forest/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🌏</span>
            Cultural Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">🗣️</span>
              <span>Multi-dialect support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎨</span>
              <span>Cultural UI themes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📚</span>
              <span>Local content priority</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🤝</span>
              <span>Respectful communication</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
