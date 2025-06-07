"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Star,
  MessageCircle,
  Video,
  Calendar,
  Search,
  Filter,
  Globe,
  Clock,
  Award,
  Users,
  Zap,
} from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface AITutor {
  id: string
  name: string
  avatar: string
  specialization: string[]
  culturalExpertise: string[]
  languages: string[]
  rating: number
  totalSessions: number
  pricePerHour: number
  currency: string
  availability: "available" | "busy" | "offline"
  responseTime: string
  description: string
  certifications: string[]
  teachingStyle: "formal" | "casual" | "adaptive"
  aiModel: "GPT-4" | "Claude" | "Gemini" | "Custom"
  culturalAdaptation: number // 1-10 scale
}

interface TutoringSession {
  id: string
  tutorId: string
  studentId: string
  subject: string
  scheduledAt: Date
  duration: number
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  culturalContext: string
  language: string
  sessionType: "chat" | "video" | "ar_vr"
}

export function AITutoringMarketplace() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTab, setSelectedTab] = useState("browse")

  const [tutors, setTutors] = useState<AITutor[]>([
    {
      id: "1",
      name: "Dr. Linh AI",
      avatar: "🇻🇳",
      specialization: ["Mathematics", "Physics", "Engineering"],
      culturalExpertise: ["Vietnam", "Mekong Delta", "Traditional Architecture"],
      languages: ["Vietnamese", "English", "Mandarin"],
      rating: 4.9,
      totalSessions: 1247,
      pricePerHour: 25,
      currency: "USD",
      availability: "available",
      responseTime: "< 2 minutes",
      description:
        "Specialized in teaching STEM subjects with Vietnamese cultural context. Expert in traditional engineering principles found in Vietnamese architecture.",
      certifications: ["PhD Mathematics", "Cultural Education Specialist", "AI Ethics Certified"],
      teachingStyle: "adaptive",
      aiModel: "GPT-4",
      culturalAdaptation: 9,
    },
    {
      id: "2",
      name: "Prof. Sari AI",
      avatar: "🇮🇩",
      specialization: ["Biology", "Environmental Science", "Marine Studies"],
      culturalExpertise: ["Indonesia", "Coral Reefs", "Biodiversity"],
      languages: ["Indonesian", "English", "Javanese"],
      rating: 4.8,
      totalSessions: 892,
      pricePerHour: 22,
      currency: "USD",
      availability: "available",
      responseTime: "< 5 minutes",
      description:
        "Marine biology expert with deep knowledge of Indonesian coral reef ecosystems. Connects traditional fishing knowledge with modern science.",
      certifications: ["Marine Biology PhD", "Environmental Educator", "Cultural Preservation Award"],
      teachingStyle: "formal",
      aiModel: "Claude",
      culturalAdaptation: 8,
    },
    {
      id: "3",
      name: "Kuya Tech AI",
      avatar: "🇵🇭",
      specialization: ["Computer Science", "AI/ML", "Web Development"],
      culturalExpertise: ["Philippines", "Jeepney Innovation", "Bayanihan Collaboration"],
      languages: ["Filipino", "English", "Cebuano"],
      rating: 4.7,
      totalSessions: 654,
      pricePerHour: 20,
      currency: "USD",
      availability: "busy",
      responseTime: "< 10 minutes",
      description:
        "Tech enthusiast who teaches programming through Filipino cultural lens. Uses jeepney mechanics to explain algorithms!",
      certifications: ["CS Masters", "Full-Stack Developer", "Cultural Tech Innovator"],
      teachingStyle: "casual",
      aiModel: "Gemini",
      culturalAdaptation: 10,
    },
  ])

  const [mySessions, setMySessions] = useState<TutoringSession[]>([
    {
      id: "1",
      tutorId: "1",
      studentId: "user_123",
      subject: "Calculus with Rice Terrace Engineering",
      scheduledAt: new Date("2024-01-25T14:00:00"),
      duration: 60,
      status: "scheduled",
      culturalContext: "Philippines",
      language: "Filipino",
      sessionType: "video",
    },
  ])

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.specialization.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
      tutor.culturalExpertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" ||
      tutor.specialization.some((spec) => spec.toLowerCase().includes(selectedCategory.toLowerCase()))

    return matchesSearch && matchesCategory
  })

  const bookSession = async (tutorId: string, sessionType: "chat" | "video" | "ar_vr") => {
    const newSession: TutoringSession = {
      id: Date.now().toString(),
      tutorId,
      studentId: "user_123",
      subject: "Custom Learning Session",
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      duration: 60,
      status: "scheduled",
      culturalContext: profile.country,
      language: currentLanguage.code,
      sessionType,
    }

    setMySessions((prev) => [...prev, newSession])
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-forest/10 text-forest border-forest/20"
      case "busy":
        return "bg-accent/10 text-accent border-accent/20"
      case "offline":
        return "bg-gray-100 text-gray-600 border-gray-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const categories = ["all", "Mathematics", "Science", "Technology", "Language", "Culture", "Arts"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">AI Tutoring Marketplace</h2>
          <p className="text-gray-600">Connect with culturally-aware AI tutors across Southeast Asia</p>
        </div>
        <Badge variant="outline" className="border-primary/20 text-primary">
          <Users className="h-3 w-3 mr-1" />
          {tutors.length} Tutors Available
        </Badge>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Tutors</TabsTrigger>
          <TabsTrigger value="sessions">My Sessions ({mySessions.length})</TabsTrigger>
          <TabsTrigger value="become-tutor">Become a Tutor</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tutors by name, subject, or cultural expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <Card
                key={tutor.id}
                className="border-2 border-transparent hover:border-secondary/20 transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-secondary text-white text-xl">
                        {tutor.avatar}
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{tutor.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-accent fill-current" />
                            <span className="text-sm font-medium">{tutor.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({tutor.totalSessions} sessions)</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={getAvailabilityColor(tutor.availability)}>
                      {tutor.availability}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{tutor.description}</p>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Specialization:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tutor.specialization.slice(0, 3).map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Cultural Expertise:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tutor.culturalExpertise.slice(0, 2).map((exp) => (
                          <Badge key={exp} variant="outline" className="text-xs border-forest/20 text-forest">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Languages:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tutor.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            <Globe className="h-3 w-3 mr-1" />
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-primary">
                      ${tutor.pricePerHour}/{tutor.currency === "USD" ? "hour" : "hr"}
                    </div>
                    <div className="text-sm text-gray-600">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {tutor.responseTime}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-secondary to-forest"
                      onClick={() => bookSession(tutor.id, "chat")}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => bookSession(tutor.id, "video")}>
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => bookSession(tutor.id, "ar_vr")}>
                      <Zap className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="space-y-4">
            {mySessions.map((session) => {
              const tutor = tutors.find((t) => t.id === session.tutorId)
              return (
                <Card key={session.id} className="border-2 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-secondary text-white">
                          {tutor?.avatar}
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{session.subject}</h3>
                          <p className="text-sm text-gray-600">with {tutor?.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{session.scheduledAt.toLocaleString()}</span>
                            <Badge variant="outline" className="text-xs">
                              {session.duration} min
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            session.status === "scheduled"
                              ? "border-primary/20 text-primary"
                              : session.status === "ongoing"
                                ? "border-forest/20 text-forest"
                                : "border-gray-200 text-gray-600"
                          }
                        >
                          {session.status}
                        </Badge>
                        <Button size="sm">
                          {session.sessionType === "video" && <Video className="h-4 w-4 mr-1" />}
                          {session.sessionType === "chat" && <MessageCircle className="h-4 w-4 mr-1" />}
                          {session.sessionType === "ar_vr" && <Zap className="h-4 w-4 mr-1" />}
                          Join
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="become-tutor" className="space-y-6">
          <Card className="border-2 border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                Become an AI Tutor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Share your expertise and cultural knowledge with learners across Southeast Asia. Our AI-enhanced
                tutoring platform helps you reach more students while maintaining cultural authenticity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <Award className="h-8 w-8 mx-auto text-primary" />
                  <h4 className="font-medium">Expert Recognition</h4>
                  <p className="text-sm text-gray-600">Get certified as a cultural education specialist</p>
                </div>
                <div className="text-center space-y-2">
                  <Globe className="h-8 w-8 mx-auto text-secondary" />
                  <h4 className="font-medium">Global Reach</h4>
                  <p className="text-sm text-gray-600">Teach students across all SEA countries</p>
                </div>
                <div className="text-center space-y-2">
                  <Zap className="h-8 w-8 mx-auto text-forest" />
                  <h4 className="font-medium">AI Enhancement</h4>
                  <p className="text-sm text-gray-600">AI tools amplify your teaching impact</p>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-accent to-primary">Apply to Become a Tutor</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
