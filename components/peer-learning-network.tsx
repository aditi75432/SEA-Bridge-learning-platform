"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, Video, Share2, Heart, Star, Globe, Clock, Search, Filter, Plus } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface PeerLearner {
  id: string
  name: string
  avatar: string
  country: string
  languages: string[]
  subjects: string[]
  level: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  totalHelped: number
  isOnline: boolean
  lastSeen: Date
  culturalExpertise: string[]
  learningGoals: string[]
  teachingStyle: string[]
}

interface KnowledgeExchange {
  id: string
  title: string
  description: string
  subject: string
  difficulty: string
  offeredBy: string
  seekingFrom: string[]
  exchangeType: "teach_for_teach" | "help_for_help" | "cultural_exchange" | "study_buddy"
  culturalContext: string
  language: string
  format: "text" | "video" | "voice" | "ar_vr"
  duration: number
  status: "open" | "matched" | "completed"
  createdAt: Date
  responses: number
}

interface StudySession {
  id: string
  title: string
  participants: string[]
  subject: string
  scheduledAt: Date
  duration: number
  format: "group_study" | "peer_tutoring" | "cultural_sharing" | "project_collab"
  culturalFocus: string
  language: string
  maxParticipants: number
  currentParticipants: number
  description: string
}

export function PeerLearningNetwork() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [activeTab, setActiveTab] = useState("discover")
  const [searchQuery, setSearchQuery] = useState("")

  const [peers, setPeers] = useState<PeerLearner[]>([
    {
      id: "1",
      name: "Linh Nguyen",
      avatar: "🇻🇳",
      country: "Vietnam",
      languages: ["Vietnamese", "English", "Mandarin"],
      subjects: ["Mathematics", "Physics", "Engineering"],
      level: "Advanced",
      rating: 4.9,
      totalHelped: 127,
      isOnline: true,
      lastSeen: new Date(),
      culturalExpertise: ["Mekong Delta", "Traditional Architecture", "Vietnamese Cuisine"],
      learningGoals: ["AI/ML", "Cultural Preservation"],
      teachingStyle: ["Visual", "Hands-on", "Cultural Context"],
    },
    {
      id: "2",
      name: "Siti Rahman",
      avatar: "🇮🇩",
      country: "Indonesia",
      languages: ["Indonesian", "English", "Javanese"],
      subjects: ["Biology", "Environmental Science", "Marine Studies"],
      level: "Intermediate",
      rating: 4.7,
      totalHelped: 89,
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      culturalExpertise: ["Coral Reefs", "Biodiversity", "Traditional Medicine"],
      learningGoals: ["Climate Science", "Conservation"],
      teachingStyle: ["Storytelling", "Field Experience", "Community Learning"],
    },
    {
      id: "3",
      name: "Somchai Patel",
      avatar: "🇹🇭",
      country: "Thailand",
      languages: ["Thai", "English"],
      subjects: ["Computer Science", "Web Development", "AI"],
      level: "Advanced",
      rating: 4.8,
      totalHelped: 156,
      isOnline: true,
      lastSeen: new Date(),
      culturalExpertise: ["Temple Architecture", "Thai Festivals", "Buddhist Philosophy"],
      learningGoals: ["Blockchain", "Cultural Tech"],
      teachingStyle: ["Project-based", "Collaborative", "Mindful Learning"],
    },
  ])

  const [knowledgeExchanges, setKnowledgeExchanges] = useState<KnowledgeExchange[]>([
    {
      id: "1",
      title: "Help with Calculus - Will teach Filipino culture",
      description:
        "I need help understanding derivatives and integrals. In exchange, I can teach about Filipino traditions, jeepney culture, and Tagalog language basics.",
      subject: "Mathematics",
      difficulty: "Intermediate",
      offeredBy: "user_123",
      seekingFrom: ["Mathematics", "Engineering"],
      exchangeType: "teach_for_teach",
      culturalContext: "Philippines",
      language: "English",
      format: "video",
      duration: 60,
      status: "open",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      responses: 3,
    },
    {
      id: "2",
      title: "Study Buddy for Marine Biology",
      description:
        "Looking for someone to study coral reef ecosystems together. I have experience with Indonesian marine life and can share local knowledge.",
      subject: "Biology",
      difficulty: "Advanced",
      offeredBy: "siti_123",
      seekingFrom: ["Biology", "Environmental Science"],
      exchangeType: "study_buddy",
      culturalContext: "Indonesia",
      language: "English",
      format: "video",
      duration: 90,
      status: "open",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      responses: 7,
    },
  ])

  const [studySessions, setStudySessions] = useState<StudySession[]>([
    {
      id: "1",
      title: "AI Ethics Discussion - SEA Perspectives",
      participants: ["linh_123", "somchai_456"],
      subject: "Technology",
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      duration: 120,
      format: "group_study",
      culturalFocus: "Southeast Asia",
      language: "English",
      maxParticipants: 6,
      currentParticipants: 2,
      description:
        "Discussing AI ethics from Southeast Asian cultural perspectives, including Buddhist and Islamic viewpoints on technology.",
    },
    {
      id: "2",
      title: "Traditional Engineering Study Group",
      participants: ["maria_789"],
      subject: "Engineering",
      scheduledAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
      duration: 90,
      format: "cultural_sharing",
      culturalFocus: "Traditional Knowledge",
      language: "Filipino",
      maxParticipants: 4,
      currentParticipants: 1,
      description:
        "Learning modern engineering through traditional SEA structures like rice terraces, temples, and stilt houses.",
    },
  ])

  const createKnowledgeExchange = () => {
    const newExchange: KnowledgeExchange = {
      id: Date.now().toString(),
      title: "New Knowledge Exchange",
      description: "Description of what you need help with and what you can offer",
      subject: "General",
      difficulty: "Beginner",
      offeredBy: "user_123",
      seekingFrom: [],
      exchangeType: "help_for_help",
      culturalContext: profile.country,
      language: currentLanguage.code,
      format: "text",
      duration: 30,
      status: "open",
      createdAt: new Date(),
      responses: 0,
    }
    setKnowledgeExchanges((prev) => [newExchange, ...prev])
  }

  const joinStudySession = (sessionId: string) => {
    setStudySessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, currentParticipants: session.currentParticipants + 1 } : session,
      ),
    )
  }

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      Philippines: "🇵🇭",
      Vietnam: "🇻🇳",
      Thailand: "🇹🇭",
      Indonesia: "🇮🇩",
      Malaysia: "🇲🇾",
      Singapore: "🇸🇬",
      Cambodia: "🇰🇭",
      Laos: "🇱🇦",
      Myanmar: "🇲🇲",
      Brunei: "🇧🇳",
    }
    return flags[country] || "🌏"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Peer Learning Network</h2>
          <p className="text-gray-600">Connect, learn, and share knowledge with fellow SEA learners</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-forest/20 text-forest">
            <Users className="h-3 w-3 mr-1" />
            {peers.filter((p) => p.isOnline).length} Online
          </Badge>
          <Badge variant="outline" className="border-primary/20 text-primary">
            <Globe className="h-3 w-3 mr-1" />
            {peers.length} Total Peers
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover Peers</TabsTrigger>
          <TabsTrigger value="exchanges">Knowledge Exchange</TabsTrigger>
          <TabsTrigger value="sessions">Study Sessions</TabsTrigger>
          <TabsTrigger value="my-network">My Network</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search peers by name, subject, or cultural expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {peers.map((peer) => (
              <Card
                key={peer.id}
                className="border-2 border-transparent hover:border-secondary/20 transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-secondary text-white text-xl">
                          {peer.avatar}
                        </Avatar>
                        {peer.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-forest rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{peer.name}</h3>
                        <p className="text-sm text-gray-600">{peer.country}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-accent fill-current" />
                          <span className="text-xs">{peer.rating}</span>
                          <span className="text-xs text-gray-500">({peer.totalHelped} helped)</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={peer.isOnline ? "border-forest/20 text-forest" : "border-gray-200 text-gray-600"}
                    >
                      {peer.isOnline ? "Online" : "Offline"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Subjects:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {peer.subjects.slice(0, 3).map((subject) => (
                          <Badge key={subject} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Cultural Expertise:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {peer.culturalExpertise.slice(0, 2).map((expertise) => (
                          <Badge key={expertise} variant="outline" className="text-xs border-forest/20 text-forest">
                            {expertise}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Languages:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {peer.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-secondary to-forest">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exchanges" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Knowledge Exchange</h3>
            <Button onClick={createKnowledgeExchange} className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Create Exchange
            </Button>
          </div>

          <div className="space-y-4">
            {knowledgeExchanges.map((exchange) => (
              <Card key={exchange.id} className="border-2 border-transparent hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{exchange.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {exchange.exchangeType.replace("_", " ")}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {exchange.subject}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed">{exchange.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{exchange.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <span>{exchange.language}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{exchange.responses} responses</span>
                        </div>
                        <span>
                          {getCountryFlag(exchange.culturalContext)} {exchange.culturalContext}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-secondary to-forest">
                        Respond
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Study Sessions</h3>
            <Button className="bg-gradient-to-r from-accent to-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Session
            </Button>
          </div>

          <div className="space-y-4">
            {studySessions.map((session) => (
              <Card key={session.id} className="border-2 border-transparent hover:border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{session.title}</h4>
                        <Badge variant="outline" className="text-xs border-accent/20 text-accent">
                          {session.format.replace("_", " ")}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed">{session.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{session.scheduledAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>
                            {session.currentParticipants}/{session.maxParticipants}
                          </span>
                        </div>
                        <span>
                          {getCountryFlag(session.culturalFocus)} {session.culturalFocus}
                        </span>
                      </div>

                      <div className="flex -space-x-2">
                        {session.participants.slice(0, 3).map((participant, index) => (
                          <div
                            key={participant}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white flex items-center justify-center text-white text-sm"
                          >
                            {participant.charAt(0).toUpperCase()}
                          </div>
                        ))}
                        {session.participants.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                            +{session.participants.length - 3}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-accent to-primary"
                        onClick={() => joinStudySession(session.id)}
                        disabled={session.currentParticipants >= session.maxParticipants}
                      >
                        {session.currentParticipants >= session.maxParticipants ? "Full" : "Join"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-network" className="space-y-6">
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Build Your Learning Network</h3>
            <p className="text-gray-600 mb-4">Connect with peers to start building your learning community</p>
            <Button onClick={() => setActiveTab("discover")}>Discover Peers</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
