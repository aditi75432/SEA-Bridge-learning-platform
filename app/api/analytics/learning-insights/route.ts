import { type NextRequest, NextResponse } from "next/server"
import { cosmosService } from "@/lib/azure-cosmos-client"
import { getServerSession } from "next-auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "30d"
    const includeRegional = searchParams.get("includeRegional") === "true"

    // Get user's learning analytics
    const userAnalytics = await cosmosService.getLearningAnalytics(session.user.email, timeRange)
    const userProfile = await cosmosService.getUser(session.user.email)

    if (!userProfile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    // Process analytics data
    const insights = await processLearningInsights(userAnalytics, userProfile)
    return NextResponse.json({
      personalInsights: insights,
      regionalInsights: null,
      recommendations: await generatePersonalizedRecommendations(insights, userProfile),
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }

}async function processLearningInsights(analytics: any[], userProfile: any) {  const insights = {    totalSessions: analytics.length,
    totalTimeSpent: analytics.reduce((sum, event) => sum + (event.timeSpent || 0), 0),
    averageScore: 0,
    strongSubjects: [] as string[],
    weakSubjects: [] as string[],
    learningPatterns: {
      preferredTimeOfDay: "",
      sessionDuration: 0,
      consistencyScore: 0,
    },
    culturalEngagement: {
      culturalContentInteraction: 0,
      localExamplePreference: 0,
      languageProgress: 0,
    },
    progressTrends: {
      weeklyProgress: [] as any[],
      subjectProgress: {} as Record<string, number>,
    },
  }

  if (analytics.length === 0) return insights

  // Calculate average score
  const scoredEvents = analytics.filter((event) => event.score !== undefined)
  insights.averageScore =
    scoredEvents.length > 0 ? scoredEvents.reduce((sum, event) => sum + event.score, 0) / scoredEvents.length : 0

  // Analyze subject performance
  const subjectScores: Record<string, number[]> = {}
  analytics.forEach((event) => {
    if (event.courseId && event.score !== undefined) {
      if (!subjectScores[event.courseId]) {
        subjectScores[event.courseId] = []
      }
      subjectScores[event.courseId].push(event.score)
    }
  })

  // Determine strong and weak subjects
  Object.entries(subjectScores).forEach(([subject, scores]) => {
    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length
    insights.progressTrends.subjectProgress[subject] = avgScore

    if (avgScore >= 80) {
      insights.strongSubjects.push(subject)
    } else if (avgScore < 60) {
      insights.weakSubjects.push(subject)
    }
  })

  // Analyze learning patterns
  const sessionTimes = analytics.map((event) => new Date(event.timestamp).getHours())
  const timeFrequency: Record<number, number> = {}
  sessionTimes.forEach((hour) => {
    timeFrequency[hour] = (timeFrequency[hour] || 0) + 1
  })

  const mostActiveHour = Object.entries(timeFrequency).sort(([, a], [, b]) => b - a)[0]?.[0]

  insights.learningPatterns.preferredTimeOfDay = mostActiveHour ? `${mostActiveHour}:00` : "Not enough data"

  insights.learningPatterns.sessionDuration = insights.totalTimeSpent / insights.totalSessions

  // Calculate consistency (sessions per week)
  const weeklyData = groupByWeek(analytics)
  insights.learningPatterns.consistencyScore = calculateConsistencyScore(weeklyData)
  insights.progressTrends.weeklyProgress = weeklyData

  // Analyze cultural engagement
  const culturalEvents = analytics.filter((event) => event.culturalContext === userProfile.country)
  insights.culturalEngagement.culturalContentInteraction = (culturalEvents.length / analytics.length) * 100

  return insights
}

function groupByWeek(analytics: any[]) {
  const weeks: Record<string, any[]> = {}

  analytics.forEach((event) => {
    const date = new Date(event.timestamp)
    const weekStart = new Date(date.setDate(date.getDate() - date.getDay()))
    const weekKey = weekStart.toISOString().split("T")[0]

    if (!weeks[weekKey]) {
      weeks[weekKey] = []
    }
    weeks[weekKey].push(event)
  })

  return Object.entries(weeks).map(([week, events]) => ({
    week,
    sessions: events.length,
    totalTime: events.reduce((sum, event) => sum + (event.timeSpent || 0), 0),
    averageScore: events
      .filter((e) => e.score !== undefined)
      .reduce((sum, event, _, arr) => sum + event.score / arr.length, 0),
  }))
}

function calculateConsistencyScore(weeklyData: any[]): number {
  if (weeklyData.length < 2) return 0

  const sessionsPerWeek = weeklyData.map((week) => week.sessions)
  const average = sessionsPerWeek.reduce((sum, sessions) => sum + sessions, 0) / sessionsPerWeek.length
  const variance =
    sessionsPerWeek.reduce((sum, sessions) => sum + Math.pow(sessions - average, 2), 0) / sessionsPerWeek.length

  // Lower variance = higher consistency
  return Math.max(0, 100 - variance * 10)
}

async function generatePersonalizedRecommendations(insights: any, userProfile: any) {
  const recommendations = []

  // Performance-based recommendations
  if (insights.averageScore < 70) {
    recommendations.push({
      type: "improvement",
      priority: "high",
      title: "Focus on Fundamentals",
      description: `Your average score is ${Math.round(insights.averageScore)}%. Let's strengthen your foundation with culturally-relevant practice.`,
      actions: [
        "Review basic concepts with local examples",
        "Take shorter, focused practice sessions",
        "Join a study group in your area",
      ],
    })
  }

  // Weak subject recommendations
  if (insights.weakSubjects.length > 0) {
    recommendations.push({
      type: "subject_focus",
      priority: "medium",
      title: "Strengthen Weak Areas",
      description: `Focus on: ${insights.weakSubjects.join(", ")}`,
      actions: insights.weakSubjects.map((subject: string) => `Practice ${subject} with ${userProfile.country} examples`),    })
  }

  // Consistency recommendations
  if (insights.learningPatterns.consistencyScore < 50) {
    recommendations.push({
      type: "consistency",
      priority: "medium",
      title: "Build Learning Habits",
      description: "Regular practice leads to better results. Let's create a sustainable routine.",
      actions: [
        "Set daily 15-minute learning goals",
        "Enable push notifications for reminders",
        "Track your streak to stay motivated",
      ],
    })
  }

  // Cultural engagement recommendations
  if (insights.culturalEngagement.culturalContentInteraction < 60) {
    recommendations.push({
      type: "cultural",
      priority: "low",
      title: "Explore Cultural Content",
      description: `Discover how learning connects to ${userProfile.country} culture and traditions.`,
      actions: [
        "Try cultural quest challenges",
        "Learn with local examples and stories",
        "Connect with learners from your region",
      ],
    })
  }

  return recommendations
}

// Regional analytics endpoint
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { eventType, eventData } = await request.json()

    // Track real-time learning event
    await cosmosService.trackLearningEvent({
      userId: session.user.email, // Changed from id to email since that's what's available
      eventType,
      timestamp: new Date().toISOString(),
      ...eventData,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Event tracking error:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}