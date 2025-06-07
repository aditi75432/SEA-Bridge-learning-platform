"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = {
  code: string
  name: string
  localName: string
  region?: string
  parentLanguage?: string
}

type LanguageContextType = {
  languages: Language[]
  currentLanguage: Language
  setLanguage: (language: Language) => void
}

const defaultLanguages: Language[] = [
  // Main languages
  { code: "en", name: "English", localName: "English" },
  { code: "fil", name: "Filipino", localName: "Filipino" },
  { code: "th", name: "Thai", localName: "ไทย" },
  { code: "vi", name: "Vietnamese", localName: "Tiếng Việt" },
  { code: "id", name: "Indonesian", localName: "Bahasa Indonesia" },
  { code: "ms", name: "Malay", localName: "Bahasa Melayu" },
  { code: "km", name: "Khmer", localName: "ភាសាខ្មែរ" },
  { code: "my", name: "Burmese", localName: "မြန်မာဘာသာ" },
  { code: "lo", name: "Lao", localName: "ພາສາລາວ" },
  { code: "si", name: "Sinhala", localName: "සිංහල" },
  { code: "bn", name: "Bengali", localName: "বাংলা" },

  // Filipino regional languages
  { code: "tl", name: "Tagalog", localName: "Tagalog", region: "Philippines", parentLanguage: "fil" },
  { code: "ceb", name: "Cebuano", localName: "Cebuano", region: "Philippines", parentLanguage: "fil" },
  { code: "ilo", name: "Ilocano", localName: "Ilokano", region: "Philippines", parentLanguage: "fil" },
  { code: "hil", name: "Hiligaynon", localName: "Ilonggo", region: "Philippines", parentLanguage: "fil" },

  // Malay regional variations
  { code: "zlm", name: "Malaysian Malay", localName: "Bahasa Malaysia", region: "Malaysia", parentLanguage: "ms" },
  { code: "bjn", name: "Banjarese", localName: "Bahasa Banjar", region: "Indonesia", parentLanguage: "ms" },

  // Indonesian regional languages
  { code: "jv", name: "Javanese", localName: "Basa Jawa", region: "Indonesia", parentLanguage: "id" },
  { code: "su", name: "Sundanese", localName: "Basa Sunda", region: "Indonesia", parentLanguage: "id" },

  // Other important regional languages
  { code: "ta", name: "Tamil", localName: "தமிழ்", region: "Singapore/Malaysia" },
  { code: "zh-TW", name: "Traditional Chinese", localName: "繁體中文", region: "Taiwan/Hong Kong" },
]

const LanguageContext = createContext<LanguageContextType>({
  languages: defaultLanguages,
  currentLanguage: defaultLanguages[0],
  setLanguage: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [languages, setLanguages] = useState<Language[]>(defaultLanguages)
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguages[0])

  // Load saved language preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("preferredLanguage")
    if (savedLang) {
      try {
        const lang = JSON.parse(savedLang)
        setCurrentLanguage(lang)
        console.log("Loaded saved language preference:", lang.code)
      } catch (e) {
        console.error("Error parsing saved language:", e)
      }
    }
  }, [])

  const handleSetLanguage = (language: Language) => {
    console.log("Setting language to:", language.code)
    setCurrentLanguage(language)
    localStorage.setItem("preferredLanguage", JSON.stringify(language))

    // Dispatch a custom event for other components to listen to
    const event = new CustomEvent("languageChanged", { detail: language.code })
    document.dispatchEvent(event)

    // Force immediate translation
    if (language.code !== "en") {
      console.log("Triggering immediate translation for:", language.code)
      setTimeout(() => {
        const event = new CustomEvent("forceTranslation", { detail: language.code })
        document.dispatchEvent(event)
      }, 100)
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        languages,
        currentLanguage,
        setLanguage: handleSetLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
