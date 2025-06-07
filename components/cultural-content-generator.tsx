"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { azureOpenAI } from "@/lib/azure-ai-services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface CulturalContentGeneratorProps {
  contentType: "example" | "scenario" | "story" | "question" | "feedback"
  topic?: string
  prompt?: string
  onContentGenerated?: (content: string) => void
  autoGenerate?: boolean
  className?: string
}

export function CulturalContentGenerator({
  contentType,
  topic = "",
  prompt = "",
  onContentGenerated,
  autoGenerate = false,
  className = "",
}: CulturalContentGeneratorProps) {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [content, setContent] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate content based on cultural context
  const generateContent = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      let generatedContent = ""

      // Create a culturally relevant prompt
      const culturalPrompt = {
        example: `Generate a culturally authentic example about ${topic} for ${profile.country} students. Use local references, places, and customs. Language: ${currentLanguage.name}. Age group: ${profile.ageGroup}. Formality: ${profile.formalityPreference}.`,
        scenario: `Create a realistic scenario set in ${profile.country} about ${topic}. Include local settings, names, and cultural elements. Language: ${currentLanguage.name}. Age group: ${profile.ageGroup}. Region: ${profile.region}.`,
        story: `Tell a short story with cultural elements from ${profile.country} related to ${topic}. Include traditional values, settings, and characters. Language: ${currentLanguage.name}. Age group: ${profile.ageGroup}.`,
        question: `Create an educational question about ${topic} with cultural context from ${profile.country}. Make it relevant to daily life in ${profile.region} areas. Language: ${currentLanguage.name}. Age group: ${profile.ageGroup}.`,
        feedback: `Generate encouraging feedback in ${currentLanguage.name} with cultural sensitivity for ${profile.country}. Use appropriate honorifics and tone for ${profile.formalityPreference} communication. Age group: ${profile.ageGroup}.`,
      }

      // Use custom prompt if provided
      const finalPrompt = prompt || culturalPrompt[contentType]

      // Generate content using Azure OpenAI
      generatedContent = await azureOpenAI.generateCulturalContent(finalPrompt, {
        country: profile.country,
        language: currentLanguage.code,
        formalityPreference: profile.formalityPreference,
        ageGroup: profile.ageGroup,
        region: profile.region,
        culturalElements: profile.culturalElements,
      })

      setContent(generatedContent)

      // Call the callback if provided
      if (onContentGenerated) {
        onContentGenerated(generatedContent)
      }
    } catch (err) {
      console.error("Error generating cultural content:", err)
      setError("Failed to generate content. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Auto-generate content when component mounts if autoGenerate is true
  useEffect(() => {
    if (autoGenerate) {
      generateContent()
    }
  }, [autoGenerate, contentType, topic, currentLanguage.code, profile.country])

  return (
    <div className={className}>
      {!autoGenerate && !content && (
        <Button
          onClick={generateContent}
          disabled={isGenerating}
          className="bg-gradient-to-r from-primary to-secondary text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            `Generate ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`
          )}
        </Button>
      )}

      {isGenerating && autoGenerate && (
        <Card className="w-full">
          <CardContent className="p-4 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <p>Generating culturally relevant content...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="w-full border-error/30 bg-error/10">
          <CardContent className="p-4">
            <p className="text-error">{error}</p>
            <Button variant="outline" onClick={generateContent} className="mt-2">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {content && !isGenerating && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">
              {contentType.charAt(0).toUpperCase() + contentType.slice(1)} for {profile.country}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="prose">
              <p>{content}</p>
            </div>
            <Button variant="outline" onClick={generateContent} className="mt-4" size="sm">
              Regenerate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
