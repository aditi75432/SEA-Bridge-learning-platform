"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface CulturalTheme {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundPattern: string
  fontFamily: string
  borderRadius: string
  shadows: string
  culturalElements: {
    patterns: string[]
    colors: string[]
    symbols: string[]
    textures: string[]
  }
}

const culturalThemes: Record<string, CulturalTheme> = {
  Philippines: {
    primaryColor: "rgb(0, 56, 147)", // Blue from flag
    secondaryColor: "rgb(206, 17, 38)", // Red from flag
    accentColor: "rgb(255, 205, 0)", // Yellow from flag
    backgroundPattern: "url('/patterns/jeepney-pattern.svg')",
    fontFamily: "'Nunito', sans-serif",
    borderRadius: "0.75rem",
    shadows: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    culturalElements: {
      patterns: ["jeepney", "bahay-kubo", "rice-terraces", "barong"],
      colors: ["#0038A8", "#CE1126", "#FFCD00"],
      symbols: ["🇵🇭", "🌾", "🏠", "🚌"],
      textures: ["bamboo", "nipa", "capiz", "abaca"],
    },
  },
  Vietnam: {
    primaryColor: "rgb(218, 37, 29)", // Red from flag
    secondaryColor: "rgb(255, 255, 0)", // Yellow from flag
    accentColor: "rgb(0, 86, 63)", // Traditional green
    backgroundPattern: "url('/patterns/lotus-pattern.svg')",
    fontFamily: "'Nunito', sans-serif",
    borderRadius: "0.5rem",
    shadows: "0 2px 8px rgba(0, 0, 0, 0.15)",
    culturalElements: {
      patterns: ["lotus", "dragon", "pagoda", "ao-dai"],
      colors: ["#DA251D", "#FFFF00", "#00563F"],
      symbols: ["🇻🇳", "🪷", "🐉", "🏯"],
      textures: ["silk", "bamboo", "lacquer", "ceramic"],
    },
  },
  Thailand: {
    primaryColor: "rgb(237, 41, 57)", // Red from flag
    secondaryColor: "rgb(0, 47, 108)", // Blue from flag
    accentColor: "rgb(255, 215, 0)", // Gold
    backgroundPattern: "url('/patterns/thai-pattern.svg')",
    fontFamily: "'Nunito', sans-serif",
    borderRadius: "1rem",
    shadows: "0 8px 16px rgba(0, 0, 0, 0.1)",
    culturalElements: {
      patterns: ["temple", "elephant", "lotus", "thai-silk"],
      colors: ["#ED2939", "#002F6C", "#FFD700"],
      symbols: ["🇹🇭", "🐘", "🏛️", "🪷"],
      textures: ["gold-leaf", "teak", "silk", "ceramic"],
    },
  },
  Indonesia: {
    primaryColor: "rgb(206, 17, 38)", // Red from flag
    secondaryColor: "rgb(255, 255, 255)", // White from flag
    accentColor: "rgb(255, 165, 0)", // Traditional orange
    backgroundPattern: "url('/patterns/batik-pattern.svg')",
    fontFamily: "'Nunito', sans-serif",
    borderRadius: "0.5rem",
    shadows: "0 4px 12px rgba(0, 0, 0, 0.15)",
    culturalElements: {
      patterns: ["batik", "wayang", "borobudur", "gamelan"],
      colors: ["#CE1126", "#FFFFFF", "#FFA500"],
      symbols: ["🇮🇩", "🎭", "🕌", "🎵"],
      textures: ["batik", "wood", "stone", "brass"],
    },
  },
  Malaysia: {
    primaryColor: "rgb(200, 16, 46)", // Red from flag
    secondaryColor: "rgb(0, 0, 139)", // Blue from flag
    accentColor: "rgb(255, 215, 0)", // Yellow from flag
    backgroundPattern: "url('/patterns/islamic-pattern.svg')",
    fontFamily: "'Nunito', sans-serif",
    borderRadius: "0.75rem",
    shadows: "0 6px 12px rgba(0, 0, 0, 0.1)",
    culturalElements: {
      patterns: ["islamic", "hibiscus", "traditional-house", "songket"],
      colors: ["#C8102E", "#00008B", "#FFD700"],
      symbols: ["🇲🇾", "🌺", "🕌", "🏠"],
      textures: ["songket", "wood", "rattan", "pewter"],
    },
  },
  Cambodia: {
    primaryColor: "rgb(222, 16, 50)", // Red from flag
    secondaryColor: "rgb(0, 56, 147)", // Blue from flag
    accentColor: "rgb(255, 215, 0)", // Gold
    backgroundPattern: "url('/patterns/angkor-pattern.svg')",
    fontFamily: "'Nunito', sans-serif",
    borderRadius: "0.5rem",
    shadows: "0 4px 8px rgba(0, 0, 0, 0.2)",
    culturalElements: {
      patterns: ["angkor", "apsara", "lotus", "khmer"],
      colors: ["#DE1032", "#003893", "#FFD700"],
      symbols: ["🇰🇭", "🏛️", "💃", "🪷"],
      textures: ["stone", "silk", "gold", "wood"],
    },
  },
}

export function CulturalUIAdapter({ children }: { children: React.ReactNode }) {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [currentTheme, setCurrentTheme] = useState<CulturalTheme | null>(null)

  useEffect(() => {
    const theme = culturalThemes[profile.country]
    if (theme) {
      setCurrentTheme(theme)

      // Apply CSS custom properties
      const root = document.documentElement
      root.style.setProperty("--cultural-primary", theme.primaryColor)
      root.style.setProperty("--cultural-secondary", theme.secondaryColor)
      root.style.setProperty("--cultural-accent", theme.accentColor)
      root.style.setProperty("--cultural-pattern", theme.backgroundPattern)
      root.style.setProperty("--cultural-font", theme.fontFamily)
      root.style.setProperty("--cultural-radius", theme.borderRadius)
      root.style.setProperty("--cultural-shadow", theme.shadows)
    }
  }, [profile.country])

  if (!currentTheme) return <>{children}</>

  return (
    <div
      className="cultural-theme-wrapper"
      style={
        {
          "--primary": currentTheme.primaryColor,
          "--secondary": currentTheme.secondaryColor,
          "--accent": currentTheme.accentColor,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

// Cultural greeting component
export function CulturalGreeting() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()

  const greetings = {
    fil: {
      formal: "Magandang araw po!",
      informal: "Kumusta!",
      time_based: {
        morning: "Magandang umaga po!",
        afternoon: "Magandang hapon po!",
        evening: "Magandang gabi po!",
      },
    },
    vi: {
      formal: "Xin chào!",
      informal: "Chào bạn!",
      time_based: {
        morning: "Chào buổi sáng!",
        afternoon: "Chào buổi chiều!",
        evening: "Chào buổi tối!",
      },
    },
    th: {
      formal: "สวัสดีครับ/ค่ะ",
      informal: "สวัสดี",
      time_based: {
        morning: "อรุณสวัสดิ์",
        afternoon: "สวัสดีตอนบ่าย",
        evening: "สวัสดีตอนเย็น",
      },
    },
    id: {
      formal: "Selamat pagi/siang/sore",
      informal: "Halo!",
      time_based: {
        morning: "Selamat pagi",
        afternoon: "Selamat siang",
        evening: "Selamat sore",
      },
    },
    ms: {
      formal: "Selamat pagi/petang",
      informal: "Hai!",
      time_based: {
        morning: "Selamat pagi",
        afternoon: "Selamat tengah hari",
        evening: "Selamat petang",
      },
    },
    km: {
      formal: "ជំរាបសួរ",
      informal: "សួស្តី",
      time_based: {
        morning: "អរុណសួស្តី",
        afternoon: "ទិវាសួស្តី",
        evening: "សាយណ្ហសួស្តី",
      },
    },
  }

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    return "evening"
  }

  const langGreetings = greetings[currentLanguage.code as keyof typeof greetings]
  if (!langGreetings) return "Hello!"

  const timeOfDay = getTimeBasedGreeting()
  const formalityLevel = profile.formalityPreference

  if (formalityLevel === "formal") {
    return langGreetings.time_based[timeOfDay as keyof typeof langGreetings.time_based]
  }

  return langGreetings.informal
}
