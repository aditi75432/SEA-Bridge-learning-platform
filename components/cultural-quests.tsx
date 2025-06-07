"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Map, Compass, Trophy, Star, Lock, Play, Eye, Users, Clock } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface CulturalQuest {
  id: string
  title: string
  description: string
  culturalSite: string
  country: string
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  estimatedTime: number
  xpReward: number
  subjects: string[]
  questType: "exploration" | "puzzle" | "collaboration" | "creation"
  status: "locked" | "available" | "in_progress" | "completed"
  progress: number
  maxProgress: number
  prerequisites: string[]
  rewards: QuestReward[]
  culturalLearning: string[]
  arVrSupported: boolean
  multiplayerSupported: boolean
}

interface QuestReward {
  type: "xp" | "badge" | "certificate" | "unlock" | "cultural_artifact"
  value: string | number
  description: string
}

interface QuestProgress {
  questId: string
  currentStep: number
  totalSteps: number
  completedChallenges: string[]
  discoveredArtifacts: string[]
  collaborators: string[]
}

export function CulturalQuests() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()

  const [selectedQuest, setSelectedQuest] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"available" | "in_progress" | "completed">("available")

  const [quests, setQuests] = useState<CulturalQuest[]>([
    {
      id: "1",
      title: "Secrets of Angkor Wat",
      description:
        "Explore the mathematical precision and astronomical alignments of the magnificent Angkor Wat temple complex",
      culturalSite: "Angkor Wat",
      country: "Cambodia",
      difficulty: "Intermediate",
      estimatedTime: 120,
      xpReward: 500,
      subjects: ["Mathematics", "Astronomy", "Architecture", "History"],
      questType: "exploration",
      status: "available",
      progress: 0,
      maxProgress: 8,
      prerequisites: [],
      rewards: [
        { type: "xp", value: 500, description: "500 XP for completion" },
        { type: "badge", value: "Temple Explorer", description: "Angkor Wat Explorer Badge" },
        { type: "cultural_artifact", value: "Khmer Calendar", description: "Digital Khmer astronomical calendar" },
      ],
      culturalLearning: ["Khmer Empire History", "Hindu-Buddhist Architecture", "Ancient Astronomy"],
      arVrSupported: true,
      multiplayerSupported: true,
    },
    {
      id: "2",
      title: "Banaue Rice Terraces Engineering",
      description: "Discover the ingenious irrigation systems and sustainable farming practices of the Ifugao people",
      culturalSite: "Banaue Rice Terraces",
      country: "Philippines",
      difficulty: "Beginner",
      estimatedTime: 90,
      xpReward: 350,
      subjects: ["Engineering", "Environmental Science", "Agriculture"],
      questType: "puzzle",
      status: "in_progress",
      progress: 3,
      maxProgress: 6,
      prerequisites: [],
      rewards: [
        { type: "xp", value: 350, description: "350 XP for completion" },
        { type: "certificate", value: "Sustainable Engineering", description: "Traditional Engineering Certificate" },
      ],
      culturalLearning: ["Ifugao Culture", "Sustainable Agriculture", "Water Management"],
      arVrSupported: true,
      multiplayerSupported: false,
    },
    {
      id: "3",
      title: "Borobudur Mandala Mystery",
      description:
        "Unravel the cosmic symbolism and mathematical patterns hidden in the world's largest Buddhist temple",
      culturalSite: "Borobudur",
      country: "Indonesia",
      difficulty: "Advanced",
      estimatedTime: 150,
      xpReward: 750,
      subjects: ["Mathematics", "Philosophy", "Art", "Religion"],
      questType: "puzzle",
      status: "locked",
      progress: 0,
      maxProgress: 10,
      prerequisites: ["1"],
      rewards: [
        { type: "xp", value: 750, description: "750 XP for completion" },
        { type: "badge", value: "Mandala Master", description: "Sacred Geometry Expert" },
        { type: "unlock", value: "Advanced Quests", description: "Unlock Expert level quests" },
      ],
      culturalLearning: ["Buddhist Philosophy", "Javanese Art", "Sacred Geometry"],
      arVrSupported: true,
      multiplayerSupported: true,
    },
    {
      id: "4",
      title: "Mekong Delta Ecosystem",
      description: "Study the complex river ecosystem and traditional fishing methods of the Mekong Delta",
      culturalSite: "Mekong Delta",
      country: "Vietnam",
      difficulty: "Intermediate",
      estimatedTime: 100,
      xpReward: 400,
      subjects: ["Biology", "Environmental Science", "Geography"],
      questType: "exploration",
      status: "completed",
      progress: 7,
      maxProgress: 7,
      prerequisites: [],
      rewards: [
        { type: "xp", value: 400, description: "400 XP earned" },
        { type: "badge", value: "River Guardian", description: "Mekong Ecosystem Expert" },
      ],
      culturalLearning: ["Vietnamese River Culture", "Aquaculture", "Biodiversity"],
      arVrSupported: true,
      multiplayerSupported: true,
    },
  ])

  const [questProgress, setQuestProgress] = useState<QuestProgress[]>([
    {
      questId: "2",
      currentStep: 3,
      totalSteps: 6,
      completedChallenges: ["water_flow", "terrace_design", "soil_analysis"],
      discoveredArtifacts: ["Ifugao Tools", "Ancient Seeds"],
      collaborators: ["Linh Nguyen", "Somchai Patel"],
    },
  ])

  const startQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((quest) => (quest.id === questId ? { ...quest, status: "in_progress" as const, progress: 1 } : quest)),
    )
  }

  const getQuestsByStatus = (status: "available" | "in_progress" | "completed") => {
    return quests.filter((quest) => {
      if (status === "available") return quest.status === "available" || quest.status === "locked"
      return quest.status === status
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-forest/10 text-forest border-forest/20"
      case "Intermediate":
        return "bg-accent/10 text-accent border-accent/20"
      case "Advanced":
        return "bg-primary/10 text-primary border-primary/20"
      case "Expert":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      Cambodia: "🇰🇭",
      Philippines: "🇵🇭",
      Indonesia: "🇮🇩",
      Vietnam: "🇻🇳",
      Thailand: "🇹🇭",
      Malaysia: "🇲🇾",
      Singapore: "🇸🇬",
    }
    return flags[country] || "🌏"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Cultural Heritage Quests</h2>
          <p className="text-gray-600">Embark on immersive learning adventures through SEA's greatest sites</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/20 text-primary">
            <Trophy className="h-3 w-3 mr-1" />
            {quests.filter((q) => q.status === "completed").length} Completed
          </Badge>
          <Badge variant="outline" className="border-secondary/20 text-secondary">
            <Map className="h-3 w-3 mr-1" />
            {quests.length} Total Quests
          </Badge>
        </div>
      </div>

      {/* Quest Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        {(["available", "in_progress", "completed"] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className="flex-1"
          >
            {tab === "available" && <Compass className="h-4 w-4 mr-2" />}
            {tab === "in_progress" && <Play className="h-4 w-4 mr-2" />}
            {tab === "completed" && <Trophy className="h-4 w-4 mr-2" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("_", " ")}({getQuestsByStatus(tab).length})
          </Button>
        ))}
      </div>

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getQuestsByStatus(activeTab).map((quest) => {
          const progress = questProgress.find((p) => p.questId === quest.id)
          const isLocked = quest.status === "locked"

          return (
            <Card
              key={quest.id}
              className={`border-2 transition-all duration-300 hover:shadow-medium ${
                isLocked
                  ? "border-gray-200 bg-gray-50 opacity-75"
                  : quest.status === "completed"
                    ? "border-forest/20 bg-forest/5"
                    : quest.status === "in_progress"
                      ? "border-primary/20 bg-primary/5"
                      : "border-transparent hover:border-secondary/20"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCountryFlag(quest.country)}</span>
                    <div>
                      <CardTitle className="text-lg leading-tight flex items-center gap-2">
                        {quest.title}
                        {isLocked && <Lock className="h-4 w-4 text-gray-400" />}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{quest.culturalSite}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="outline" className={getDifficultyColor(quest.difficulty)}>
                      {quest.difficulty}
                    </Badge>
                    {quest.arVrSupported && (
                      <Badge variant="outline" className="text-xs border-accent/20 text-accent">
                        <Eye className="h-3 w-3 mr-1" />
                        AR/VR
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">{quest.description}</p>

                {/* Progress Bar for In-Progress Quests */}
                {quest.status === "in_progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {quest.progress}/{quest.maxProgress}
                      </span>
                    </div>
                    <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                  </div>
                )}

                {/* Subjects */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Subjects:</div>
                  <div className="flex flex-wrap gap-1">
                    {quest.subjects.slice(0, 3).map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {quest.subjects.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{quest.subjects.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Cultural Learning */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">Cultural Learning:</div>
                  <div className="flex flex-wrap gap-1">
                    {quest.culturalLearning.slice(0, 2).map((learning) => (
                      <Badge key={learning} variant="outline" className="text-xs border-forest/20 text-forest">
                        {learning}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quest Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" />
                      <span>{quest.xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{quest.estimatedTime}m</span>
                    </div>
                  </div>
                  {quest.multiplayerSupported && (
                    <Badge variant="outline" className="text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      Multiplayer
                    </Badge>
                  )}
                </div>

                {/* Collaborators for In-Progress Quests */}
                {quest.status === "in_progress" && progress && progress.collaborators.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Collaborators:</div>
                    <div className="flex -space-x-2">
                      {progress.collaborators.map((collaborator, index) => (
                        <div
                          key={collaborator}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-forest border-2 border-white flex items-center justify-center text-white text-xs"
                          title={collaborator}
                        >
                          {collaborator.charAt(0)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {quest.status === "available" && (
                    <Button
                      className="flex-1 bg-gradient-to-r from-secondary to-forest"
                      onClick={() => startQuest(quest.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Quest
                    </Button>
                  )}

                  {quest.status === "in_progress" && (
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-secondary"
                      onClick={() => setSelectedQuest(quest.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  )}

                  {quest.status === "completed" && (
                    <Button
                      variant="outline"
                      className="flex-1 border-forest/20 text-forest"
                      onClick={() => setSelectedQuest(quest.id)}
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  )}

                  {quest.status === "locked" && (
                    <Button variant="outline" className="flex-1" disabled>
                      <Lock className="h-4 w-4 mr-2" />
                      Locked
                    </Button>
                  )}

                  {quest.arVrSupported && (
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Prerequisites for Locked Quests */}
                {isLocked && quest.prerequisites.length > 0 && (
                  <div className="text-xs text-gray-500">
                    Complete:{" "}
                    {quest.prerequisites
                      .map((prereq) => {
                        const prereqQuest = quests.find((q) => q.id === prereq)
                        return prereqQuest?.title
                      })
                      .join(", ")}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quest Details Modal would go here */}
      {selectedQuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quest Details</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedQuest(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                Detailed quest interface would be implemented here with AR/VR integration, collaborative features, and
                step-by-step challenges.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
