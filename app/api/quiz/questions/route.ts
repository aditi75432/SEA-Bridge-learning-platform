import { type NextRequest, NextResponse } from "next/server"
import { QuizGenerator } from "@/lib/quiz-generator"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const courseId = searchParams.get("courseId")
  const difficulty = (searchParams.get("difficulty") as "beginner" | "intermediate" | "advanced") || "beginner"
  const topicId = searchParams.get("topicId") || "water-cycle"
  const count = Number.parseInt(searchParams.get("count") || "5")
  const culturalContext = searchParams.get("culturalContext") || "general"

  try {
    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 })
    }

    const questions = QuizGenerator.generateQuestions(
      Number.parseInt(courseId),
      topicId,
      count,
      difficulty,
      culturalContext,
    )

    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error generating quiz questions:", error)
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, userPerformance, culturalBackground, preferredLanguage } = body

    const adaptiveQuestions = QuizGenerator.generateAdaptiveQuestions(
      courseId,
      userPerformance,
      culturalBackground,
      preferredLanguage,
    )

    return NextResponse.json(adaptiveQuestions)
  } catch (error) {
    console.error("Error generating adaptive questions:", error)
    return NextResponse.json({ error: "Failed to generate adaptive questions" }, { status: 500 })
  }
}
