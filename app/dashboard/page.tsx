"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/components/auth-provider"
import { useCulturalContext } from "@/components/cultural-context-provider"
import { useLocalization } from "@/components/enhanced-localization-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Trophy,
  Clock,
  TrendingUp,
  Star,
  Play,
  Target,
  Award,
  Users,
  Globe,
  Brain,
  Zap,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()
  const { profile, content, getPersonalizedGreeting, getEncouragement, getLocalizedCourse } = useCulturalContext()
  const { t } = useLocalization()
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    setGreeting(getPersonalizedGreeting())
  }, [profile])

  // Get culturally adapted courses
  const mathCourse = getLocalizedCourse("math")
  const scienceCourse = getLocalizedCourse("science")
  const historyCourse = getLocalizedCourse("history")

  const userStats = {
    coursesCompleted: 3,
    totalCourses: 12,
    studyStreak: 7,
    totalStudyTime: 45,
    achievements: 8,
    currentLevel: profile?.region === "Visayas" ? "Intermediate sa Bisaya" : "Intermediate",
    weeklyGoal: 5,
    weeklyProgress: 3,
  }

  const culturalAchievements = [
    {
      id: 1,
      title: profile?.region === "Visayas" ? "Bisaya Explorer" : "Cultural Explorer",
      description:
        profile?.region === "Visayas" ? "Nahibal-an ang 5 ka lain-laing kultura" : "Natuto ng 5 iba't ibang kultura",
      icon: profile?.region === "Visayas" ? "🏝️" : "🌾",
      unlocked: true,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: profile?.region === "Visayas" ? "Lapu-Lapu Warrior" : "Rizal Scholar",
      description:
        profile?.region === "Visayas"
          ? "Nahuman ang Lapu-Lapu history module"
          : "Natapos ang Jose Rizal history module",
      icon: profile?.region === "Visayas" ? "⚔️" : "📚",
      unlocked: true,
      date: "2024-01-20",
    },
    {
      id: 3,
      title: profile?.region === "Visayas" ? "Sinulog Dancer" : "Fiesta Master",
      description:
        profile?.region === "Visayas" ? "Nahibal-an ang Sinulog festival" : "Natuto ng mga Filipino festivals",
      icon: profile?.region === "Visayas" ? "💃" : "🎉",
      unlocked: false,
      progress: 70,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "course_completed",
      title: mathCourse?.title || "Matematika",
      description: profile?.tone === "youth" ? "Natapos mo with flying colors! 🎉" : "Natapos ninyo ng maayos!",
      timestamp: "2 oras na ang nakalipas",
      icon: Trophy,
      color: "text-yellow-500",
    },
    {
      id: 2,
      type: "quiz_taken",
      title: historyCourse?.title || "Kasaysayan",
      description: profile?.tone === "formal" ? "Nakakuha po kayo ng 8/10 sa quiz" : "Nakakuha kayo ng 8/10 sa quiz",
      timestamp: "1 araw na ang nakalipas",
      icon: Brain,
      color: "text-blue-500",
    },
  ]

  const localizedCourses = [mathCourse, scienceCourse, historyCourse].filter(Boolean)

  const getRegionalBackground = () => {
    if (profile?.region === "Visayas") {
      return "bg-gradient-to-br from-blue-100 via-teal-50 to-cyan-100"
    } else if (profile?.region === "Mindanao") {
      return "bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100"
    }
    return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
  }

  const getRegionalColors = () => {
    if (profile?.region === "Visayas") {
      return {
        primary: "from-blue-500 to-cyan-400",
        secondary: "from-orange-500 to-red-400",
        accent: "from-green-500 to-teal-400",
      }
    } else if (profile?.region === "Mindanao") {
      return {
        primary: "from-green-500 to-emerald-400",
        secondary: "from-red-500 to-orange-400",
        accent: "from-yellow-500 to-amber-400",
      }
    }
    return {
      primary: "from-blue-500 to-indigo-400",
      secondary: "from-purple-500 to-pink-400",
      accent: "from-teal-500 to-cyan-400",
    }
  }

  const colors = getRegionalColors()

  return (
    <AuthGuard>
      <div className={`min-h-screen ${getRegionalBackground()}`}>
        <div className="container mx-auto p-6 space-y-8">
          {/* Cultural Welcome Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                <AvatarImage src={user?.photoURL || "/logo.png"} alt={user?.name} />
                <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {greeting}, {user?.name}! 👋
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {profile?.region}, {profile?.country}
                  {profile?.dialect && (
                    <Badge variant="outline" className="ml-2">
                      {profile.dialect}
                    </Badge>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {userStats.studyStreak} araw na streak
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {userStats.currentLevel}
              </Badge>
            </div>
          </div>

          {/* Cultural Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mga Natapos na Kurso</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">{userStats.coursesCompleted}</div>
                <p className="text-xs text-gray-600">sa {userStats.totalCourses} kabuuang kurso</p>
                <Progress value={(userStats.coursesCompleted / userStats.totalCourses) * 100} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-700">{userStats.studyStreak} araw</div>
                <p className="text-xs text-gray-600">
                  {profile?.tone === "youth" ? "Keep it up, fam! 🔥" : "Tuloy lang! 🔥"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Oras ng Pag-aaral</CardTitle>
                <Clock className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700">{userStats.totalStudyTime}h</div>
                <p className="text-xs text-gray-600">Ngayong buwan</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mga Achievement</CardTitle>
                <Trophy className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700">{userStats.achievements}</div>
                <p className="text-xs text-gray-600">Mga badge na nakuha</p>
              </CardContent>
            </Card>
          </div>

          {/* Cultural Weekly Goal */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-teal-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-teal-600" />
                {profile?.tone === "formal" ? "Layunin ninyo ngayong linggo" : "Target mo ngayong week"}
              </CardTitle>
              <CardDescription>
                {profile?.tone === "youth"
                  ? `Complete mo ang ${userStats.weeklyGoal} learning sessions this week!`
                  : `Kumpletuhin ang ${userStats.weeklyGoal} learning sessions ngayong linggo`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {userStats.weeklyProgress} sa {userStats.weeklyGoal} sessions na nakumpleto
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round((userStats.weeklyProgress / userStats.weeklyGoal) * 100)}%
                </span>
              </div>
              <Progress value={(userStats.weeklyProgress / userStats.weeklyGoal) * 100} className="h-3" />
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Mga Kurso</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Culturally Adapted Courses */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      {profile?.tone === "formal" ? "Magpatuloy sa Pag-aaral" : "Continue Learning"}
                    </CardTitle>
                    <CardDescription>
                      {profile?.region === "Visayas"
                        ? "Mga kurso nga gi-adapt para sa Bisaya"
                        : "Mga kurso na naka-adapt para sa inyong kultura"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {localizedCourses.map((course, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-white/50">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                          {course.title.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                          <div className="text-xs text-gray-500">Examples: {course.examples.join(", ")}</div>
                        </div>
                        <Button size="sm" className={`bg-gradient-to-r ${colors.primary} text-white`} asChild>
                          <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                            {profile?.tone === "youth" ? "Let's go!" : "Simulan"}
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Cultural Achievements */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      {profile?.region === "Visayas" ? "Mga Kalampusan" : "Mga Tagumpay"}
                    </CardTitle>
                    <CardDescription>
                      {profile?.tone === "formal"
                        ? "Mga nakamit ninyong achievement"
                        : "Mga achievement na nakuha ninyo"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {culturalAchievements.slice(0, 3).map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          achievement.unlocked
                            ? "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                            : "bg-gray-50"
                        }`}
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-medium">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {!achievement.unlocked && achievement.progress && (
                            <div className="mt-2">
                              <Progress value={achievement.progress} className="h-2" />
                              <span className="text-xs text-gray-500">{achievement.progress}% complete</span>
                            </div>
                          )}
                        </div>
                        {achievement.unlocked && <Badge variant="secondary">{achievement.date}</Badge>}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localizedCourses.map((course, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
                  >
                    <div className={`h-32 bg-gradient-to-r ${colors.primary} flex items-center justify-center`}>
                      <div className="text-white text-4xl font-bold">{course.title.charAt(0)}</div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Mga Halimbawa:</h4>
                          <div className="flex flex-wrap gap-1">
                            {course.examples.slice(0, 3).map((example: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {example}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button className={`w-full bg-gradient-to-r ${colors.primary} text-white`} asChild>
                          <Link href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}>
                            {profile?.tone === "youth" ? "Start na!" : "Simulan ang Kurso"}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {culturalAchievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 border-2"
                        : "bg-white/60 opacity-70"
                    } backdrop-blur-sm`}
                  >
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {achievement.unlocked ? (
                        <div className="text-center">
                          <Badge variant="secondary">
                            {profile?.tone === "formal" ? "Nakamit noong" : "Unlocked on"} {achievement.date}
                          </Badge>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{achievement.progress || 0}%</span>
                          </div>
                          <Progress value={achievement.progress || 0} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    {profile?.tone === "formal" ? "Mga ginawa ninyo sa nakaraang linggo" : "Mga ginawa ninyo recently"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg bg-white/50">
                        <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                          <activity.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Cultural Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>
                {profile?.tone === "youth" ? "Quick Actions para sa learning!" : "Mga Mabilis na Aksyon"}
              </CardTitle>
              <CardDescription>
                {profile?.region === "Visayas"
                  ? "Mga butang nga mahimo ninyo karon"
                  : "Mga bagay na pwede ninyong gawin ngayon"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/80" asChild>
                  <Link href="/courses">
                    <BookOpen className="h-6 w-6" />
                    {profile?.tone === "youth" ? "Browse Courses" : "Mga Kurso"}
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/80" asChild>
                  <Link href="/quiz">
                    <Brain className="h-6 w-6" />
                    {profile?.region === "Visayas" ? "Quiz Time!" : "Mag-Quiz"}
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/80" asChild>
                  <Link href="/study-groups">
                    <Users className="h-6 w-6" />
                    {profile?.tone === "formal" ? "Mga Study Group" : "Study Groups"}
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-white/50 hover:bg-white/80" asChild>
                  <Link href="/settings">
                    <Globe className="h-6 w-6" />
                    Settings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cultural Motivation Section */}
          <Card className={`bg-gradient-to-r ${colors.primary} text-white`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {profile?.tone === "youth"
                      ? "You're doing amazing! Keep it up! 🚀"
                      : profile?.tone === "formal"
                        ? "Napakagaling ninyo po! Magpatuloy lang!"
                        : "Napakagaling ninyo! Tuloy lang!"}
                  </h3>
                  <p className="text-white/90">
                    {profile?.region === "Visayas"
                      ? "Padayon sa inyong pagkat-on. Makaya ninyo ni!"
                      : "Magpatuloy sa inyong pag-aaral. Kaya ninyo yan!"}
                  </p>
                </div>
                <div className="text-4xl">
                  {profile?.region === "Visayas" ? "🏝️" : profile?.region === "Mindanao" ? "🏔️" : "🌾"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
