"use client"

import { useEffect } from "react"
import { useLanguage } from "./language-provider"
import { useToast } from "@/hooks/use-toast"

export function AutoLanguageDetector() {
  const { setLanguage, languages, currentLanguage } = useLanguage()
  const { toast } = useToast()

  useEffect(() => {
    // Try to detect user's language from browser settings
    const detectLanguage = async () => {
      try {
        // Get browser language
        const browserLang = navigator.language.split("-")[0]

        // Check if we support this language
        const detectedLang = languages.find((lang) => lang.code === browserLang)

        if (detectedLang && detectedLang.code !== currentLanguage.code) {
          // Ask user if they want to switch to detected language
          const confirmed = window.confirm(
            `We detected that your preferred language might be ${detectedLang.name} (${detectedLang.localName}). Would you like to switch to this language?`,
          )

          if (confirmed) {
            setLanguage(detectedLang)
            toast({
              title: "Language Changed",
              description: `Your language has been set to ${detectedLang.name} (${detectedLang.localName})`,
            })
          }
        }
      } catch (error) {
        console.error("Error detecting language:", error)
      }
    }

    // Only run detection if no language preference is saved
    if (!localStorage.getItem("language")) {
      detectLanguage()
    }
  }, [languages, setLanguage, currentLanguage, toast])

  return null
}
