import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Mock user storage for development
const mockUsers: any[] = []

// Check if we have Azure Cosmos DB configuration
const hasCosmosDB = process.env.AZURE_COSMOS_ENDPOINT && process.env.AZURE_COSMOS_KEY

// Dynamically import Cosmos service only if configured
let cosmosService: any = null
if (hasCosmosDB) {
  try {
    cosmosService = require("@/lib/azure-cosmos-client").cosmosService
  } catch (error) {
    console.warn("Cosmos DB not available, using mock storage")
  }
}

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  country: z.string().min(2, "Please select a country"),
  age: z.number().min(6).max(100),
  preferredLanguage: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    let existingUser = null
    if (cosmosService) {
      existingUser = await cosmosService.getUserByEmail(validatedData.email)
    } else {
      existingUser = mockUsers.find((u) => u.email === validatedData.email)
    }

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Create user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Determine age group and default settings
    const ageGroup = validatedData.age <= 12 ? "child" : validatedData.age <= 17 ? "teen" : "adult"
    const formalityPreference = ageGroup === "child" ? "informal" : ageGroup === "teen" ? "respectful" : "formal"

    // Create user profile
    const newUser = {
      id: userId,
      email: validatedData.email,
      name: validatedData.name,
      password: validatedData.password, // In production, hash this
      provider: "credentials",
      country: validatedData.country,
      age: validatedData.age,
      ageGroup,
      preferredLanguage: validatedData.preferredLanguage,
      dialect: "standard",
      formalityPreference,
      deviceInfo: {},
      bandwidthProfile: "auto",
      emailVerified: false,
      isOnboardingComplete: false,
      createdAt: new Date().toISOString(),
    }

    if (cosmosService) {
      await cosmosService.createUser(newUser)
      await cosmosService.createLearningProfile(userId, {
        learningStyle: {
          visual: 0.5,
          auditory: 0.5,
          kinesthetic: 0.5,
        },
        culturalContext: {
          country: validatedData.country,
          region: "urban",
          ageGroup,
        },
      })
      await cosmosService.trackLearningEvent({
        userId,
        eventType: "user_registered",
        metadata: {
          provider: "credentials",
          country: validatedData.country,
          language: validatedData.preferredLanguage,
          ageGroup,
        },
      })
    } else {
      // Store in mock storage
      mockUsers.push(newUser)
    }

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId,
        requiresOnboarding: true,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Registration error:", error)

    if (error.name === "ZodError") {
      return NextResponse.json({ error: "Invalid input data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
