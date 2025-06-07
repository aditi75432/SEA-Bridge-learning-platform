"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/lib/cultural-data"

interface LocalizationContextType {
  currentLanguage: string
  t: (key: string, fallback?: string) => string
  setLanguage: (lang: string) => void
  isLoading: boolean
}

const LocalizationContext = createContext<LocalizationContextType | null>(null)

export function EnhancedLocalizationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load saved language or detect from browser
    const savedLang = localStorage.getItem("preferredLanguage")
    if (savedLang && translations[savedLang as keyof typeof translations]) {
      setCurrentLanguage(savedLang)
    } else {
      // Detect from browser
      const browserLang = navigator.language.split("-")[0]
      if (translations[browserLang as keyof typeof translations]) {
        setCurrentLanguage(browserLang)
      }
    }
    setIsLoading(false)
  }, [])

  const t = (key: string, fallback?: string): string => {
    const langTranslations = translations[currentLanguage as keyof typeof translations]
    if (!langTranslations) {
      return fallback || key
    }

    return langTranslations[key as keyof typeof langTranslations] || fallback || key
  }

  const setLanguage = (lang: string) => {
    if (translations[lang as keyof typeof translations]) {
      setCurrentLanguage(lang)
      localStorage.setItem("preferredLanguage", lang)
    }
  }

  return (
    <LocalizationContext.Provider
      value={{
        currentLanguage,
        t,
        setLanguage,
        isLoading,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  )
}

export function useLocalization() {
  const context = useContext(LocalizationContext)
  if (!context) {
    throw new Error("useLocalization must be used within EnhancedLocalizationProvider")
  }
  return context
}
