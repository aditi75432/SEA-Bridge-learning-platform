"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { Globe, MapPin, Users, Volume2 } from "lucide-react"

interface Dialect {
  code: string
  name: string
  localName: string
  region: string
  speakers: string
  description: string
  examples: string[]
  audioSample?: string
}

const dialectsByLanguage: Record<string, Dialect[]> = {
  fil: [
    {
      code: "fil-tl",
      name: "Tagalog (Manila)",
      localName: "Tagalog",
      region: "Metro Manila, Central Luzon",
      speakers: "25 million",
      description: "Standard Filipino based on Tagalog, official language of the Philippines",
      examples: ["Kumusta ka?", "Salamat po", "Magandang umaga"],
      audioSample: "/audio/tagalog-sample.mp3",
    },
    {
      code: "fil-ceb",
      name: "Cebuano",
      localName: "Binisaya",
      region: "Cebu, Bohol, Mindanao",
      speakers: "22 million",
      description: "Widely spoken in the Visayas and northern Mindanao regions",
      examples: ["Kumusta ka?", "Salamat", "Maayong buntag"],
      audioSample: "/audio/cebuano-sample.mp3",
    },
    {
      code: "fil-ilo",
      name: "Ilocano",
      localName: "Ilokano",
      region: "Northern Luzon",
      speakers: "9 million",
      description: "Predominant language in Northern Luzon and La Union",
      examples: ["Kumusta ka?", "Agyaman", "Naimbag a bigat"],
      audioSample: "/audio/ilocano-sample.mp3",
    },
    {
      code: "fil-hil",
      name: "Hiligaynon",
      localName: "Ilonggo",
      region: "Western Visayas",
      speakers: "7 million",
      description: "Primary language of Iloilo and surrounding provinces",
      examples: ["Kumusta ka?", "Salamat", "Maayad nga aga"],
      audioSample: "/audio/hiligaynon-sample.mp3",
    },
  ],
  vi: [
    {
      code: "vi-n",
      name: "Northern Vietnamese",
      localName: "Tiếng Việt Bắc Bộ",
      region: "Hanoi, Northern Vietnam",
      speakers: "30 million",
      description: "Standard Vietnamese dialect, basis for official language",
      examples: ["Xin chào", "Cảm ơn", "Chào buổi sáng"],
      audioSample: "/audio/vietnamese-north-sample.mp3",
    },
    {
      code: "vi-c",
      name: "Central Vietnamese",
      localName: "Tiếng Việt Trung Bộ",
      region: "Hue, Da Nang, Central Vietnam",
      speakers: "15 million",
      description: "Distinctive accent with unique tonal patterns",
      examples: ["Xin chào", "Cảm ơn", "Chào buổi sáng"],
      audioSample: "/audio/vietnamese-central-sample.mp3",
    },
    {
      code: "vi-s",
      name: "Southern Vietnamese",
      localName: "Tiếng Việt Nam Bộ",
      region: "Ho Chi Minh City, Mekong Delta",
      speakers: "25 million",
      description: "Softer tones and different vocabulary from northern dialect",
      examples: ["Xin chào", "Cảm ơn", "Chào buổi sáng"],
      audioSample: "/audio/vietnamese-south-sample.mp3",
    },
  ],
  th: [
    {
      code: "th-central",
      name: "Central Thai",
      localName: "ภาษาไทยกลาง",
      region: "Bangkok, Central Thailand",
      speakers: "20 million",
      description: "Standard Thai language used in education and media",
      examples: ["สวัสดี", "ขอบคุณ", "อรุณสวัสดิ์"],
      audioSample: "/audio/thai-central-sample.mp3",
    },
    {
      code: "th-northern",
      name: "Northern Thai (Lanna)",
      localName: "คำเมือง",
      region: "Chiang Mai, Northern Thailand",
      speakers: "6 million",
      description: "Distinct dialect with its own script and cultural traditions",
      examples: ["สวัสดี", "ขอบใจ", "อรุณสวัสดิ์"],
      audioSample: "/audio/thai-northern-sample.mp3",
    },
    {
      code: "th-northeastern",
      name: "Northeastern Thai (Isan)",
      localName: "ภาษาอีสาน",
      region: "Northeastern Thailand",
      speakers: "15 million",
      description: "Closely related to Lao language, distinct cultural identity",
      examples: ["สบายดีบ่", "ขอบใจ", "อรุณสวัสดิ์"],
      audioSample: "/audio/thai-northeastern-sample.mp3",
    },
    {
      code: "th-southern",
      name: "Southern Thai",
      localName: "ภาษาไทยใต้",
      region: "Southern Thailand",
      speakers: "5 million",
      description: "Influenced by Malay language and culture",
      examples: ["สวัสดี", "ขอบคุณ", "อรุณสวัสดิ์"],
      audioSample: "/audio/thai-southern-sample.mp3",
    },
  ],
  id: [
    {
      code: "id-standard",
      name: "Standard Indonesian",
      localName: "Bahasa Indonesia Baku",
      region: "Jakarta, National Standard",
      speakers: "43 million native",
      description: "Official language of Indonesia, based on Malay",
      examples: ["Halo", "Terima kasih", "Selamat pagi"],
      audioSample: "/audio/indonesian-standard-sample.mp3",
    },
    {
      code: "id-javanese",
      name: "Javanese",
      localName: "Basa Jawa",
      region: "Central and East Java",
      speakers: "75 million",
      description: "Most widely spoken regional language in Indonesia",
      examples: ["Halo", "Matur nuwun", "Sugeng enjing"],
      audioSample: "/audio/javanese-sample.mp3",
    },
    {
      code: "id-sundanese",
      name: "Sundanese",
      localName: "Basa Sunda",
      region: "West Java",
      speakers: "27 million",
      description: "Second most spoken regional language in Indonesia",
      examples: ["Halo", "Hatur nuhun", "Wilujeng enjing"],
      audioSample: "/audio/sundanese-sample.mp3",
    },
    {
      code: "id-balinese",
      name: "Balinese",
      localName: "Basa Bali",
      region: "Bali",
      speakers: "3 million",
      description: "Traditional language of Bali with complex honorific system",
      examples: ["Halo", "Suksma", "Rahajeng semeng"],
      audioSample: "/audio/balinese-sample.mp3",
    },
  ],
}

export function DialectSelector() {
  const { currentLanguage, setLanguage } = useLanguage()
  const { profile, updateProfile } = useCulturalContext()
  const [selectedDialect, setSelectedDialect] = useState<string>("")
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  const currentDialects = dialectsByLanguage[currentLanguage.code] || []

  useEffect(() => {
    // Set default dialect based on user's region/country
    if (currentDialects.length > 0 && !selectedDialect) {
      const defaultDialect = currentDialects[0].code
      setSelectedDialect(defaultDialect)
    }
  }, [currentLanguage.code, currentDialects, selectedDialect])

  const handleDialectChange = (dialectCode: string) => {
    setSelectedDialect(dialectCode)
    updateProfile({ dialect: dialectCode })
  }

  const playAudioSample = async (audioSample: string, dialectCode: string) => {
    if (playingAudio === dialectCode) {
      setPlayingAudio(null)
      return
    }

    setPlayingAudio(dialectCode)

    // Simulate audio playback (in real app, use Web Audio API)
    setTimeout(() => {
      setPlayingAudio(null)
    }, 3000)
  }

  if (currentDialects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Globe className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">Dialect Support Coming Soon</h3>
          <p className="text-gray-600">We're working on adding dialect support for {currentLanguage.localName}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Choose Your Dialect</h3>
          <p className="text-gray-600">Select the regional variant that matches your background</p>
        </div>
        <Badge variant="outline" className="border-primary/20 text-primary">
          <Globe className="h-3 w-3 mr-1" />
          {currentLanguage.localName}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentDialects.map((dialect) => (
          <Card
            key={dialect.code}
            className={`border-2 cursor-pointer transition-all duration-300 ${
              selectedDialect === dialect.code ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => handleDialectChange(dialect.code)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{dialect.name}</CardTitle>
                  <p className="text-sm text-gray-600">{dialect.localName}</p>
                </div>
                {selectedDialect === dialect.code && (
                  <Badge variant="default" className="text-xs">
                    Selected
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{dialect.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Region:</span>
                  <span className="text-gray-600">{dialect.region}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Speakers:</span>
                  <span className="text-gray-600">{dialect.speakers}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium">Common Phrases:</span>
                <div className="flex flex-wrap gap-2">
                  {dialect.examples.map((example, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>

              {dialect.audioSample && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    playAudioSample(dialect.audioSample!, dialect.code)
                  }}
                  disabled={playingAudio === dialect.code}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  {playingAudio === dialect.code ? "Playing..." : "Listen to Sample"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-forest/20 bg-forest/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🌏</span>
            Cultural Learning Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Personalized Content</h4>
              <p className="text-gray-600">Learning materials adapted to your specific dialect and regional context</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Cultural Relevance</h4>
              <p className="text-gray-600">Examples and references that match your local culture and traditions</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Authentic Communication</h4>
              <p className="text-gray-600">Learn to communicate naturally in your regional style</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Heritage Preservation</h4>
              <p className="text-gray-600">Help preserve and celebrate linguistic diversity in Southeast Asia</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
