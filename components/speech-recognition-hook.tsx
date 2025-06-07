"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface SpeechRecognitionHook {
  isListening: boolean
  transcript: string
  confidence: number | null
  startListening: () => void
  stopListening: () => void
  hasRecognitionSupport: boolean
  resetTranscript: () => void
  error: string | null
}

// Language mapping for speech recognition
const speechLanguageMap: Record<string, string> = {
  en: "en-US",
  fil: "fil-PH", // Filipino
  tl: "tl-PH", // Tagalog
  th: "th-TH", // Thai
  vi: "vi-VN", // Vietnamese
  id: "id-ID", // Indonesian
  ms: "ms-MY", // Malay
  km: "km-KH", // Khmer
  my: "my-MM", // Burmese
  lo: "lo-LA", // Lao
  zh: "zh-CN", // Chinese (for Singapore)
}

export function useSpeechRecognition(languageCode = "en"): SpeechRecognitionHook {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [confidence, setConfidence] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Check if speech recognition is supported
  const hasRecognitionSupport =
    typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

  // Initialize speech recognition
  useEffect(() => {
    if (!hasRecognitionSupport) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    // Configure recognition
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    // Set language based on current language code
    const speechLang = speechLanguageMap[languageCode] || "en-US"
    recognition.lang = speechLang

    // Event handlers
    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
      console.log("Speech recognition started")
    }

    recognition.onresult = (event) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const transcriptPart = result[0].transcript

        if (result.isFinal) {
          finalTranscript += transcriptPart
          setConfidence(result[0].confidence)
        } else {
          interimTranscript += transcriptPart
        }
      }

      // Update transcript with final result or interim result
      if (finalTranscript) {
        setTranscript(finalTranscript.trim())
      } else if (interimTranscript) {
        setTranscript(interimTranscript.trim())
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      console.log("Speech recognition ended")
    }

    recognition.onerror = (event) => {
      setIsListening(false)
      setError(event.error)

      let errorMessage = "Speech recognition error"
      switch (event.error) {
        case "no-speech":
          errorMessage = "No speech detected. Please try again."
          break
        case "audio-capture":
          errorMessage = "Microphone not accessible. Please check permissions."
          break
        case "not-allowed":
          errorMessage = "Microphone permission denied. Please allow microphone access."
          break
        case "network":
          errorMessage = "Network error. Please check your connection."
          break
        case "language-not-supported":
          errorMessage = `Language ${speechLang} not supported. Falling back to English.`
          recognition.lang = "en-US"
          break
        default:
          errorMessage = `Speech recognition error: ${event.error}`
      }

      console.error("Speech recognition error:", event.error, errorMessage)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [hasRecognitionSupport, languageCode])

  const startListening = useCallback(() => {
    if (!hasRecognitionSupport || !recognitionRef.current) {
      setError("Speech recognition not supported in this browser")
      return
    }

    if (isListening) return

    try {
      // Reset previous transcript
      setTranscript("")
      setConfidence(null)
      setError(null)

      recognitionRef.current.start()
    } catch (error) {
      console.error("Error starting speech recognition:", error)
      setError("Failed to start speech recognition")
    }
  }, [hasRecognitionSupport, isListening])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return

    try {
      recognitionRef.current.stop()
    } catch (error) {
      console.error("Error stopping speech recognition:", error)
    }
  }, [isListening])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setConfidence(null)
    setError(null)
  }, [])

  // Auto-stop after 30 seconds to prevent indefinite listening
  useEffect(() => {
    if (!isListening) return

    const timeout = setTimeout(() => {
      stopListening()
    }, 30000) // 30 seconds

    return () => clearTimeout(timeout)
  }, [isListening, stopListening])

  return {
    isListening,
    transcript,
    confidence,
    startListening,
    stopListening,
    hasRecognitionSupport,
    resetTranscript,
    error,
  }
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}
