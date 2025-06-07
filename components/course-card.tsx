import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, Video, ImageIcon, Clock, Star, Play, BookOpen } from "lucide-react"

interface CourseCardProps {
  course: {
    id: number
    title: string
    description: string
    progress: number
    language: string
    size: string
    image: string
    type?: "text" | "video" | "infographic"
    culturalContext?: string
    estimatedTime?: string
    difficulty?: "Beginner" | "Intermediate" | "Advanced"
  }
}

export function CourseCard({ course }: CourseCardProps) {
  const getTypeIcon = () => {
    switch (course.type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "infographic":
        return <ImageIcon className="h-4 w-4" />
      case "text":
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = () => {
    switch (course.difficulty) {
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
    <Card className="group overflow-hidden h-full hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 bg-white">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay with play button for videos */}
        {course.type === "video" && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-6 w-6 text-gray-700 ml-1" />
            </div>
          </div>
        )}

        {/* Progress bar */}
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <Progress value={course.progress} className="h-1 rounded-none" />
          </div>
        )}

        {/* Cultural context badge */}
        {course.culturalContext && (
          <Badge variant="secondary" className="absolute top-3 left-3 bg-white/90 text-gray-700 backdrop-blur-sm">
            🌾 {course.culturalContext}
          </Badge>
        )}

        {/* Type indicator */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">{getTypeIcon()}</div>
      </div>

      <CardContent className="p-6 flex-1">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <Badge variant="outline" className="text-xs border-secondary/30 text-secondary">
              {course.language}
            </Badge>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{course.description}</p>

          {/* Course metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {course.estimatedTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{course.estimatedTime}</span>
              </div>
            )}

            {course.difficulty && (
              <Badge variant="outline" className={`text-xs ${getDifficultyColor()}`}>
                {course.difficulty}
              </Badge>
            )}
          </div>

          {/* Progress indicator */}
          {course.progress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-primary">{course.progress}%</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center text-xs text-gray-500">
            {getTypeIcon()}
            <span className="ml-1">{course.size}</span>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <Star className="h-3 w-3 fill-accent text-accent mr-1" />
            <span>4.8</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-primary">
            <Download className="h-4 w-4" />
          </Button>

          <Link href={`/courses/${course.id}`}>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700"
            >
              <BookOpen className="h-3 w-3 mr-1" />
              {course.progress > 0 ? "Continue" : "Start"}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
