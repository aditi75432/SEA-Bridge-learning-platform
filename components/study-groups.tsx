"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Plus, Search, MessageCircle, Video, Calendar, Globe, Crown } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface StudyGroup {
  id: string
  name: string
  description: string
  subject: string
  language: string
  country: string
  memberCount: number
  maxMembers: number
  isPrivate: boolean
  createdBy: string
  createdAt: Date
  nextSession?: Date
  tags: string[]
  level: "Beginner" | "Intermediate" | "Advanced"
  members: GroupMember[]
}

interface GroupMember {
  id: string
  name: string
  avatar: string
  country: string
  role: "admin" | "moderator" | "member"
  joinedAt: Date
  contributions: number
}

export function StudyGroups() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("discover")
  const [showCreateGroup, setShowCreateGroup] = useState(false)

  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([
    {
      id: "1",
      name: "AI & Machine Learning SEA",
      description: "Exploring AI applications across Southeast Asia with cultural context",
      subject: "Technology",
      language: "English",
      country: "Regional",
      memberCount: 24,
      maxMembers: 30,
      isPrivate: false,
      createdBy: "Dr. Linh Nguyen",
      createdAt: new Date("2024-01-15"),
      nextSession: new Date("2024-01-25T14:00:00"),
      tags: ["AI", "Machine Learning", "Technology", "Regional"],
      level: "Intermediate",
      members: [
        {
          id: "1",
          name: "Dr. Linh Nguyen",
          avatar: "🇻🇳",
          country: "Vietnam",
          role: "admin",
          joinedAt: new Date("2024-01-15"),
          contributions: 45,
        },
        {
          id: "2",
          name: "Maria Santos",
          avatar: "🇵🇭",
          country: "Philippines",
          role: "member",
          joinedAt: new Date("2024-01-18"),
          contributions: 12,
        },
      ],
    },
    {
      id: "2",
      name: "Rice Terraces & Water Cycle",
      description: "Understanding environmental science through traditional farming",
      subject: "Science",
      language: "Filipino",
      country: "Philippines",
      memberCount: 18,
      maxMembers: 25,
      isPrivate: false,
      createdBy: "Prof. Santos",
      createdAt: new Date("2024-01-10"),
      nextSession: new Date("2024-01-24T16:00:00"),
      tags: ["Environment", "Traditional Knowledge", "Science"],
      level: "Beginner",
      members: [],
    },
    {
      id: "3",
      name: "Thai Temple Mathematics",
      description: "Exploring geometry and mathematics in traditional Thai architecture",
      subject: "Mathematics",
      language: "Thai",
      country: "Thailand",
      memberCount: 15,
      maxMembers: 20,
      isPrivate: false,
      createdBy: "Somchai Patel",
      createdAt: new Date("2024-01-12"),
      tags: ["Mathematics", "Architecture", "Culture"],
      level: "Advanced",
      members: [],
    },
  ])

  const [myGroups] = useState<StudyGroup[]>(studyGroups.filter((group) => group.id === "1" || group.id === "2"))

  const filteredGroups = studyGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      Philippines: "🇵🇭",
      Vietnam: "🇻🇳",
      Thailand: "🇹🇭",
      Indonesia: "🇮🇩",
      Malaysia: "🇲🇾",
      Singapore: "🇸🇬",
      Regional: "🌏",
    }
    return flags[country] || "🌍"
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-forest/10 text-forest border-forest/20"
      case "Intermediate":
        return "bg-accent/10 text-accent border-accent/20"
      case "Advanced":
        return "bg-primary/10 text-primary border-primary/20"
      default:
        return "bg-gray/10 text-gray border-gray/20"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Study Groups</h2>
          <p className="text-gray-600">Connect with learners across Southeast Asia</p>
        </div>
        <Button onClick={() => setShowCreateGroup(true)} className="bg-gradient-to-r from-secondary to-forest">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-groups">My Groups ({myGroups.length})</TabsTrigger>
          <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search study groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-primary/20 text-primary">
                <Globe className="h-3 w-3 mr-1" />
                {profile.country}
              </Badge>
              <Badge variant="outline" className="border-secondary/20 text-secondary">
                {currentLanguage.localName}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="border-2 border-transparent hover:border-secondary/20 transition-all duration-300 hover:shadow-medium"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCountryFlag(group.country)}</span>
                      <div>
                        <CardTitle className="text-lg leading-tight">{group.name}</CardTitle>
                        <p className="text-sm text-gray-600">{group.subject}</p>
                      </div>
                    </div>
                    {group.isPrivate && <Badge variant="outline">Private</Badge>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{group.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {group.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>
                        {group.memberCount}/{group.maxMembers}
                      </span>
                    </div>
                    <Badge variant="outline" className={getLevelColor(group.level)}>
                      {group.level}
                    </Badge>
                  </div>

                  {group.nextSession && (
                    <div className="flex items-center gap-2 text-sm text-accent">
                      <Calendar className="h-4 w-4" />
                      <span>Next: {group.nextSession.toLocaleDateString()}</span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-secondary to-forest">
                      Join Group
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myGroups.map((group) => (
              <Card key={group.id} className="border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCountryFlag(group.country)}</span>
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <p className="text-sm text-gray-600">{group.memberCount} members</p>
                      </div>
                    </div>
                    <Crown className="h-5 w-5 text-accent" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Video Call
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Recent Members</h4>
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 5).map((member) => (
                        <div
                          key={member.id}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white flex items-center justify-center text-white text-sm"
                          title={member.name}
                        >
                          {member.avatar}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="text-center py-12">
            <Video className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No Live Sessions</h3>
            <p className="text-gray-600 mb-4">Join a study group to participate in live learning sessions</p>
            <Button onClick={() => setSelectedTab("discover")}>Discover Groups</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
