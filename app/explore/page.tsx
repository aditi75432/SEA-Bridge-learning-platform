"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EnhancedSidebar } from "@/components/enhanced-sidebar"
import { CourseCard } from "@/components/course-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, TrendingUp, Globe, Zap, BookOpen, Beaker, Cpu, Leaf, Atom } from "lucide-react"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const categories = [
    { id: "all", name: "All Subjects", icon: BookOpen, count: 45 },
    { id: "technology", name: "Technology", icon: Cpu, count: 15 },
    { id: "science", name: "Science", icon: Beaker, count: 12 },
    { id: "environment", name: "Environment", icon: Leaf, count: 8 },
    { id: "physics", name: "Physics", icon: Atom, count: 10 },
  ]

  const allCourses = [
    // Technology Courses
    {
      id: 1,
      title: "Introduction to Artificial Intelligence",
      description: "Learn AI basics through Southeast Asian innovations and applications",
      progress: 0,
      language: "English",
      size: "450KB",
      type: "video" as const,
      image: "/c1.png",
      culturalContext: "SEA tech startups",
      estimatedTime: "35 min",
      difficulty: "Beginner" as const,
      category: "technology",
      rating: 4.8,
      students: 15420,
    },
    {
      id: 2,
      title: "Mobile App Development with Flutter",
      description: "Build apps for Southeast Asian markets using local examples",
      progress: 0,
      language: "English",
      size: "680KB",
      type: "video" as const,
      image: "/c2.png",
      culturalContext: "local mobile apps",
      estimatedTime: "45 min",
      difficulty: "Intermediate" as const,
      category: "technology",
      rating: 4.9,
      students: 12350,
    },
    {
      id: 3,
      title: "Blockchain and Cryptocurrency",
      description: "Understanding digital currencies through regional case studies",
      progress: 0,
      language: "English",
      size: "520KB",
      type: "infographic" as const,
      image: "/c3.png",
      culturalContext: "SEA crypto adoption",
      estimatedTime: "30 min",
      difficulty: "Advanced" as const,
      category: "technology",
      rating: 4.7,
      students: 8920,
    },
    {
      id: 4,
      title: "Internet of Things (IoT) in Smart Cities",
      description: "Explore IoT applications in Singapore, Jakarta, and Manila",
      progress: 0,
      language: "English",
      size: "390KB",
      type: "video" as const,
      image: "/c4.png",
      culturalContext: "smart city projects",
      estimatedTime: "40 min",
      difficulty: "Intermediate" as const,
      category: "technology",
      rating: 4.6,
      students: 7650,
    },
    // Science Courses
    {
      id: 5,
      title: "The Water Cycle in Tropical Climates",
      description: "Learn about water circulation through rice terraces and monsoons",
      progress: 45,
      language: "Filipino",
      size: "300KB",
      type: "infographic" as const,
      image: "/c5.png",
      culturalContext: "rice terraces",
      estimatedTime: "25 min",
      difficulty: "Beginner" as const,
      category: "science",
      rating: 4.9,
      students: 23450,
    },
    {
      id: 6,
      title: "Marine Biology of Coral Reefs",
      description: "Discover the biodiversity of Southeast Asian coral ecosystems",
      progress: 0,
      language: "English",
      size: "550KB",
      type: "video" as const,
      image: "/c6.png",
      culturalContext: "coral triangle",
      estimatedTime: "50 min",
      difficulty: "Intermediate" as const,
      category: "science",
      rating: 4.8,
      students: 18920,
    },
    {
      id: 7,
      title: "Genetics and Traditional Medicine",
      description: "Explore how genetics explains traditional herbal remedies",
      progress: 0,
      language: "English",
      size: "420KB",
      type: "text" as const,
      image: "/c7.png",
      culturalContext: "traditional medicine",
      estimatedTime: "35 min",
      difficulty: "Advanced" as const,
      category: "science",
      rating: 4.7,
      students: 11230,
    },
    // Environment Courses
    {
      id: 8,
      title: "Climate Change in Southeast Asia",
      description: "Understanding regional climate impacts and adaptation strategies",
      progress: 0,
      language: "English",
      size: "480KB",
      type: "infographic" as const,
      image: "/c8.png",
      culturalContext: "regional climate data",
      estimatedTime: "40 min",
      difficulty: "Intermediate" as const,
      category: "environment",
      rating: 4.8,
      students: 16780,
    },
    {
      id: 9,
      title: "Sustainable Agriculture Practices",
      description: "Learn eco-friendly farming from traditional and modern methods",
      progress: 0,
      language: "English",
      size: "360KB",
      type: "video" as const,
      image: "/c1.png",
      culturalContext: "sustainable farming",
      estimatedTime: "45 min",
      difficulty: "Beginner" as const,
      category: "environment",
      rating: 4.9,
      students: 14560,
    },
    // Physics Courses
    {
      id: 10,
      title: "Renewable Energy Physics",
      description: "Physics behind solar, wind, and hydroelectric power in SEA",
      progress: 0,
      language: "English",
      size: "510KB",
      type: "video" as const,
      image: "/c2.png",
      culturalContext: "renewable energy projects",
      estimatedTime: "55 min",
      difficulty: "Advanced" as const,
      category: "physics",
      rating: 4.7,
      students: 9840,
    },
  ]

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const trendingCourses = allCourses.filter((course) => course.students > 15000).slice(0, 3)
  const newCourses = allCourses.slice(0, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row">
        <EnhancedSidebar />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-br from-rice-50 to-sky-50">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-display mb-4">
                Explore{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Amazing Courses
                </span>
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover cutting-edge technology and science courses designed specifically for Southeast Asian learners
              </p>
            </div>

            {/* Search and Filters */}
            <Card className="border-2 border-transparent hover:border-primary/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search courses, topics, or technologies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="flex gap-4">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-colors"
                    >
                      <option value="all">All Categories</option>
                      <option value="technology">Technology</option>
                      <option value="science">Science</option>
                      <option value="environment">Environment</option>
                      <option value="physics">Physics</option>
                    </select>

                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-ocean-500 transition-colors"
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1 ${
                      selectedCategory === category.id
                        ? "border-2 border-primary bg-primary/5"
                        : "border-2 border-transparent hover:border-primary/20"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon
                        className={`h-8 w-8 mx-auto mb-2 ${
                          selectedCategory === category.id ? "text-primary" : "text-gray-500"
                        }`}
                      />
                      <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {category.count} courses
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Course Sections */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
                <TabsTrigger value="all">All Courses</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="new">New Releases</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {filteredCourses.length} Course{filteredCourses.length !== 1 ? "s" : ""} Found
                  </h2>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Sort by popularity</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-bold">Trending Courses</h2>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Hot 🔥
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingCourses.map((course, index) => (
                    <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="new" className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5 text-secondary" />
                  <h2 className="text-2xl font-bold">New Releases</h2>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                    Fresh ✨
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newCourses.map((course, index) => (
                    <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Featured Technology Section */}
            <Card className="border-2 border-secondary/20 bg-gradient-to-r from-secondary/5 to-forest/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-6 w-6 text-secondary" />
                  Featured: Technology in Southeast Asia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Explore how technology is transforming Southeast Asia, from fintech innovations in Singapore to
                  e-commerce solutions in Indonesia. Learn from real-world applications and case studies.
                </p>
                <Button className="bg-gradient-to-r from-secondary to-forest">
                  <Globe className="h-4 w-4 mr-2" />
                  Explore Tech Courses
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
