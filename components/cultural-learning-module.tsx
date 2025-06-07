"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { useCulturalTheme } from "./cultural-theme-provider"
import { CulturalContentGenerator } from "./cultural-content-generator"
import { CulturalImageAdapter } from "./cultural-image-adapter"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { VoiceFeedback } from "./voice-feedback"
import { Book, ImageIcon, MessageSquare, Lightbulb, Award } from "lucide-react"

interface CulturalLearningModuleProps {
  title: string
  description: string
  topic: string
  imageUrl: string
  className?: string
}

export function CulturalLearningModule({
  title,
  description,
  topic,
  imageUrl,
  className = "",
}: CulturalLearningModuleProps) {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const { theme } = useCulturalTheme()
  const [greeting, setGreeting] = useState("")
  const [example, setExample] = useState("")
  const [scenario, setScenario] = useState("")
  const [adaptedImageUrl, setAdaptedImageUrl] = useState(imageUrl)

  useEffect(() => {
    // Remove the greeting generation since getCulturalGreeting is not available
    setGreeting("Welcome!")
  }, [])

  const handleExampleGenerated = (content: string) => {
    setExample(content)
  }

  const handleScenarioGenerated = (content: string) => {
    setScenario(content)
  }

  const handleImageAdapted = (url: string) => {
    setAdaptedImageUrl(url)
  }

  if (!profile) {
    return null
  }

  return (
    <div className={className}>
      <Card
        className="overflow-hidden border-2"
        style={{
          borderColor: theme.colors.primary,
          background: `linear-gradient(to bottom right, ${theme.colors.background}, ${theme.colors.background})`,
        }}
      >
        <CardHeader
          className="pb-2"
          style={{
            background: `linear-gradient(to right, ${theme.colors.primary}20, ${theme.colors.secondary}20)`,
          }}
        >
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="mb-2"
              style={{
                borderColor: theme.colors.accent,
                color: theme.colors.accent,
              }}
            >
              {currentLanguage.localName}
            </Badge>
            <Badge
              variant="secondary"
              style={{
                backgroundColor: theme.colors.secondary,
                color: "white",
              }}
            >
              {profile.country}
            </Badge>
          </div>
          <CardTitle className="text-2xl" style={{ fontFamily: theme.typography.fontFamily }}>
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="text-lg font-medium" style={{ color: theme.colors.primary }}>
            {greeting}
          </div>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="visual" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Visual
              </TabsTrigger>
              <TabsTrigger value="interactive" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Interactive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" style={{ color: theme.colors.accent }} />
                  Cultural Example
                </h3>
                <CulturalContentGenerator
                  contentType="example"
                  topic={topic}
                  autoGenerate={true}
                  onContentGenerated={handleExampleGenerated}
                />
                {example && (
                  <div className="mt-2">
                    <VoiceFeedback text={example} />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Award className="h-5 w-5" style={{ color: theme.colors.accent }} />
                  Local Scenario
                </h3>
                <CulturalContentGenerator
                  contentType="scenario"
                  topic={topic}
                  autoGenerate={true}
                  onContentGenerated={handleScenarioGenerated}
                />
                {scenario && (
                  <div className="mt-2">
                    <VoiceFeedback text={scenario} />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="visual">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Culturally Adapted Visual</h3>
                <CulturalImageAdapter
                  imageUrl={imageUrl}
                  alt={title}
                  width={600}
                  height={400}
                  autoAdapt={true}
                  onImageAdapted={handleImageAdapted}
                />
              </div>
            </TabsContent>

            <TabsContent value="interactive">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Interactive Learning</h3>
                <CulturalContentGenerator contentType="question" topic={topic} autoGenerate={true} />
                <Button
                  className="mt-4"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: "white",
                  }}
                >
                  Start Practice Quiz
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter
          className="bg-gradient-to-r p-4 flex justify-between items-center"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme.colors.primary}10, ${theme.colors.secondary}10)`,
          }}
        >
          <div className="text-sm text-gray-500">
            Culturally adapted for {profile.country} • {profile.region} region
          </div>
          <Button
            variant="outline"
            style={{
              borderColor: theme.colors.primary,
              color: theme.colors.primary,
            }}
          >
            Save Module
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}