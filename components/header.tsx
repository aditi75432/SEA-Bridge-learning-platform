"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BookOpen, Info, Home, Waves, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageSelector } from "./language-selector"
import { useLocalization } from "./localization-provider"
import { AuthStatus } from "./auth-status"

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { t, isLoaded } = useLocalization()

  const routes = [
    {
      href: "/",
      label: isLoaded ? t("nav.home") : "Home",
      active: pathname === "/",
      icon: Home,
    },
    {
      href: "/courses",
      label: isLoaded ? t("nav.courses") : "Courses",
      active: pathname === "/courses",
      icon: BookOpen,
    },
    {
      href: "/about",
      label: isLoaded ? t("nav.about") : "About",
      active: pathname === "/about",
      icon: Info,
    },
    {
      href: "/cultural-onboarding",
      label: "Cultural Setup",
      active: pathname === "/cultural-onboarding",
      icon: Globe,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-400">
                    <img src="/logo.png" alt="Profile" className="h-5 w-5 object-cover"/>
                  </div>
                  <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                    SEA-Bridge
                  </span>
                </Link>
                <div className="grid gap-3">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground",
                        route.active && "text-blue-600 font-medium",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <route.icon className="h-5 w-5" />
                      {route.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden">
              <img src="/logo.png" alt="Profile" className="h-full w-full object-cover"/>
            </div>
            <span className="hidden bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-xl font-bold text-transparent sm:inline-block">
              SEA-Bridge
            </span>
          </Link>

          <nav className="hidden gap-6 lg:flex ml-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600",
                  route.active && "text-blue-600 font-semibold",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <AuthStatus />
        </div>
      </div>
    </header>
  )
}
