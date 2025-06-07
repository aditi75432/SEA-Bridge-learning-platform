"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  BookOpen,
  Compass,
  Settings,
  ChevronRight,
  ChevronLeft,
  Download,
  Trophy,
  Bell,
  Brain,
  Mic,
  Users,
  Eye,
  Target,
  Map,
  Shield,
  HardDrive,
} from "lucide-react"
import { useLocalization } from "@/components/localization-provider"
import { useCulturalContext } from "@/components/cultural-context-provider"
import { AITutorChat } from "@/components/ai-tutor-chat"
import { NotificationsPanel } from "@/components/notifications-panel"
import { SpeechSettings } from "@/components/speech-settings"

export function EnhancedSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [showAITutor, setShowAITutor] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSpeechSettings, setShowSpeechSettings] = useState(false)
  const pathname = usePathname()
  const { t } = useLocalization()
  const { profile } = useCulturalContext()

  // Handle case where profile is null
  const safeProfile = profile || {
    country: "Philippines",
    region: "Luzon",
    language: "fil",
    tone: "informal",
    schoolType: "public",
    learningPace: "flexible",
    visualTheme: "rice-terraces",
    curriculum: "DepEd K-12",
  }

  const links = [
    { href: "/", icon: Home, label: "Home", badge: null },
    { href: "/courses", icon: BookOpen, label: "My Courses", badge: "3" },
    { href: "/explore", icon: Compass, label: "Explore", badge: "New" },
    { href: "/recommendations", icon: Target, label: "For You", badge: "AI" },
    { href: "/study-groups", icon: Users, label: "Study Groups", badge: "2" },
    { href: "/peer-learning", icon: Users, label: "Peer Learning", badge: "Live" },
    { href: "/tutoring", icon: Brain, label: "AI Tutors", badge: "24/7" },
    { href: "/quests", icon: Map, label: "Cultural Quests", badge: "RPG" },
    { href: "/ar-vr", icon: Eye, label: "AR/VR", badge: "Beta" },
    { href: "/blockchain", icon: Shield, label: "Certificates", badge: "Verified" },
    { href: "/offline", icon: HardDrive, label: "Offline", badge: "Sync" },
    { href: "/downloads", icon: Download, label: "Downloads", badge: null },
    { href: "/achievements", icon: Trophy, label: "Achievements", badge: "2" },
    { href: "/settings", icon: Settings, label: "Settings", badge: null },
  ]

  const weeklyProgress = 65 // Example progress

  // Get user display info with safe defaults
  const userName = profile ? "Maria Santos" : "Student"
  const userLocation = safeProfile.country
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <>
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          collapsed ? "w-16" : "w-80"
        } hidden lg:block shadow-sm`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {userInitial}
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900 dark:text-dark">{userName}</div>
                  <div className="text-xs text-gray-500">{userLocation}</div>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Cultural Setup Prompt (if no profile) */}
        {!profile && !collapsed && (
          <div className="p-4 border-b border-gray-100 bg-primary/5">
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-primary">🌟 Personalize Your Experience</div>
              <Button asChild size="sm" className="w-full text-xs">
                <Link href="/cultural-onboarding">Complete Setup</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Weekly Progress */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-100">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-gray-900 dark:text-dark">Weekly Goal</span>
                <span className="text-xs text-gray-500">{weeklyProgress}%</span>
              </div>
              <Progress value={weeklyProgress} className="h-2" />
              <div className="text-xs text-gray-500">3 of 5 courses completed this week</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-3 rounded-xl transition-all group ${
                  isActive
                    ? "bg-primary/10 text-primary border-2 border-primary/20"
                    : "text-gray-700 hover:bg-gray-50 border-2 border-transparent hover:border-gray-100"
                }`}
              >
                <link.icon
                  className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-500 group-hover:text-gray-700"}`}
                />

                {!collapsed && (
                  <>
                    <span className="ml-3 font-medium">{link.label}</span>
                    {link.badge && (
                      <Badge variant={isActive ? "default" : "secondary"} className="ml-auto text-xs">
                        {link.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-100 mt-auto">
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-2 border-secondary/20 hover:border-secondary hover:bg-secondary/5"
                onClick={() => setShowAITutor(true)}
              >
                <Brain className="h-4 w-4 mr-2" />
                Ask AI Tutor
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-600 hover:text-gray-900"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-auto text-xs">
                  2
                </Badge>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-600 hover:text-gray-900"
                onClick={() => setShowSpeechSettings(true)}
              >
                <Mic className="h-4 w-4 mr-2" />
                Voice Settings
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* AI Tutor Chat */}
      <AITutorChat
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        courseContext={pathname.includes("/courses/") ? "Current Course" : undefined}
      />

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      {/* Speech Settings */}
      <SpeechSettings isOpen={showSpeechSettings} onClose={() => setShowSpeechSettings(false)} />
    </>
  )
}
