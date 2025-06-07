"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { useCulturalTheme } from "./cultural-theme-provider"
import { azureOpenAI } from "@/lib/azure-ai-services"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"
import { VoiceFeedback } from "./voice-feedback"

interface CulturalFeedbackSystemProps {
  userAnswer?: string
  correctAnswer?: string
  isCorrect?: boolean
  feedbackType?: "quiz" | "exercise" | "general" | "encouragement"
  autoGenerate?: boolean
  className?: string
}

export function CulturalFeedbackSystem({
  userAnswer = "",
  correctAnswer = "",
  isCorrect = true,
  feedbackType = "general",
  autoGenerate = false,
  className = "",
}: CulturalFeedbackSystemProps) {
  const { currentLanguage } = useLanguage()
  const { profile, getCulturalEncouragement } = useCulturalContext()
  const { theme } = useCulturalTheme()
  const [feedback, setFeedback] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [feedbackRating, setFeedbackRating] = useState<"helpful" | "unhelpful" | null>(null)

  // Generate culturally appropriate feedback
  const generateFeedback = async () => {
    setIsGenerating(true)
    setError(null)
    setFeedbackRating(null)

    try {
      let generatedFeedback = ""

      if (feedbackType === "quiz" && userAnswer && correctAnswer) {
        // Generate personalized feedback for quiz answers
        generatedFeedback = await azureOpenAI.generatePersonalizedFeedback(userAnswer, correctAnswer, {
          country: profile.country,
          formalityPreference: profile.formalityPreference,
          culturalElements: profile.culturalElements,
        })
      } else {
        // Generate general encouragement or feedback
        const culturalEncouragement = getCulturalEncouragement()

        if (isCorrect) {
          generatedFeedback = `${culturalEncouragement} ${getPositiveFeedback()}`
        } else {
          generatedFeedback = `${getEncouragingFeedback()} ${culturalEncouragement}`
        }
      }

      setFeedback(generatedFeedback)
    } catch (err) {
      console.error("Error generating feedback:", err)
      setError("Failed to generate feedback.")

      // Fallback to basic feedback
      if (isCorrect) {
        setFeedback("Correct! Good job.")
      } else {
        setFeedback("Not quite right. Keep trying!")
      }
    } finally {
      setIsGenerating(false)
    }
  }

  // Get culturally appropriate positive feedback
  const getPositiveFeedback = () => {
    const feedbackByLanguage: Record<string, string[]> = {
      fil: ["Magaling!", "Tama!", "Ang galing mo!", "Napakahusay!"],
      vi: ["Tốt lắm!", "Đúng rồi!", "Giỏi quá!", "Xuất sắc!"],
      th: ["เก่งมาก!", "ถูกต้อง!", "ดีมาก!", "ยอดเยี่ยม!"],
      id: ["Bagus sekali!", "Benar!", "Hebat!", "Pintar!"],
      km: ["ល្អណាស់!", "ត្រឹមត្រូវ!", "ពូកែមែន!", "អស្ចារ្យណាស់!"],
      my: ["အရမ်းကောင်းတယ်!", "မှန်တယ်!", "တော်တယ်!", "အံ့ဩစရာပဲ!"],
      lo: ["ດີຫຼາຍ!", "ຖືກຕ້ອງ!", "ເກັ່ງຫຼາຍ!", "ດີເລີດ!"],
      ms: ["Bagus!", "Betul!", "Pandai!", "Hebat!"],
      tl: ["Di'ak!", "Loos!", "Matenek!", "Diak loos!"],
    }

    const defaultFeedback = ["Great job!", "Correct!", "Well done!", "Excellent!"]
    const feedbackOptions = feedbackByLanguage[currentLanguage.code] || defaultFeedback

    return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]
  }

  // Get culturally appropriate encouraging feedback
  const getEncouragingFeedback = () => {
    const feedbackByLanguage: Record<string, string[]> = {
      fil: ["Subukan mo ulit!", "Hindi bale, kaya mo yan!", "Konting practice pa!", "Malapit na!"],
      vi: ["Hãy thử lại!", "Không sao, bạn có thể làm được!", "Cần thêm luyện tập!", "Gần đúng rồi!"],
      th: ["ลองอีกครั้ง!", "ไม่เป็นไร คุณทำได้!", "ฝึกฝนอีกนิด!", "เกือบถูกแล้ว!"],
      id: ["Coba lagi!", "Tidak apa-apa, kamu bisa!", "Perlu latihan lagi!", "Hampir benar!"],
      km: ["សាកល្បងម្តងទៀត!", "មិនអីទេ អ្នកអាចធ្វើបាន!", "ត្រូវការការអនុវត្តបន្ថែម!", "ជិតត្រូវហើយ!"],
      my: ["နောက်တစ်ခါ ကြိုးစားကြည့်ပါ!", "ရပါတယ်၊ သင်လုပ်နိုင်ပါတယ်!", "လေ့ကျင့်မှုပိုလိုအပ်သေးတယ်!", "နီးစပ်လာပြီ!"],
      lo: ["ລອງອີກຄັ້ງ!", "ບໍ່ເປັນຫຍັງ, ເຈົ້າເຮັດໄດ້!", "ຕ້ອງການຝຶກຝົນຕື່ມ!", "ເກືອບຖືກແລ້ວ!"],
      ms: ["Cuba lagi!", "Tak apa, anda boleh!", "Perlu lebih banyak latihan!", "Hampir betul!"],
      tl: ["Koko fali!", "La buat, o bele!", "Presiza pratika tan!", "Besik loos ona!"],
    }

    const defaultFeedback = ["Try again!", "No worries, you can do it!", "Need more practice!", "Almost there!"]
    const feedbackOptions = feedbackByLanguage[currentLanguage.code] || defaultFeedback

    return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]
  }

  // Auto-generate feedback when component mounts if autoGenerate is true
  useEffect(() => {
    if (autoGenerate) {
      generateFeedback()
    }
  }, [autoGenerate, userAnswer, correctAnswer, isCorrect, currentLanguage.code])

  // Handle feedback rating
  const handleFeedbackRating = (rating: "helpful" | "unhelpful") => {
    setFeedbackRating(rating)
    // Here you could send this rating to your analytics or feedback improvement system
  }

  return (
    <div className={className}>
      {!autoGenerate && !feedback && (
        <Button
          onClick={generateFeedback}
          disabled={isGenerating}
          className="bg-gradient-to-r from-primary to-secondary text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Feedback...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Get Feedback
            </>
          )}
        </Button>
      )}

      {isGenerating && (
        <Card className="w-full">
          <CardContent className="p-4 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <p>Generating culturally appropriate feedback...</p>
          </CardContent>
        </Card>
      )}

      {error && <div className="text-error text-sm mt-2">{error}</div>}

      {feedback && !isGenerating && (
        <Card
          className="w-full"
          style={{
            borderColor: isCorrect ? theme.colors.accent : "inherit",
            borderWidth: isCorrect ? "2px" : "1px",
          }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" style={{ color: theme.colors.accent }} />
              Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="prose">
              <p>{feedback}</p>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <VoiceFeedback text={feedback} />

              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-500">Was this feedback helpful?</span>
                <Button
                  size="sm"
                  variant={feedbackRating === "helpful" ? "default" : "outline"}
                  className="h-8 w-8 p-0"
                  onClick={() => handleFeedbackRating("helpful")}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={feedbackRating === "unhelpful" ? "default" : "outline"}
                  className="h-8 w-8 p-0"
                  onClick={() => handleFeedbackRating("unhelpful")}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
