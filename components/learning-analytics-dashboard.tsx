"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Brain, Clock, Target, Globe, BarChart3, Calendar, Award, Users, BookOpen } from "lucide-react"

interface LearningInsights {
  personalInsights: {
    totalSessions: number
    totalTimeSpent: number
    averageScore: number
    strongSubjects: string[]
    weakSubjects: string[]
    learningPatterns: {
      preferredTimeOfDay: string
      sessionDuration: number
      consistencyScore: number
    }
    culturalEngagement: {
      culturalContentInteraction: number
      localExamplePreference: number
      languageProgress: number
    }
    progressTrends: {
      weeklyProgress: Array<{
        week: string
        sessions: number
        totalTime: number
        averageScore: number
      }>
      subjectProgress: Record<string, number>
    }
  }
  regionalInsights?: Array<{
    totalUsers: number
    averageScore: number
    totalTimeSpent: number
    courseId: string
  }>
  recommendations: Array<{
    type: string
    priority: "high" | "medium" | "low"
    title: string
    description: string
    actions: string[]
  }>
}

export function LearningAnalyticsDashboard() {
  const [insights, setInsights] = useState<LearningInsights | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [includeRegional, setIncludeRegional] = useState(false)

  useEffect(() => {
    fetchInsights()
  }, [timeRange, includeRegional])

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/analytics/learning-insights?timeRange=${timeRange}&includeRegional=${includeRegional}`,
      )
      const data = await response.json()
      setInsights(data)
    } catch (error) {
      console.error("Failed to fetch insights:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!insights) {
    return <div>Failed to load analytics</div>
  }

  const { personalInsights, regionalInsights, recommendations } = insights

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold font-display">Learning Analytics</h2>
        <div className="flex gap-2">
          <Button variant={timeRange === "7d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("7d")}>
            7 Days
          </Button>
          <Button variant={timeRange === "30d" ? "default" : "outline"} size="sm" onClick={() => setTimeRange("30d")}>
            30 Days
          </Button>
          <Button
            variant={includeRegional ? "default" : "outline"}
            size="sm"
            onClick={() => setIncludeRegional(!includeRegional)}
          >
            <Globe className="h-4 w-4 mr-1" />
            Regional
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold">{personalInsights.totalSessions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Time Spent</p>
                <p className="text-2xl font-bold">{Math.round(personalInsights.totalTimeSpent / 60)}h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-forest/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-forest/10 rounded-lg">
                <Target className="h-6 w-6 text-forest" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">{Math.round(personalInsights.averageScore)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Consistency</p>
                <p className="text-2xl font-bold">{Math.round(personalInsights.learningPatterns.consistencyScore)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Insights</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Engagement</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          {/* Learning Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Learning Patterns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {personalInsights.learningPatterns.preferredTimeOfDay}
                  </div>
                  <div className="text-sm text-gray-600">Preferred Study Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {Math.round(personalInsights.learningPatterns.sessionDuration)}m
                  </div>
                  <div className="text-sm text-gray-600">Avg Session Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-forest mb-1">
                    {Math.round(personalInsights.learningPatterns.consistencyScore)}%
                  </div>
                  <div className="text-sm text-gray-600">Consistency Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-secondary" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(personalInsights.progressTrends.subjectProgress).map(([subject, score]) => (
                <div key={subject} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{subject}</span>
                    <span>{Math.round(score)}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                  <div className="flex gap-2">
                    {score >= 80 && (
                      <Badge variant="default" className="bg-green-100 text-green-700">
                        Strong
                      </Badge>
                    )}
                    {score < 60 && (
                      <Badge variant="destructive" className="bg-red-100 text-red-700">
                        Needs Focus
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personalInsights.progressTrends.weeklyProgress.slice(-4).map((week, index) => (
                  <div key={week.week} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Week of {new Date(week.week).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600">
                        {week.sessions} sessions • {Math.round(week.totalTime / 60)}h total
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{Math.round(week.averageScore)}%</div>
                      <div className="text-sm text-gray-600">avg score</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-6">
          {/* Cultural Engagement */}
          <Card className="border-2 border-forest/20 bg-forest/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-forest" />
                Cultural Learning Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-forest mb-2">
                    {Math.round(personalInsights.culturalEngagement.culturalContentInteraction)}%
                  </div>
                  <div className="text-sm text-gray-600">Cultural Content Interaction</div>
                  <Progress
                    value={personalInsights.culturalEngagement.culturalContentInteraction}
                    className="mt-2 h-2"
                  />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    {Math.round(personalInsights.culturalEngagement.localExamplePreference)}%
                  </div>
                  <div className="text-sm text-gray-600">Local Example Preference</div>
                  <Progress value={personalInsights.culturalEngagement.localExamplePreference} className="mt-2 h-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round(personalInsights.culturalEngagement.languageProgress)}%
                  </div>
                  <div className="text-sm text-gray-600">Language Progress</div>
                  <Progress value={personalInsights.culturalEngagement.languageProgress} className="mt-2 h-2" />
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border">
                <h4 className="font-medium mb-3">Cultural Learning Insights</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-forest rounded-full"></span>
                    <span>You engage more with culturally-relevant content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    <span>Local examples improve your understanding by 23%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>Your native language skills are strengthening</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Comparison */}
          {regionalInsights && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Regional Learning Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalInsights.map((insight, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{insight.courseId}</div>
                        <div className="text-sm text-gray-600">{insight.totalUsers} learners in your region</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{Math.round(insight.averageScore)}%</div>
                        <div className="text-sm text-gray-600">regional avg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {/* Personalized Recommendations */}
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card
                key={index}
                className={`border-2 ${
                  rec.priority === "high"
                    ? "border-red-200 bg-red-50"
                    : rec.priority === "medium"
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-blue-200 bg-blue-50"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      {rec.title}
                    </CardTitle>
                    <Badge
                      variant={rec.priority === "high" ? "destructive" : "secondary"}
                      className={
                        rec.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : rec.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }
                    >
                      {rec.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{rec.description}</p>
                  <div className="space-y-2">
                    <h5 className="font-medium">Recommended Actions:</h5>
                    <ul className="space-y-1">
                      {rec.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="mt-4 w-full" variant="outline">
                    Start Improvement Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
