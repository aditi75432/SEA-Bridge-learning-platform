"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { useToast } from "@/hooks/use-toast"

export function DirectTranslator() {
  const { currentLanguage } = useLanguage()
  const { toast } = useToast()
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationCache, setTranslationCache] = useState<Record<string, Record<string, string>>>({})

  // Function to translate a single text node
  async function translateTextNode(textNode: Text, targetLang: string) {
    const text = textNode.textContent?.trim()
    if (!text || text.length < 2) return false

    // Skip numbers, symbols, and very short text
    if (/^[0-9\s\-+$$.,:;!?()[\]{}'"<>/\\]+$/.test(text)) return false

    // Check cache first
    if (translationCache[targetLang]?.[text]) {
      textNode.textContent = translationCache[targetLang][text]
      return true
    }

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, toLang: targetLang, fromLang: "en" }),
      })

      if (!response.ok) {
        console.warn(`Translation failed with status: ${response.status}`)
        return false
      }

      const data = await response.json()
      const translatedText = data.translatedText

      if (translatedText && translatedText !== text) {
        textNode.textContent = translatedText

        // Update cache
        setTranslationCache((prev) => ({
          ...prev,
          [targetLang]: {
            ...(prev[targetLang] || {}),
            [text]: translatedText,
          },
        }))

        return true
      }
    } catch (error) {
      console.error(`Error translating "${text}":`, error)
    }

    return false
  }

  // Function to translate all text on the page
  async function translatePage(targetLang: string) {
    if (targetLang === "en" || isTranslating) return

    console.log(`🔄 Starting translation to ${targetLang}`)
    setIsTranslating(true)

    try {
      // Get all elements that might contain text
      const allElements = document.body.querySelectorAll("*")
      let translatedCount = 0
      let batchSize = 0

      // First translate navigation and important UI elements
      const priorityElements = document.querySelectorAll("nav, header, h1, h2, h3, button, a")
      for (const element of priorityElements) {
        // Skip elements that shouldn't be translated
        if (
          element.tagName.match(/^(SCRIPT|STYLE|CODE|PRE|SVG|PATH|IFRAME|CANVAS|VIDEO|AUDIO)$/i) ||
          element.hasAttribute("data-no-translate") ||
          element.closest("[data-no-translate], script, style, code, pre")
        ) {
          continue
        }

        // Get all text nodes that are direct children of this element
        const textNodes: Text[] = []
        for (const node of element.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            textNodes.push(node as Text)
          }
        }

        // Translate each text node
        for (const textNode of textNodes) {
          const wasTranslated = await translateTextNode(textNode, targetLang)
          if (wasTranslated) {
            translatedCount++
          }
        }
      }

      // Then translate the rest of the page
      for (const element of allElements) {
        // Skip elements that shouldn't be translated
        if (
          element.tagName.match(/^(SCRIPT|STYLE|CODE|PRE|SVG|PATH|IFRAME|CANVAS|VIDEO|AUDIO)$/i) ||
          element.hasAttribute("data-no-translate") ||
          element.closest("[data-no-translate], script, style, code, pre")
        ) {
          continue
        }

        // Get all text nodes that are direct children of this element
        const textNodes: Text[] = []
        for (const node of element.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            textNodes.push(node as Text)
          }
        }

        // Translate each text node
        for (const textNode of textNodes) {
          const wasTranslated = await translateTextNode(textNode, targetLang)
          if (wasTranslated) {
            translatedCount++
            batchSize++

            // Add small delay every 10 translations to avoid rate limiting
            if (batchSize >= 10) {
              batchSize = 0
              await new Promise((resolve) => setTimeout(resolve, 100))
            }
          }
        }
      }

      console.log(`🎉 Translation complete! Translated ${translatedCount} text elements`)

      if (translatedCount > 0) {
        toast({
          title: "Page translated",
          description: `Content translated to ${currentLanguage.localName}`,
        })
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
  }

  // Listen for language changes
  useEffect(() => {
    if (currentLanguage.code !== "en") {
      console.log(`Language changed to ${currentLanguage.code}, starting translation...`)
      translatePage(currentLanguage.code)
    }
  }, [currentLanguage.code])

  // Listen for force translation events
  useEffect(() => {
    const handleForceTranslation = (event: Event) => {
      const customEvent = event as CustomEvent
      const langCode = customEvent.detail
      console.log(`Force translation event received for ${langCode}`)
      translatePage(langCode)
    }

    document.addEventListener("forceTranslation", handleForceTranslation)
    return () => {
      document.removeEventListener("forceTranslation", handleForceTranslation)
    }
  }, [])

  return null // This component doesn't render anything
}
