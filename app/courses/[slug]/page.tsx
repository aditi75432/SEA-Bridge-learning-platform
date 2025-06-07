import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QuizComponent } from "@/components/quiz-component"
import { FeedbackBot } from "@/components/feedback-bot"
import { Download, Globe, ThumbsUp, ThumbsDown, HelpCircle } from "lucide-react"
import Image from "next/image"

export default function CourseContentPage({ params }: { params: { slug: string } }) {
  // This would be fetched from an API based on the slug
  const course = {
    title: "The Water Cycle",
    description: "Learn about the natural water cycle and its importance to our ecosystem",
    progress: 45,
    language: "Filipino",
    size: "300KB",
    image: "/placeholder.svg?height=400&width=600",
    content: `
      <h2>The Water Cycle</h2>
      <p>The water cycle, also known as the hydrologic cycle, describes the continuous movement of water on, above, and below the surface of the Earth.</p>
      <p>Water can change states among liquid, vapor, and ice at various places in the water cycle. Although the balance of water on Earth remains fairly constant over time, individual water molecules can come and go.</p>
      <h3>Key Processes</h3>
      <ul>
        <li><strong>Evaporation:</strong> The transformation of water from liquid to gas phases as it moves from the ground or bodies of water into the atmosphere.</li>
        <li><strong>Condensation:</strong> The transformation of water vapor to liquid water droplets in the air, creating clouds and fog.</li>
        <li><strong>Precipitation:</strong> The release of water from clouds in the form of rain, sleet, snow, or hail.</li>
        <li><strong>Collection:</strong> The pooling of water in bodies like oceans, lakes, and rivers.</li>
      </ul>
    `,
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <div className="flex items-center mt-1">
                <Progress value={course.progress} className="w-32 h-2" />
                <span className="ml-2 text-sm text-gray-500">{course.progress}% complete</span>
              </div>
            </div>

            <div className="flex items-center mt-4 md:mt-0 space-x-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                <span>{course.language}</span>
              </Button>

              <Button variant="outline" size="sm" className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                <span>{course.size}</span>
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <div className="relative h-[300px] w-full">
              <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
            </div>

            <div className="p-6">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: course.content }} />
            </div>
          </Card>

          {/* Interactive Quiz Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Test Your Knowledge</h2>
            <QuizComponent
              courseId={1}
              onComplete={(score, total) => {
                console.log(`Quiz completed: ${score}/${total}`)
              }}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Did you understand this lesson?</h2>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <ThumbsUp className="h-5 w-5 mr-2" />
                <span>Yes, I understood</span>
              </Button>

              <Button variant="outline" className="flex items-center">
                <ThumbsDown className="h-5 w-5 mr-2" />
                <span>No, I need help</span>
              </Button>

              <Button variant="outline" className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                <span>I have a question</span>
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Ask a question about this lesson</h2>
            <FeedbackBot />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
