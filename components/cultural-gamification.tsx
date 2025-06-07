"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Zap, Crown, Map, Users, Calendar, Gift } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "learning" | "cultural" | "social" | "streak" | "special"
  points: number
  rarity: "common" | "rare" | "epic" | "legendary"
  unlocked: boolean
  unlockedAt?: Date
  progress: number
  maxProgress: number
  culturalContext: string
}

interface CulturalQuest {
  id: string
  title: string
  description: string
  country: string
  culturalSite: string
  subject: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  xpReward: number
  culturalPoints: number
  estimatedTime: string
  prerequisites: string[]
  completed: boolean
  progress: number
  maxProgress: number
  icon: string
  storyline: string[]
}

interface LeaderboardEntry {
  rank: number
  name: string
  country: string
  totalXP: number
  culturalPoints: number
  achievements: number
  avatar: string
  isCurrentUser?: boolean
}

export function CulturalGamification() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [activeTab, setActiveTab] = useState("overview")
  const [userStats, setUserStats] = useState({
    totalXP: 2450,
    level: 12,
    culturalPoints: 890,
    streak: 7,
    achievements: 23,
    questsCompleted: 8,
  })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Rice Terrace Scholar",
      description: "Complete 5 lessons about traditional farming in the Philippines",
      icon: "🌾",
      category: "cultural",
      points: 100,
      rarity: "rare",
      unlocked: true,
      unlockedAt: new Date("2024-01-20"),
      progress: 5,
      maxProgress: 5,
      culturalContext: "Philippines",
    },
    {
      id: "2",
      title: "Mekong Explorer",
      description: "Learn about the Mekong Delta ecosystem and its importance",
      icon: "🐟",
      category: "cultural",
      points: 150,
      rarity: "epic",
      unlocked: true,
      unlockedAt: new Date("2024-01-18"),
      progress: 3,
      maxProgress: 3,
      culturalContext: "Vietnam",
    },
    {
      id: "3",
      title: "Temple Mathematician",
      description: "Solve geometry problems using Thai temple architecture",
      icon: "🏛️",
      category: "learning",
      points: 200,
      rarity: "epic",
      unlocked: false,
      progress: 2,
      maxProgress: 4,
      culturalContext: "Thailand",
    },
    {
      id: "4",
      title: "Batik Pattern Master",
      description: "Understand mathematical patterns in Indonesian batik",
      icon: "🎨",
      category: "cultural",
      points: 120,
      rarity: "rare",
      unlocked: false,
      progress: 1,
      maxProgress: 3,
      culturalContext: "Indonesia",
    },
    {
      id: "5",
      title: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      category: "streak",
      points: 75,
      rarity: "common",
      unlocked: true,
      unlockedAt: new Date(),
      progress: 7,
      maxProgress: 7,
      culturalContext: "Universal",
    },
  ])

  const [culturalQuests, setCulturalQuests] = useState<CulturalQuest[]>([
    {
      id: "1",
      title: "Journey Through Angkor Wat",
      description: "Explore the mathematical and architectural marvels of Angkor Wat",
      country: "Cambodia",
      culturalSite: "Angkor Wat",
      subject: "Mathematics & History",
      difficulty: "Intermediate",
      xpReward: 300,
      culturalPoints: 150,
      estimatedTime: "45 min",
      prerequisites: ["Basic Geometry"],
      completed: false,
      progress: 0,
      maxProgress: 5,
      icon: "🏛️",
      storyline: [
        "Welcome to the ancient Khmer Empire...",
        "Discover the mathematical precision of temple construction...",
        "Uncover the astronomical alignments...",
        "Learn about water management systems...",
        "Master the geometric patterns in stone carvings...",
      ],
    },
    {
      id: "2",
      title: "Borobudur's Sacred Geometry",
      description: "Unravel the mathematical mysteries of the world's largest Buddhist temple",
      country: "Indonesia",
      culturalSite: "Borobudur",
      subject: "Mathematics & Religion",
      difficulty: "Advanced",
      xpReward: 400,
      culturalPoints: 200,
      estimatedTime: "60 min",
      prerequisites: ["Temple Mathematician"],
      completed: false,
      progress: 0,
      maxProgress: 6,
      icon: "🕌",
      storyline: [
        "Enter the world of ancient Javanese Buddhism...",
        "Study the mandala structure of Borobudur...",
        "Calculate the temple's precise measurements...",
        "Understand the symbolism in stone reliefs...",
        "Explore the acoustic properties of the structure...",
        "Master the cosmic significance of the design...",
      ],
    },
  ])

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      name: "Linh Nguyen",
      country: "Vietnam",
      totalXP: 4250,
      culturalPoints: 1200,
      achievements: 45,
      avatar: "🇻🇳",
    },
    {
      rank: 2,
      name: "Siti Rahman",
      country: "Indonesia",
      totalXP: 3890,
      culturalPoints: 1100,
      achievements: 38,
      avatar: "🇮🇩",
    },
    {
      rank: 3,
      name: "Somchai Patel",
      country: "Thailand",
      totalXP: 3650,
      culturalPoints: 980,
      achievements: 42,
      avatar: "🇹🇭",
    },
    {
      rank: 4,
      name: "Maria Santos",
      country: "Philippines",
      totalXP: 2450,
      culturalPoints: 890,
      achievements: 23,
      avatar: "🇵🇭",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Ahmad Hassan",
      country: "Malaysia",
      totalXP: 2200,
      culturalPoints: 750,
      achievements: 28,
      avatar: "🇲🇾",
    },
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700"
      case "rare":
        return "bg-blue-100 text-blue-700"
      case "epic":
        return "bg-purple-100 text-purple-700"
      case "legendary":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const calculateLevelProgress = () => {
    const currentLevelXP = (userStats.level - 1) * 200
    const nextLevelXP = userStats.level * 200
    const progressXP = userStats.totalXP - currentLevelXP
    const neededXP = nextLevelXP - currentLevelXP
    return (progressXP / neededXP) * 100
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Learning Journey</h2>
          <p className="text-gray-600">Explore Southeast Asian culture through gamified learning</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/20 text-primary">
            Level {userStats.level}
          </Badge>
          <Badge variant="outline" className="border-forest/20 text-forest">
            {userStats.streak} day streak
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="quests">Cultural Quests</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* User Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Experience Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{userStats.totalXP.toLocaleString()}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Level {userStats.level}</span>
                    <span>Level {userStats.level + 1}</span>
                  </div>
                  <Progress value={calculateLevelProgress()} className="h-2" />
                  <div className="text-xs text-gray-600">
                    {Math.round(userStats.level * 200 - userStats.totalXP)} XP to next level
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-forest/20 bg-gradient-to-br from-forest/5 to-accent/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌏</span>
                  Cultural Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-forest mb-2">{userStats.culturalPoints}</div>
                <div className="text-sm text-gray-600">Earned through cultural learning and quests</div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs">Cultural Rank:</span>
                  <Badge variant="outline" className="border-forest/20 text-forest">
                    Heritage Explorer
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-2">{userStats.achievements}</div>
                <div className="text-sm text-gray-600 mb-3">Unlocked achievements</div>
                <div className="flex -space-x-1">
                  {achievements
                    .filter((a) => a.unlocked)
                    .slice(0, 5)
                    .map((achievement, index) => (
                      <div
                        key={achievement.id}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-white flex items-center justify-center text-sm"
                        title={achievement.title}
                      >
                        {achievement.icon}
                      </div>
                    ))}
                  {userStats.achievements > 5 && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                      +{userStats.achievements - 5}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-2xl">🌾</span>
                  <div className="flex-1">
                    <h4 className="font-medium">Achievement Unlocked!</h4>
                    <p className="text-sm text-gray-600">
                      Rice Terrace Scholar - Completed traditional farming lessons
                    </p>
                  </div>
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    +100 XP
                  </Badge>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-2xl">🔥</span>
                  <div className="flex-1">
                    <h4 className="font-medium">Streak Extended!</h4>
                    <p className="text-sm text-gray-600">7 days of consistent learning</p>
                  </div>
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    +25 XP
                  </Badge>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <span className="text-2xl">🏛️</span>
                  <div className="flex-1">
                    <h4 className="font-medium">Quest Progress</h4>
                    <p className="text-sm text-gray-600">Advanced in "Journey Through Angkor Wat"</p>
                  </div>
                  <Badge variant="outline" className="border-purple-200 text-purple-700">
                    +50 Cultural Points
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? getRarityColor(achievement.rarity) + " hover:shadow-md"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className={getRarityBadgeColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      {achievement.unlocked && (
                        <Badge variant="default" className="text-xs bg-green-500">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h3 className="font-medium mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">{achievement.points} XP</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.culturalContext}
                    </Badge>
                  </div>

                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="text-xs text-gray-500 mt-2">
                      Unlocked {achievement.unlockedAt.toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quests" className="space-y-6">
          <div className="space-y-4">
            {culturalQuests.map((quest) => (
              <Card
                key={quest.id}
                className="border-2 border-transparent hover:border-secondary/20 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{quest.icon}</div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{quest.title}</h3>
                          <p className="text-gray-600">{quest.description}</p>
                        </div>
                        <Badge variant="outline" className="border-forest/20 text-forest">
                          {quest.difficulty}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Country:</span>
                          <div className="text-gray-600">{quest.country}</div>
                        </div>
                        <div>
                          <span className="font-medium">Subject:</span>
                          <div className="text-gray-600">{quest.subject}</div>
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span>
                          <div className="text-gray-600">{quest.estimatedTime}</div>
                        </div>
                        <div>
                          <span className="font-medium">Rewards:</span>
                          <div className="text-gray-600">
                            {quest.xpReward} XP + {quest.culturalPoints} CP
                          </div>
                        </div>
                      </div>

                      {quest.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Quest Progress</span>
                            <span>
                              {quest.progress}/{quest.maxProgress}
                            </span>
                          </div>
                          <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Map className="h-4 w-4 text-secondary" />
                          <span className="text-sm text-gray-600">{quest.culturalSite}</span>
                        </div>

                        <Button
                          className="bg-gradient-to-r from-secondary to-forest"
                          disabled={quest.prerequisites.length > 0 && !quest.completed}
                        >
                          {quest.completed ? "Completed" : quest.progress > 0 ? "Continue" : "Start Quest"}
                        </Button>
                      </div>

                      {quest.prerequisites.length > 0 && (
                        <div className="text-sm">
                          <span className="font-medium">Prerequisites: </span>
                          <span className="text-gray-600">{quest.prerequisites.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Southeast Asia Leaderboard</h3>
            <Badge variant="outline" className="border-primary/20 text-primary">
              <Users className="h-3 w-3 mr-1" />
              This Week
            </Badge>
          </div>

          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <Card
                key={entry.rank}
                className={`border-2 transition-all duration-300 ${
                  entry.isCurrentUser ? "border-primary/20 bg-primary/5" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          entry.rank === 1
                            ? "bg-yellow-100 text-yellow-700"
                            : entry.rank === 2
                              ? "bg-gray-100 text-gray-700"
                              : entry.rank === 3
                                ? "bg-orange-100 text-orange-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {entry.rank <= 3 ? (entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉") : entry.rank}
                      </div>
                      <div className="text-2xl">{entry.avatar}</div>
                      <div>
                        <h4 className="font-medium">{entry.name}</h4>
                        <p className="text-sm text-gray-600">{entry.country}</p>
                      </div>
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-bold text-primary">{entry.totalXP.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Total XP</div>
                      </div>
                      <div>
                        <div className="font-bold text-forest">{entry.culturalPoints}</div>
                        <div className="text-xs text-gray-600">Cultural Points</div>
                      </div>
                      <div>
                        <div className="font-bold text-accent">{entry.achievements}</div>
                        <div className="text-xs text-gray-600">Achievements</div>
                      </div>
                    </div>

                    {entry.rank === 1 && <Crown className="h-6 w-6 text-yellow-500" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 border-accent/20 bg-accent/5">
            <CardContent className="p-4 text-center">
              <Gift className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h4 className="font-medium mb-1">Weekly Rewards</h4>
              <p className="text-sm text-gray-600 mb-3">
                Top 10 learners receive special cultural badges and bonus XP!
              </p>
              <Button size="sm" variant="outline">
                View Rewards
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
