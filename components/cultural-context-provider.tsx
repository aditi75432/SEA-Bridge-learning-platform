"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getCulturalContent, type CulturalProfile, type CulturalContent } from "@/lib/cultural-data"

interface CulturalContextType {
  profile: CulturalProfile | null
  content: CulturalContent
  updateProfile: (updates: Partial<CulturalProfile>) => void
  isLoading: boolean
  getLocalizedCourse: (subject: string) => any
  getPersonalizedGreeting: () => string
  getEncouragement: () => string
}

const CulturalContext = createContext<CulturalContextType | null>(null)

export function CulturalContextProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<CulturalProfile | null>(null)
  const [content, setContent] = useState<CulturalContent>({
    greetings: [],
    encouragement: [],
    examples: [],
    culturalReferences: [],
    localHeroes: [],
    traditionalGames: [],
    localFood: [],
    landmarks: [],
    festivals: [],
    mythology: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load saved profile or set default
    const savedProfile = localStorage.getItem("culturalProfile")
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      setProfile(parsed)
      setContent(getCulturalContent(parsed.country, parsed.region))
    } else {
      // Default profile
      const defaultProfile: CulturalProfile = {
        country: "Philippines",
        region: "Luzon",
        language: "fil",
        tone: "informal",
        schoolType: "public",
        learningPace: "flexible",
        visualTheme: "rice-terraces",
        curriculum: "DepEd K-12",
      }
      setProfile(defaultProfile)
      setContent(getCulturalContent(defaultProfile.country, defaultProfile.region))
    }
    setIsLoading(false)
  }, [])

  const updateProfile = (updates: Partial<CulturalProfile>) => {
    if (!profile) return

    const newProfile = { ...profile, ...updates }
    setProfile(newProfile)
    setContent(getCulturalContent(newProfile.country, newProfile.region))
    localStorage.setItem("culturalProfile", JSON.stringify(newProfile))
  }

  const getLocalizedCourse = (subject: string) => {
    if (!profile) return null

    const courses = {
      Philippines: {
        Luzon: {
          math: {
            title: "Matematika para sa Pang-araw-araw",
            description: "Matuto ng matematika gamit ang mga halimbawa mula sa sari-sari store at palengke",
            examples: ["Pagbilang ng sukli sa tindahan", "Paghati ng pizza sa pamilya", "Pagsukat ng lupa"],
          },
          science: {
            title: "Agham at Kalikasan",
            description: "Tuklasin ang agham sa pamamagitan ng mga halimbawa mula sa Pilipinas",
            examples: ["Bulkang Mayon", "Rice Terraces ng Banaue", "Dagat ng Batangas"],
          },
          history: {
            title: "Kasaysayan ng Pilipinas",
            description: "Alamin ang mga bayaning Pilipino at kanilang mga ginawa",
            examples: ["Dr. Jose Rizal", "Andres Bonifacio", "Emilio Aguinaldo"],
          },
        },
        Visayas: {
          math: {
            title: "Matematika sa Adlaw-adlaw",
            description: "Kat-ona ang matematika pinaagi sa mga pananglitan gikan sa merkado ug balay",
            examples: ["Pagkwenta sa sukli", "Paghati sa pagkaon", "Pagsukod sa yuta"],
          },
          science: {
            title: "Siyensya ug Kinaiyahan",
            description: "Tukiha ang siyensya pinaagi sa mga pananglitan gikan sa Bisaya",
            examples: ["Chocolate Hills", "Kawasan Falls", "Boracay Beach"],
          },
          history: {
            title: "Kasaysayan sa Pilipinas",
            description: "Hibaloi ang mga bayaning Bisaya ug ilang mga nahimo",
            examples: ["Lapu-Lapu", "Graciano Lopez Jaena", "Pantaleon Villegas"],
          },
        },
      },
    }

    return (
      courses[profile.country as keyof typeof courses]?.[profile.region as keyof typeof courses.Philippines]?.[
        subject as keyof typeof courses.Philippines.Luzon
      ] || null
    )
  }

  const getPersonalizedGreeting = () => {
    if (!profile || content.greetings.length === 0) return "Hello!"

    const greeting = content.greetings[Math.floor(Math.random() * content.greetings.length)]
    const timeOfDay = new Date().getHours()

    if (profile.language === "fil") {
      if (timeOfDay < 12) return "Magandang umaga!"
      if (timeOfDay < 18) return "Magandang hapon!"
      return "Magandang gabi!"
    }

    if (profile.language === "ceb") {
      if (timeOfDay < 12) return "Maayong buntag!"
      if (timeOfDay < 18) return "Maayong udto!"
      return "Maayong gabii!"
    }

    return greeting
  }

  const getEncouragement = () => {
    if (content.encouragement.length === 0) return "Great job!"
    return content.encouragement[Math.floor(Math.random() * content.encouragement.length)]
  }

  return (
    <CulturalContext.Provider
      value={{
        profile,
        content,
        updateProfile,
        isLoading,
        getLocalizedCourse,
        getPersonalizedGreeting,
        getEncouragement,
      }}
    >
      {children}
    </CulturalContext.Provider>
  )
}

export function useCulturalContext() {
  const context = useContext(CulturalContext)
  if (!context) {
    throw new Error("useCulturalContext must be used within CulturalContextProvider")
  }
  return context
}
