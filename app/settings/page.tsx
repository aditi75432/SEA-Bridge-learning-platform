

"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { useCulturalContext } from "@/components/cultural-context-provider"
import { useToast } from "@/hooks/use-toast"
import { User, Globe, Bell, Shield, Palette, Zap } from "lucide-react"

export default function SettingsPage() {
  const { currentLanguage, setLanguage, languages } = useLanguage()
  const { profile, updateProfile } = useCulturalContext()
  const { toast } = useToast()

  // Safe access to profile properties with fallbacks
  const safeProfile = {
    country: profile?.country || "Philippines",
    formality: profile?.formality || "informal", // Changed from formalityPreference
    visualStyle: profile?.visualStyle || "modern",
    region: profile?.region || "urban",
    ageGroup: profile?.ageGroup || "teen",
    culturalElements: profile?.culturalElements || {
      examples: ["Rice farming", "Traditional festivals", "Local cuisine"],
    },
  }

  const [formData, setFormData] = useState({
    name: "Maria Santos",
    email: "maria.santos@example.com",
    age: "14",
    country: safeProfile.country,
    language: currentLanguage?.code || "en",
    formality: safeProfile.formality, // Changed from formalityPreference
    visualStyle: safeProfile.visualStyle,
    region: safeProfile.region,
    ageGroup: safeProfile.ageGroup,
  })

  const [notifications, setNotifications] = useState({
    courseReminders: true,
    achievementAlerts: true,
    weeklyProgress: true,
    culturalEvents: false,
    newCourses: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    progressSharing: false,
    leaderboardParticipation: true,
    dataCollection: true,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "language" && languages) {
      const lang = languages.find((l) => l.code === value)
      if (lang && setLanguage) setLanguage(lang)
    }


    if (["formality", "visualStyle", "region", "ageGroup", "country"].includes(field) && updateProfile) { // Changed from formalityPreference
      updateProfile({ [field]: value })
    }
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row">
        <EnhancedSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-gray-600">Customize your learning experience</p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="language" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Language
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Appearance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader>
                      <CardTitle>User Profile</CardTitle>
                      <CardDescription>Update your personal information and learning preferences</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleChange("age", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <select
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleChange("country", e.target.value)}
                            className="w-full p-2 border rounded-lg bg-white"
                          >
                            <option value="Philippines">🇵🇭 Philippines</option>
                            <option value="Vietnam">🇻🇳 Vietnam</option>
                            <option value="Thailand">🇹🇭 Thailand</option>
                            <option value="Indonesia">🇮🇩 Indonesia</option>
                            <option value="Malaysia">🇲🇾 Malaysia</option>
                            <option value="Singapore">🇸🇬 Singapore</option>
                            <option value="Cambodia">🇰🇭 Cambodia</option>
                            <option value="Myanmar">🇲🇲 Myanmar</option>
                            <option value="Laos">🇱🇦 Laos</option>
                            <option value="Brunei">🇧🇳 Brunei</option>
                            <option value="Timor-Leste">🇹🇱 Timor-Leste</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="region">Region Type</Label>
                          <select
                            id="region"
                            value={formData.region}
                            onChange={(e) => handleChange("region", e.target.value)}
                            className="w-full p-2 border rounded-lg bg-white"
                          >
                            <option value="urban">Urban</option>
                            <option value="suburban">Suburban</option>
                            <option value="rural">Rural</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ageGroup">Age Group</Label>
                          <select
                            id="ageGroup"
                            value={formData.ageGroup}
                            onChange={(e) => handleChange("ageGroup", e.target.value)}
                            className="w-full p-2 border rounded-lg bg-white"
                          >
                            <option value="child">Child (6-12)</option>
                            <option value="teen">Teen (13-17)</option>
                            <option value="adult">Adult (18+)</option>
                          </select>
                        </div>
                      </div>

                      <Button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        Save Profile
                      </Button>
                    </CardContent>
                  </Card>
                </form>
              </TabsContent>

              <TabsContent value="language">
                <Card>
                  <CardHeader>
                    <CardTitle>Language & Cultural Preferences</CardTitle>
                    <CardDescription>Customize how content is presented to match your cultural context</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Primary Language</Label>
                      <select
                        id="language"
                        value={formData.language}
                        onChange={(e) => handleChange("language", e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white"
                      >
                        {languages?.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.localName} ({lang.name})
                          </option>
                        )) || <option value="en">English</option>}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="formality">Communication Style</Label>
                      <select
                        id="formality"


                        value={formData.formality} // Changed from formalityPreference
                        onChange={(e) => handleChange("formality", e.target.value)} // Changed from formalityPreference
                        className="w-full p-2 border rounded-lg bg-white"
                      >
                        <option value="informal">Casual & Friendly</option>
                        <option value="formal">Respectful & Formal</option>
                        <option value="respectful">Culturally Respectful</option>
                      </select>
                      <p className="text-sm text-gray-600">This affects how feedback and encouragement are delivered</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visualStyle">Visual Style</Label>
                      <select
                        id="visualStyle"
                        value={formData.visualStyle}
                        onChange={(e) => handleChange("visualStyle", e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white"
                      >
                        <option value="modern">Modern & Clean</option>
                        <option value="traditional">Traditional & Cultural</option>
                        <option value="cartoon">Fun & Cartoon-like</option>
                      </select>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        Cultural Context Preview
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">Based on your settings, you'll see examples like:</p>
                      <div className="flex flex-wrap gap-2">
                        {safeProfile.culturalElements.examples.slice(0, 3).map((example, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                            🌾 {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose what notifications you'd like to receive</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {[
                      {
                        key: "courseReminders",
                        title: "Course Reminders",
                        description: "Get reminded to continue your learning journey",
                        icon: "📚",
                      },
                      {
                        key: "achievementAlerts",
                        title: "Achievement Alerts",
                        description: "Celebrate when you unlock new achievements",
                        icon: "🏆",
                      },
                      {
                        key: "weeklyProgress",
                        title: "Weekly Progress",
                        description: "See your weekly learning summary",
                        icon: "📊",
                      },
                      {
                        key: "culturalEvents",
                        title: "Cultural Events",
                        description: "Learn about festivals and events in your region",
                        icon: "🎉",
                      },
                      {
                        key: "newCourses",
                        title: "New Courses",
                        description: "Be the first to know about new content",
                        icon: "✨",
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={notifications[item.key as keyof typeof notifications]}
                          onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Data</CardTitle>
                    <CardDescription>Control how your data is used and shared</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {[
                      {
                        key: "profileVisible",
                        title: "Public Profile",
                        description: "Allow other learners to see your profile",
                        icon: "👤",
                      },
                      {
                        key: "progressSharing",
                        title: "Progress Sharing",
                        description: "Share your learning progress with friends",
                        icon: "📈",
                      },
                      {
                        key: "leaderboardParticipation",
                        title: "Leaderboard Participation",
                        description: "Appear on regional and global leaderboards",
                        icon: "🏅",
                      },
                      {
                        key: "dataCollection",
                        title: "Learning Analytics",
                        description: "Help improve the platform with anonymous usage data",
                        icon: "📊",
                      },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={privacy[item.key as keyof typeof privacy]}
                          onCheckedChange={(checked) => handlePrivacyChange(item.key, checked)}
                        />
                      </div>
                    ))}

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        Data Protection
                      </h4>
                      <p className="text-sm text-gray-600">
                        Your data is encrypted and stored securely. We never share personal information with third
                        parties without your explicit consent.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance & Accessibility</CardTitle>
                    <CardDescription>Customize the look and feel of your learning experience</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Theme</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
                            <div className="w-full h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded mb-2"></div>
                            <p className="text-sm font-medium">Light Theme</p>
                            <p className="text-xs text-gray-600">Current</p>
                          </div>
                          <div className="p-4 border-2 border-gray-200 rounded-lg opacity-50">
                            <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                            <p className="text-sm font-medium">Dark Theme</p>
                            <p className="text-xs text-gray-600">Coming Soon</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Font Size</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="outline" size="sm">
                            Small
                          </Button>
                          <Button variant="default" size="sm">
                            Medium
                          </Button>
                          <Button variant="outline" size="sm">
                            Large
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Animation</Label>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-sm">Reduce motion and animations</p>
                            <p className="text-xs text-gray-600">Helpful for users sensitive to motion</p>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">High Contrast</Label>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-sm">Increase contrast for better visibility</p>
                            <p className="text-xs text-gray-600">Improves readability</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-purple-600" />
                        Performance Settings
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">Auto-download for offline</p>
                            <p className="text-xs text-gray-600">Download content when on WiFi</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm">Reduce data usage</p>
                            <p className="text-xs text-gray-600">Lower quality images and videos</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
