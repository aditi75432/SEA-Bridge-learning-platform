"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useCulturalContext } from "@/components/cultural-context-provider"
import { useLocalization } from "@/components/enhanced-localization-provider"
import { useAuth } from "@/components/auth-provider"
import { Globe, Users, BookOpen, Sparkles, ChevronRight, ChevronLeft } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { profile, updateProfile } = useCulturalContext()
  const { t, setLanguage } = useLocalization()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const [onboardingData, setOnboardingData] = useState({
    language: "fil",
    dialect: "",
    tone: "informal" as "formal" | "informal" | "youth",
    region: "Luzon",
    schoolType: "public" as "public" | "private" | "homeschool",
    learningPace: "flexible" as "fast" | "flexible" | "structured",
  })

  // Auto-detect user preferences based on email domain or previous data
  useEffect(() => {
    if (user?.email?.includes("maria")) {
      setOnboardingData((prev) => ({
        ...prev,
        language: "fil",
        region: "Visayas",
        dialect: "Cebuano",
      }))
    }
  }, [user])

  const steps = [
    {
      id: "language",
      title: t("onboarding.language", "Choose your preferred language"),
      description: "Piliin ang wika na mas komportable kayo",
      icon: Globe,
    },
    {
      id: "tone",
      title: t("onboarding.tone", "How would you like us to communicate?"),
      description: "Paano ninyo gusto na makipag-usap kami sa inyo?",
      icon: Users,
    },
    {
      id: "region",
      title: t("onboarding.region", "Which region are you from?"),
      description: "Saang rehiyon kayo galing?",
      icon: BookOpen,
    },
    {
      id: "preferences",
      title: "Mga Preference sa Pag-aaral",
      description: "Ayusin natin ang inyong learning experience",
      icon: Sparkles,
    },
  ]

  const languages = [
    { code: "fil", name: "Filipino", native: "Filipino", flag: "🇵🇭" },
    { code: "ceb", name: "Cebuano", native: "Sinugboanon", flag: "🏝️" },
    { code: "en", name: "English", native: "English", flag: "🇺🇸" },
  ]

  const regions = [
    {
      id: "Luzon",
      name: "Luzon",
      description: "Kamaynilaan, Gitnang Luzon, Hilagang Luzon",
      image: "/c1.png",
      dialects: ["Tagalog", "Ilocano", "Kapampangan", "Pangasinan", "Bikol"],
    },
    {
      id: "Visayas",
      name: "Visayas",
      description: "Cebu, Bohol, Negros, Panay, Leyte, Samar",
      image: "/c2.png",
      dialects: ["Cebuano", "Hiligaynon", "Waray", "Aklanon"],
    },
    {
      id: "Mindanao",
      name: "Mindanao",
      description: "Davao, Cagayan de Oro, Zamboanga, Cotabato",
      image: "/c3.png",
      dialects: ["Cebuano", "Chavacano", "Maranao", "Tausug"],
    },
  ]

  const toneOptions = [
    {
      id: "formal",
      name: "Pormal (Formal)",
      description: 'Gumagamit ng "po" at "opo" - para sa mas respectful na pakikipag-usap',
      example: '"Magandang umaga po! Handa na po ba kayong mag-aral?"',
    },
    {
      id: "informal",
      name: "Casual (Informal)",
      description: "Friendly at relaxed na pakikipag-usap - parang kausap ninyo ang kaibigan",
      example: '"Kumusta! Ready ka na ba mag-aral? Tara na!"',
    },
    {
      id: "youth",
      name: "Youth-friendly",
      description: "May konting Taglish at modern expressions - para sa mga kabataan",
      example: '"Hey! Ready ka na ba mag-level up sa studies mo?"',
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // Update cultural profile
      updateProfile({
        country: "Philippines",
        region: onboardingData.region,
        language: onboardingData.language,
        dialect: onboardingData.dialect,
        tone: onboardingData.tone,
        schoolType: onboardingData.schoolType,
        learningPace: onboardingData.learningPace,
        visualTheme: getVisualTheme(onboardingData.region),
        curriculum: "DepEd K-12",
      })

      // Set language
      setLanguage(onboardingData.language)

      // Save completion status
      localStorage.setItem("onboardingComplete", "true")

      toast({
        title: getSuccessMessage(),
        description: "Handa na ang inyong personalized learning experience!",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "May problema",
        description: "Hindi namin na-save ang inyong preferences. Subukan ulit.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getVisualTheme = (region: string) => {
    const themes = {
      Luzon: "rice-terraces",
      Visayas: "island-paradise",
      Mindanao: "tropical-mountains",
    }
    return themes[region as keyof typeof themes] || "rice-terraces"
  }

  const getSuccessMessage = () => {
    if (onboardingData.tone === "formal") {
      return "Salamat po! Maligayang pagdating sa SEA Bridge!"
    } else if (onboardingData.tone === "youth") {
      return "Ayos! Welcome sa SEA Bridge fam! 🎉"
    } else {
      return "Salamat! Maligayang pagdating sa SEA Bridge!"
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.name ? `Maligayang pagdating, ${user.name}! 👋` : "Maligayang pagdating sa SEA Bridge! 👋"}
          </h1>
          <p className="text-gray-600">I-customize natin ang inyong learning experience</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Badge variant="secondary">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <div className="w-64">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
              {React.createElement(steps[currentStep].icon, { className: "h-8 w-8 text-white" })}
            </div>
            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
            <p className="text-gray-600 mt-2">{steps[currentStep].description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 0: Language Selection */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                        onboardingData.language === lang.code
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOnboardingData({ ...onboardingData, language: lang.code })}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{lang.flag}</div>
                        <h3 className="font-semibold text-lg">{lang.name}</h3>
                        <p className="text-sm text-gray-600">{lang.native}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Tone Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                {toneOptions.map((tone) => (
                  <div
                    key={tone.id}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      onboardingData.tone === tone.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setOnboardingData({ ...onboardingData, tone: tone.id as any })}
                  >
                    <h3 className="font-semibold text-lg mb-2">{tone.name}</h3>
                    <p className="text-gray-600 mb-3">{tone.description}</p>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm italic">{tone.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Region Selection */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {regions.map((region) => (
                    <div
                      key={region.id}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                        onboardingData.region === region.id
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setOnboardingData({ ...onboardingData, region: region.id })}
                    >
                      <img
                        src={region.image || "/placeholder.svg"}
                        alt={region.name}
                        className="w-full h-24 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-lg mb-2">{region.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{region.description}</p>
                      <div className="text-xs text-gray-500">Dialects: {region.dialects.join(", ")}</div>
                    </div>
                  ))}
                </div>

                {/* Dialect Selection */}
                {onboardingData.region && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Anong dialect ang mas familiar sa inyo?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {regions
                        .find((r) => r.id === onboardingData.region)
                        ?.dialects.map((dialect) => (
                          <div
                            key={dialect}
                            className={`p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                              onboardingData.dialect === dialect
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setOnboardingData({ ...onboardingData, dialect })}
                          >
                            <span className="text-sm font-medium">{dialect}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Learning Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Anong klase ng school kayo?</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "public", name: "Public School", desc: "Government school" },
                      { id: "private", name: "Private School", desc: "Private institution" },
                      { id: "homeschool", name: "Homeschool", desc: "Learning at home" },
                    ].map((school) => (
                      <div
                        key={school.id}
                        className={`p-4 border rounded-lg cursor-pointer text-center transition-colors ${
                          onboardingData.schoolType === school.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setOnboardingData({ ...onboardingData, schoolType: school.id as any })}
                      >
                        <div className="font-medium">{school.name}</div>
                        <div className="text-sm text-gray-600">{school.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Anong learning pace ang gusto ninyo?</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "fast", name: "Mabilis", desc: "Quick learner, gusto ng challenge" },
                      { id: "flexible", name: "Flexible", desc: "Depende sa mood at time" },
                      { id: "structured", name: "Structured", desc: "Step-by-step, organized" },
                    ].map((pace) => (
                      <div
                        key={pace.id}
                        className={`p-4 border rounded-lg cursor-pointer text-center transition-colors ${
                          onboardingData.learningPace === pace.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setOnboardingData({ ...onboardingData, learningPace: pace.id as any })}
                      >
                        <div className="font-medium">{pace.name}</div>
                        <div className="text-sm text-gray-600">{pace.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8 max-w-3xl mx-auto">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Bumalik
          </Button>

          <Button
            onClick={handleNext}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500"
          >
            {currentStep === steps.length - 1 ? (
              <>
                {isLoading ? "Nag-se-setup..." : "Tapos na!"}
                <Sparkles className="h-4 w-4" />
              </>
            ) : (
              <>
                Susunod
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
