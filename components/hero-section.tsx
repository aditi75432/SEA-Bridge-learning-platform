"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Globe, Heart } from "lucide-react"
import Link from "next/link"
import { useLocalization } from "./localization-provider"

export function HeroSection() {
  const { t, isLoaded } = useLocalization()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-blue-300/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-orange-300/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/20 to-yellow-200/20 rounded-full blur-3xl animate-bounce"
          style={{ animationDuration: "6s" }}
        />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <Badge
            variant="outline"
            className="border-blue-200 text-blue-700 bg-blue-50/80 backdrop-blur-sm px-6 py-2 text-lg animate-fadeIn"
          >
            <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
            {isLoaded ? t("hero.badge") : "AI-Powered Learning"}
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl font-display animate-slideIn">
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                SEA Learn
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                Built for Me
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 font-medium">
              {isLoaded ? t("hero.subtitle") : "Localized. Personalized. Empowered Learning."}
            </p>
          </div>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            {isLoaded
              ? t("hero.description")
              : "Experience education that speaks your language, understands your culture, and adapts to your needs."}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fadeIn"
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg"
              >
                {isLoaded ? t("hero.startLearning") : "Start Learning"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Globe className="mr-2 h-5 w-5" />
              {isLoaded ? t("hero.chooseLanguage") : "Choose My Language"}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-gray-500 animate-fadeIn"
            style={{ animationDelay: "0.7s" }}
          >
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-orange-500" />
              <span>Trusted by 50K+ learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>11 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
