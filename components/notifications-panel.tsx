"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Trophy, BookOpen, Calendar, Users, Zap } from "lucide-react"

interface Notification {
  id: string
  type: "achievement" | "course" | "social" | "system" | "cultural"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  icon: string
}

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You've earned the 'Quiz Master' badge for scoring 100% on 5 quizzes!",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      icon: "🏆",
    },
    {
      id: "2",
      type: "course",
      title: "New Course Available",
      message: "Introduction to Artificial Intelligence is now available in Filipino!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      icon: "🤖",
    },
    {
      id: "3",
      type: "social",
      title: "Friend Achievement",
      message: "Linh Nguyen just completed 'Marine Biology of Coral Reefs'!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      read: true,
      icon: "👥",
    },
    {
      id: "4",
      type: "cultural",
      title: "Cultural Event",
      message: "Today is Rizal Day in the Philippines! Learn about national heroes in our history course.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      read: true,
      icon: "🇵🇭",
    },
    {
      id: "5",
      type: "system",
      title: "Weekly Progress",
      message: "Great week! You completed 3 courses and earned 450 XP. Keep it up!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      icon: "📊",
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="h-4 w-4 text-accent" />
      case "course":
        return <BookOpen className="h-4 w-4 text-primary" />
      case "social":
        return <Users className="h-4 w-4 text-secondary" />
      case "cultural":
        return <Calendar className="h-4 w-4 text-forest" />
      case "system":
        return <Zap className="h-4 w-4 text-gray-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "border-accent/20 bg-accent/5"
      case "course":
        return "border-primary/20 bg-primary/5"
      case "social":
        return "border-secondary/20 bg-secondary/5"
      case "cultural":
        return "border-forest/20 bg-forest/5"
      case "system":
        return "border-gray-200 bg-gray-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-16">
      <Card className="w-full max-w-md mx-4 shadow-2xl max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-0">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-gray-600">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 hover:bg-gray-50 transition-colors cursor-pointer ${getTypeColor(
                    notification.type,
                  )} ${!notification.read ? "bg-blue-50/50" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex-shrink-0 mt-1">{getTypeIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                          </h4>
                          <span className="text-2xl">{notification.icon}</span>
                          {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <div className="p-4 border-t bg-gray-50">
          <Button variant="outline" className="w-full" onClick={onClose}>
            View All Notifications
          </Button>
        </div>
      </Card>
    </div>
  )
}
