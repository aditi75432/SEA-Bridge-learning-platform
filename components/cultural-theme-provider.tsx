"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

type CulturalThemeContextType = {
  theme: CulturalTheme
  applyTheme: (countryCode: string) => void
  isLoading: boolean
}

export type CulturalTheme = {
  countryCode: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  patterns: {
    background: string
    header: string
    footer: string
    card: string
  }
  typography: {
    fontFamily: string
    headingStyle: string
    textStyle: string
  }
  iconography: {
    style: string
    culturalIcons: string[]
  }
  formality: {
    default: "formal" | "informal" | "respectful"
    honorifics: string[]
  }
}

const defaultTheme: CulturalTheme = {
  countryCode: "en",
  colors: {
    primary: "#6366F1",
    secondary: "#06B6D4",
    accent: "#F59E0B",
    background: "#FFFFFF",
    text: "#0F172A",
  },
  patterns: {
    background: "none",
    header: "none",
    footer: "none",
    card: "none",
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    headingStyle: "normal",
    textStyle: "normal",
  },
  iconography: {
    style: "modern",
    culturalIcons: [],
  },
  formality: {
    default: "informal",
    honorifics: [],
  },
}

// Cultural themes for different countries
const culturalThemes: Record<string, CulturalTheme> = {
  ph: {
    countryCode: "ph",
    colors: {
      primary: "#0038A8", // Blue from flag
      secondary: "#CE1126", // Red from flag
      accent: "#FFCD00", // Yellow from flag
      background: "#FFFFFF",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/ph-pattern.svg')",
      header: "url('/patterns/ph-header.svg')",
      footer: "url('/patterns/ph-footer.svg')",
      card: "url('/patterns/ph-card.svg')",
    },
    typography: {
      fontFamily: "'Nunito', sans-serif",
      headingStyle: "rounded",
      textStyle: "friendly",
    },
    iconography: {
      style: "vibrant",
      culturalIcons: ["jeepney", "bahay-kubo", "rice-terraces", "carabao", "sampaguita"],
    },
    formality: {
      default: "respectful",
      honorifics: ["po", "opo", "kuya", "ate"],
    },
  },
  vn: {
    countryCode: "vn",
    colors: {
      primary: "#DA251D", // Red from flag
      secondary: "#FFFF00", // Yellow from flag
      accent: "#00563F", // Traditional green
      background: "#FFFDF7",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/vn-pattern.svg')",
      header: "url('/patterns/vn-header.svg')",
      footer: "url('/patterns/vn-footer.svg')",
      card: "url('/patterns/vn-card.svg')",
    },
    typography: {
      fontFamily: "'Be Vietnam Pro', sans-serif",
      headingStyle: "elegant",
      textStyle: "balanced",
    },
    iconography: {
      style: "traditional",
      culturalIcons: ["lotus", "dragon", "conical-hat", "ao-dai", "water-buffalo"],
    },
    formality: {
      default: "respectful",
      honorifics: ["anh", "chị", "em", "cô", "chú"],
    },
  },
  th: {
    countryCode: "th",
    colors: {
      primary: "#ED2939", // Red from flag
      secondary: "#002F6C", // Blue from flag
      accent: "#FFD700", // Gold
      background: "#FFFBF5",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/th-pattern.svg')",
      header: "url('/patterns/th-header.svg')",
      footer: "url('/patterns/th-footer.svg')",
      card: "url('/patterns/th-card.svg')",
    },
    typography: {
      fontFamily: "'Noto Sans Thai', sans-serif",
      headingStyle: "decorative",
      textStyle: "graceful",
    },
    iconography: {
      style: "ornate",
      culturalIcons: ["elephant", "temple", "lotus", "tuk-tuk", "khon-mask"],
    },
    formality: {
      default: "formal",
      honorifics: ["khun", "kha/krap", "phi", "nong"],
    },
  },
  id: {
    countryCode: "id",
    colors: {
      primary: "#CE1126", // Red from flag
      secondary: "#FFFFFF", // White from flag
      accent: "#FFA500", // Traditional orange
      background: "#FFFAF0",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/id-pattern.svg')",
      header: "url('/patterns/id-header.svg')",
      footer: "url('/patterns/id-footer.svg')",
      card: "url('/patterns/id-card.svg')",
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      headingStyle: "balanced",
      textStyle: "warm",
    },
    iconography: {
      style: "batik",
      culturalIcons: ["batik", "wayang", "gamelan", "komodo", "borobudur"],
    },
    formality: {
      default: "respectful",
      honorifics: ["bapak", "ibu", "mas", "mbak", "adik"],
    },
  },
  kh: {
    countryCode: "kh",
    colors: {
      primary: "#032EA1", // Blue from flag
      secondary: "#E00025", // Red from flag
      accent: "#FFD700", // Gold
      background: "#FFF9F0",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/kh-pattern.svg')",
      header: "url('/patterns/kh-header.svg')",
      footer: "url('/patterns/kh-footer.svg')",
      card: "url('/patterns/kh-card.svg')",
    },
    typography: {
      fontFamily: "'Noto Sans Khmer', sans-serif",
      headingStyle: "ancient",
      textStyle: "traditional",
    },
    iconography: {
      style: "angkor",
      culturalIcons: ["angkor-wat", "apsara", "kbach", "naga", "bayou"],
    },
    formality: {
      default: "formal",
      honorifics: ["lok", "neak", "bong", "oun"],
    },
  },
  my: {
    countryCode: "my",
    colors: {
      primary: "#FFCC00", // Yellow from flag
      secondary: "#43B02A", // Green from flag
      accent: "#EE2737", // Red from flag
      background: "#FFFCF5",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/my-pattern.svg')",
      header: "url('/patterns/my-header.svg')",
      footer: "url('/patterns/my-footer.svg')",
      card: "url('/patterns/my-card.svg')",
    },
    typography: {
      fontFamily: "'Noto Sans Myanmar', sans-serif",
      headingStyle: "circular",
      textStyle: "flowing",
    },
    iconography: {
      style: "burmese",
      culturalIcons: ["pagoda", "chinthe", "longyi", "thanaka", "harp"],
    },
    formality: {
      default: "formal",
      honorifics: ["u", "daw", "ko", "ma", "maung"],
    },
  },
  la: {
    countryCode: "la",
    colors: {
      primary: "#CE1126", // Red from flag
      secondary: "#002868", // Blue from flag
      accent: "#FFFFFF", // White from flag
      background: "#FFF8F8",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/la-pattern.svg')",
      header: "url('/patterns/la-header.svg')",
      footer: "url('/patterns/la-footer.svg')",
      card: "url('/patterns/la-card.svg')",
    },
    typography: {
      fontFamily: "'Noto Sans Lao', sans-serif",
      headingStyle: "gentle",
      textStyle: "flowing",
    },
    iconography: {
      style: "lao",
      culturalIcons: ["that-luang", "elephant", "frangipani", "sinh", "sticky-rice"],
    },
    formality: {
      default: "respectful",
      honorifics: ["than", "ai", "nong", "pho", "mae"],
    },
  },
  mm: {
    countryCode: "mm",
    colors: {
      primary: "#0092CE", // Blue from flag
      secondary: "#FFFFFF", // White from flag
      accent: "#FF0000", // Red from flag
      background: "#F5FAFF",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/my-pattern.svg')",
      header: "url('/patterns/my-header.svg')",
      footer: "url('/patterns/my-footer.svg')",
      card: "url('/patterns/my-card.svg')",
    },
    typography: {
      fontFamily: "'Noto Sans', sans-serif",
      headingStyle: "modern",
      textStyle: "clean",
    },
    iconography: {
      style: "malaysian",
      culturalIcons: ["hibiscus", "petronas-towers", "wau-bulan", "batik", "durian"],
    },
    formality: {
      default: "respectful",
      honorifics: ["encik", "puan", "tuan", "cik", "datuk"],
    },
  },  tl: {
    countryCode: "tl",
    colors: {
      primary: "#002776", // Blue from flag
      secondary: "#FFCC00", // Yellow from flag
      accent: "#FFFFFF", // White from flag
      background: "#FFFEF5",
      text: "#0F172A",
    },
    patterns: {
      background: "url('/patterns/tl-pattern.svg')",
      header: "url('/patterns/tl-header.svg')",
      footer: "url('/patterns/tl-footer.svg')",
      card: "url('/patterns/tl-card.svg')",
    },
    typography: {
      fontFamily: "'Noto Sans', sans-serif",
      headingStyle: "bold",
      textStyle: "friendly",
    },
    iconography: {
      style: "tetum",
      culturalIcons: ["uma-lulik", "tais", "belak", "crocodile", "kaibauk"],
    },
    formality: {
      default: "respectful",
      honorifics: ["maun", "mana", "tiu", "tia", "avo"],
    },
  },
}

// Map language codes to country codes
const languageToCountryMap: Record<string, string> = {
  en: "en",
  fil: "ph",
  tl: "ph",
  vi: "vn",
  th: "th",
  id: "id",
  km: "kh",
  my: "my",
  lo: "la",
  ms: "my",
  // Add more mappings as needed
}

const CulturalThemeContext = createContext<CulturalThemeContextType>({
  theme: defaultTheme,
  applyTheme: () => {},
  isLoading: false,
})

export function CulturalThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [theme, setTheme] = useState<CulturalTheme>(defaultTheme)
  const [isLoading, setIsLoading] = useState(false)

  // Apply theme based on language or country
  const applyTheme = async (countryCode: string) => {
    setIsLoading(true)

    try {
      // Get theme from our predefined themes
      const countryTheme = culturalThemes[countryCode.toLowerCase()] || defaultTheme

      // Apply theme
      setTheme(countryTheme)

      // Apply CSS variables
      const root = document.documentElement
      root.style.setProperty("--primary-color", countryTheme.colors.primary)
      root.style.setProperty("--secondary-color", countryTheme.colors.secondary)
      root.style.setProperty("--accent-color", countryTheme.colors.accent)
      root.style.setProperty("--background-color", countryTheme.colors.background)
      root.style.setProperty("--text-color", countryTheme.colors.text)

      // Apply patterns
      root.style.setProperty("--background-pattern", countryTheme.patterns.background)
      root.style.setProperty("--header-pattern", countryTheme.patterns.header)
      root.style.setProperty("--footer-pattern", countryTheme.patterns.footer)
      root.style.setProperty("--card-pattern", countryTheme.patterns.card)

      // Apply typography
      root.style.setProperty("--font-family", countryTheme.typography.fontFamily)

      // Store theme in localStorage
      localStorage.setItem("culturalTheme", JSON.stringify(countryTheme))
    } catch (error) {
      console.error("Error applying cultural theme:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize theme based on language
  useEffect(() => {
    const savedTheme = localStorage.getItem("culturalTheme")

    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setTheme(parsedTheme)
      } catch (e) {
        console.error("Error parsing saved theme:", e)
      }
    } else {
      // Map language code to country code
      const countryCode = languageToCountryMap[currentLanguage.code] || (profile?.country?.toLowerCase() ?? "en")
      applyTheme(countryCode)
    }
  }, [currentLanguage.code, profile?.country])
  return (
    <CulturalThemeContext.Provider value={{ theme, applyTheme, isLoading }}>{children}</CulturalThemeContext.Provider>
  )
}

export const useCulturalTheme = () => useContext(CulturalThemeContext)
