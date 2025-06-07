"use client"
import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Check, Globe, Loader2, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Language } from "@/components/language-provider"
import React from "react"

interface LanguageSelectorProps {
  isOpen?: boolean
  onClose?: () => void
  triggerIcon?: React.ReactNode
}

const languagesWithDetails = [
  // Main languages
  {
    code: "en",
    name: "English",
    localName: "English",
    flag: "🇺🇸",
    sample: "Hello, welcome to learning!",
    popular: true,
  },
  {
    code: "fil",
    name: "Filipino",
    localName: "Filipino",
    flag: "🇵🇭",
    sample: "Kamusta! Maligayang pagdating sa pag-aaral!",
    popular: true,
  },
  { code: "th", name: "Thai", localName: "ไทย", flag: "🇹🇭", sample: "สวัสดี! ยินดีต้อนรับสู่การเรียนรู้!", popular: true },
  {
    code: "vi",
    name: "Vietnamese",
    localName: "Tiếng Việt",
    flag: "🇻🇳",
    sample: "Xin chào! Chào mừng đến với việc học!",
    popular: true,
  },
  {
    code: "id",
    name: "Indonesian",
    localName: "Bahasa Indonesia",
    flag: "🇮🇩",
    sample: "Halo! Selamat datang di pembelajaran!",
    popular: true,
  },
  {
    code: "ms",
    name: "Malay",
    localName: "Bahasa Melayu",
    flag: "🇲🇾",
    sample: "Hello! Selamat datang ke pembelajaran!",
    popular: true,
  },
  { code: "km", name: "Khmer", localName: "ភាសាខ្មែរ", flag: "🇰🇭", sample: "សួស្តី! សូមស្វាគមន៍មកកាន់ការរៀន!", popular: false },
  {
    code: "my",
    name: "Burmese",
    localName: "မြန်မာဘာသာ",
    flag: "🇲🇲",
    sample: "မင်္ဂလာပါ! သင်ခန်းစာများသို့ကြိုဆိုပါသည်!",
    popular: false,
  },
  { code: "lo", name: "Lao", localName: "ພາສາລາວ", flag: "🇱🇦", sample: "ສະບາຍດີ! ຍິນດີຕ້ອນຮັບສູ່ການຮຽນຮູ້!", popular: false },
  {
    code: "si",
    name: "Sinhala",
    localName: "සිංහල",
    flag: "🇱🇰",
    sample: "ආයුබෝවන්! ඉගෙනීමට සාදරයෙන් පිළිගනිමු!",
    popular: false,
  },
  {
    code: "bn",
    name: "Bengali",
    localName: "বাংলা",
    flag: "🇧🇩",
    sample: "নমস্কার! শেখার জন্য স্বাগতম!",
    popular: false,
  },

  // Filipino regional languages
  {
    code: "tl",
    name: "Tagalog",
    localName: "Tagalog",
    flag: "🇵🇭",
    sample: "Kamusta! Maligayang pagdating sa pag-aaral!",
    popular: false,
    region: "Philippines",
    parentLanguage: "fil",
  },
  {
    code: "ceb",
    name: "Cebuano",
    localName: "Cebuano",
    flag: "🇵🇭",
    sample: "Kumusta! Maayong pag-abot sa pagtuon!",
    popular: false,
    region: "Philippines",
    parentLanguage: "fil",
  },
  {
    code: "ilo",
    name: "Ilocano",
    localName: "Ilokano",
    flag: "🇵🇭",
    sample: "Kumusta! Naragsak nga isasangbay iti panagadal!",
    popular: false,
    region: "Philippines",
    parentLanguage: "fil",
  },
  {
    code: "hil",
    name: "Hiligaynon",
    localName: "Ilonggo",
    flag: "🇵🇭",
    sample: "Kamusta! Maayong pag-abot sa pagtuon!",
    popular: false,
    region: "Philippines",
    parentLanguage: "fil",
  },

  // Malay regional variations
  {
    code: "zlm",
    name: "Malaysian Malay",
    localName: "Bahasa Malaysia",
    flag: "🇲🇾",
    sample: "Hai! Selamat datang ke pembelajaran!",
    popular: false,
    region: "Malaysia",
    parentLanguage: "ms",
  },
  {
    code: "bjn",
    name: "Banjarese",
    localName: "Bahasa Banjar",
    flag: "🇮🇩",
    sample: "Halo! Salamat datang ka pambalajaran!",
    popular: false,
    region: "Indonesia",
    parentLanguage: "ms",
  },

  // Indonesian regional languages
  {
    code: "jv",
    name: "Javanese",
    localName: "Basa Jawa",
    flag: "🇮🇩",
    sample: "Halo! Sugeng rawuh ing pasinaon!",
    popular: false,
    region: "Indonesia",
    parentLanguage: "id",
  },
  {
    code: "su",
    name: "Sundanese",
    localName: "Basa Sunda",
    flag: "🇮🇩",
    sample: "Halo! Wilujeng sumping kana pembelajaran!",
    popular: false,
    region: "Indonesia",
    parentLanguage: "id",
  },

  // Other important regional languages
  {
    code: "ta",
    name: "Tamil",
    localName: "தமிழ்",
    flag: "🇸🇬",
    sample: "வணக்கம்! கற்றலுக்கு வரவேற்கிறோம்!",
    popular: false,
    region: "Singapore/Malaysia",
  },
  {
    code: "zh-TW",
    name: "Traditional Chinese",
    localName: "繁體中文",
    flag: "🇹🇼",
    sample: "你好！歡迎來到學習！",
    popular: false,
    region: "Taiwan/Hong Kong",
  },
]

export function LanguageSelector({ isOpen = false, onClose = () => {}, triggerIcon }: LanguageSelectorProps) {
  const { languages, currentLanguage, setLanguage } = useLanguage()
  const [isTranslating, setIsTranslating] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage)
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen)
  const [dialogOpen, setDialogOpen] = useState(isOpen)
  const [showRegionalVariations, setShowRegionalVariations] = useState<string | null>(null)

  // Listen for translation status
  React.useEffect(() => {
    const handleTranslationStart = () => setIsTranslating(true)
    const handleTranslationEnd = () => setIsTranslating(false)

    document.addEventListener("translationStart", handleTranslationStart)
    document.addEventListener("translationEnd", handleTranslationEnd)

    return () => {
      document.removeEventListener("translationStart", handleTranslationStart)
      document.removeEventListener("translationEnd", handleTranslationEnd)
    }
  }, [])

  const filteredLanguages = useMemo(() => {
    return languagesWithDetails.filter(
      (lang) =>
        (lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.localName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !lang.parentLanguage, // Only show main languages in the initial list
    )
  }, [searchTerm])

  const regionalVariations = useMemo(() => {
    if (!showRegionalVariations) return []
    return languagesWithDetails.filter((lang) => lang.parentLanguage === showRegionalVariations)
  }, [showRegionalVariations])

  const popularLanguages = filteredLanguages.filter((lang) => lang.popular)
  const otherLanguages = filteredLanguages.filter((lang) => !lang.popular)

  const handleLanguageSelect = (language: (typeof languagesWithDetails)[0]) => {
    setSelectedLanguage(language)
  }

  const handleConfirm = async () => {
    console.log(`Switching to language: ${selectedLanguage.code}`)
    setLanguage(selectedLanguage)
    setDialogOpen(false)
    onClose()
  }

  const handleLanguageChange = (lang: Language) => {
    console.log(`🔄 Dropdown: Switching to ${lang.code}`)
    setLanguage(lang)
    setIsDropdownOpen(false)

    // Force translation event
    if (lang.code !== "en") {
      document.dispatchEvent(new CustomEvent("forceTranslation", { detail: lang.code }))
    }
  }

  const handleShowRegionalVariations = (langCode: string) => {
    setShowRegionalVariations(langCode)
  }

  const handleBackToMainLanguages = () => {
    setShowRegionalVariations(null)
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-ocean-50">
            {isTranslating ? (
              <Loader2 className="h-4 w-4 text-ocean-600 animate-spin" />
            ) : (
              triggerIcon || <Globe className="h-4 w-4 text-ocean-600" />
            )}
            <span className="hidden sm:inline text-ocean-600 font-medium">{currentLanguage.code.toUpperCase()}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {languages
            .filter((lang) => !lang.parentLanguage)
            .map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className="flex items-center justify-between cursor-pointer hover:bg-ocean-50"
              >
                <div className="flex items-center gap-3">
                  <span>{lang.name}</span>
                  <span className="text-xs text-muted-foreground">({lang.localName})</span>
                </div>
                {currentLanguage.code === lang.code && <Check className="h-4 w-4 text-ocean-600" />}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {showRegionalVariations ? (
                <button onClick={handleBackToMainLanguages} className="flex items-center text-primary hover:underline">
                  <span className="mr-2">←</span>
                  Back to All Languages
                </button>
              ) : (
                "Choose Your Language"
              )}
            </DialogTitle>
            <p className="text-center text-gray-600">
              {showRegionalVariations
                ? `Select a regional variation of ${languagesWithDetails.find((l) => l.code === showRegionalVariations)?.name}`
                : "Select your preferred language for the best learning experience"}
            </p>
          </DialogHeader>

          <div className="space-y-6">
            {/* Search - only show when viewing main languages */}
            {!showRegionalVariations && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            )}

            {/* Language Lists */}
            <div className="max-h-96 overflow-y-auto space-y-6">
              {showRegionalVariations ? (
                // Show regional variations
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-3">Regional Variations</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {regionalVariations.map((language) => (
                      <LanguageOption
                        key={language.code}
                        language={language}
                        isSelected={selectedLanguage.code === language.code}
                        onSelect={handleLanguageSelect}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                // Show main languages
                <>
                  {/* Popular Languages */}
                  {popularLanguages.length > 0 && (
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-3 flex items-center gap-2">
                        <span>Most Popular</span>
                        <Badge variant="secondary" className="text-xs">
                          Recommended
                        </Badge>
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {popularLanguages.map((language) => (
                          <LanguageOptionWithVariations
                            key={language.code}
                            language={language}
                            isSelected={selectedLanguage.code === language.code}
                            onSelect={handleLanguageSelect}
                            hasVariations={languagesWithDetails.some((l) => l.parentLanguage === language.code)}
                            onShowVariations={handleShowRegionalVariations}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Languages */}
                  {otherLanguages.length > 0 && (
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-3">All Languages</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {otherLanguages.map((language) => (
                          <LanguageOptionWithVariations
                            key={language.code}
                            language={language}
                            isSelected={selectedLanguage.code === language.code}
                            onSelect={handleLanguageSelect}
                            hasVariations={languagesWithDetails.some((l) => l.parentLanguage === language.code)}
                            onShowVariations={handleShowRegionalVariations}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Preview */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Preview:</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">
                    {languagesWithDetails.find((l) => l.code === selectedLanguage.code)?.flag || "🌐"}
                  </span>
                  <div>
                    <div className="font-medium">{selectedLanguage.localName}</div>
                    <div className="text-sm text-gray-500">{selectedLanguage.name}</div>
                    {selectedLanguage.region && <div className="text-xs text-gray-400">{selectedLanguage.region}</div>}
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "
                  {languagesWithDetails.find((l) => l.code === selectedLanguage.code)?.sample ||
                    "Hello, welcome to learning!"}
                  "
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConfirm} className="flex-1" disabled={isTranslating}>
                {isTranslating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  "Confirm Selection"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface LanguageOptionProps {
  language: (typeof languagesWithDetails)[0]
  isSelected: boolean
  onSelect: (language: (typeof languagesWithDetails)[0]) => void
}

function LanguageOption({ language, isSelected, onSelect }: LanguageOptionProps) {
  return (
    <button
      onClick={() => onSelect(language)}
      className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:shadow-sm ${
        isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{language.flag}</span>
          <div>
            <div className="font-medium">{language.localName}</div>
            <div className="text-sm text-gray-500">{language.name}</div>
            {language.region && <div className="text-xs text-gray-400">{language.region}</div>}
          </div>
        </div>
        {isSelected && <Check className="h-5 w-5 text-primary" />}
      </div>
    </button>
  )
}

interface LanguageOptionWithVariationsProps extends LanguageOptionProps {
  hasVariations: boolean
  onShowVariations: (langCode: string) => void
}

function LanguageOptionWithVariations({
  language,
  isSelected,
  onSelect,
  hasVariations,
  onShowVariations,
}: LanguageOptionWithVariationsProps) {
  return (
    <div
      className={`w-full rounded-lg border-2 transition-all hover:shadow-sm ${
        isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex">
        <button onClick={() => onSelect(language)} className="flex-1 p-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{language.flag}</span>
              <div>
                <div className="font-medium">{language.localName}</div>
                <div className="text-sm text-gray-500">{language.name}</div>
              </div>
            </div>
            {isSelected && <Check className="h-5 w-5 text-primary" />}
          </div>
        </button>

        {hasVariations && (
          <button
            onClick={() => onShowVariations(language.code)}
            className="p-4 border-l border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center justify-center"
            title="Show regional variations"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
