import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { cosmosService } from "@/lib/azure-cosmos-client"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get cultural profile from Cosmos DB
    const culturalProfile = await cosmosService.getCulturalProfile(session.user.id)

    return NextResponse.json({
      culturalProfile,
    })
  } catch (error) {
    console.error("Error fetching cultural profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profileData = await request.json()

    // Create or update cultural profile
    const culturalProfile = await cosmosService.createCulturalProfile(session.user.id, profileData)

    return NextResponse.json({
      success: true,
      culturalProfile,
    })
  } catch (error) {
    console.error("Error saving cultural profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    // Update cultural profile
    const updatedProfile = await cosmosService.updateCulturalProfile(session.user.id, updates)

    return NextResponse.json({
      success: true,
      culturalProfile: updatedProfile,
    })
  } catch (error) {
    console.error("Error updating cultural profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
