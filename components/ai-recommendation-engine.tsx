"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Target, Sparkles, BookOpen, Clock, Star } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface LearningProfile {
  visualLearner: number // 0-1
  auditoryLearner: number // 0-1
  kinestheticLearner: number // 0-1
  preferredDifficulty: "easy" | "medium" | "hard"
  studyTimePreference: "short" | "medium" | "long"
  culturalAlignment: number // 0-1
  languageProficiency: number // 0-1
  interests: string[]
  weakAreas: string[]
  strongAreas: string[]
}

interface Recommendation {
  id: string
  type: "course" | "exercise" | "cultural-content" | "study-group" | "assessment"
  title: string
  description: string
  reason: string
  culturalRelevance: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedTime: string
  priority: "high" | "medium" | "low"
  tags: string[]
  thumbnail: string
  progress?: number
}

export function AIRecommendationEngine() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [learningProfile, setLearningProfile] = useState<LearningProfile>({
    visualLearner: 0.7,
    auditoryLearner: 0.5,
    kinestheticLearner: 0.8,
    preferredDifficulty: "medium",
    studyTimePreference: "medium",
    culturalAlignment: 0.9,
    languageProficiency: 0.6,
    interests: ["technology", "science", "culture"],
    weakAreas: ["mathematics", "physics"],
    strongAreas: ["biology", "history"],
  })

  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const generateRecommendations = useCallback(async () => {
    setIsGenerating(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newRecommendations: Recommendation[] = [
      {
        id: "1",
        type: "course",
        title: "AI in Southeast Asian Agriculture",
        description: "Learn how artificial intelligence is revolutionizing farming practices in your region",
        reason: `Perfect for your interest in technology and ${profile.country} cultural context`,
        culturalRelevance: 0.95,
        difficulty: "Intermediate",
        estimatedTime: "45 min",
        priority: "high",
        tags: ["AI", "Agriculture", "Technology", profile.country],
        thumbnail: "🤖🌾",
      },
      {
        id: "2",
        type: "cultural-content",
        title: "Traditional Mathematics in Temple Architecture",
        description: "Discover geometric principles in traditional Southeast Asian temple designs",
        reason: "Strengthens your weak area (mathematics) using cultural examples you'll connect with",
        culturalRelevance: 0.9,
        difficulty: "Beginner",
        estimatedTime: "30 min",
        priority: "high",
        tags: ["Mathematics", "Architecture", "Culture"],
        thumbnail: "🏛️📐",
      },
      {
        id: "3",
        type: "exercise",
        title: "Interactive Rice Terraces Water Cycle",
        description: "Hands-on simulation of water flow in traditional farming systems",
        reason: "Matches your kinesthetic learning style and cultural background",
        culturalRelevance: 0.85,
        difficulty: "Beginner",
        estimatedTime: "20 min",
        priority: "medium",
        tags: ["Science", "Environment", "Interactive"],
        thumbnail: "💧🌾",
      },
      {
        id: "4",
        type: "study-group",
        title: "SEA Tech Innovators Study Group",
        description: "Connect with fellow technology enthusiasts across Southeast Asia",
        reason: "Aligns with your technology interests and regional focus",
        culturalRelevance: 0.8,
        difficulty: "Intermediate",
        estimatedTime: "60 min",
        priority: "medium",
        tags: ["Technology", "Community", "Innovation"],
        thumbnail: "👥💻",
      },
      {
        id: "5",
        type: "assessment",
        title: "Cultural Science Quiz Challenge",
        description: "Test your knowledge with science questions using local examples",
        reason: "Builds on your strong biology knowledge while improving weak areas",
        culturalRelevance: 0.9,
        difficulty: "Intermediate",
        estimatedTime: "15 min",
        priority: "low",
        tags: ["Assessment", "Science", "Culture"],
        thumbnail: "🧪🏆",
      },
    ]

    setRecommendations(newRecommendations)
    setIsGenerating(false)
  }, [profile.country])

  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations])

  const filteredRecommendations = recommendations.filter(
    (rec) => selectedCategory === "all" || rec.type === selectedCategory,
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-primary/10 text-primary border-primary/20"
      case "medium":
        return "bg-accent/10 text-accent border-accent/20"
      case "low":
        return "bg-gray/10 text-gray border-gray/20"
      default:
        return "bg-gray/10 text-gray border-gray/20"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-forest/10 text-forest border-forest/20"
      case "Intermediate":
        return "bg-accent/10 text-accent border-accent/20"
      case "Advanced":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-gray/10 text-gray border-gray/20"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {Math.round(learningProfile.culturalAlignment * 100)}%
              </div>
              <div className="text-sm text-gray-600">Cultural Match</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">{recommendations.length}</div>
              <div className="text-sm text-gray-600">Personalized Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-forest mb-1">
                {recommendations.filter((r) => r.priority === "high").length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Learning Style Analysis</span>
              <span className="text-gray-600">Based on your interactions</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Visual Learning</span>
                <span>{Math.round(learningProfile.visualLearner * 100)}%</span>
              </div>
              <Progress value={learningProfile.visualLearner * 100} className="h-1" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Kinesthetic Learning</span>
                <span>{Math.round(learningProfile.kinestheticLearner * 100)}%</span>
              </div>
              <Progress value={learningProfile.kinestheticLearner * 100} className="h-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Recommended for You</h3>
        <div className="flex gap-2">
          {["all", "course", "exercise", "cultural-content", "study-group"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category.replace("-", " ")}
            </Button>
          ))}
        </div>
      </div>

      {isGenerating ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Generating personalized recommendations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((recommendation, index) => (
            <Card
              key={recommendation.id}
              className="border-2 border-transparent hover:border-secondary/20 transition-all duration-300 hover:shadow-medium animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{recommendation.thumbnail}</div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{recommendation.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getPriorityColor(recommendation.priority)}>
                          {recommendation.priority} priority
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(recommendation.difficulty)}>
                          {recommendation.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">{recommendation.description}</p>

                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-medium">Why this is perfect for you:</span>
                  </div>
                  <p className="text-sm text-gray-700">{recommendation.reason}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{recommendation.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent fill-current" />
                    <span>{Math.round(recommendation.culturalRelevance * 100)}% match</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {recommendation.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-secondary to-forest">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Improve Your Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Help us understand you better to provide more accurate recommendations
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              Take Learning Style Quiz
            </Button>
            <Button variant="outline" size="sm">
              Update Interests
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
