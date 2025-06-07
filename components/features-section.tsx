"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Wifi, BookOpen, Download, Brain, Heart, Zap, Shield, Sparkles, Star } from "lucide-react"
import { useLocalization } from "@/components/localization-provider"

export function FeaturesSection() {
  const { t, isLoaded } = useLocalization()

  const features = [
    {
      icon: Globe,
      title: isLoaded ? t("features.language.title") : "Learn in your own language",
      description: isLoaded
        ? t("features.language.description")
        : "Content translated and adapted to your native language and cultural context",
      gradient: "from-ocean-500 to-ocean-600",
      stats: "100+ languages",
      bgPattern: "🌍",
    },
    {
      icon: Wifi,
      title: isLoaded ? t("features.connection.title") : "Fits 2G to 5G connections",
      description: isLoaded
        ? t("features.connection.description")
        : "Automatically adapts content format based on your connection speed",
      gradient: "from-forest-500 to-forest-600",
      stats: "80% less data",
      bgPattern: "📶",
    },
    {
      icon: BookOpen,
      title: isLoaded ? t("features.cultural.title") : "Cultural examples and stories",
      description: isLoaded
        ? t("features.cultural.description")
        : "Learn with examples that reflect your local culture and experiences",
      gradient: "from-coral-500 to-coral-600",
      stats: "11 countries",
      bgPattern: "📚",
    },
    {
      icon: Download,
      title: isLoaded ? t("features.offline.title") : "Offline Mode Ready",
      description: isLoaded
        ? t("features.offline.description")
        : "Download lessons to learn anytime, even without an internet connection",
      gradient: "from-sand-500 to-sand-600",
      stats: "Always available",
      bgPattern: "💾",
    },
    {
      icon: Brain,
      title: isLoaded ? t("features.ai.title") : "AI-Powered Personalization",
      description: isLoaded
        ? t("features.ai.description")
        : "Smart recommendations based on your learning style and cultural background",
      gradient: "from-purple-500 to-purple-600",
      stats: "3x engagement",
      bgPattern: "🧠",
    },
    {
      icon: Heart,
      title: isLoaded ? t("features.feedback.title") : "Culturally Sensitive Feedback",
      description: isLoaded
        ? t("features.feedback.description")
        : "Encouragement and guidance that respects your cultural communication style",
      gradient: "from-pink-500 to-pink-600",
      stats: "Feels like home",
      bgPattern: "❤️",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-white via-ocean-50/30 to-coral-50/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-ocean-200/20 to-coral-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-forest-200/20 to-sand-200/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-200/10 to-pink-200/10 rounded-full blur-3xl animate-bounce"
          style={{ animationDuration: "8s" }}
        />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="text-center mb-20 animate-fadeIn">
          <Badge
            variant="outline"
            className="mb-6 border-ocean-200 text-ocean-700 bg-ocean-50/80 backdrop-blur-sm px-6 py-2 text-lg animate-fadeIn"
          >
            <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
            Features
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-display mb-6">
            {isLoaded ? t("features.title") : "Learning that feels like home"}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {isLoaded ? t("features.subtitle") : "Designed for the diverse cultures and needs of Southeast Asia"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 border-transparent hover:border-ocean-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm rounded-3xl animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background Pattern */}
                <div className="absolute top-4 right-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                  {feature.bgPattern}
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                />

                <CardContent className="p-8 relative z-10">
                  <div className="relative mb-8">
                    <div
                      className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>

                    <Badge
                      variant="secondary"
                      className="absolute -top-2 -right-2 text-xs bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg border-2 border-blue-200 dark:border-blue-400 animate-bounce"
                      style={{ animationDelay: `${index * 0.2}s`, animationDuration: "2s" }}
                    >
                      <Star className="w-3 h-3 mr-1 text-coral-500" />
                      {feature.stats}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-dark group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-center">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover Effect Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ocean-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fadeIn" style={{ animationDelay: "0.8s" }}>
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-ocean-50 via-coral-50 to-forest-50 rounded-full border border-ocean-200 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
            <Zap className="h-6 w-6 text-ocean-500 animate-pulse" />
            <span className="text-lg font-semibold bg-gradient-to-r from-ocean-600 to-coral-600 bg-clip-text text-transparent">
              Powered by Azure AI for maximum cultural sensitivity
            </span>
            <Shield className="h-6 w-6 text-forest-500 animate-bounce" style={{ animationDuration: "2s" }} />
          </div>
        </div>
      </div>
    </section>
  )
}
