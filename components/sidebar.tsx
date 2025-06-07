"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Compass, Settings, MessageSquare, ChevronRight, ChevronLeft } from "lucide-react"
import { useLocalization } from "./localization-provider"

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { t } = useLocalization()

  const links = [
    { href: "/", icon: Home, label: t("sidebar.home") },
    { href: "/courses", icon: BookOpen, label: t("sidebar.courses") },
    { href: "/explore", icon: Compass, label: t("sidebar.explore") },
    { href: "/settings", icon: Settings, label: t("sidebar.settings") },
  ]

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } hidden md:block`}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h2 className="font-semibold text-lg">{t("sidebar.navigation")}</h2>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="space-y-1 px-2">
        {links.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <link.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-500"}`} />
              {!collapsed && <span className="ml-3">{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-8 left-0 right-0 px-4">
        <Button variant="outline" className={`w-full flex items-center justify-center ${collapsed ? "px-2" : ""}`}>
          <MessageSquare className="h-5 w-5" />
          {!collapsed && <span className="ml-2">{t("sidebar.feedback")}</span>}
        </Button>
      </div>
    </div>
  )
}
