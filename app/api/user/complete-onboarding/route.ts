import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-config"
import { cosmosService } from "@/lib/azure-cosmos-client"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)


    if (!session?.user || !('id' in session.user) || typeof session.user.id !== 'string') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const onboardingData = await request.json()

    // Update user profile
    await cosmosService.updateUser(session.user.id, {
      region: onboardingData.region,
      interests: onboardingData.interests,
      learningGoals: onboardingData.learningGoals,
      studyTime: onboardingData.studyTime,
      difficulty: onboardingData.difficulty,
      culturalPreferences: onboardingData.culturalPreferences,
      isOnboardingComplete: true,
      onboardingCompletedAt: new Date().toISOString(),
    })

    // Create learning profile
    await cosmosService.createLearningProfile(session.user.id, {
      culturalContext: {
        ...onboardingData.culturalPreferences,
        region: onboardingData.region,
      },
      interests: onboardingData.interests,
      learningGoals: onboardingData.learningGoals,
      difficulty: onboardingData.difficulty,
      updatedAt: new Date().toISOString(),
    })

    // Track onboarding completion
    await cosmosService.trackLearningEvent({
      userId: session.user.id,
      eventType: "onboarding_completed",
      metadata: {
        region: onboardingData.region,
        interestCount: onboardingData.interests.length,
        goalCount: onboardingData.learningGoals.length,
        studyTime: onboardingData.studyTime,
        difficulty: onboardingData.difficulty,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Onboarding completion error:", error)
    return NextResponse.json({ error: "Failed to complete onboarding" }, { status: 500 })
  }
}