import { type NextRequest, NextResponse } from "next/server"
import { azureOpenAI, azureTranslator, azureVision } from "@/lib/azure-ai-services"
import { cosmosService } from "@/lib/azure-cosmos-client"
import { getServerSession } from "next-auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { contentId, originalContent, contentType } = await request.json()

    // Get user profile and cultural context
    const userProfile = await cosmosService.getUser(session.user.id!)
    const learningProfile = await cosmosService.getLearningProfile(session.user.id!)

    if (!userProfile || !learningProfile) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const culturalContext = {
      country: userProfile.country,
      language: userProfile.preferredLanguage,
      dialect: userProfile.dialect,
      formalityPreference: userProfile.formalityPreference,
      ageGroup: learningProfile.culturalContext.ageGroup,
      region: learningProfile.culturalContext.region,
      culturalElements: {
        foods: getCulturalElements(userProfile.country, "foods"),
        games: getCulturalElements(userProfile.country, "games"),
        festivals: getCulturalElements(userProfile.country, "festivals"),
        examples: getCulturalElements(userProfile.country, "examples"),
      },
    }

    // Check if localized content already exists
    const existingContent = await cosmosService.getLocalizedContent(
      contentId,
      userProfile.preferredLanguage,
      userProfile.country,
    )

    if (existingContent) {
      return NextResponse.json({ localizedContent: existingContent })
    }

    const localizedContent: any = {}

    // Adapt text content
    if (originalContent.text) {
      const adaptedText = await azureOpenAI.generateCulturalContent(originalContent.text, culturalContext)

      // Translate if needed
      if (userProfile.preferredLanguage !== "en") {
        localizedContent.text = await azureTranslator.translateWithTone(
          adaptedText,
          userProfile.preferredLanguage,
          userProfile.formalityPreference,
        )
      } else {
        localizedContent.text = adaptedText
      }
    }

    // Generate micro-narrative
    if (originalContent.topic) {
      localizedContent.microNarrative = await azureOpenAI.generateMicroNarrative(originalContent.topic, culturalContext)
    }

    // Adapt images using Azure Vision
    if (originalContent.images && originalContent.images.length > 0) {
      localizedContent.images = []

      for (const imageUrl of originalContent.images) {
        try {
          const imageAnalysis = await azureVision.analyzeImage(imageUrl)
          const culturalReplacement = await azureVision.findCulturalReplacement(imageAnalysis, culturalContext)

          localizedContent.images.push(culturalReplacement || imageUrl)
        } catch (error) {
          console.error("Image analysis error:", error)
          localizedContent.images.push(imageUrl) // Fallback to original
        }
      }
    }

    // Adapt examples and stories
    if (originalContent.examples) {
      localizedContent.examples = originalContent.examples.map((example: string) => {
        // Replace with cultural equivalents
        return replaceCulturalReferences(example, culturalContext)
      })
    }

    // Save localized content
    const savedContent = await cosmosService.saveLocalizedContent({
      contentId,
      language: userProfile.preferredLanguage,
      culturalContext: userProfile.country,
      originalContent,
      localizedContent,
      adaptationMetadata: {
        adaptedAt: new Date().toISOString(),
        culturalContext,
        adaptationType: contentType,
      },
    })

    // Track analytics
    await cosmosService.trackLearningEvent({
      userId: session.user.id,
      eventType: "content_localized",
      contentId,
      language: userProfile.preferredLanguage,
      culturalContext: userProfile.country,
      metadata: {
        adaptationType: contentType,
        hasImages: !!originalContent.images,
        hasText: !!originalContent.text,
      },
    })

    return NextResponse.json({ localizedContent: savedContent })
  } catch (error) {
    console.error("Content adaptation error:", error)
    return NextResponse.json({ error: "Failed to adapt content" }, { status: 500 })
  }
}

// Helper functions
function getCulturalElements(country: string, type: string): string[] {
  const elements: Record<string, Record<string, string[]>> = {
    Philippines: {
      foods: ["adobo", "lumpia", "halo-halo", "lechon", "sinigang"],
      games: ["patintero", "tumbang preso", "luksong tinik", "agawan base"],
      festivals: ["Sinulog", "Ati-Atihan", "Pahiyas", "MassKara"],
      examples: ["rice terraces", "jeepney", "sari-sari store", "barangay"],
    },
    Vietnam: {
      foods: ["phở", "bánh mì", "spring rolls", "bánh chưng"],
      games: ["đá cầu", "ô ăn quan", "rồng rắn lên mây"],
      festivals: ["Tết", "Mid-Autumn", "Hùng Kings"],
      examples: ["rice paddies", "motorbike", "floating market", "pagoda"],
    },
    Thailand: {
      foods: ["pad thai", "som tam", "mango sticky rice", "tom yum"],
      games: ["takraw", "makruk", "len choa"],
      festivals: ["Songkran", "Loy Krathong", "Vesak Day"],
      examples: ["temple", "tuk-tuk", "floating market", "rice field"],
    },
  }

  return elements[country]?.[type] || []
}

function replaceCulturalReferences(text: string, culturalContext: any): string {
  const replacements: Record<string, Record<string, string>> = {
    Philippines: {
      "New York": "Manila",
      hamburger: "adobo",
      baseball: "basketball",
      dollars: "pesos",
      snow: "tropical rain",
    },
    Vietnam: {
      "New York": "Ho Chi Minh City",
      hamburger: "phở",
      baseball: "football",
      dollars: "dong",
      snow: "monsoon rain",
    },
    Thailand: {
      "New York": "Bangkok",
      hamburger: "pad thai",
      baseball: "muay thai",
      dollars: "baht",
      snow: "tropical weather",
    },
  }

  let adaptedText = text
  const countryReplacements = replacements[culturalContext.country]

  if (countryReplacements) {
    for (const [original, replacement] of Object.entries(countryReplacements)) {
      adaptedText = adaptedText.replace(new RegExp(original, "gi"), replacement)
    }
  }

  return adaptedText
}
