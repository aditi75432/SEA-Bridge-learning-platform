"use client"

import { useState, useCallback } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { useAzureTranslate } from "./azure-translate-provider"
import { useToast } from "@/hooks/use-toast"

interface LocalizedContent {
  text: string
  images: string[]
  examples: string[]
  culturalReferences: string[]
  assessments: LocalizedAssessment[]
}

interface LocalizedAssessment {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  culturalContext: string
}

interface ContentLocalizationHook {
  localizeContent: (content: any) => Promise<LocalizedContent>
  isLocalizing: boolean
  localizationProgress: number
  getCulturalVisuals: (topic: string) => string[]
  adaptAssessment: (assessment: any) => Promise<LocalizedAssessment>
}

export function useDynamicContentLocalizer(): ContentLocalizationHook {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const { translateText } = useAzureTranslate()
  const { toast } = useToast()
  const [isLocalizing, setIsLocalizing] = useState(false)
  const [localizationProgress, setLocalizationProgress] = useState(0)

  // Cultural visual mappings for different topics
  const culturalVisualMappings: Record<string, Record<string, string[]>> = {
    Philippines: {
      "water cycle": ["/images/rice-terraces-water.jpg", "/images/banaue-irrigation.jpg"],
      agriculture: ["/images/carabao-farming.jpg", "/images/coconut-plantation.jpg"],
      mathematics: ["/images/jeepney-geometry.jpg", "/images/bahay-kubo-angles.jpg"],
      technology: ["/images/manila-tech-hub.jpg", "/images/filipino-developers.jpg"],
    },
    Vietnam: {
      "water cycle": ["/images/mekong-delta.jpg", "/images/vietnam-monsoon.jpg"],
      agriculture: ["/images/vietnam-rice-fields.jpg", "/images/floating-gardens.jpg"],
      mathematics: ["/images/pagoda-geometry.jpg", "/images/hanoi-architecture.jpg"],
      technology: ["/images/ho-chi-minh-tech.jpg", "/images/vietnam-startups.jpg"],
    },
    Thailand: {
      "water cycle": ["/images/thai-irrigation.jpg", "/images/chao-phraya-river.jpg"],
      agriculture: ["/images/thai-rice-farming.jpg", "/images/elephant-agriculture.jpg"],
      mathematics: ["/images/wat-geometry.jpg", "/images/thai-temple-math.jpg"],
      technology: ["/images/bangkok-tech.jpg", "/images/thai-innovation.jpg"],
    },
    Indonesia: {
      "water cycle": ["/images/indonesia-monsoon.jpg", "/images/java-irrigation.jpg"],
      agriculture: ["/images/terraced-fields-bali.jpg", "/images/palm-oil-plantation.jpg"],
      mathematics: ["/images/borobudur-geometry.jpg", "/images/batik-patterns.jpg"],
      technology: ["/images/jakarta-tech.jpg", "/images/indonesian-unicorns.jpg"],
    },
  }

  // Cultural example mappings
  const culturalExampleMappings: Record<string, Record<string, string[]>> = {
    Philippines: {
      "water cycle": [
        "Rice terraces in Banaue showing water flow",
        "Monsoon rains filling irrigation canals",
        "Evaporation from Manila Bay",
      ],
      mathematics: [
        "Calculating jeepney fare distances",
        "Geometry in bahay kubo construction",
        "Patterns in traditional weaving",
      ],
      technology: ["GCash mobile payment system", "Grab ride-sharing algorithms", "Filipino game development studios"],
    },
    Vietnam: {
      "water cycle": [
        "Mekong Delta flood cycles",
        "Traditional Vietnamese irrigation",
        "Monsoon patterns in Northern Vietnam",
      ],
      mathematics: [
        "Pagoda architectural proportions",
        "Traditional Vietnamese calendar calculations",
        "Geometry in áo dài design",
      ],
      technology: [
        "VinFast electric vehicle innovation",
        "Vietnamese e-commerce platforms",
        "Hanoi tech startup ecosystem",
      ],
    },
    Thailand: {
      "water cycle": ["Royal irrigation projects", "Thai traditional water management", "Chao Phraya River system"],
      mathematics: [
        "Wat temple geometric designs",
        "Traditional Thai architecture ratios",
        "Thai calendar mathematical systems",
      ],
      technology: ["Thai fintech innovations", "Bangkok smart city initiatives", "Thai agricultural technology"],
    },
  }

  const getCulturalVisuals = useCallback(
    (topic: string): string[] => {
      const countryVisuals = culturalVisualMappings[profile.country]
      if (!countryVisuals) return []

      const topicVisuals = countryVisuals[topic.toLowerCase()]
      return topicVisuals || []
    },
    [profile.country],
  )

  const getCulturalExamples = useCallback(
    (topic: string): string[] => {
      const countryExamples = culturalExampleMappings[profile.country]
      if (!countryExamples) return []

      const topicExamples = countryExamples[topic.toLowerCase()]
      return topicExamples || []
    },
    [profile.country],
  )

  const adaptCulturalReferences = useCallback(
    async (originalReferences: string[]): Promise<string[]> => {
      const adaptedReferences = []

      for (const reference of originalReferences) {
        let adaptedReference = reference

        // Replace Western examples with SEA equivalents
        const replacements: Record<string, Record<string, string>> = {
          Philippines: {
            "New York": "Manila",
            hamburger: "adobo",
            baseball: "basketball",
            dollars: "pesos",
            "Statue of Liberty": "Rizal Monument",
          },
          Vietnam: {
            "New York": "Ho Chi Minh City",
            hamburger: "phở",
            baseball: "football",
            dollars: "dong",
            "Statue of Liberty": "Independence Palace",
          },
          Thailand: {
            "New York": "Bangkok",
            hamburger: "pad thai",
            baseball: "muay thai",
            dollars: "baht",
            "Statue of Liberty": "Wat Pho",
          },
        }

        const countryReplacements = replacements[profile.country]
        if (countryReplacements) {
          for (const [original, replacement] of Object.entries(countryReplacements)) {
            adaptedReference = adaptedReference.replace(new RegExp(original, "gi"), replacement)
          }
        }

        // Translate if needed
        if (currentLanguage.code !== "en") {
          adaptedReference = await translateText(adaptedReference)
        }

        adaptedReferences.push(adaptedReference)
      }

      return adaptedReferences
    },
    [profile.country, currentLanguage.code, translateText],
  )

  const adaptAssessment = useCallback(
    async (assessment: any): Promise<LocalizedAssessment> => {
      setLocalizationProgress(0)

      // Translate question
      let question = assessment.question
      if (currentLanguage.code !== "en") {
        question = await translateText(question)
      }
      setLocalizationProgress(25)

      // Translate options
      const options = []
      for (const option of assessment.options) {
        let translatedOption = option
        if (currentLanguage.code !== "en") {
          translatedOption = await translateText(option)
        }
        options.push(translatedOption)
      }
      setLocalizationProgress(50)

      // Translate and adapt explanation with cultural context
      let explanation = assessment.explanation
      if (currentLanguage.code !== "en") {
        explanation = await translateText(explanation)
      }

      // Add cultural context
      const culturalExamples = getCulturalExamples(assessment.topic || "general")
      if (culturalExamples.length > 0) {
        const randomExample = culturalExamples[Math.floor(Math.random() * culturalExamples.length)]
        explanation += ` For example, in ${profile.country}, ${randomExample}.`
      }
      setLocalizationProgress(75)

      // Determine cultural context
      const culturalContext = profile.culturalElements.examples[0] || "local context"
      setLocalizationProgress(100)

      return {
        question,
        options,
        correctAnswer: assessment.correctAnswer,
        explanation,
        culturalContext,
      }
    },
    [currentLanguage.code, translateText, getCulturalExamples, profile],
  )

  const localizeContent = useCallback(
    async (content: any): Promise<LocalizedContent> => {
      setIsLocalizing(true)
      setLocalizationProgress(0)

      try {
        // Translate main text content
        let text = content.text || content.content || ""
        if (currentLanguage.code !== "en" && text) {
          text = await translateText(text)
        }
        setLocalizationProgress(20)

        // Get culturally relevant images
        const images = getCulturalVisuals(content.topic || content.subject || "general")
        setLocalizationProgress(40)

        // Get cultural examples
        const examples = getCulturalExamples(content.topic || content.subject || "general")
        setLocalizationProgress(60)

        // Adapt cultural references
        const originalReferences = content.culturalReferences || content.examples || []
        const culturalReferences = await adaptCulturalReferences(originalReferences)
        setLocalizationProgress(80)

        // Adapt assessments
        const assessments = []
        if (content.assessments) {
          for (const assessment of content.assessments) {
            const localizedAssessment = await adaptAssessment(assessment)
            assessments.push(localizedAssessment)
          }
        }
        setLocalizationProgress(100)

        return {
          text,
          images,
          examples,
          culturalReferences,
          assessments,
        }
      } catch (error) {
        console.error("Content localization error:", error)
        toast({
          title: "Localization Error",
          description: "Failed to localize content. Using original version.",
          variant: "destructive",
        })

        // Return original content as fallback
        return {
          text: content.text || content.content || "",
          images: [],
          examples: [],
          culturalReferences: [],
          assessments: [],
        }
      } finally {
        setIsLocalizing(false)
        setLocalizationProgress(0)
      }
    },
    [
      currentLanguage.code,
      translateText,
      getCulturalVisuals,
      getCulturalExamples,
      adaptCulturalReferences,
      adaptAssessment,
      toast,
    ],
  )

  return {
    localizeContent,
    isLocalizing,
    localizationProgress,
    getCulturalVisuals,
    adaptAssessment,
  }
}

// Component for showing localization progress
export function LocalizationProgress({ progress, isVisible }: { progress: number; isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4 min-w-[300px]">
      <div className="flex items-center gap-3 mb-2">
        <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
        <span className="text-sm font-medium">Localizing Content...</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-600 mt-1">Adapting for {progress < 50 ? "language" : "cultural context"}...</p>
    </div>
  )
}
