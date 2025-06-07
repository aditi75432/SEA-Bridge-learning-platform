"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Trophy, Star, CheckCircle, XCircle, RotateCcw, Zap, Target, Award, Brain, RefreshCw } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { useAzureTranslate } from "./azure-translate-provider"
import { useToast } from "@/hooks/use-toast"
import { VoiceFeedback } from "./voice-feedback"
import type { GeneratedQuestion } from "@/lib/quiz-generator"

interface QuizComponentProps {
  courseId: number
  onComplete?: (score: number, totalQuestions: number) => void
}

export function QuizComponent({ courseId, onComplete }: QuizComponentProps) {
  const { currentLanguage } = useLanguage()
  const { profile, getCulturalEncouragement } = useCulturalContext()
  const { translateText } = useAzureTranslate()
  const { toast } = useToast()

  const [questions, setQuestions] = useState<GeneratedQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [formalityTone, setFormalityTone] = useState<"formal" | "informal">("informal")
  const [userPerformance, setUserPerformance] = useState({ correct: 0, total: 0 })

  useEffect(() => {
    fetchQuestions()
  }, [courseId])

  useEffect(() => {
    setFormalityTone(profile.formalityPreference as "formal" | "informal")
  }, [profile.formalityPreference])

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      // Determine topic based on course
      const topicId = courseId === 1 ? "water-cycle" : courseId === 2 ? "sea-history" : "sea-culture"

      const response = await fetch(
        `/api/quiz/questions?courseId=${courseId}&topicId=${topicId}&difficulty=beginner&count=5&culturalContext=${profile.country?.toLowerCase()}`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch questions")
      }

      const data = await response.json()

      // Translate questions if not in English
      if (currentLanguage.code !== "en") {
        try {
          const translatedQuestions = await Promise.all(
            data.map(async (question: GeneratedQuestion) => ({
              ...question,
              questionText: await translateText(question.questionText),
              options: await Promise.all(question.options.map((option) => translateText(option))),
              explanation: await translateText(question.explanation),
            })),
          )
          setQuestions(translatedQuestions)
        } catch (translationError) {
          console.error("Translation error:", translationError)
          setQuestions(data) // Use original questions if translation fails
        }
      } else {
        setQuestions(data)
      }
    } catch (error) {
      console.error("Error fetching questions:", error)
      toast({
        title: "Error loading quiz",
        description: "Unable to load quiz questions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateAdaptiveQuestions = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/quiz/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          userPerformance,
          culturalBackground: profile.country,
          preferredLanguage: currentLanguage.code,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate adaptive questions")
      }

      const adaptiveQuestions = await response.json()
      setQuestions(adaptiveQuestions)

      toast({
        title: "Quiz Updated!",
        description: "Questions have been adapted to your performance level.",
      })
    } catch (error) {
      console.error("Error generating adaptive questions:", error)
      toast({
        title: "Error",
        description: "Failed to generate adaptive questions.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getFeedback = async (type: "correct" | "incorrect" | "encouragement" | "excellent") => {
    try {
      const response = await fetch(`/api/feedback/${currentLanguage.code}/${type}`)
      const data = await response.json()
      return data.message
    } catch (error) {
      console.error("Error fetching feedback:", error)
      return type === "correct" ? "Correct!" : "Try again!"
    }
  }

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer) return

    const currentQuestion = questions[currentQuestionIndex]
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)

    // Update performance tracking
    setUserPerformance((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }))

    let feedbackMessage = ""

    if (correct) {
      setScore(score + 1)
      setStreak(streak + 1)
      setMaxStreak(Math.max(maxStreak, streak + 1))

      if (streak >= 2) {
        feedbackMessage = await getFeedback("excellent")
        feedbackMessage += ` ${getCulturalEncouragement()}`
      } else {
        feedbackMessage = await getFeedback("correct")
      }

      // Add cultural encouragement for formal tone
      if (formalityTone === "formal" && currentLanguage.code === "fil") {
        feedbackMessage += " Salamat sa inyong sipag!"
      } else if (formalityTone === "formal" && currentLanguage.code === "vi") {
        feedbackMessage += " Cảm ơn sự chăm chỉ của bạn!"
      }
    } else {
      setStreak(0)
      feedbackMessage = await getFeedback("incorrect")
      feedbackMessage += ` ${await getFeedback("encouragement")}`
    }

    // Add explanation
    if (currentQuestion.explanation) {
      feedbackMessage += `\n\n${currentQuestion.explanation}`
    }

    setFeedback(feedbackMessage)
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setShowFeedback(false)
    } else {
      setQuizCompleted(true)
      onComplete?.(score, questions.length)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setScore(0)
    setShowFeedback(false)
    setQuizCompleted(false)
    setStreak(0)
    setMaxStreak(0)
    setUserPerformance({ correct: 0, total: 0 })
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "text-forest"
    if (percentage >= 60) return "text-accent"
    return "text-primary"
  }

  const getScoreEmoji = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return "🏆"
    if (percentage >= 80) return "🌟"
    if (percentage >= 70) return "👏"
    if (percentage >= 60) return "👍"
    return "💪"
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Generating personalized quiz questions...</p>
        </CardContent>
      </Card>
    )
  }

  if (questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center space-y-4">
          <p>No quiz questions available for this course.</p>
          <Button onClick={fetchQuestions} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <Card className="w-full max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{getScoreEmoji()}</div>
          <CardTitle className="text-2xl font-bold">Quiz Completed!</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{questions.length}
            </div>
            <div className="text-lg text-gray-600">{percentage}% Score</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <Zap className="h-6 w-6 mx-auto mb-2 text-accent" />
              <div className="font-bold text-lg">{maxStreak}</div>
              <div className="text-sm text-gray-600">Best Streak</div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg border">
              <Target className="h-6 w-6 mx-auto mb-2 text-secondary" />
              <div className="font-bold text-lg">{percentage >= 70 ? "Passed" : "Try Again"}</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
          </div>

          {percentage >= 80 && (
            <div className="text-center p-4 bg-forest/10 rounded-lg border border-forest/20">
              <Award className="h-8 w-8 mx-auto mb-2 text-forest" />
              <div className="font-bold text-forest">Achievement Unlocked!</div>
              <div className="text-sm text-forest/80">Quiz Master - Scored 80% or higher</div>
            </div>
          )}

          <div className="flex gap-4">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Try Again
            </Button>

            <Button onClick={generateAdaptiveQuestions} variant="outline" className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Adaptive Quiz
            </Button>

            <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
              <Trophy className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-primary/20 text-primary">
            <Brain className="h-3 w-3 mr-1" />
            Question {currentQuestionIndex + 1} of {questions.length}
          </Badge>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-accent" />
              <span className="font-bold">{score}</span>
            </div>

            {streak > 0 && (
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-accent" />
                <span className="font-bold text-accent">{streak}</span>
              </div>
            )}

            <Button onClick={generateAdaptiveQuestions} variant="ghost" size="sm" className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" />
              Adapt
            </Button>
          </div>
        </div>

        <Progress value={progress} className="h-2 mb-4" />

        <CardTitle className="text-xl leading-relaxed">{currentQuestion.questionText}</CardTitle>

        {currentQuestion.culturalContext && (
          <div className="flex gap-2">
            <Badge variant="secondary" className="w-fit bg-secondary/10 text-secondary">
              🌾 {currentQuestion.culturalContext}
            </Badge>
            <Badge variant="outline" className="w-fit">
              📚 {currentQuestion.topic}
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {!showFeedback ? (
          <>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="w-full bg-gradient-to-r from-primary to-secondary"
            >
              Submit Answer
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border-2 ${
                isCorrect ? "border-forest bg-forest/10" : "border-primary bg-primary/10"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-forest" />
                ) : (
                  <XCircle className="h-5 w-5 text-primary" />
                )}
                <span className="font-bold">{isCorrect ? "Correct!" : "Incorrect"}</span>
              </div>

              <p className="text-sm leading-relaxed whitespace-pre-line mb-3">{feedback}</p>

              <VoiceFeedback text={feedback} autoPlay={true} className="justify-start" />
            </div>

            <Button onClick={handleNextQuestion} className="w-full bg-gradient-to-r from-secondary to-forest">
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Quiz"}
            </Button>
          </div>
        )}

        {/* Formality Toggle */}
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-gray-600">Feedback Tone:</span>
          <div className="flex gap-2">
            <Button
              variant={formalityTone === "informal" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormalityTone("informal")}
            >
              Casual
            </Button>
            <Button
              variant={formalityTone === "formal" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormalityTone("formal")}
            >
              Formal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
