"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { CulturalGamification } from "@/components/cultural-gamification"

export default function GamificationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row">
        <EnhancedSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-rice-50 to-sky-50">
          <CulturalGamification />
        </main>
      </div>

      <Footer />
    </div>
  )
}
