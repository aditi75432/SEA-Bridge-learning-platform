// Simple demo authentication system using localStorage
export interface User {
  id: string
  name: string
  email: string
  country: string
  preferredLanguage: string
  isOnboardingComplete: boolean
  createdAt: string
}

export class SimpleAuth {
  private static readonly STORAGE_KEY = "seabridge_user"
  private static readonly DEMO_USERS: User[] = [
    {
      id: "demo-1",
      name: "Demo User",
      email: "demo@seabridge.com",
      country: "Philippines",
      preferredLanguage: "en",
      isOnboardingComplete: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "student-1",
      name: "Maria Santos",
      email: "maria@student.com",
      country: "Philippines",
      preferredLanguage: "fil",
      isOnboardingComplete: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "student-2",
      name: "Nguyen Van A",
      email: "nguyen@student.com",
      country: "Vietnam",
      preferredLanguage: "vi",
      isOnboardingComplete: true,
      createdAt: new Date().toISOString(),
    },
  ]

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }

  static async signIn(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Demo authentication - accept any password for demo users
    const user = this.DEMO_USERS.find((u) => u.email === email)

    if (!user) {
      return { success: false, error: "User not found" }
    }

    // For demo, accept any password
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user))
    return { success: true, user }
  }

  static async signUp(
    userData: Omit<User, "id" | "createdAt">,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    // Check if user already exists
    const existingUser = this.DEMO_USERS.find((u) => u.email === userData.email)
    if (existingUser) {
      return { success: false, error: "User already exists" }
    }

    // Create new user
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    // Add to demo users (in real app, this would be saved to database)
    this.DEMO_USERS.push(newUser)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUser))

    return { success: true, user: newUser }
  }

  static signOut(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }

  static updateUser(updates: Partial<User>): User | null {
    const currentUser = this.getCurrentUser()
    if (!currentUser) return null

    const updatedUser = { ...currentUser, ...updates }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedUser))
    return updatedUser
  }
}
