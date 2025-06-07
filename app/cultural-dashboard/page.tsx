"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/simple-auth"
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
  Award,
  Zap,
  MapPin,
  ArrowLeft,
  Brain,
  Users,
  Target,
  BarChart3,
  MessageSquare,
  Globe,
  Gamepad2,
  Sparkles,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { getCulturalContent } from "@/lib/cultural-data"
import { AutomatedCulturalQuiz } from "@/components/automated-cultural-quiz"
import { KatutuboAITutor } from "@/components/katutubo-ai-tutor"

// Mock components to prevent database connections
const MockQuizComponent = ({ courseId, onComplete }: any) => (
  <div className="p-6 border rounded-lg bg-white">
    <h3 className="text-lg font-medium mb-4">Cultural Quiz</h3>
    <p className="mb-4">
      This is a mock quiz component. In the real app, this would connect to a database to fetch questions.
    </p>
    <div className="space-y-4">
      <div className="p-3 border rounded-lg">
        <p className="font-medium">Sample Question 1:</p>
        <p className="text-gray-600 mb-2">What is the capital of the Philippines?</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 border rounded hover:bg-blue-50">
            <input type="radio" id="q1a1" name="q1" />
            <label htmlFor="q1a1">Manila</label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded hover:bg-blue-50">
            <input type="radio" id="q1a2" name="q1" />
            <label htmlFor="q1a2">Cebu</label>
          </div>
          <div className="flex items-center space-x-2 p-2 border rounded hover:bg-blue-50">
            <input type="radio" id="q1a3" name="q1" />
            <label htmlFor="q1a3">Davao</label>
          </div>
        </div>
      </div>
      <Button onClick={() => onComplete(8, 10)}>Submit Quiz</Button>
    </div>
  </div>
)

const MockVoiceFeedback = ({ text, className }: any) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Button variant="outline" size="sm" className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
      </svg>
      Listen
    </Button>
    <span className="text-sm text-gray-500">{text}</span>
  </div>
)

const MockAITutorChat = () => (
  <div className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white">
        AI
      </div>
      <div>
        <h3 className="font-medium">AI Tutor</h3>
        <p className="text-sm text-gray-500">Here to help with your learning</p>
      </div>
    </div>
    <div className="space-y-4 mb-4">
      <div className="bg-gray-100 p-3 rounded-lg">
        <p>Hello! How can I help with your learning today?</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg ml-auto max-w-[80%]">
        <p>Can you explain the concept of photosynthesis?</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-lg">
        <p>
          Photosynthesis is the process by which plants convert light energy into chemical energy. Plants use sunlight,
          water, and carbon dioxide to create oxygen and energy in the form of sugar.
        </p>
      </div>
    </div>
    <div className="flex gap-2">
      <input type="text" placeholder="Type your question..." className="flex-1 p-2 border rounded-md" />
      <Button>Send</Button>
    </div>
  </div>
)

const MockStudyGroups = () => (
  <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
    <CardHeader>
      <CardTitle>Study Groups</CardTitle>
      <CardDescription>Connect with other learners</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Bisaya Language Group</h3>
          <p className="text-sm text-gray-600 mb-3">Practice conversational Cebuano with native speakers</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">M</div>
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">J</div>
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">A</div>
            </div>
            <span className="text-sm text-gray-500">12 members</span>
          </div>
          <Button variant="outline" size="sm">
            Join Group
          </Button>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Filipino History Club</h3>
          <p className="text-sm text-gray-600 mb-3">Discuss historical events and cultural heritage</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center">R</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center">L</div>
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center">K</div>
            </div>
            <span className="text-sm text-gray-500">8 members</span>
          </div>
          <Button variant="outline" size="sm">
            Join Group
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
)

const MockLearningAnalyticsDashboard = () => (
  <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
    <CardHeader>
      <CardTitle>Learning Analytics</CardTitle>
      <CardDescription>Track your progress and performance</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-3">Weekly Study Time</h3>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Quiz Performance</h3>
          <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="font-medium mb-3">Learning Strengths</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 border rounded-lg text-center">
              <div className="text-2xl mb-1">🧮</div>
              <div className="font-medium">Mathematics</div>
              <div className="text-sm text-gray-500">85%</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-2xl mb-1">🔬</div>
              <div className="font-medium">Science</div>
              <div className="text-sm text-gray-500">78%</div>
            </div>
            <div className="p-3 border rounded-lg text-center">
              <div className="text-2xl mb-1">📚</div>
              <div className="font-medium">History</div>
              <div className="text-sm text-gray-500">92%</div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const MockNotificationsPanel = () => (
  <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>Recent updates and alerts</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
          <div className="flex justify-between">
            <h4 className="font-medium">New Course Available</h4>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <p className="text-sm text-gray-600">
            "Filipino Cuisine and Cooking" course is now available. Explore traditional recipes!
          </p>
        </div>
        <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
          <div className="flex justify-between">
            <h4 className="font-medium">Quiz Completed</h4>
            <span className="text-xs text-gray-500">Yesterday</span>
          </div>
          <p className="text-sm text-gray-600">You scored 85% on "Philippine Geography". Great job!</p>
        </div>
        <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
          <div className="flex justify-between">
            <h4 className="font-medium">Study Reminder</h4>
            <span className="text-xs text-gray-500">2 days ago</span>
          </div>
          <p className="text-sm text-gray-600">Don't forget to complete your weekly learning goals!</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const MockCulturalImageAdapter = ({ imageUrl, alt, width, height, autoAdapt, className }: any) => (
  <div className={`bg-gray-200 rounded-lg overflow-hidden ${className}`} style={{ width, height }}>
    <img src={imageUrl || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
  </div>
)

export default function CulturalDashboardPage() {
  const { user } = useAuth()
  const [culturalProfile, setCulturalProfile] = useState<any>(null)
  const [culturalContent, setCulturalContent] = useState<any>(null)
  const [greeting, setGreeting] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      try {
        // Try to load from localStorage
        const savedProfile = localStorage.getItem("culturalProfile")
        if (savedProfile) {
          const profile = JSON.parse(savedProfile)
          setCulturalProfile(profile)
          setCulturalContent(getCulturalContent(profile.country, profile.region))
          setGreeting(getPersonalizedGreeting(profile))
        } else {
          // Set default profile if none exists
          const defaultProfile = {
            country: "Philippines",
            region: "Visayas",
            language: "Cebuano",
            dialect: "Hiligaynon",
            tone: "informal",
            schoolType: "public",
            learningPace: "flexible",
          }
          setCulturalProfile(defaultProfile)
          setCulturalContent(getCulturalContent(defaultProfile.country, defaultProfile.region))
          setGreeting(getPersonalizedGreeting(defaultProfile))
        }
      } catch (error) {
        console.error("Error loading cultural profile:", error)
        // Set default profile on error
        const defaultProfile = {
          country: "Philippines",
          region: "Visayas",
          language: "Cebuano",
          dialect: "Hiligaynon",
          tone: "informal",
          schoolType: "public",
          learningPace: "flexible",
        }
        setCulturalProfile(defaultProfile)
        setCulturalContent(getCulturalContent(defaultProfile.country, defaultProfile.region))
        setGreeting("Maayong buntag!")
      } finally {
        setIsLoading(false)
      }
    }, 500) // Short timeout to simulate loading

    return () => clearTimeout(timer)
  }, [])

  const getPersonalizedGreeting = (profile: any) => {
    if (!profile) return "Hello!"

    const timeOfDay = new Date().getHours()
    const greetings = getLocalizedGreetings(profile.language, profile.region, timeOfDay, profile.tone)

    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  const getLocalizedGreetings = (language: string, region: string, timeOfDay: number, tone: string) => {
    const greetingMap: any = {
      Filipino: {
        morning:
          tone === "formal" ? ["Magandang umaga po!", "Maligayang umaga po!"] : ["Magandang umaga!", "Good morning!"],
        afternoon:
          tone === "formal" ? ["Magandang hapon po!", "Maligayang hapon po!"] : ["Magandang hapon!", "Good afternoon!"],
        evening:
          tone === "formal" ? ["Magandang gabi po!", "Maligayang gabi po!"] : ["Magandang gabi!", "Good evening!"],
      },
      Cebuano: {
        morning: tone === "formal" ? ["Maayong buntag po!", "Maligayang buntag po!"] : ["Maayong buntag!", "Kumusta!"],
        afternoon: tone === "formal" ? ["Maayong udto po!", "Maligayang udto po!"] : ["Maayong udto!", "Kumusta ka?"],
        evening: tone === "formal" ? ["Maayong gabii po!", "Maligayang gabii po!"] : ["Maayong gabii!", "Kumusta man?"],
      },
      English: {
        morning: ["Good morning!", "Hello!"],
        afternoon: ["Good afternoon!", "Hello!"],
        evening: ["Good evening!", "Hello!"],
      },
    }

    const timeKey = timeOfDay < 12 ? "morning" : timeOfDay < 18 ? "afternoon" : "evening"
    return greetingMap[language]?.[timeKey] || ["Hello!", "Good day!"]
  }

  const getLocalizedText = (key: string) => {
    const translations: any = {
      Filipino: {
        "dashboard.welcome": "Maligayang pagbabalik",
        "dashboard.continue": "Magpatuloy sa Pag-aaral",
        "dashboard.achievements": "Inyong mga Tagumpay",
        "dashboard.courses": "Mga Kurso",
        "dashboard.analytics": "Mga Ulat",
        "dashboard.quiz": "Pagsusulit",
        "dashboard.study_groups": "Mga Grupo sa Pag-aaral",
        "dashboard.ai_tutor": "AI Tutor",
        "dashboard.notifications": "Mga Abiso",
        "dashboard.settings": "Mga Setting",
        "common.loading": "Naglo-load...",
        "common.submit": "Isumite",
        "common.back": "Bumalik",
        "common.next": "Susunod",
        "quiz.correct": "Tama!",
        "quiz.incorrect": "Mali.",
        "quiz.try_again": "Subukan muli",
        "quiz.hint": "Pahiwatig",
        "quiz.well_done": "Magaling!",
        "quiz.your_score": "Inyong Iskor",
        "quiz.next_question": "Susunod na Tanong",
        "quiz.end_quiz": "Tapusin ang Pagsusulit",
        "quiz.review_answer": "Suriin ang Sagot",
      },
      Cebuano: {
        "dashboard.welcome": "Maayong pagbalik",
        "dashboard.continue": "Padayon sa Pagkat-on",
        "dashboard.achievements": "Inyong mga Kalampusan",
        "dashboard.courses": "Mga Kurso",
        "dashboard.analytics": "Mga Taho",
        "dashboard.quiz": "Pagsulay",
        "dashboard.study_groups": "Mga Grupo sa Pagkat-on",
        "dashboard.ai_tutor": "AI Magtutudlo",
        "dashboard.notifications": "Mga Pahibalo",
        "dashboard.settings": "Mga Setting",
        "common.loading": "Nag-load...",
        "common.submit": "Isumiter",
        "common.back": "Balik",
        "common.next": "Sunod",
        "quiz.correct": "Sakto!",
        "quiz.incorrect": "Sayop.",
        "quiz.try_again": "Sulayi pag-usab",
        "quiz.hint": "Tambag",
        "quiz.well_done": "Maayo kaayo!",
        "quiz.your_score": "Imong Iskor",
        "quiz.next_question": "Sunod nga Pangutana",
        "quiz.end_quiz": "Humanon ang Pagsulay",
        "quiz.review_answer": "Tan-awa ang Tubag",
      },
    }

    return translations[culturalProfile?.language]?.[key] || key
  }

  const getRegionalBackground = () => {
    if (culturalProfile?.region === "Visayas") {
      return "bg-gradient-to-br from-blue-100 via-teal-50 to-cyan-100"
    } else if (culturalProfile?.region === "Mindanao") {
      return "bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100"
    }
    return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
  }

  const getRegionalColors = () => {
    if (culturalProfile?.region === "Visayas") {
      return {
        primary: "from-blue-500 to-cyan-400",
        secondary: "from-orange-500 to-red-400",
        accent: "from-green-500 to-teal-400",
      }
    } else if (culturalProfile?.region === "Mindanao") {
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

  const userStats = {
    coursesCompleted: 3,
    totalCourses: 12,
    studyStreak: 7,
    totalStudyTime: 45,
    achievements: 8,
    currentLevel: culturalProfile?.region === "Visayas" ? "Intermediate sa Bisaya" : "Intermediate",
    weeklyGoal: 5,
    weeklyProgress: 3,
    totalPoints: 1250,
    rank: "Intermediate",
    quizzesCompleted: 15,
    averageScore: 85,
  }

  const culturalAchievements = [
    {
      id: 1,
      title: culturalProfile?.region === "Visayas" ? "Bisaya Explorer" : "Cultural Explorer",
      description:
        culturalProfile?.region === "Visayas"
          ? "Nahibal-an ang 5 ka lain-laing kultura"
          : "Natuto ng 5 iba't ibang kultura",
      icon: culturalProfile?.region === "Visayas" ? "🏝️" : "🌾",
      unlocked: true,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: culturalProfile?.region === "Visayas" ? "Lapu-Lapu Warrior" : "Rizal Scholar",
      description:
        culturalProfile?.region === "Visayas"
          ? "Nahuman ang Lapu-Lapu history module"
          : "Natapos ang Jose Rizal history module",
      icon: culturalProfile?.region === "Visayas" ? "⚔️" : "📚",
      unlocked: true,
      date: "2024-01-20",
    },
    {
      id: 3,
      title: culturalProfile?.region === "Visayas" ? "Sinulog Dancer" : "Fiesta Master",
      description:
        culturalProfile?.region === "Visayas" ? "Nahibal-an ang Sinulog festival" : "Natuto ng mga Filipino festivals",
      icon: culturalProfile?.region === "Visayas" ? "💃" : "🎉",
      unlocked: false,
      progress: 70,
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-cyan-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Loading Cultural Dashboard...</CardTitle>
            <CardDescription>Setting up your personalized learning experience.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">This will only take a moment.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${getRegionalBackground()}`}>
      <div className="container mx-auto p-6 space-y-8">
        {/* Back to Regular Dashboard */}
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Regular Dashboard
            </Link>
          </Button>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            Cultural Mode - {culturalProfile.region}
          </Badge>
        </div>

        {/* Cultural Welcome Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-4 border-white shadow-lg rounded-full cursor-pointer dark:border-gray-800">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback className={`text-lg bg-gradient-to-r ${colors.primary} text-black`}>
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-black">
                {greeting}, {user?.name || "Learner"}! 👋
              </h1>
              <p className="text-black flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {culturalProfile.region}, {culturalProfile.country}
                {culturalProfile.dialect && (
                  <Badge variant="outline" className="ml-2 text-black">
                    {culturalProfile.dialect}
                  </Badge>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              {userStats.studyStreak} {culturalProfile.language === "Cebuano" ? "ka adlaw" : "araw"} streak
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 text-black">
              <Star className="h-3 w-3 text-black" />
              {userStats.currentLevel}
            </Badge>
          </div>
        </div>

        {/* Cultural Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-blue-100 bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-6 dark:bg-gray-700/40 dark:border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{getLocalizedText("dashboard.courses")}</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{userStats.coursesCompleted}</div>
              <p className="text-xs text-gray-600">sa {userStats.totalCourses} kabuuang kurso</p>
              <Progress value={(userStats.coursesCompleted / userStats.totalCourses) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-6 dark:bg-gray-700/40 dark:border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {userStats.studyStreak} {culturalProfile.language === "Cebuano" ? "adlaw" : "araw"}
              </div>
              <p className="text-xs text-gray-600">
                {culturalProfile.tone === "youth"
                  ? "Keep it up, fam! 🔥"
                  : culturalProfile.language === "Cebuano"
                    ? "Padayon! 🔥"
                    : "Tuloy lang! 🔥"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-6 dark:bg-gray-700/40 dark:border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {culturalProfile.language === "Cebuano" ? "Oras sa Pagkat-on" : "Oras ng Pag-aaral"}
              </CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{userStats.totalStudyTime}h</div>
              <p className="text-xs text-gray-600">
                {culturalProfile.language === "Cebuano" ? "Karong bulana" : "Ngayong buwan"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 bg-white/50 backdrop-blur-sm rounded-xl shadow-md p-6 dark:bg-gray-700/40 dark:border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{getLocalizedText("dashboard.achievements")}</CardTitle>
              <Trophy className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{userStats.achievements}</div>
              <p className="text-xs text-gray-600">
                {culturalProfile.language === "Cebuano" ? "Mga badge nga nakuha" : "Mga badge na nakuha"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {getLocalizedText("dashboard.courses")}
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              {getLocalizedText("dashboard.quiz")}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              {getLocalizedText("dashboard.analytics")}
            </TabsTrigger>
            <TabsTrigger value="study-groups" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="ai-tutor" className="flex items-center gap-1">
              <Sparkles className="h-4 w-4" />
              AI Tutor
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              Awards
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Notices
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Continue Learning Section */}
            <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  {getLocalizedText("dashboard.continue")}
                </CardTitle>
                <CardDescription>
                  {culturalProfile.region === "Visayas"
                    ? "Mga kurso nga gi-adapt para sa Bisaya"
                    : "Mga kurso na naka-adapt para sa inyong kultura"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Culturally Adapted Courses */}
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">🧮</div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">
                            {culturalProfile.language === "Cebuano"
                              ? "Matematika sa Adlaw-adlaw"
                              : "Matematika sa Pang-araw-araw"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {culturalProfile.language === "Cebuano"
                              ? "Pagkwenta sa merkado ug sa balay"
                              : "Pagkukuwenta sa palengke at sa bahay"}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>65% complete</span>
                              <span>12 lessons</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          <Button size="sm" className={`mt-3 w-full bg-gradient-to-r ${colors.primary} text-white`}>
                            <Play className="w-4 h-4 mr-2" />
                            {culturalProfile.tone === "youth"
                              ? "Let's go!"
                              : culturalProfile.language === "Cebuano"
                                ? "Sugdi"
                                : "Simulan"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">🔬</div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">
                            {culturalProfile.language === "Cebuano" ? "Siyensya ug Kinaiyahan" : "Agham at Kalikasan"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {culturalProfile.region === "Visayas"
                              ? "Chocolate Hills ug mga hayop sa Bohol"
                              : "Bundok Mayon at mga hayop sa Pilipinas"}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>40% complete</span>
                              <span>8 lessons</span>
                            </div>
                            <Progress value={40} className="h-2" />
                          </div>
                          <Button size="sm" className={`mt-3 w-full bg-gradient-to-r ${colors.secondary} text-white`}>
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">📚</div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">
                            {culturalProfile.region === "Visayas" ? "Kasaysayan sa Bisaya" : "Kasaysayan ng Pilipinas"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {culturalProfile.region === "Visayas"
                              ? "Si Lapu-Lapu ug ang mga bayani"
                              : "Si Jose Rizal at mga bayani"}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>80% complete</span>
                              <span>15 lessons</span>
                            </div>
                            <Progress value={80} className="h-2" />
                          </div>
                          <Button size="sm" className={`mt-3 w-full bg-gradient-to-r ${colors.accent} text-white`}>
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Cultural Recommendations */}
            <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  {culturalProfile.language === "Cebuano" ? "Para Kanimo" : "Para sa Iyo"}
                </CardTitle>
                <CardDescription>
                  {culturalProfile.tone === "formal"
                    ? "Mga rekomendasyon na naaayon sa inyong kultura"
                    : "Mga recommended na content para sa inyo"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200">
                    <MockCulturalImageAdapter
                      imageUrl="/c3.png"
                      alt="Cultural Story"
                      width={300}
                      height={200}
                      autoAdapt={true}
                      className="mb-3"
                    />
                    <h3 className="font-semibold mb-2">
                      {culturalProfile.region === "Visayas"
                        ? "Alamat ni Tungkung Langit"
                        : culturalProfile.region === "Mindanao"
                          ? "Alamat ni Bantugan"
                          : "Alamat ni Maria Makiling"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                      {culturalProfile.language === "Cebuano"
                        ? "Mga sugilanon ug alamat sa atong lugar"
                        : "Mga kwento at alamat sa aming lugar"}
                    </p>
                    <MockVoiceFeedback
                      text={
                        culturalProfile.region === "Visayas"
                          ? "Basaha ang alamat ni Tungkung Langit"
                          : "Basahin ang alamat ni Maria Makiling"
                      }
                      className="mb-2"
                    />
                    <Button size="sm" variant="outline" className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {culturalProfile.language === "Cebuano" ? "Basaha ang Sugilanon" : "Basahin ang Kwento"}
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <MockCulturalImageAdapter
                      imageUrl="/c6.png"
                      alt="Traditional Games"
                      width={300}
                      height={200}
                      autoAdapt={true}
                      className="mb-3"
                    />
                    <h3 className="font-semibold mb-2">
                      {culturalProfile.region === "Visayas" ? "Mga Laro sa Bisaya" : "Mga Larong Pinoy"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {culturalProfile.language === "Cebuano"
                        ? "Tradisyonal nga mga dula ug kalihokan"
                        : "Mga tradisyonal na laro at aktibidad"}
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Gamepad2 className="w-4 h-4 mr-2" />
                      {culturalProfile.language === "Cebuano" ? "Dula ta!" : "Maglaro tayo!"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
              <CardHeader>
                <CardTitle>{getLocalizedText("dashboard.courses")}</CardTitle>
                <CardDescription>
                  {culturalProfile.language === "Cebuano"
                    ? "Tanan nga mga kurso nga anaa"
                    : "Lahat ng available na mga kurso"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">
                    {culturalProfile.language === "Cebuano"
                      ? "Mga kurso nga gi-adapt para sa inyong kultura"
                      : "Mga kurso na naka-adapt para sa inyong kultura"}
                  </p>
                  <Button asChild>
                    <Link href="/courses">
                      {culturalProfile.language === "Cebuano" ? "Tan-awa ang mga Kurso" : "Tingnan ang mga Kurso"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  {getLocalizedText("dashboard.quiz")} - AI Powered
                </CardTitle>
                <CardDescription>
                  {culturalProfile.language === "Cebuano"
                    ? "Mga pagsulay nga gi-generate sa AI ug gi-translate sa inyong pinulongan"
                    : "Mga pagsusulit na ginawa ng AI at naisalin sa inyong wika"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AutomatedCulturalQuiz
                  subject="mathematics"
                  culturalProfile={culturalProfile}
                  onComplete={(score, total) => {
                    console.log(`Quiz completed: ${score}/${total}`)
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <MockLearningAnalyticsDashboard />
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="study-groups" className="space-y-6">
            <MockStudyGroups />
          </TabsContent>

          {/* AI Tutor Tab */}
          <TabsContent value="ai-tutor" className="space-y-6">
            <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gray-600 dark:text-white inline" />
                  {getLocalizedText("dashboard.ai_tutor")}
                </CardTitle>
                <CardDescription>
                  {culturalProfile.language === "Cebuano"
                    ? "Makig-istorya sa AI tutor nga makasabot sa inyong kultura"
                    : "Makipag-usap sa AI tutor na nakakaintindi sa inyong kultura"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <KatutuboAITutor culturalProfile={culturalProfile} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {getLocalizedText("dashboard.achievements")}
                </CardTitle>
                <CardDescription>
                  {culturalProfile.language === "Cebuano"
                    ? "Mga kalampusan nga nakuha ninyo"
                    : "Mga tagumpay na nakamit ninyo"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {culturalAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg text-center ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <h3 className="font-medium mb-1 text-black">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      {achievement.unlocked ? (
                        <Badge variant="secondary">{achievement.date}</Badge>
                      ) : (
                        <div className="space-y-1">
                          <Progress value={achievement.progress || 0} className="h-2" />
                          <span className="text-xs text-gray-500">{achievement.progress}% complete</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <MockNotificationsPanel />
          </TabsContent>
        </Tabs>

        {/* Cultural Motivation Section */}
        <Card className={`bg-gradient-to-r ${colors.primary} text-white`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {culturalProfile.tone === "youth"
                    ? "You're doing amazing! Keep it up! 🚀"
                    : culturalProfile.tone === "formal"
                      ? culturalProfile.language === "Cebuano"
                        ? "Maayo kaayo ang inyong pagkat-on! Padayon lang po!"
                        : "Napakagaling ninyo po! Magpatuloy lang!"
                      : culturalProfile.language === "Cebuano"
                        ? "Maayo kaayo! Padayon lang!"
                        : "Napakagaling! Tuloy lang!"}
                </h3>
                <p className="text-white/90">
                  {culturalProfile.region === "Visayas"
                    ? "Padayon sa inyong pagkat-on. Makaya ninyo ni!"
                    : "Magpatuloy sa inyong pag-aaral. Kaya ninyo yan!"}
                </p>
              </div>
              <div className="text-4xl">
                {culturalProfile.region === "Visayas" ? "🏝️" : culturalProfile.region === "Mindanao" ? "🏔️" : "🌾"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
