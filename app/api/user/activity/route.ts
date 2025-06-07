import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-config"
import { cosmosService } from "@/lib/azure-cosmos-client"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update last active timestamp
    await cosmosService.updateUser(session.user.email, {
      lastActive: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating user activity:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}