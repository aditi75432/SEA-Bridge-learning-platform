// Simplified mock service that doesn't require external dependencies
class MockCosmosService {
  private users: any[] = [
    {
      id: "demo-user-1",
      email: "demo@example.com",
      name: "Demo User",
      password: "demo123",
      country: "Philippines",
      preferredLanguage: "en",
      dialect: "standard",
      formalityPreference: "respectful",
      isOnboardingComplete: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-user-2",
      email: "student@seabridge.com",
      name: "SEA Bridge Student",
      password: "student123",
      country: "Vietnam",
      preferredLanguage: "vi",
      dialect: "northern",
      formalityPreference: "formal",
      isOnboardingComplete: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "demo-user-maria",
      email: "maria@student.com",
      name: "Maria Santos",
      password: "student123",
      country: "Philippines",
      region: "Visayas",
      preferredLanguage: "ceb",
      dialect: "Cebuano",
      formalityPreference: "informal",
      isOnboardingComplete: false,
      culturalProfile: {
        tone: "informal",
        schoolType: "public",
        learningPace: "flexible",
        visualTheme: "island-paradise",
      },
      createdAt: new Date().toISOString(),
    },
  ]

  private learningProfiles: any[] = []
  private analytics: any[] = []

  async createUser(userData: any) {
    this.users.push({
      ...userData,
      createdAt: new Date().toISOString(),
    })
    return userData
  }

  async getUser(userId: string) {
    return this.users.find((u) => u.id === userId) || null
  }

  async getUserByEmail(email: string) {
    return this.users.find((u) => u.email === email) || null
  }

  async updateUser(userId: string, updates: any) {
    const index = this.users.findIndex((u) => u.id === userId)
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates }
      return this.users[index]
    }
    return null
  }

  async createLearningProfile(userId: string, profileData: any) {
    const profile = {
      id: `${userId}_profile`,
      userId,
      ...profileData,
      createdAt: new Date().toISOString(),
    }
    this.learningProfiles.push(profile)
    return profile
  }

  async getLearningProfile(userId: string) {
    return this.learningProfiles.find((p) => p.userId === userId) || null
  }

  async trackLearningEvent(eventData: any) {
    const event = {
      id: `${eventData.userId}_${Date.now()}`,
      ...eventData,
      timestamp: new Date().toISOString(),
    }
    this.analytics.push(event)
    return event
  }

  async getLearningAnalytics(userId: string) {
    return this.analytics.filter((a) => a.userId === userId)
  }

  async saveFeedback(feedbackData: any) {
    // Mock implementation
    return { id: Date.now().toString(), ...feedbackData }
  }

  async getLocalizedContent(contentId: string, language: string, culturalContext: string) {
    // Mock implementation
    return null
  }

  async saveLocalizedContent(contentData: any) {
    // Mock implementation
    return contentData
  }

  async createCulturalProfile(userId: string, profileData: any) {
    const profile = {
      id: `${userId}_cultural`,
      userId,
      ...profileData,
      createdAt: new Date().toISOString(),
    }
    this.learningProfiles.push(profile)
    return profile
  }

  async getCulturalProfile(userId: string) {
    return this.learningProfiles.find((p) => p.userId === userId && p.id.includes("cultural")) || null
  }

  async updateCulturalProfile(userId: string, updates: any) {
    const index = this.learningProfiles.findIndex((p) => p.userId === userId && p.id.includes("cultural"))
    if (index !== -1) {
      this.learningProfiles[index] = { ...this.learningProfiles[index], ...updates }
      return this.learningProfiles[index]
    }
    return null
  }
}

export const cosmosService = new MockCosmosService()
