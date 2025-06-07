"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, ArrowRight, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function CulturalOnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    country: "",
    region: "",
    language: "",
    dialect: "",
    tone: "",
    schoolType: "",
    learningPace: "",
  })

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Save profile and redirect to cultural dashboard
      try {
        const completeProfile = {
          ...profile,
          completedAt: new Date().toISOString(),
          isComplete: true,
        }
        localStorage.setItem("culturalProfile", JSON.stringify(completeProfile))
        console.log("Cultural profile saved:", completeProfile)

        // Small delay to ensure localStorage is written
        setTimeout(() => {
          router.push("/cultural-dashboard")
        }, 100)
      } catch (error) {
        console.error("Error saving cultural profile:", error)
        // Still redirect but with default profile
        router.push("/cultural-dashboard")
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>
            <p className="text-gray-600 mb-4">You need to be signed in to complete cultural onboarding.</p>
            <Button onClick={() => router.push("/auth/signin")} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-4 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            <Globe className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" />
            Cultural Setup - Step {step} of 4
          </Badge>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">Welcome to SEA Bridge!</h1>
          <p className="text-gray-600">Let's personalize your learning experience</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">
              {step === 1 && "Choose Your Country & Region"}
              {step === 2 && "Language Preferences"}
              {step === 3 && "Communication Style"}
              {step === 4 && "Learning Preferences"}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Step 1: Country & Region */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Which country are you from?</Label>
                  <Select value={profile.country} onValueChange={(value) => setProfile({ ...profile, country: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Philippines">🇵🇭 Philippines</SelectItem>
                      <SelectItem value="Vietnam">🇻🇳 Vietnam</SelectItem>
                      <SelectItem value="Thailand">🇹🇭 Thailand</SelectItem>
                      <SelectItem value="Indonesia">🇮🇩 Indonesia</SelectItem>
                      <SelectItem value="Malaysia">🇲🇾 Malaysia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {profile.country === "Philippines" && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Which region?</Label>
                    <RadioGroup
                      value={profile.region}
                      onValueChange={(value) => setProfile({ ...profile, region: value })}
                      className="grid grid-cols-1 gap-3"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                        <RadioGroupItem value="Luzon" id="luzon" />
                        <Label htmlFor="luzon" className="flex-1 cursor-pointer">
                          <div className="font-medium">Luzon</div>
                          <div className="text-sm text-gray-500">Manila, Baguio, Bataan, Rizal</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                        <RadioGroupItem value="Visayas" id="visayas" />
                        <Label htmlFor="visayas" className="flex-1 cursor-pointer">
                          <div className="font-medium">Visayas</div>
                          <div className="text-sm text-gray-500">Cebu, Bohol, Iloilo, Negros</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                        <RadioGroupItem value="Mindanao" id="mindanao" />
                        <Label htmlFor="mindanao" className="flex-1 cursor-pointer">
                          <div className="font-medium">Mindanao</div>
                          <div className="text-sm text-gray-500">Davao, Cagayan de Oro, Zamboanga</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Language */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Primary Language</Label>
                  <RadioGroup
                    value={profile.language}
                    onValueChange={(value) => setProfile({ ...profile, language: value })}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="English" id="english" />
                      <Label htmlFor="english" className="flex-1 cursor-pointer">
                        English
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="Filipino" id="filipino" />
                      <Label htmlFor="filipino" className="flex-1 cursor-pointer">
                        Filipino/Tagalog
                      </Label>
                    </div>
                    {profile.region === "Visayas" && (
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                        <RadioGroupItem value="Cebuano" id="cebuano" />
                        <Label htmlFor="cebuano" className="flex-1 cursor-pointer">
                          Cebuano/Bisaya
                        </Label>
                      </div>
                    )}
                  </RadioGroup>
                </div>

                {profile.region && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Local Dialect (Optional)</Label>
                    <Select
                      value={profile.dialect}
                      onValueChange={(value) => setProfile({ ...profile, dialect: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your dialect" />
                      </SelectTrigger>
                      <SelectContent>
                        {profile.region === "Luzon" && (
                          <>
                            <SelectItem value="Ilocano">Ilocano</SelectItem>
                            <SelectItem value="Kapampangan">Kapampangan</SelectItem>
                            <SelectItem value="Bikol">Bikol</SelectItem>
                          </>
                        )}
                        {profile.region === "Visayas" && (
                          <>
                            <SelectItem value="Hiligaynon">Hiligaynon</SelectItem>
                            <SelectItem value="Waray">Waray</SelectItem>
                            <SelectItem value="Aklanon">Aklanon</SelectItem>
                          </>
                        )}
                        {profile.region === "Mindanao" && (
                          <>
                            <SelectItem value="Chavacano">Chavacano</SelectItem>
                            <SelectItem value="Maranao">Maranao</SelectItem>
                            <SelectItem value="Tausug">Tausug</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Communication Style */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    How would you like us to communicate with you?
                  </Label>
                  <RadioGroup
                    value={profile.tone}
                    onValueChange={(value) => setProfile({ ...profile, tone: value })}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="formal" id="formal" />
                      <Label htmlFor="formal" className="flex-1 cursor-pointer">
                        <div className="font-medium">Formal & Respectful</div>
                        <div className="text-sm text-gray-500">"Magandang araw po! Handa na po ba kayong matuto?"</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="informal" id="informal" />
                      <Label htmlFor="informal" className="flex-1 cursor-pointer">
                        <div className="font-medium">Casual & Friendly</div>
                        <div className="text-sm text-gray-500">"Hey! Tara, aral na tayo. Kayang-kaya mo 'to!"</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="youth" id="youth" />
                      <Label htmlFor="youth" className="flex-1 cursor-pointer">
                        <div className="font-medium">Youth-Friendly</div>
                        <div className="text-sm text-gray-500">"Yo! Ready ka na ba mag-level up sa studies mo?"</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 4: Learning Preferences */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">School Type</Label>
                  <RadioGroup
                    value={profile.schoolType}
                    onValueChange={(value) => setProfile({ ...profile, schoolType: value })}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="flex-1 cursor-pointer">
                        Public School
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="flex-1 cursor-pointer">
                        Private School
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="homeschool" id="homeschool" />
                      <Label htmlFor="homeschool" className="flex-1 cursor-pointer">
                        Homeschool
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Learning Pace</Label>
                  <RadioGroup
                    value={profile.learningPace}
                    onValueChange={(value) => setProfile({ ...profile, learningPace: value })}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="fast" id="fast" />
                      <Label htmlFor="fast" className="flex-1 cursor-pointer">
                        <div className="font-medium">Fast & Intensive</div>
                        <div className="text-sm text-gray-500">I like to learn quickly and challenge myself</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="flexible" id="flexible" />
                      <Label htmlFor="flexible" className="flex-1 cursor-pointer">
                        <div className="font-medium">Flexible & Balanced</div>
                        <div className="text-sm text-gray-500">I prefer a balanced approach with breaks</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-blue-50">
                      <RadioGroupItem value="structured" id="structured" />
                      <Label htmlFor="structured" className="flex-1 cursor-pointer">
                        <div className="font-medium">Structured & Steady</div>
                        <div className="text-sm text-gray-500">I like clear steps and consistent progress</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handleBack} disabled={step === 1} className="flex items-center gap-2">
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && (!profile.country || (profile.country === "Philippines" && !profile.region))) ||
                  (step === 2 && !profile.language) ||
                  (step === 3 && !profile.tone) ||
                  (step === 4 && (!profile.schoolType || !profile.learningPace))
                }
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
              >
                {step === 4 ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Complete Setup
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
