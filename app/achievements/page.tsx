"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Crown, Flame, BookOpen, Brain, Globe, Users } from "lucide-react"

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const userStats = {
    totalPoints: 2450,
    level: 8,
    nextLevelPoints: 2800,
    coursesCompleted: 12,
    streakDays: 15,
    rank: 23,
    totalUsers: 1247,
  }

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      category: "learning",
      points: 50,
      unlocked: true,
      unlockedDate: "2024-01-10",
      rarity: "common",
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Score 100% on 5 quizzes",
      icon: "🧠",
      category: "quiz",
      points: 200,
      unlocked: true,
      unlockedDate: "2024-01-15",
      rarity: "rare",
    },
    {
      id: 3,
      title: "Cultural Explorer",
      description: "Learn content from 3 different countries",
      icon: "🌏",
      category: "cultural",
      points: 150,
      unlocked: true,
      unlockedDate: "2024-01-18",
      rarity: "uncommon",
    },
    {
      id: 4,
      title: "Streak Warrior",
      description: "Maintain a 14-day learning streak",
      icon: "🔥",
      category: "streak",
      points: 300,
      unlocked: true,
      unlockedDate: "2024-01-20",
      rarity: "epic",
    },
    {
      id: 5,
      title: "Tech Pioneer",
      description: "Complete 5 technology courses",
      icon: "💻",
      category: "learning",
      points: 250,
      unlocked: false,
      progress: 3,
      total: 5,
      rarity: "rare",
    },
    {
      id: 6,
      title: "Science Enthusiast",
      description: "Complete 10 science courses",
      icon: "🔬",
      category: "learning",
      points: 400,
      unlocked: false,
      progress: 7,
      total: 10,
      rarity: "epic",
    },
    {
      id: 7,
      title: "Community Helper",
      description: "Help 10 other learners",
      icon: "🤝",
      category: "social",
      points: 200,
      unlocked: false,
      progress: 2,
      total: 10,
      rarity: "uncommon",
    },
    {
      id: 8,
      title: "Polyglot",
      description: "Learn in 5 different languages",
      icon: "🗣️",
      category: "cultural",
      points: 500,
      unlocked: false,
      progress: 2,
      total: 5,
      rarity: "legendary",
    },
  ]

  const categories = [
    { id: "all", name: "All", icon: Trophy },
    { id: "learning", name: "Learning", icon: BookOpen },
    { id: "quiz", name: "Quiz", icon: Brain },
    { id: "cultural", name: "Cultural", icon: Globe },
    { id: "streak", name: "Streak", icon: Flame },
    { id: "social", name: "Social", icon: Users },
  ]

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === "all" || achievement.category === selectedCategory,
  )

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 border-gray-200 bg-gray-50"
      case "uncommon":
        return "text-forest border-forest/20 bg-forest/5"
      case "rare":
        return "text-secondary border-secondary/20 bg-secondary/5"
      case "epic":
        return "text-primary border-primary/20 bg-primary/5"
      case "legendary":
        return "text-accent border-accent/20 bg-accent/5"
      default:
        return "text-gray-600 border-gray-200 bg-gray-50"
    }
  }

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "Common"
      case "uncommon":
        return "Uncommon"
      case "rare":
        return "Rare"
      case "epic":
        return "Epic"
      case "legendary":
        return "Legendary"
      default:
        return "Common"
    }
  }

  const progressToNextLevel = ((userStats.totalPoints % 350) / 350) * 100

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row">
        <EnhancedSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-rice-50 to-sky-50">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-display mb-4">
                Your{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Achievements
                </span>
              </h1>
              <p className="text-gray-600">Track your learning journey and unlock amazing rewards</p>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6 text-center">
                  <Crown className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary mb-1">Level {userStats.level}</div>
                  <div className="text-sm text-gray-600 mb-2">{userStats.totalPoints} XP</div>
                  <Progress value={progressToNextLevel} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    {userStats.nextLevelPoints - userStats.totalPoints} XP to next level
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary/20">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-secondary" />
                  <div className="text-2xl font-bold text-secondary mb-1">{userStats.coursesCompleted}</div>
                  <div className="text-sm text-gray-600">Courses Completed</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20">
                <CardContent className="p-6 text-center">
                  <Flame className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-accent mb-1">{userStats.streakDays}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </CardContent>
              </Card>

              <Card className="border-2 border-forest/20">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-forest" />
                  <div className="text-2xl font-bold text-forest mb-1">#{userStats.rank}</div>
                  <div className="text-sm text-gray-600">Global Rank</div>
                </CardContent>
              </Card>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                )
              })}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement, index) => (
                <Card
                  key={achievement.id}
                  className={`border-2 transition-all duration-300 hover:shadow-medium hover:-translate-y-1 animate-fade-in ${
                    achievement.unlocked ? getRarityColor(achievement.rarity) : "border-gray-200 bg-gray-50 opacity-75"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          {getRarityBadge(achievement.rarity)}
                        </Badge>
                        {achievement.unlocked && (
                          <Badge variant="secondary" className="bg-forest/10 text-forest">
                            <Star className="h-3 w-3 mr-1" />
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>

                    {achievement.unlocked ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Earned</span>
                          <span className="text-sm text-gray-600">{achievement.unlockedDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Points</span>
                          <span className="text-sm font-bold text-primary">+{achievement.points} XP</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {achievement.progress !== undefined && (
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>
                                {achievement.progress}/{achievement.total}
                              </span>
                            </div>
                            <Progress value={(achievement.progress! / achievement.total!) * 100} className="h-2" />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Reward</span>
                          <span className="text-sm font-bold text-gray-500">+{achievement.points} XP</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Leaderboard Preview */}
            <Card className="border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Linh Nguyen", points: 4250, country: "🇻🇳" },
                    { rank: 2, name: "Somchai Patel", points: 3890, country: "🇹🇭" },
                    { rank: 3, name: "Siti Rahman", points: 3650, country: "🇮🇩" },
                    { rank: 23, name: "You (Maria Santos)", points: 2450, country: "🇵🇭", isUser: true },
                  ].map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.isUser ? "bg-primary/10 border border-primary/20" : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            user.rank === 1
                              ? "bg-accent text-white"
                              : user.rank === 2
                                ? "bg-gray-400 text-white"
                                : user.rank === 3
                                  ? "bg-amber-600 text-white"
                                  : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.points} XP</div>
                        </div>
                      </div>
                      <div className="text-2xl">{user.country}</div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-accent to-primary">
                  <Trophy className="h-4 w-4 mr-2" />
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
