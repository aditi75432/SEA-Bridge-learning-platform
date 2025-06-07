"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, Smartphone, Headphones, Play, Pause, RotateCcw, Maximize } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface ARVRExperience {
  id: string
  title: string
  description: string
  type: "AR" | "VR" | "360"
  culturalSite: string
  subject: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  deviceSupport: ("mobile" | "desktop" | "vr-headset")[]
  thumbnail: string
  modelUrl?: string
  videoUrl?: string
}

export function ARVRLearning() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [selectedExperience, setSelectedExperience] = useState<ARVRExperience | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const experiences: ARVRExperience[] = [
    {
      id: "1",
      title: "Explore Angkor Wat Temple Complex",
      description: "Walk through the ancient Khmer temple and learn about its mathematical proportions",
      type: "VR",
      culturalSite: "Angkor Wat, Cambodia",
      subject: "History & Mathematics",
      duration: "15 min",
      difficulty: "Beginner",
      deviceSupport: ["mobile", "desktop", "vr-headset"],
      thumbnail: "🏛️",
      videoUrl: "/videos/angkor-wat-360.mp4",
    },
    {
      id: "2",
      title: "Banaue Rice Terraces Water Flow",
      description: "See how water flows through the ancient irrigation system in 3D",
      type: "AR",
      culturalSite: "Banaue Rice Terraces, Philippines",
      subject: "Environmental Science",
      duration: "10 min",
      difficulty: "Intermediate",
      deviceSupport: ["mobile", "desktop"],
      thumbnail: "🌾",
      modelUrl: "/models/rice-terraces.glb",
    },
    {
      id: "3",
      title: "Borobudur Temple Geometry",
      description: "Discover the mathematical principles behind this UNESCO World Heritage site",
      type: "AR",
      culturalSite: "Borobudur, Indonesia",
      subject: "Mathematics & Architecture",
      duration: "12 min",
      difficulty: "Advanced",
      deviceSupport: ["mobile", "desktop"],
      thumbnail: "🕌",
      modelUrl: "/models/borobudur.glb",
    },
    {
      id: "4",
      title: "Mekong Delta Ecosystem",
      description: "Explore the biodiversity of Vietnam's Mekong Delta in immersive 360°",
      type: "360",
      culturalSite: "Mekong Delta, Vietnam",
      subject: "Biology & Ecology",
      duration: "18 min",
      difficulty: "Intermediate",
      deviceSupport: ["mobile", "desktop", "vr-headset"],
      thumbnail: "🐟",
      videoUrl: "/videos/mekong-delta-360.mp4",
    },
    {
      id: "5",
      title: "Thai Temple Bell Physics",
      description: "Understand sound waves and resonance through traditional temple bells",
      type: "AR",
      culturalSite: "Wat Pho, Thailand",
      subject: "Physics & Acoustics",
      duration: "8 min",
      difficulty: "Beginner",
      deviceSupport: ["mobile", "desktop"],
      thumbnail: "🔔",
      modelUrl: "/models/temple-bell.glb",
    },
  ]

  const filteredExperiences = experiences.filter((exp) => {
    // Filter by cultural relevance
    const culturalMatch = profile?.country ? exp.culturalSite.toLowerCase().includes(profile.country.toLowerCase()) : false
    return culturalMatch || exp.type === "VR" // VR experiences are universal
  })

  const startExperience = async (experience: ARVRExperience) => {
    setSelectedExperience(experience)
    setIsLoading(true)
    setProgress(0)

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsPlaying(true)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsPlaying(false)
          return 100
        }
        return prev + 1
      })
    }, 100)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const resetExperience = () => {
    setProgress(0)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "mobile":
        return <Smartphone className="h-3 w-3" />
      case "desktop":
        return <Eye className="h-3 w-3" />
      case "vr-headset":
        return <Headphones className="h-3 w-3" />
      default:
        return <Eye className="h-3 w-3" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-display mb-4">
          AR/VR{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Cultural Experiences
          </span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Immerse yourself in Southeast Asian heritage sites and learn through cutting-edge technology
        </p>
      </div>

      {selectedExperience ? (
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{selectedExperience.thumbnail}</div>
                <div>
                  <CardTitle className="text-xl">{selectedExperience.title}</CardTitle>
                  <p className="text-gray-600">{selectedExperience.culturalSite}</p>
                </div>
              </div>
              <Button variant="ghost" onClick={() => setSelectedExperience(null)}>
                ×
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading immersive experience...</p>
                <Progress value={progress} className="w-64 mx-auto mt-4" />
              </div>
            ) : (
              <>
                {/* Experience Viewer */}
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                  {selectedExperience.type === "VR" || selectedExperience.type === "360" ? (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster="/placeholder.svg?height=400&width=600"
                      controls={false}
                    >
                      <source src={selectedExperience.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <canvas
                      ref={canvasRef}
                      className="w-full h-full"
                      style={{ background: "linear-gradient(45deg, #1e3a8a, #3b82f6)" }}
                    />
                  )}

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <Progress value={progress} className="h-2 bg-white/20" />
                  </div>

                  {/* Experience Type Badge */}
                  <Badge className="absolute top-4 left-4 bg-primary">{selectedExperience.type} Experience</Badge>

                  {/* Fullscreen Button */}
                  <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/20">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>

                {/* Experience Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">About This Experience</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedExperience.description}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-gray-500" />
                        <span>{selectedExperience.duration}</span>
                      </div>
                      <Badge variant="outline" className={getDifficultyColor(selectedExperience.difficulty)}>
                        {selectedExperience.difficulty}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Compatible Devices</h4>
                      <div className="flex gap-2">
                        {selectedExperience.deviceSupport.map((device) => (
                          <Badge key={device} variant="secondary" className="flex items-center gap-1">
                            {getDeviceIcon(device)}
                            {device.replace("-", " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Learning Objectives</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Understand the cultural significance of {selectedExperience.culturalSite}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Apply {selectedExperience.subject.toLowerCase()} concepts in real-world context</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Experience immersive learning through {selectedExperience.type} technology</span>
                      </li>
                    </ul>

                    <div className="flex gap-2">
                      <Button onClick={resetExperience} variant="outline" className="flex-1">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">Take Quiz</Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((experience, index) => (
            <Card
              key={experience.id}
              className="border-2 border-transparent hover:border-secondary/20 transition-all duration-300 hover:shadow-medium cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => startExperience(experience)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{experience.thumbnail}</div>
                    <div>
                      <CardTitle className="text-lg leading-tight">{experience.title}</CardTitle>
                      <p className="text-sm text-gray-600">{experience.culturalSite}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary">
                    {experience.type}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">{experience.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span>{experience.duration}</span>
                  </div>
                  <Badge variant="outline" className={getDifficultyColor(experience.difficulty)}>
                    {experience.difficulty}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Device Support</h4>
                  <div className="flex gap-1">
                    {experience.deviceSupport.map((device) => (
                      <Badge key={device} variant="secondary" className="text-xs flex items-center gap-1">
                        {getDeviceIcon(device)}
                        {device === "vr-headset" ? "VR" : device}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-secondary to-forest">
                  <Play className="h-4 w-4 mr-2" />
                  Start Experience
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Device Requirements Info */}
      <Card className="border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-accent" />
            Device Requirements & Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile AR
              </h4>
              <p className="text-sm text-gray-600">
                Use your phone's camera for augmented reality experiences. Works best in good lighting.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Desktop VR
              </h4>
              <p className="text-sm text-gray-600">
                Experience 360° content on your computer. Use headphones for immersive audio.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                VR Headset
              </h4>
              <p className="text-sm text-gray-600">
                Full immersion with compatible VR headsets. Check device compatibility first.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
