import { type NextRequest, NextResponse } from "next/server"
import { azureOpenAI, azureLanguage } from "@/lib/azure-ai-services"
import { cosmosService } from "@/lib/azure-cosmos-client"
import { getServerSession } from "next-auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userAnswer, correctAnswer, questionId, subject, concept, attemptNumber = 1 } = await request.json()

    // Get user profile
    const userProfile = await cosmosService.getUser(session.user.id!)
    const learningProfile = await cosmosService.getLearningProfile(session.user.id!)

    if (!userProfile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const culturalContext = {
      country: userProfile.country,
      language: userProfile.preferredLanguage,
      formalityPreference: userProfile.formalityPreference,
      ageGroup: learningProfile?.culturalContext.ageGroup || "teen",
      culturalElements: {
        foods: getCulturalElements(userProfile.country, "foods"),
        games: getCulturalElements(userProfile.country, "games"),
        examples: getCulturalElements(userProfile.country, "examples"),
      },
    }

    // Analyze user answer sentiment and key phrases
    const sentiment = await azureLanguage.analyzeSentiment(userAnswer, userProfile.preferredLanguage)
    const keyPhrases = await azureLanguage.extractKeyPhrases(userAnswer, userProfile.preferredLanguage)

    // Calculate semantic similarity (simplified)
    const similarity = calculateSimilarity(userAnswer, correctAnswer)
    const isCorrect = similarity > 0.8
    const isPartiallyCorrect = similarity > 0.5

    // Generate personalized feedback
    const feedback = await azureOpenAI.generatePersonalizedFeedback(userAnswer, correctAnswer, culturalContext)

    // Generate adaptive hints based on attempt number
    let adaptiveHint = ""
    if (!isCorrect && attemptNumber > 1) {
      adaptiveHint = await generateAdaptiveHint(userAnswer, correctAnswer, concept, attemptNumber, culturalContext)
    }

    // Create feedback object
    const feedbackData = {
      userId: session.user.id,
      questionId,
      userAnswer,
      correctAnswer,
      isCorrect,
      isPartiallyCorrect,
      similarity,
      feedback,
      adaptiveHint,
      sentiment: sentiment?.sentiment || "neutral",
      keyPhrases,
      attemptNumber,
      subject,
      concept,
      culturalContext: userProfile.country,
      language: userProfile.preferredLanguage,
    }

    // Save feedback to database
    await cosmosService.saveFeedback(feedbackData)

    // Track learning analytics
    await cosmosService.trackLearningEvent({
      userId: session.user.id,
      eventType: "answer_submitted",
      questionId,
      score: isCorrect ? 100 : isPartiallyCorrect ? 50 : 0,
      language: userProfile.preferredLanguage,
      culturalContext: userProfile.country,
      metadata: {
        similarity,
        attemptNumber,
        sentiment: sentiment?.sentiment,
        keyPhrases,
      },
    })

    // Update learning profile based on performance
    if (learningProfile) {
      await updateLearningProfile(session.user.id!, learningProfile, subject, concept, isCorrect, similarity)
    }

    return NextResponse.json({
      feedback: feedbackData,
      recommendations: await generateLearningRecommendations(
        session.user.id!,
        subject,
        concept,
        isCorrect,
        culturalContext,
      ),
    })
  } catch (error) {
    console.error("Feedback generation error:", error)
    return NextResponse.json({ error: "Failed to generate feedback" }, { status: 500 })
  }
}

// Helper functions
function calculateSimilarity(answer: string, correct: string): number {
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim()

  const answerWords = normalize(answer).split(/\s+/)
  const correctWords = normalize(correct).split(/\s+/)

  const intersection = answerWords.filter((word) => correctWords.includes(word))
  const union = [...new Set([...answerWords, ...correctWords])]

  return intersection.length / union.length
}

async function generateAdaptiveHint(
  userAnswer: string,
  correctAnswer: string,
  concept: string,
  attemptNumber: number,
  culturalContext: any,
): Promise<string> {
  const hintPrompt = `
    The student has attempted this ${attemptNumber} times and still hasn't got it right.
    
    Their answer: "${userAnswer}"
    Correct answer: "${correctAnswer}"
    Concept: ${concept}
    
    Cultural context: ${culturalContext.country}
    
    Provide a gentle, encouraging hint that:
    1. Doesn't give away the answer
    2. Guides them toward the right thinking
    3. Uses examples from ${culturalContext.country}
    4. Is appropriate for attempt #${attemptNumber}
    
    Be more specific with each attempt but still encouraging.
  `

  const response = await azureOpenAI.client.getChatCompletions("gpt-4", [{ role: "user", content: hintPrompt }], {
    maxTokens: 200,
    temperature: 0.7,
  })

  return response.choices[0]?.message?.content || ""
}

async function updateLearningProfile(
  userId: string,
  currentProfile: any,
  subject: string,
  concept: string,
  isCorrect: boolean,
  similarity: number,
) {
  const updates: any = {}

  // Update weak/strong areas
  if (isCorrect || similarity > 0.7) {
    // Move from weak to strong areas
    const weakAreas = currentProfile.weakAreas.filter((area: string) => area !== concept)
    const strongAreas = [...new Set([...currentProfile.strongAreas, concept])]

    updates.weakAreas = weakAreas
    updates.strongAreas = strongAreas
  } else if (similarity < 0.3) {
    // Add to weak areas if struggling
    const weakAreas = [...new Set([...currentProfile.weakAreas, concept])]
    updates.weakAreas = weakAreas
  }

  // Update total points and streak
  if (isCorrect) {
    updates.totalPoints = (currentProfile.totalPoints || 0) + 10
    updates.streak = (currentProfile.streak || 0) + 1
  } else {
    updates.streak = 0
  }

  updates.updatedAt = new Date().toISOString()

  await cosmosService.updateUser(userId, updates)
}

async function generateLearningRecommendations(
  userId: string,
  subject: string,
  concept: string,
  isCorrect: boolean,
  culturalContext: any,
) {
  if (isCorrect) {
    return {
      type: "advancement",
      message: "Great job! Ready for the next challenge?",
      suggestions: [
        `Try advanced ${concept} problems`,
        `Explore related concepts in ${subject}`,
        "Join a study group for peer learning",
      ],
    }
  } else {
    return {
      type: "reinforcement",
      message: "Let's strengthen your understanding",
      suggestions: [
        `Review ${concept} basics with ${culturalContext.country} examples`,
        `Practice similar problems`,
        `Watch explanatory videos about ${concept}`,
      ],
    }
  }
}

function getCulturalElements(country: string, type: string): string[] {
  // Same as previous implementation
  const elements: Record<string, Record<string, string[]>> = {
    Philippines: {
      foods: ["adobo", "lumpia", "halo-halo"],
      games: ["patintero", "tumbang preso"],
      examples: ["rice terraces", "jeepney", "sari-sari store"],
    },
    // ... other countries
  }

  return elements[country]?.[type] || []
}
