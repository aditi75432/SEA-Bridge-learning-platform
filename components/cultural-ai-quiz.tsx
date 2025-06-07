"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Trophy,
  Star,
  CheckCircle,
  XCircle,
  RotateCcw,
  Zap,
  Target,
  Award,
  Brain,
  RefreshCw,
  Lightbulb,
  Volume2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { VoiceFeedback } from "./voice-feedback"

interface CulturalAIQuizProps {
  topic: string
  culturalProfile: any
  onComplete?: (score: number, totalQuestions: number) => void
}

export function CulturalAIQuiz({ topic, culturalProfile, onComplete }: CulturalAIQuizProps) {
  const { toast } = useToast()
  const [quizData, setQuizData] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [shortAnswer, setShortAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    generateQuiz()
  }, [topic, culturalProfile])

  const generateQuiz = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/cultural-quiz/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          language: culturalProfile.language,
          region: culturalProfile.region,
          tone: culturalProfile.tone,
          difficulty: "beginner",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate quiz")
      }

      const data = await response.json()
      setQuizData(data)
    } catch (error) {
      console.error("Error generating quiz:", error)
      toast({
        title: "Error",
        description:
          culturalProfile.language === "ceb"
            ? "Dili makahimo og pagsulay. Sulayi pag-usab."
            : "Hindi makagawa ng pagsusulit. Subukan muli.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer && !shortAnswer) return

    const currentQuestion = quizData.quiz[currentQuestionIndex]
    let correct = false

    if (currentQuestion.type === "mcq") {
      correct = selectedAnswer === currentQuestion.correct_answer
    } else {
      // For short answer, we'll use a simple keyword matching for now
      // In production, you'd use Azure OpenAI to evaluate the answer
      correct = shortAnswer.toLowerCase().includes(currentQuestion.ideal_answer.toLowerCase().split(" ")[0])
    }

    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
      setStreak(streak + 1)
      setMaxStreak(Math.max(maxStreak, streak + 1))
      setFeedback(currentQuestion.feedback?.correct || quizData.ui_strings?.correct || "Correct!")
    } else {
      setStreak(0)
      setFeedback(currentQuestion.feedback?.incorrect || quizData.ui_strings?.incorrect || "Incorrect.")
    }

    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setShortAnswer("")
      setShowFeedback(false)
      setShowHint(false)
    } else {
      setQuizCompleted(true)
      onComplete?.(score, quizData.quiz.length)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShortAnswer("")
    setScore(0)
    setShowFeedback(false)
    setQuizCompleted(false)
    setStreak(0)
    setMaxStreak(0)
    setShowHint(false)
  }

  const getScoreColor = () => {
    const percentage = (score / quizData.quiz.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreEmoji = () => {
    const percentage = (score / quizData.quiz.length) * 100
    if (percentage >= 90) return "🏆"
    if (percentage >= 80) return "🌟"
    if (percentage >= 70) return "👏"
    if (percentage >= 60) return "👍"
    return "💪"
  }

  const getEncouragementMessage = () => {
    if (culturalProfile.language === "ceb") {
      return culturalProfile.tone === "formal"
        ? "Maayo kaayo ang inyong pagkat-on! Padayon lang po!"
        : "Maayo kaayo! Padayon lang!"
    } else if (culturalProfile.language === "fil") {
      return culturalProfile.tone === "formal" ? "Napakagaling ninyo po! Magpatuloy lang!" : "Napakagaling! Tuloy lang!"
    }
    return "Great job! Keep it up!"
  }

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>{culturalProfile.language === "ceb" ? "Naghimo og pagsulay..." : "Gumagawa ng pagsusulit..."}</p>
        </CardContent>
      </Card>
    )
  }

  if (!quizData) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
        <CardContent className="p-8 text-center space-y-4">
          <p>{culturalProfile.language === "ceb" ? "Walay pagsulay nga makuha." : "Walang pagsusulit na makuha."}</p>
          <Button onClick={generateQuiz} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            {culturalProfile.language === "ceb" ? "Sulayi Pag-usab" : "Subukan Muli"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quizData.quiz.length) * 100)

    return (
      <Card className="w-full max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{getScoreEmoji()}</div>
          <CardTitle className="text-2xl font-bold">
            {culturalProfile.language === "ceb" ? "Nahuman ang Pagsulay!" : "Natapos ang Pagsusulit!"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{quizData.quiz.length}
            </div>
            <div className="text-lg text-gray-600">{percentage}% Score</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border text-black">
              <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="font-bold text-lg text-black">{maxStreak}</div>
              <div className="text-sm text-black">
                {culturalProfile.language === "ceb" ? "Labing Taas nga Streak" : "Pinakamataas na Streak"}
              </div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg border">
              <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="font-bold text-lg">
                {percentage >= 70
                  ? culturalProfile.language === "ceb"
                    ? "Nakapasar"
                    : "Nakapasa"
                  : culturalProfile.language === "ceb"
                    ? "Sulayi Pag-usab"
                    : "Subukan Muli"}
              </div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
          </div>

          {percentage >= 80 && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Award className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="font-bold text-green-700">
                {culturalProfile.language === "ceb" ? "Nakakuha og Achievement!" : "Nakakuha ng Achievement!"}
              </div>
              <div className="text-sm text-green-600">
                {culturalProfile.language === "ceb" ? "Quiz Master - 80% o mas taas" : "Quiz Master - 80% o mas mataas"}
              </div>
            </div>
          )}

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-700 mb-2">{getEncouragementMessage()}</p>
            <VoiceFeedback text={getEncouragementMessage()} autoPlay={false} className="justify-center" />
          </div>

          <div className="flex gap-4">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              {culturalProfile.language === "ceb" ? "Sulayi Pag-usab" : "Subukan Muli"}
            </Button>

            <Button onClick={generateQuiz} variant="outline" className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              {culturalProfile.language === "ceb" ? "Bag-ong Pagsulay" : "Bagong Pagsusulit"}
            </Button>

            <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
              <Trophy className="h-4 w-4 mr-2" />
              {culturalProfile.language === "ceb" ? "Padayon sa Pagkat-on" : "Magpatuloy sa Pag-aaral"}
            </Button>
          </div>

          {/* Student Feedback */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">
              {quizData.feedback_prompts?.ask_for_feedback ||
                (culturalProfile.language === "ceb"
                  ? "Unsa ang inyong ikasulti sa pagsulay karon?"
                  : "Ano ang masasabi ninyo sa pagsusulit na ito?")}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline">
                {culturalProfile.language === "ceb" ? "Sayon ra!" : "Madali lang!"}
              </Button>
              <Button size="sm" variant="outline">
                {culturalProfile.language === "ceb" ? "Medyo lisod" : "Medyo mahirap"}
              </Button>
              <Button size="sm" variant="outline">
                {culturalProfile.language === "ceb" ? "Gusto pa nako" : "Gusto ko pa"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = quizData.quiz[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizData.quiz.length) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-primary/20 text-primary">
            <Brain className="h-3 w-3 mr-1" />
            {culturalProfile.language === "ceb" ? "Pangutana" : "Tanong"} {currentQuestionIndex + 1}{" "}
            {culturalProfile.language === "ceb" ? "sa" : "ng"} {quizData.quiz.length}
          </Badge>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-bold">{score}</span>
            </div>

            {streak > 0 && (
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="font-bold text-orange-500">{streak}</span>
              </div>
            )}

            <Button onClick={() => setShowHint(!showHint)} variant="ghost" size="sm" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              {quizData.ui_strings?.hint || "Hint"}
            </Button>
          </div>
        </div>

        <Progress value={progress} className="h-2 mb-4" />

        <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>

        {showHint && currentQuestion.hint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">{currentQuestion.hint}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-2">
          <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-700">
            🌍 {culturalProfile.region}
          </Badge>
          <Badge variant="outline" className="w-fit">
            📚 {topic}
          </Badge>
          <Badge variant="outline" className="w-fit">
            🗣️ {culturalProfile.language}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!showFeedback ? (
          <>
            {currentQuestion.type === "mcq" ? (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {currentQuestion.options.map((option: string, index: number) => (
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
            ) : (
              <div className="space-y-2">
                <Label htmlFor="short-answer" className="text-sm font-medium">
                  {culturalProfile.language === "ceb" ? "Isulat ang inyong tubag:" : "Isulat ang inyong sagot:"}
                </Label>
                <Textarea
                  id="short-answer"
                  value={shortAnswer}
                  onChange={(e) => setShortAnswer(e.target.value)}
                  placeholder={culturalProfile.language === "ceb" ? "Isulat dinhi..." : "Isulat dito..."}
                  className="min-h-[100px]"
                />
                {currentQuestion.hints && <p className="text-xs text-gray-500">{currentQuestion.hints}</p>}
              </div>
            )}

            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer && !shortAnswer}
              className="w-full bg-gradient-to-r from-primary to-secondary"
            >
              {quizData.ui_strings?.submit || "Submit"}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border-2 ${
                isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-bold">
                  {isCorrect
                    ? quizData.ui_strings?.correct || "Correct!"
                    : quizData.ui_strings?.incorrect || "Incorrect"}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-3">{feedback}</p>

              <div className="flex items-center gap-2">
                <VoiceFeedback text={feedback} autoPlay={true} className="justify-start" />
                <Button size="sm" variant="ghost" onClick={() => setShowHint(!showHint)}>
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleNextQuestion} className="w-full bg-gradient-to-r from-secondary to-green-500">
              {currentQuestionIndex < quizData.quiz.length - 1
                ? quizData.ui_strings?.next_question || "Next Question"
                : quizData.ui_strings?.end_quiz || "Complete Quiz"}
            </Button>
          </div>
        )}

        {/* Cultural Context Footer */}
        <div className="border-t pt-4 text-center">
          <p className="text-xs text-gray-500 mb-2 ">
            {culturalProfile.language === "ceb"
              ? "Kini nga pagsulay gi-adapt para sa kultura sa Bisaya"
              : "Ang pagsusulit na ito ay naka-adapt para sa Filipino na kultura"}
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-xs bg-white text-black px-2 py-1 rounded text-black">
              {culturalProfile.tone === "formal" ? "Formal" : "Casual"} tone
            </span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-black">AI Generated</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-black">Azure Powered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
