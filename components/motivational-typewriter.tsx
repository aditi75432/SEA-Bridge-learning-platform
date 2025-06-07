"use client"

import { useState, useEffect } from "react"
import { useLocalization } from "./localization-provider"

export function MotivationalTypewriter() {
  const { t } = useLocalization()
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const phrases = [
    t("hero.subtitle"),
    "Empowering Southeast Asia",
    "Your Culture, Your Language",
    "AI-Powered Learning",
  ]

  useEffect(() => {
    const currentPhrase = phrases[currentIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentPhrase.length) {
            setDisplayText(currentPhrase.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % phrases.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting])

  return (
    <span className="bg-gradient-to-r from-coral-600 to-sand-600 bg-clip-text text-transparent">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
