"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, VolumeX, Loader2 } from "lucide-react"
import { useLanguage } from "./language-provider"

interface VoiceFeedbackProps {
  text: string
  autoPlay?: boolean
  className?: string
}

export function VoiceFeedback({ text, autoPlay = false, className = "" }: VoiceFeedbackProps) {
  const { currentLanguage } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Voice mapping for different languages
  const voiceLanguageMap: Record<string, string[]> = {
    en: ["en-US", "en-GB", "en-AU"],
    fil: ["fil-PH", "tl-PH"],
    th: ["th-TH"],
    vi: ["vi-VN"],
    id: ["id-ID"],
    ms: ["ms-MY"],
    km: ["km-KH"],
    my: ["my-MM"],
    lo: ["lo-LA"],
    zh: ["zh-CN", "zh-TW"],
  }

  // Check for speech synthesis support
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true)

      // Load voices
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices()
        setVoices(availableVoices)
      }

      loadVoices()
      speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  // Find the best voice for current language
  const getBestVoice = (): SpeechSynthesisVoice | null => {
    if (voices.length === 0) return null

    const preferredLangs = voiceLanguageMap[currentLanguage.code] || ["en-US"]

    // Try to find exact language match
    for (const lang of preferredLangs) {
      const voice = voices.find((v) => v.lang === lang)
      if (voice) return voice
    }

    // Try to find language family match (e.g., "en" for "en-US")
    const langFamily = currentLanguage.code
    const familyVoice = voices.find((v) => v.lang.startsWith(langFamily))
    if (familyVoice) return familyVoice

    // Fallback to English
    const englishVoice = voices.find((v) => v.lang.startsWith("en"))
    return englishVoice || voices[0]
  }

  const speak = () => {
    if (!isSupported || !text.trim()) return

    // Stop any current speech
    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    const voice = getBestVoice()

    if (voice) {
      utterance.voice = voice
      utterance.lang = voice.lang
    } else {
      utterance.lang = voiceLanguageMap[currentLanguage.code]?.[0] || "en-US"
    }

    // Configure speech parameters
    utterance.rate = 0.9 // Slightly slower for better comprehension
    utterance.pitch = 1.0
    utterance.volume = 0.8

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true)
    }

    utterance.onend = () => {
      setIsPlaying(false)
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error)
      setIsPlaying(false)
    }

    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    speechSynthesis.cancel()
    setIsPlaying(false)
  }

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && text && isSupported && voices.length > 0) {
      // Small delay to ensure voices are loaded
      const timer = setTimeout(() => {
        speak()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [autoPlay, text, isSupported, voices.length])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  }, [])

  if (!isSupported) {
    return null
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={isPlaying ? stopSpeaking : speak}
        disabled={!text.trim()}
        className="flex items-center gap-2"
      >
        {isPlaying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <VolumeX className="h-4 w-4" />
          </>
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        {isPlaying ? "Stop" : "Listen"}
      </Button>

      {isPlaying && (
        <Badge variant="secondary" className="animate-pulse">
          🔊 Speaking in {currentLanguage.localName}
        </Badge>
      )}
    </div>
  )
}
