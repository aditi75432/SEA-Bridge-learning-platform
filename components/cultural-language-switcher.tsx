"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

interface CulturalLanguageSwitcherProps {
  onChange?: (language: string) => void
}

export function CulturalLanguageSwitcher({ onChange }: CulturalLanguageSwitcherProps) {
  const [language, setLanguage] = useState<string>("en")

  useEffect(() => {
    // Get language from localStorage or cultural profile
    const savedProfile = localStorage.getItem("culturalProfile")
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      if (profile.language) {
        setLanguage(profile.language)
      }
    }
  }, [])

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)

    // Update localStorage
    const savedProfile = localStorage.getItem("culturalProfile")
    if (savedProfile) {
      const profile = JSON.parse(savedProfile)
      profile.language = newLanguage
      localStorage.setItem("culturalProfile", JSON.stringify(profile))
    }

    if (onChange) {
      onChange(newLanguage)
    }
  }

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fil", name: "Filipino", flag: "🇵🇭" },
    { code: "ceb", name: "Cebuano", flag: "🏝️" },
  ]

  const currentLanguage = languages.find((l) => l.code === language) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>
            {currentLanguage.flag} {currentLanguage.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
