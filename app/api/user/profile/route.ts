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

    // Get user profile from Cosmos DB
    const userProfile = await cosmosService.getUser(session.user.id)

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get learning profile
    const learningProfile = await cosmosService.getLearningProfile(session.user.id)

    // Remove sensitive information
    const { password, ...safeUserProfile } = userProfile

    return NextResponse.json({
      user: safeUserProfile,
      learningProfile,
    })
  } catch (error) {
    console.error("Error fetching user profile:", error)
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

    // Update user profile
    const updatedProfile = await cosmosService.updateUser(session.user.id, updates)

    return NextResponse.json({
      success: true,
      user: updatedProfile,
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
