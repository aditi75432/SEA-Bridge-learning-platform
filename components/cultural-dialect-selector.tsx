"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Globe, Check } from "lucide-react"

interface Dialect {
  code: string
  name: string
  localName: string
  region: string
  description: string
}

// Define dialects for different languages
const languageDialects: Record<string, Dialect[]> = {
  fil: [
    {
      code: "fil-tl",
      name: "Tagalog",
      localName: "Tagalog",
      region: "Metro Manila, Central Luzon",
      description: "The basis of the national language, spoken in Manila and surrounding areas.",
    },
    {
      code: "fil-ceb",
      name: "Cebuano",
      localName: "Bisaya",
      region: "Cebu, Bohol, parts of Mindanao",
      description: "The second most spoken language in the Philippines.",
    },
    {
      code: "fil-ilk",
      name: "Ilocano",
      localName: "Ilokano",
      region: "Northern Luzon",
      description: "Spoken in the northern regions of the Philippines.",
    },
    {
      code: "fil-hil",
      name: "Hiligaynon",
      localName: "Ilonggo",
      region: "Western Visayas",
      description: "Spoken in Western Visayas, particularly in Iloilo and Negros Occidental.",
    },
  ],
  vi: [
    {
      code: "vi-north",
      name: "Northern Vietnamese",
      localName: "Tiếng Bắc",
      region: "Hanoi, Northern Vietnam",
      description: "The standard dialect used in formal settings and media.",
    },
    {
      code: "vi-central",
      name: "Central Vietnamese",
      localName: "Tiếng Trung",
      region: "Hue, Central Vietnam",
      description: "Distinct accent with unique tonal variations.",
    },
    {
      code: "vi-south",
      name: "Southern Vietnamese",
      localName: "Tiếng Nam",
      region: "Ho Chi Minh City, Southern Vietnam",
      description: "More relaxed tones compared to the northern dialect.",
    },
  ],
  id: [
    {
      code: "id-std",
      name: "Standard Indonesian",
      localName: "Bahasa Indonesia Baku",
      region: "Jakarta, National Media",
      description: "The official standard used in education and government.",
    },
    {
      code: "id-jv",
      name: "Javanese Indonesian",
      localName: "Bahasa Indonesia Jawa",
      region: "Central and East Java",
      description: "Indonesian with Javanese influence in vocabulary and accent.",
    },
    {
      code: "id-snd",
      name: "Sundanese Indonesian",
      localName: "Bahasa Indonesia Sunda",
      region: "West Java",
      description: "Indonesian with Sundanese influence in vocabulary and accent.",
    },
    {
      code: "id-min",
      name: "Minang Indonesian",
      localName: "Bahasa Indonesia Minang",
      region: "West Sumatra",
      description: "Indonesian with Minangkabau influence.",
    },
  ],
  th: [
    {
      code: "th-central",
      name: "Central Thai",
      localName: "ภาษาไทยกลาง",
      region: "Bangkok, Central Thailand",
      description: "The standard dialect used in education and media.",
    },
    {
      code: "th-north",
      name: "Northern Thai",
      localName: "คำเมือง",
      region: "Chiang Mai, Northern Thailand",
      description: "Also known as Lanna, with distinct vocabulary and tones.",
    },
    {
      code: "th-isan",
      name: "Isan Thai",
      localName: "ภาษาอีสาน",
      region: "Northeastern Thailand",
      description: "Influenced by Lao language with unique vocabulary.",
    },
    {
      code: "th-south",
      name: "Southern Thai",
      localName: "ภาษาไทยใต้",
      region: "Southern Thailand",
      description: "Distinct accent and vocabulary from the southern provinces.",
    },
  ],
}

interface CulturalDialectSelectorProps {
  onDialectChange?: (dialect: Dialect) => void
  className?: string
}

export function CulturalDialectSelector({ onDialectChange, className = "" }: CulturalDialectSelectorProps) {
  const { currentLanguage } = useLanguage()
  const { profile, updateProfile } = useCulturalContext()
  const [selectedDialect, setSelectedDialect] = useState<string>("")
  const [availableDialects, setAvailableDialects] = useState<Dialect[]>([])

  // Set available dialects based on current language
  useEffect(() => {
    const dialects = languageDialects[currentLanguage.code] || []
    setAvailableDialects(dialects)

    // Set default dialect if available
    if (dialects.length > 0 && !selectedDialect) {
      setSelectedDialect(dialects[0].code)
    }
  }, [currentLanguage.code])

  // Handle dialect selection
  const handleDialectChange = (dialectCode: string) => {
    setSelectedDialect(dialectCode)

    const selectedDialectObj = availableDialects.find((d) => d.code === dialectCode)

    if (selectedDialectObj && onDialectChange) {
      onDialectChange(selectedDialectObj)

      // Update cultural profile with dialect information
      updateProfile({
        dialect: selectedDialectObj.code,
        region: selectedDialectObj.region.split(",")[0].trim() as any,
      })
    }
  }

  // If no dialects available for this language
  if (availableDialects.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language Variation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            No specific dialects available for {currentLanguage.name}. Using standard {currentLanguage.name}.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Select {currentLanguage.name} Variation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedDialect} onValueChange={handleDialectChange} className="space-y-3">
          {availableDialects.map((dialect) => (
            <div
              key={dialect.code}
              className={`flex items-start space-x-3 border rounded-lg p-3 transition-all ${
                selectedDialect === dialect.code
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <RadioGroupItem value={dialect.code} id={dialect.code} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor={dialect.code} className="font-medium cursor-pointer">
                    {dialect.name}
                  </Label>
                  {selectedDialect === dialect.code && <Check className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-sm text-gray-500 mt-1">{dialect.localName}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {dialect.region}
                </Badge>
                <p className="text-sm mt-2">{dialect.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
