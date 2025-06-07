"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Trash2, Play, Pause, CheckCircle, Clock, HardDrive, Wifi, WifiOff } from "lucide-react"
import { useBandwidth } from "@/components/bandwidth-detector"

export default function DownloadsPage() {
  const { connectionSpeed, isOffline } = useBandwidth()
  const [downloadingItems, setDownloadingItems] = useState<number[]>([])

  const downloadedCourses = [
    {
      id: 1,
      title: "The Water Cycle in Tropical Climates",
      size: "300KB",
      downloadDate: "2024-01-15",
      progress: 100,
      type: "infographic",
      language: "Filipino",
      culturalContext: "rice terraces",
    },
    {
      id: 2,
      title: "Introduction to Artificial Intelligence",
      size: "450KB",
      downloadDate: "2024-01-14",
      progress: 100,
      type: "video",
      language: "English",
      culturalContext: "SEA tech startups",
    },
    {
      id: 3,
      title: "Marine Biology of Coral Reefs",
      size: "550KB",
      downloadDate: "2024-01-13",
      progress: 100,
      type: "video",
      language: "English",
      culturalContext: "coral triangle",
    },
  ]

  const availableForDownload = [
    {
      id: 4,
      title: "Blockchain and Cryptocurrency",
      size: "520KB",
      type: "infographic",
      language: "English",
      culturalContext: "SEA crypto adoption",
      estimatedTime: "30 min",
    },
    {
      id: 5,
      title: "Climate Change in Southeast Asia",
      size: "480KB",
      type: "infographic",
      language: "English",
      culturalContext: "regional climate data",
      estimatedTime: "40 min",
    },
    {
      id: 6,
      title: "Sustainable Agriculture Practices",
      size: "360KB",
      type: "video",
      language: "English",
      culturalContext: "sustainable farming",
      estimatedTime: "45 min",
    },
  ]

  const handleDownload = (courseId: number) => {
    setDownloadingItems([...downloadingItems, courseId])
    // Simulate download progress
    setTimeout(() => {
      setDownloadingItems(downloadingItems.filter((id) => id !== courseId))
    }, 3000)
  }

  const handleDelete = (courseId: number) => {
    // Handle delete logic
    console.log("Deleting course:", courseId)
  }

  const getTotalSize = () => {
    return downloadedCourses.reduce((total, course) => {
      const size = Number.parseInt(course.size.replace("KB", ""))
      return total + size
    }, 0)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return "🎥"
      case "infographic":
        return "📊"
      case "text":
        return "📄"
      default:
        return "📚"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row">
        <EnhancedSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-rice-50 to-sky-50">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold font-display mb-2">Downloads</h1>
                <p className="text-gray-600">Manage your offline content for learning anywhere, anytime</p>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant={isOffline ? "destructive" : "secondary"} className="flex items-center gap-1">
                  {isOffline ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
                  {isOffline
                    ? "Offline"
                    : connectionSpeed === "high"
                      ? "High Speed"
                      : connectionSpeed === "medium"
                        ? "Medium Speed"
                        : "Low Speed"}
                </Badge>
              </div>
            </div>

            {/* Storage Overview */}
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-primary" />
                  Storage Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{getTotalSize()}KB</div>
                    <div className="text-sm text-gray-600">Downloaded Content</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">{downloadedCourses.length}</div>
                    <div className="text-sm text-gray-600">Courses Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-forest mb-1">∞</div>
                    <div className="text-sm text-gray-600">Storage Remaining</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Downloads Tabs */}
            <Tabs defaultValue="downloaded" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
                <TabsTrigger value="downloaded">Downloaded ({downloadedCourses.length})</TabsTrigger>
                <TabsTrigger value="available">Available for Download</TabsTrigger>
              </TabsList>

              <TabsContent value="downloaded" className="space-y-4">
                {downloadedCourses.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Download className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">No Downloaded Courses</h3>
                      <p className="text-gray-600 mb-4">Download courses to access them offline</p>
                      <Button>Browse Courses</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {downloadedCourses.map((course) => (
                      <Card
                        key={course.id}
                        className="border-2 border-transparent hover:border-forest/20 transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-3xl">{getTypeIcon(course.type)}</div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span>📦 {course.size}</span>
                                  <span>🌾 {course.culturalContext}</span>
                                  <span>🗓️ Downloaded {course.downloadDate}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-forest/10 text-forest">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Downloaded
                              </Badge>

                              <Button variant="outline" size="sm">
                                <Play className="h-4 w-4 mr-1" />
                                Open
                              </Button>

                              <Button variant="ghost" size="sm" onClick={() => handleDelete(course.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="available" className="space-y-4">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Recommended for Offline Learning</h2>
                  <p className="text-gray-600">
                    These courses are optimized for your connection speed and cultural context
                  </p>
                </div>

                <div className="space-y-4">
                  {availableForDownload.map((course) => (
                    <Card
                      key={course.id}
                      className="border-2 border-transparent hover:border-secondary/20 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">{getTypeIcon(course.type)}</div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>📦 {course.size}</span>
                                <span>🌾 {course.culturalContext}</span>
                                <span>⏱️ {course.estimatedTime}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {downloadingItems.includes(course.id) ? (
                              <div className="flex items-center gap-2">
                                <div className="w-32">
                                  <Progress value={65} className="h-2" />
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Pause className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => handleDownload(course.id)}
                                className="bg-gradient-to-r from-secondary to-forest"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Offline Tips */}
            <Card className="border-2 border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Offline Learning Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">📱 Best for Mobile</h4>
                    <p className="text-sm text-gray-600">
                      Download smaller infographic courses for quick learning on the go
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">🎥 Video Content</h4>
                    <p className="text-sm text-gray-600">
                      Download videos when on WiFi for the best offline experience
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">🌾 Cultural Context</h4>
                    <p className="text-sm text-gray-600">Courses with local examples work great offline</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">📊 Progress Sync</h4>
                    <p className="text-sm text-gray-600">Your progress will sync when you're back online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
