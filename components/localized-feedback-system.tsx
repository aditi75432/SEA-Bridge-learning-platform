"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Heart, Sparkles, ThumbsUp, Brain } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { useAzureTranslate } from "./azure-translate-provider"
import { VoiceFeedback } from "./voice-feedback"

interface FeedbackStyle {
  formality: "formal" | "informal" | "respectful"
  encouragementStyle: "direct" | "gentle" | "enthusiastic"
  culturalTone: "traditional" | "modern" | "mixed"
  emotionalSupport: "high" | "medium" | "low"
}

interface LocalizedFeedback {
  message: string
  tone: string
  culturalContext: string
  encouragement: string
  nextSteps: string[]
  voiceEnabled: boolean
}

export function useLocalizedFeedbackSystem() {
  const { currentLanguage } = useLanguage()
  const { profile, getCulturalEncouragement } = useCulturalContext()
  const { translateText } = useAzureTranslate()

  const getFeedbackStyle = useCallback((): FeedbackStyle => {
    return {
      formality: profile.formalityPreference as "formal" | "informal" | "respectful",
      encouragementStyle:
        profile.ageGroup === "child" ? "enthusiastic" : profile.ageGroup === "teen" ? "gentle" : "direct",
      culturalTone: profile.visualStyle === "traditional" ? "traditional" : "modern",
      emotionalSupport: profile.region === "rural" ? "high" : "medium",
    }
  }, [profile])

  const generateCulturalFeedback = useCallback(
    async (
      isCorrect: boolean,
      topic: string,
      userAnswer?: string,
      correctAnswer?: string,
    ): Promise<LocalizedFeedback> => {
      const style = getFeedbackStyle()
      let message = ""
      let encouragement = ""
      let culturalContext = ""

      // Base feedback based on correctness
      if (isCorrect) {
        // Positive feedback with cultural elements
        const positiveResponses = {
          Philippines: {
            formal: ["Tama po kayo!", "Napakagaling ninyo!", "Salamat sa inyong sipag!"],
            informal: ["Tama ka!", "Galing mo!", "Astig!", "Husay!"],
            respectful: ["Magaling po kayo!", "Tumpak po ang sagot!", "Salamat po!"],
          },
          Vietnam: {
            formal: ["Chính xác!", "Rất tốt!", "Cảm ơn sự chăm chỉ của bạn!"],
            informal: ["Đúng rồi!", "Giỏi quá!", "Tuyệt vời!"],
            respectful: ["Bạn làm rất tốt!", "Câu trả lời chính xác!", "Cảm ơn bạn!"],
          },
          Thailand: {
            formal: ["ถูกต้องครับ/ค่ะ!", "ดีมากครับ/ค่ะ!", "ขอบคุณสำหรับความพยายาม!"],
            informal: ["ถูกแล้ว!", "เก่งมาก!", "ยอดเยี่ยม!"],
            respectful: ["คุณทำได้ดีมาก!", "คำตอบที่ถูกต้อง!", "ขอบคุณครับ/ค่ะ!"],
          },
          Indonesia: {
            formal: ["Benar sekali!", "Sangat bagus!", "Terima kasih atas usaha Anda!"],
            informal: ["Betul!", "Hebat!", "Keren!"],
            respectful: ["Anda melakukannya dengan baik!", "Jawaban yang tepat!", "Terima kasih!"],
          },
        }

        const countryResponses = positiveResponses[profile.country as keyof typeof positiveResponses]
        if (countryResponses) {
          const responses = countryResponses[style.formality]
          message = responses[Math.floor(Math.random() * responses.length)]
        } else {
          message = "Excellent work!"
        }

        // Add cultural encouragement
        encouragement = getCulturalEncouragement()

        // Add cultural context for the topic
        const culturalConnections = {
          Philippines: {
            "water cycle": "Just like how water flows through our beautiful rice terraces in Banaue!",
            mathematics: "This reminds me of the geometric patterns in traditional Filipino weaving!",
            technology: "You're thinking like the innovative Filipino developers in Makati!",
          },
          Vietnam: {
            "water cycle": "Similar to how water flows through the Mekong Delta during monsoon season!",
            mathematics: "Like the precise calculations used in building our ancient pagodas!",
            technology: "You have the mindset of Vietnam's growing tech entrepreneurs!",
          },
          Thailand: {
            "water cycle": "Just like the royal irrigation systems that have sustained Thai agriculture!",
            mathematics: "Reminiscent of the mathematical precision in Wat temple architecture!",
            technology: "You're thinking like Thailand's innovative fintech pioneers!",
          },
        }

        const countryConnections = culturalConnections[profile.country as keyof typeof culturalConnections]
        if (countryConnections) {
          culturalContext = countryConnections[topic as keyof typeof countryConnections] || ""
        }
      } else {
        // Gentle, culturally-sensitive incorrect feedback
        const incorrectResponses = {
          Philippines: {
            formal: [
              "Hindi po iyan ang tamang sagot, pero okay lang po iyan!",
              "Mali po, pero patuloy lang po kayong mag-aral!",
              "Hindi pa po tama, subukan ninyo ulit!",
            ],
            informal: ["Mali, pero okay lang yan!", "Hindi pa tama, pero kaya mo yan!", "Mali, pero wag kang susuko!"],
            respectful: [
              "Hindi pa po tumpak, pero magpatuloy lang po kayo!",
              "Mali po, pero maraming salamat sa pagsubok!",
              "Hindi pa po iyan, pero malapit na po kayo!",
            ],
          },
          Vietnam: {
            formal: [
              "Chưa đúng, nhưng đừng nản lòng!",
              "Sai rồi, nhưng hãy tiếp tục cố gắng!",
              "Chưa chính xác, thử lại nhé!",
            ],
            informal: ["Sai rồi, nhưng không sao!", "Chưa đúng, cố lên!", "Sai rồi, thử lại đi!"],
            respectful: [
              "Bạn chưa trả lời đúng, nhưng hãy tiếp tục!",
              "Chưa chính xác, cảm ơn bạn đã cố gắng!",
              "Chưa đúng, nhưng bạn đang tiến bộ!",
            ],
          },
          Thailand: {
            formal: ["ยังไม่ถูกต้องครับ/ค่ะ แต่ไม่เป็นไร!", "ผิดครับ/ค่ะ แต่ลองใหม่นะครับ/ค่ะ!", "ยังไม่ถูกครับ/ค่ะ แต่สู้ต่อไป!"],
            informal: ["ผิดแล้ว แต่ไม่เป็นไร!", "ยังไม่ถูก ลองใหม่!", "ผิด แต่สู้ต่อไป!"],
            respectful: ["คุณยังตอบไม่ถูก แต่ไม่เป็นไร!", "ยังไม่ถูกต้อง ขอบคุณที่พยายาม!", "ยังไม่ถูก แต่คุณกำลังก้าวหน้า!"],
          },
        }

        const countryResponses = incorrectResponses[profile.country as keyof typeof incorrectResponses]
        if (countryResponses) {
          const responses = countryResponses[style.formality]
          message = responses[Math.floor(Math.random() * responses.length)]
        } else {
          message = "Not quite right, but keep trying!"
        }

        // Add gentle encouragement
        encouragement = "Every mistake is a step towards mastery. You're doing great!"

        // Add learning hint with cultural context
        if (correctAnswer) {
          culturalContext = `The correct answer is "${correctAnswer}". Think about how this concept applies in ${profile.country}.`
        }
      }

      // Translate if needed
      if (currentLanguage.code !== "en") {
        message = await translateText(message)
        if (encouragement) encouragement = await translateText(encouragement)
        if (culturalContext) culturalContext = await translateText(culturalContext)
      }

      // Generate next steps
      const nextSteps = isCorrect
        ? ["Continue to the next question", "Try a harder challenge", "Share your success with study group"]
        : ["Review the explanation", "Try a similar practice question", "Ask for help from AI tutor"]

      return {
        message,
        tone: style.formality,
        culturalContext,
        encouragement,
        nextSteps,
        voiceEnabled: true,
      }
    },
    [profile, currentLanguage.code, translateText, getCulturalEncouragement, getFeedbackStyle],
  )

  return { generateCulturalFeedback, getFeedbackStyle }
}

interface LocalizedFeedbackDisplayProps {
  feedback: LocalizedFeedback
  isCorrect: boolean
  onNextStep?: (step: string) => void
}

export function LocalizedFeedbackDisplay({ feedback, isCorrect, onNextStep }: LocalizedFeedbackDisplayProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card
      className={`border-2 ${
        isCorrect ? "border-forest bg-forest/10" : "border-primary bg-primary/10"
      } transition-all duration-300`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center">
                <ThumbsUp className="h-4 w-4 text-white" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
            )}
            <CardTitle className="text-lg">{isCorrect ? "Excellent!" : "Keep Learning!"}</CardTitle>
          </div>
          <Badge variant={isCorrect ? "secondary" : "outline"} className="bg-white/50">
            {feedback.tone}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-lg font-medium">{feedback.message}</p>
          {feedback.encouragement && (
            <div className="flex items-center gap-2 p-3 bg-white/50 rounded-lg">
              <Heart className="h-4 w-4 text-primary" />
              <p className="text-sm">{feedback.encouragement}</p>
            </div>
          )}
        </div>

        {feedback.culturalContext && (
          <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Cultural Connection</span>
            </div>
            <p className="text-sm text-gray-700">{feedback.culturalContext}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <VoiceFeedback
            text={`${feedback.message} ${feedback.encouragement} ${feedback.culturalContext}`}
            autoPlay={false}
          />
          <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide" : "Show"} Details
          </Button>
        </div>

        {showDetails && (
          <div className="space-y-3 pt-3 border-t">
            <h4 className="font-medium text-sm">Suggested Next Steps:</h4>
            <div className="space-y-2">
              {feedback.nextSteps.map((step, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => onNextStep?.(step)}
                >
                  <MessageCircle className="h-3 w-3 mr-2" />
                  {step}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
