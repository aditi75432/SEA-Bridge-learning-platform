"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { useToast } from "@/hooks/use-toast"

type TranslationCache = Record<string, Record<string, string>>

type AzureTranslateContextType = {
  translateText: (text: string, targetLang?: string) => Promise<string>
  translatePage: () => Promise<void>
  isTranslating: boolean
  translationCache: TranslationCache
  clearCache: () => void
  autoTranslate: boolean
  setAutoTranslate: (value: boolean) => void
}

const AzureTranslateContext = createContext<AzureTranslateContextType>({
  translateText: async () => "",
  translatePage: async () => {},
  isTranslating: false,
  translationCache: {},
  clearCache: () => {},
  autoTranslate: true,
  setAutoTranslate: () => {},
})

export function AzureTranslateProvider({ children }: { children: React.ReactNode }) {
  const { currentLanguage } = useLanguage()
  const { toast } = useToast()
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationCache, setTranslationCache] = useState<TranslationCache>({})
  const [autoTranslate, setAutoTranslate] = useState(true)

  // Load auto-translate preference from localStorage
  useEffect(() => {
    const savedPref = localStorage.getItem("autoTranslate")
    if (savedPref !== null) {
      setAutoTranslate(savedPref === "true")
    } else {
      setAutoTranslate(true)
      localStorage.setItem("autoTranslate", "true")
    }
  }, [])

  // Clear cache when language changes
  const clearCache = useCallback(() => {
    setTranslationCache({})
  }, [])

  useEffect(() => {
    clearCache()
  }, [currentLanguage.code, clearCache])

  // Define translateText first
  const translateText = useCallback(
    async (text: string, targetLang?: string): Promise<string> => {
      const lang = targetLang || currentLanguage.code

      if (translationCache[lang]?.[text]) {
        return translationCache[lang][text]
      }

      if (lang === "en" || text.trim() === "" || text.length < 2) {
        return text
      }

      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text.trim(), toLang: lang, fromLang: "en" }),
        })

        if (!response.ok) {
          console.warn(`Translation failed with status: ${response.status}`)
          return text
        }

        const data = await response.json()
        const translatedText = data[0]?.translations[0]?.text || text

        setTranslationCache((prev) => ({
          ...prev,
          [lang]: {
            ...prev[lang],
            [text]: translatedText,
          },
        }))

        return translatedText
      } catch (error) {
        console.error("Translation error:", error)
        return text
      }
    },
    [currentLanguage.code, translationCache],
  )

  // Define translatePage after translateText
  const translatePage = useCallback(async () => {
    if (currentLanguage.code === "en" || isTranslating) return

    console.log(`🔄 Starting translation to ${currentLanguage.code}`)
    setIsTranslating(true)

    try {
      // Wait for DOM to be ready
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Get all text elements more specifically
      const textSelectors = [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "a",
        "button",
        "li",
        "label",
        "[data-translate]",
      ]

      const elements = document.querySelectorAll(textSelectors.join(", "))
      console.log(`📝 Found ${elements.length} potential elements to translate`)

      let translatedCount = 0

      for (const element of elements) {
        // Skip if element should not be translated
        if (
          element.hasAttribute("data-no-translate") ||
          element.closest("script, style, code, pre, [data-no-translate]") ||
          element.querySelector("input, textarea, select") // Skip form controls
        ) {
          continue
        }

        // Get direct text content only (not from child elements)
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
          acceptNode: (node) => {
            // Only accept text nodes that are direct children
            return node.parentNode === element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
          },
        })

        const textNodes = []
        let node
        while ((node = walker.nextNode())) {
          if (node.textContent?.trim() && node.textContent.trim().length > 1) {
            textNodes.push(node)
          }
        }

        // Translate each text node
        for (const textNode of textNodes) {
          const originalText = textNode.textContent?.trim()
          if (!originalText || originalText.length < 2) continue

          // Skip numbers, symbols, and very short text
          if (/^[0-9\s\-+$$.,:;!?()[\]{}'"<>/\\]+$/.test(originalText)) continue

          try {
            console.log(`🔤 Translating: "${originalText}"`)
            const translatedText = await translateText(originalText)

            if (translatedText && translatedText !== originalText) {
              textNode.textContent = translatedText
              translatedCount++
              console.log(`✅ Translated to: "${translatedText}"`)
            }
          } catch (error) {
            console.error(`❌ Error translating "${originalText}":`, error)
          }

          // Small delay between translations to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 10))
        }
      }

      console.log(`🎉 Translation complete! Translated ${translatedCount} text elements`)

      if (translatedCount > 0) {
        toast({
          title: "Page translated",
          description: `Content translated to ${currentLanguage.localName}`,
        })
      } else {
        console.log("⚠️ No elements were translated")
      }
    } catch (error) {
      console.error("❌ Page translation error:", error)
      toast({
        title: "Translation failed",
        description: "Unable to translate the page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTranslating(false)
    }
  }, [currentLanguage, translateText, toast, isTranslating])

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent
      const langCode = customEvent.detail
      console.log(`Language changed event received: ${langCode}`)

      if (autoTranslate && langCode !== "en") {
        setTimeout(() => translatePage(), 300)
      }
    }

    document.addEventListener("languageChanged", handleLanguageChange)
    return () => {
      document.removeEventListener("languageChanged", handleLanguageChange)
    }
  }, [autoTranslate, translatePage])

  // Auto-translate when language changes
  useEffect(() => {
    localStorage.setItem("autoTranslate", autoTranslate.toString())

    if (autoTranslate && currentLanguage.code !== "en") {
      console.log(`🌍 Language changed to ${currentLanguage.code}, starting translation...`)
      setTimeout(() => {
        translatePage()
      }, 300)
    }
  }, [currentLanguage.code, autoTranslate, translatePage])

  return (
    <AzureTranslateContext.Provider
      value={{
        translateText,
        translatePage,
        isTranslating,
        translationCache,
        clearCache,
        autoTranslate,
        setAutoTranslate,
      }}
    >
      {children}
    </AzureTranslateContext.Provider>
  )
}

export const useAzureTranslate = () => useContext(AzureTranslateContext)
