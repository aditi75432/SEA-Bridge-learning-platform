"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface FormalityLevel {
  level: "formal" | "informal" | "respectful"
  label: string
  description: string
  examples: string[]
}

const formalityLevels: Record<string, FormalityLevel[]> = {
  fil: [
    {
      level: "formal",
      label: "Pormal (Po/Opo)",
      description: "Respectful, using po/opo, appropriate for elders and authority figures",
      examples: ["Salamat po", "Opo, tama po kayo", "Magandang umaga po"],
    },
    {
      level: "respectful",
      label: "Magalang",
      description: "Polite but not overly formal, shows respect without po/opo",
      examples: ["Salamat", "Tama kayo", "Magandang umaga"],
    },
    {
      level: "informal",
      label: "Casual",
      description: "Friendly and relaxed, like talking to friends",
      examples: ["Salamat!", "Tama ka!", "Kumusta!"],
    },
  ],
  vi: [
    {
      level: "formal",
      label: "Trang trọng",
      description: "Very respectful, using proper honorifics and formal language",
      examples: ["Xin chào ạ", "Dạ, đúng rồi ạ", "Cảm ơn anh/chị"],
    },
    {
      level: "respectful",
      label: "Lịch sự",
      description: "Polite and courteous, appropriate for most situations",
      examples: ["Xin chào", "Đúng rồi", "Cảm ơn bạn"],
    },
    {
      level: "informal",
      label: "Thân thiện",
      description: "Casual and friendly, like talking to close friends",
      examples: ["Chào bạn!", "Đúng!", "Cảm ơn!"],
    },
  ],
  th: [
    {
      level: "formal",
      label: "สุภาพ (ครับ/ค่ะ)",
      description: "Very polite, always using ครับ/ค่ะ and proper honorifics",
      examples: ["สวัสดีครับ/ค่ะ", "ใช่ครับ/ค่ะ", "ขอบคุณครับ/ค่ะ"],
    },
    {
      level: "respectful",
      label: "สุภาพ",
      description: "Polite and respectful, appropriate for most interactions",
      examples: ["สวัสดี", "ใช่", "ขอบคุณ"],
    },
    {
      level: "informal",
      label: "เป็นกันเอง",
      description: "Casual and relaxed, like talking to friends",
      examples: ["หวัดดี!", "ใช่!", "ขอบใจ!"],
    },
  ],
  id: [
    {
      level: "formal",
      label: "Formal (Bapak/Ibu)",
      description: "Very respectful, using proper titles and formal Indonesian",
      examples: ["Selamat pagi, Bapak/Ibu", "Benar sekali", "Terima kasih banyak"],
    },
    {
      level: "respectful",
      label: "Sopan",
      description: "Polite and courteous, standard Indonesian",
      examples: ["Selamat pagi", "Benar", "Terima kasih"],
    },
    {
      level: "informal",
      label: "Santai",
      description: "Casual and friendly, relaxed Indonesian",
      examples: ["Halo!", "Betul!", "Makasih!"],
    },
  ],
  km: [
    {
      level: "formal",
      label: "គួរសម",
      description: "Very respectful, using proper Khmer honorifics",
      examples: ["ជំរាបសួរ", "បាទ/ចាស", "អរគុណច្រើន"],
    },
    {
      level: "respectful",
      label: "សុភាព",
      description: "Polite and respectful Khmer",
      examples: ["សួស្តី", "បាទ", "អរគុណ"],
    },
    {
      level: "informal",
      label: "ស្និទ្ធស្នាល",
      description: "Casual and friendly Khmer",
      examples: ["សួស្តី!", "បាទ!", "អរគុណ!"],
    },
  ],
}

export function FormalityToggle() {
  const { currentLanguage } = useLanguage()
  const { profile, updateProfile } = useCulturalContext()
  const [selectedLevel, setSelectedLevel] = useState<"formal" | "informal" | "respectful">("respectful")

  useEffect(() => {
    setSelectedLevel(profile.formalityPreference as "formal" | "informal" | "respectful")
  }, [profile.formalityPreference])

  const handleLevelChange = (level: "formal" | "informal" | "respectful") => {
    setSelectedLevel(level)
    updateProfile({ formalityPreference: level })
  }

  const currentLevels = formalityLevels[currentLanguage.code] || formalityLevels.en || []

  if (currentLevels.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Formality settings not available for {currentLanguage.localName}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Communication Style</h3>
        <Badge variant="outline" className="text-xs">
          {currentLanguage.localName}
        </Badge>
      </div>

      <div className="grid gap-3">
        {currentLevels.map((level) => (
          <div
            key={level.level}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedLevel === level.level ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleLevelChange(level.level)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{level.label}</h4>
              {selectedLevel === level.level && (
                <Badge variant="default" className="text-xs">
                  Selected
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-3">{level.description}</p>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-500">Examples:</span>
              <div className="flex flex-wrap gap-2">
                {level.examples.map((example, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">💡 Cultural Tip</span>
        </div>
        <p className="text-sm text-blue-700">
          {currentLanguage.code === "fil" &&
            "In Filipino culture, using 'po' and 'opo' shows respect, especially to elders and authority figures."}
          {currentLanguage.code === "vi" &&
            "Vietnamese has complex honorific systems. 'Anh/chị' and 'ạ' show proper respect."}
          {currentLanguage.code === "th" &&
            "Thai politeness particles 'ครับ/ค่ะ' are essential for showing respect in formal situations."}
          {currentLanguage.code === "id" &&
            "Indonesian formality often involves using 'Bapak/Ibu' and avoiding contractions."}
          {currentLanguage.code === "km" &&
            "Khmer has intricate honorific systems that reflect social hierarchy and respect."}
          {!["fil", "vi", "th", "id", "km"].includes(currentLanguage.code) &&
            "Different cultures have unique ways of showing respect through language."}
        </p>
      </div>
    </div>
  )
}

// Hook for getting formality-appropriate text
export function useFormalityText() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()

  const getFormalText = (informal: string, formal: string, respectful?: string): string => {
    const level = profile.formalityPreference as "formal" | "informal" | "respectful"

    switch (level) {
      case "formal":
        return formal
      case "respectful":
        return respectful || formal
      case "informal":
      default:
        return informal
    }
  }

  const getGreeting = (): string => {
    const greetings = {
      fil: {
        informal: "Kumusta!",
        respectful: "Magandang araw!",
        formal: "Magandang araw po!",
      },
      vi: {
        informal: "Chào bạn!",
        respectful: "Xin chào!",
        formal: "Xin chào ạ!",
      },
      th: {
        informal: "สวัสดี!",
        respectful: "สวัสดี",
        formal: "สวัสดีครับ/ค่ะ",
      },
      id: {
        informal: "Halo!",
        respectful: "Selamat pagi/siang/sore",
        formal: "Selamat pagi/siang/sore, Bapak/Ibu",
      },
    }

    const langGreetings = greetings[currentLanguage.code as keyof typeof greetings]
    if (!langGreetings) return "Hello!"

    return getFormalText(langGreetings.informal, langGreetings.formal, langGreetings.respectful)
  }

  const getThankYou = (): string => {
    const thanks = {
      fil: {
        informal: "Salamat!",
        respectful: "Salamat",
        formal: "Salamat po",
      },
      vi: {
        informal: "Cảm ơn!",
        respectful: "Cảm ơn bạn",
        formal: "Cảm ơn anh/chị",
      },
      th: {
        informal: "ขอบใจ!",
        respectful: "ขอบคุณ",
        formal: "ขอบคุณครับ/ค่ะ",
      },
      id: {
        informal: "Makasih!",
        respectful: "Terima kasih",
        formal: "Terima kasih banyak",
      },
    }

    const langThanks = thanks[currentLanguage.code as keyof typeof thanks]
    if (!langThanks) return "Thank you!"

    return getFormalText(langThanks.informal, langThanks.formal, langThanks.respectful)
  }

  return { getFormalText, getGreeting, getThankYou }
}
