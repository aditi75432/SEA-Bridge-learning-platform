import { LearningAnalyticsDashboard } from "@/components/learning-analytics-dashboard"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rice-50 to-sky-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <LearningAnalyticsDashboard />
        </main>
      </div>
    </div>
  )
}
