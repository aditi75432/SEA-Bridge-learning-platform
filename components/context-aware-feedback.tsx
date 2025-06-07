"use client"

import { useCallback } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface FeedbackAnalysis {
  isCorrect: boolean
  confidence: number
  conceptualMatch: boolean
  culturalContext: string
  suggestions: string[]
  explanation: string
}

// Simplified semantic similarity (in real app, use sentence-transformers or OpenAI embeddings)
const calculateSimilarity = (answer: string, correct: string): number => {
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim()

  const answerWords = normalize(answer).split(/\s+/)
  const correctWords = normalize(correct).split(/\s+/)

  const intersection = answerWords.filter((word) => correctWords.includes(word))
  const union = [...new Set([...answerWords, ...correctWords])]

  return intersection.length / union.length
}

// Cultural context patterns for different concepts
const culturalContexts = {
  Philippines: {
    "water cycle": {
      keywords: ["rice terraces", "banaue", "irrigation", "monsoon", "typhoon", "tubig", "ulan"],
      examples: ["Like how water flows through our rice terraces in Banaue", "Similar to monsoon patterns in Luzon"],
      explanations:
        "In the Philippines, we see the water cycle clearly in our rice terraces where water evaporates, forms clouds, and returns as rain to nourish our crops.",
    },
    mathematics: {
      keywords: ["jeepney", "bahay kubo", "geometry", "patterns", "weaving"],
      examples: ["Like calculating jeepney fare distances", "Similar to patterns in traditional Filipino weaving"],
      explanations:
        "Mathematics is everywhere in Filipino culture - from the geometric patterns in our traditional houses to calculating distances for jeepney routes.",
    },
  },
  Vietnam: {
    "water cycle": {
      keywords: ["mekong delta", "monsoon", "rice fields", "flooding", "nước", "mưa"],
      examples: ["Like the seasonal flooding in the Mekong Delta", "Similar to how rice fields are irrigated"],
      explanations:
        "In Vietnam, the water cycle is essential for our rice cultivation, especially in the Mekong Delta where seasonal floods bring nutrients to the soil.",
    },
    mathematics: {
      keywords: ["pagoda", "architecture", "proportions", "harmony", "balance"],
      examples: [
        "Like the mathematical proportions in Vietnamese pagodas",
        "Similar to the golden ratio in traditional architecture",
      ],
      explanations:
        "Vietnamese architecture demonstrates mathematical principles through the harmonious proportions found in our pagodas and temples.",
    },
  },
  Thailand: {
    "water cycle": {
      keywords: ["irrigation", "royal projects", "chao phraya", "monsoon", "น้ำ", "ฝน"],
      examples: ["Like the royal irrigation projects", "Similar to the Chao Phraya River system"],
      explanations:
        "Thailand's royal irrigation projects demonstrate understanding of the water cycle, managing water resources for agriculture throughout the kingdom.",
    },
    mathematics: {
      keywords: ["temple", "wat", "geometry", "buddhist", "symmetry", "patterns"],
      examples: ["Like the geometric designs in Thai temples", "Similar to the mathematical patterns in Buddhist art"],
      explanations:
        "Thai temple architecture showcases mathematical principles through geometric patterns and symmetrical designs that reflect Buddhist concepts of harmony.",
    },
  },
}

export function useContextAwareFeedback() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()

  const analyzeFeedback = useCallback(
    async (userAnswer: string, correctAnswer: string, subject: string, concept: string): Promise<FeedbackAnalysis> => {
      // Calculate semantic similarity
      const similarity = calculateSimilarity(userAnswer, correctAnswer)
      const isExactMatch = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      const isConceptualMatch = similarity > 0.6 || isExactMatch

      // Get cultural context
      const countryContexts = culturalContexts[profile.country as keyof typeof culturalContexts]
      const conceptContext = countryContexts?.[concept as keyof typeof countryContexts]

      // Generate culturally-aware explanation
      let explanation = ""
      let culturalContext = ""
      let suggestions: string[] = []

      if (conceptContext) {
        culturalContext = conceptContext.explanations

        if (isConceptualMatch) {
          explanation = `Correct! ${conceptContext.explanations}`
          suggestions = conceptContext.examples
        } else {
          explanation = `Not quite right, but you're thinking in the right direction. ${conceptContext.explanations}`
          suggestions = [
            `Try thinking about ${conceptContext.examples[0]}`,
            `Consider how this relates to ${conceptContext.keywords[0]} in ${profile.country}`,
          ]
        }
      } else {
        // Fallback explanations
        if (isConceptualMatch) {
          explanation = "Correct! Your answer shows good understanding of the concept."
        } else {
          explanation = "Not quite right, but keep trying! Think about the key concepts involved."
          suggestions = ["Review the main principles", "Consider real-world examples"]
        }
      }

      // Add formality based on cultural preference
      if (profile.formalityPreference === "formal") {
        if (currentLanguage.code === "fil") {
          explanation = explanation.replace("Correct!", "Tama po kayo!")
          explanation = explanation.replace("Not quite right", "Hindi pa po tumpak")
        } else if (currentLanguage.code === "vi") {
          explanation = explanation.replace("Correct!", "Chính xác!")
          explanation = explanation.replace("Not quite right", "Chưa đúng")
        } else if (currentLanguage.code === "th") {
          explanation = explanation.replace("Correct!", "ถูกต้องครับ/ค่ะ!")
          explanation = explanation.replace("Not quite right", "ยังไม่ถูกต้องครับ/ค่ะ")
        }
      }

      return {
        isCorrect: isConceptualMatch,
        confidence: similarity,
        conceptualMatch: isConceptualMatch,
        culturalContext,
        suggestions,
        explanation,
      }
    },
    [currentLanguage.code, profile],
  )

  return { analyzeFeedback }
}

// Enhanced feedback component with cultural awareness
export function ContextAwareFeedbackDisplay({
  analysis,
  showCulturalContext = true,
}: {
  analysis: FeedbackAnalysis
  showCulturalContext?: boolean
}) {
  const { profile } = useCulturalContext()

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        analysis.isCorrect ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{analysis.isCorrect ? "✅" : "🤔"}</span>
        <span className="font-medium">{analysis.isCorrect ? "Excellent!" : "Keep Learning!"}</span>
        {analysis.conceptualMatch && !analysis.isCorrect && (
          <span className="text-sm text-orange-600">(Conceptually close!)</span>
        )}
      </div>

      <p className="text-sm leading-relaxed mb-3">{analysis.explanation}</p>

      {showCulturalContext && analysis.culturalContext && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">
              {profile.country === "Philippines"
                ? "🇵🇭"
                : profile.country === "Vietnam"
                  ? "🇻🇳"
                  : profile.country === "Thailand"
                    ? "🇹🇭"
                    : "🌏"}
            </span>
            <span className="font-medium text-sm">Cultural Connection</span>
          </div>
          <p className="text-sm text-blue-700">{analysis.culturalContext}</p>
        </div>
      )}

      {analysis.suggestions.length > 0 && (
        <div className="space-y-1">
          <span className="text-sm font-medium">Helpful hints:</span>
          {analysis.suggestions.map((suggestion, index) => (
            <div key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span>Confidence: {Math.round(analysis.confidence * 100)}%</span>
        {analysis.conceptualMatch && (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Conceptually Correct</span>
        )}
      </div>
    </div>
  )
}
