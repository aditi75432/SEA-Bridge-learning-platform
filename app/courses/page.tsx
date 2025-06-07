"use client"

import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, FileText, ImageIcon, Video, BookOpen, Clock, TrendingUp, Award, Target } from "lucide-react"
import { useLocalization } from "@/components/localization-provider"
import { useCulturalContext } from "@/components/cultural-context-provider"
import { useBandwidth } from "@/components/bandwidth-detector"

export default function CourseDashboardPage() {
  const { t } = useLocalization()
  const { getPersonalizedGreeting, profile } = useCulturalContext()
  const { connectionSpeed } = useBandwidth()

  // Handle case where profile is null
  const safeProfile = profile || {
    country: "Philippines",
    region: "Luzon",
    language: "fil",
    tone: "informal",
    schoolType: "public",
    learningPace: "flexible",
    visualTheme: "rice-terraces",
    curriculum: "DepEd K-12",
  }

  const recommendedCourses = [
    {
      id: 1,
      title: "The Water Cycle",
      description: "Learn about water circulation through rice terraces",
      progress: 45,
      language: "Filipino",
      size: "300KB",
      type: "infographic" as const,
      image: "/c1.png",
      culturalContext: "rice terraces",
      estimatedTime: "15 min",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Southeast Asian History",
      description: "Discover the rich heritage of our region",
      progress: 20,
      language: "English",
      size: "500KB",
      type: "video" as const,
      image: "/c2.png",
      culturalContext: "local kingdoms",
      estimatedTime: "25 min",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Basic Mathematics",
      description: "Learn counting with traditional games",
      progress: 0,
      language: "Filipino",
      size: "250KB",
      type: "text" as const,
      image: "/c3.png",
      culturalContext: "sungka game",
      estimatedTime: "20 min",
      difficulty: "Beginner",
    },
  ]

  const allCourses = [
    ...recommendedCourses,
    {
      id: 4,
      title: "Local Ecosystems",
      description: "Explore mangroves and coral reefs",
      progress: 0,
      language: "Filipino",
      size: "350KB",
      type: "infographic" as const,
      image: "/c4.png",
      culturalContext: "coral triangle",
      estimatedTime: "18 min",
      difficulty: "Intermediate",
    },
    {
      id: 5,
      title: "Traditional Arts",
      description: "Learn about local crafts and techniques",
      progress: 0,
      language: "Filipino",
      size: "400KB",
      type: "video" as const,
      image: "/c5.png",
      culturalContext: "weaving patterns",
      estimatedTime: "30 min",
      difficulty: "Advanced",
    },
  ]

  const learningStats = {
    coursesCompleted: 3,
    totalHours: 24,
    currentStreak: 7,
    nextGoal: "Complete 5 courses this month",
  }

  // Get safe greeting
  const greeting = profile ? getPersonalizedGreeting() : "Kumusta"
  const userName = profile ? "Maria" : "Student"

  return (
    <div className="flex flex-col lg:flex-row">
      <EnhancedSidebar />

      <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-rice-50 to-sky-50">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold font-display mb-2">
                  {greeting}, {userName}! 🌟
                </h1>
                <p className="text-gray-600">Continue your learning journey with content made just for you</p>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`${
                    connectionSpeed === "high"
                      ? "border-forest text-forest"
                      : connectionSpeed === "medium"
                        ? "border-accent text-accent"
                        : "border-primary text-primary"
                  }`}
                >
                  <Wifi className="h-3 w-3 mr-1" />
                  {connectionSpeed === "high"
                    ? "High Speed"
                    : connectionSpeed === "medium"
                      ? "Medium Speed"
                      : "Low Bandwidth"}
                </Badge>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                  {safeProfile.country}
                </Badge>
              </div>
            </div>

            {/* Learning Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Award, label: "Completed", value: learningStats.coursesCompleted, color: "primary" },
                { icon: Clock, label: "Hours Learned", value: learningStats.totalHours, color: "secondary" },
                { icon: TrendingUp, label: "Day Streak", value: learningStats.currentStreak, color: "accent" },
                { icon: Target, label: "Monthly Goal", value: "5/5", color: "forest" },
              ].map((stat, index) => (
                <Card key={index} className="border-2 border-transparent hover:border-primary/20 transition-colors">
                  <CardContent className="p-4 text-center">
                    <stat.icon
                      className={`h-6 w-6 mx-auto mb-2 ${
                        stat.color === "primary"
                          ? "text-primary"
                          : stat.color === "secondary"
                            ? "text-secondary"
                            : stat.color === "accent"
                              ? "text-accent"
                              : "text-forest"
                      }`}
                    />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Cultural Setup Prompt (if no profile) */}
          {!profile && (
            <div className="animate-fade-in mb-6">
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">🌟 Personalize Your Learning Experience</h3>
                  <p className="text-gray-600 mb-4">
                    Complete your cultural setup to get courses adapted to your region and language preferences!
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <a href="/cultural-onboarding">Start Cultural Setup</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recommended Courses */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display">Recommended for You</h2>
              <Badge variant="outline" className="border-primary/20 text-primary">
                <BookOpen className="h-3 w-3 mr-1" />
                {profile ? "Culturally Adapted" : "General Content"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course, index) => (
                <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>

          {/* Course Explorer */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="border-2 border-transparent hover:border-secondary/20 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Explore All Courses</span>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary ">
                    {allCourses.length} Available
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="all" className="space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
                      <TabsTrigger value="all">All Subjects</TabsTrigger>
                      <TabsTrigger value="science">Science</TabsTrigger>
                      <TabsTrigger value="culture">Culture</TabsTrigger>
                    </TabsList>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Wifi className="h-3 w-3" />
                        <span>High Quality</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <WifiOff className="h-3 w-3" />
                        <span>Low Bandwidth</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <span>Text</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        <span>Infographic</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        <span>Video</span>
                      </Button>
                    </div>
                  </div>

                  <TabsContent value="all" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allCourses.map((course, index) => (
                        <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                          <CourseCard course={course} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="science" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allCourses
                        .filter((course) => course.title.includes("Water") || course.title.includes("Ecosystems"))
                        .map((course, index) => (
                          <div
                            key={course.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <CourseCard course={course} />
                          </div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="culture" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allCourses
                        .filter((course) => course.title.includes("History") || course.title.includes("Arts"))
                        .map((course, index) => (
                          <div
                            key={course.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <CourseCard course={course} />
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
