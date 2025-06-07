"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CulturalThemeProvider } from "@/components/cultural-theme-provider"
import { CulturalLearningModule } from "@/components/cultural-learning-module"
import { CulturalDialectSelector } from "@/components/cultural-dialect-selector"
import { CulturalFeedbackSystem } from "@/components/cultural-feedback-system"
import { CulturalContentGenerator } from "@/components/cultural-content-generator"
import { CulturalImageAdapter } from "@/components/cultural-image-adapter"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-provider"
import { useCulturalContext } from "@/components/cultural-context-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Globe, Sparkles, BookOpen, ImageIcon, MessageSquare, Settings } from "lucide-react"

export default function CulturalDemoPage() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false)

  return (
    <CulturalThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 py-12 px-4 md:px-6 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-primary/10 to-learning/10 text-primary border-primary/20 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Cultural Adaptation
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold font-display">
                <span className="bg-gradient-to-r from-primary via-learning to-creative bg-clip-text text-transparent">
                  Culturally Authentic Learning
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience education that adapts to your language, culture, and learning style
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button
                  onClick={() => setIsLanguageSelectorOpen(true)}
                  className="bg-gradient-to-r from-primary to-learning"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  Change Language
                </Button>

                <Button variant="outline">
                  <Settings className="mr-2 h-5 w-5" />
                  Cultural Settings
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 pt-4">
                <Badge variant="outline">
                  Current Language: {currentLanguage.name} ({currentLanguage.localName})
                </Badge>
                <Badge variant="outline">Cultural Context: {profile.country}</Badge>
                <Badge variant="outline">Region: {profile.region}</Badge>
              </div>
            </div>

            <Tabs defaultValue="module" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="module" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Learning Module
                </TabsTrigger>
                <TabsTrigger value="dialect" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Dialect Selection
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Content Generation
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Visual Adaptation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="module">
                <CulturalLearningModule
                  title="Water Cycle and Local Ecosystems"
                  description="Learn about the water cycle through culturally relevant examples from your region."
                  topic="water cycle"
                  imageUrl="/placeholder.svg?height=400&width=600"
                />
              </TabsContent>

              <TabsContent value="dialect">
                <Card>
                  <CardHeader>
                    <CardTitle>Language Variation Selection</CardTitle>
                    <CardDescription>
                      Choose the dialect or language variation that feels most natural to you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CulturalDialectSelector />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Cultural Content Generation</CardTitle>
                    <CardDescription>Generate culturally relevant content using Azure OpenAI</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Cultural Story</h3>
                      <CulturalContentGenerator
                        contentType="story"
                        topic="traditional farming methods"
                        autoGenerate={true}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Cultural Feedback</h3>
                      <CulturalFeedbackSystem isCorrect={true} autoGenerate={true} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visual">
                <Card>
                  <CardHeader>
                    <CardTitle>Visual Cultural Adaptation</CardTitle>
                    <CardDescription>Adapt images to match your cultural context using Azure Vision</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CulturalImageAdapter
                      imageUrl="/placeholder.svg?height=400&width=600"
                      alt="Educational content image"
                      width={600}
                      height={400}
                      autoAdapt={true}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Cultural Themes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Automatically adapts colors, patterns, and typography based on your cultural background.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-learning/20 bg-gradient-to-br from-learning/5 to-learning/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-learning" />
                    AI-Generated Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Creates culturally relevant examples, scenarios, and feedback using Azure OpenAI.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-creative/20 bg-gradient-to-br from-creative/5 to-creative/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-creative" />
                    Visual Adaptation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Analyzes and adapts images to match your cultural context using Azure Vision.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />

        {isLanguageSelectorOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Select Language</h2>
              <LanguageSelector />
              <Button onClick={() => setIsLanguageSelectorOpen(false)} className="mt-4 w-full">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </CulturalThemeProvider>
  )
}
