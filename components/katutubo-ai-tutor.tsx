"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  Calculator,
  Beaker,
  Globe,
  Lightbulb,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  language: string
  voiceSummary?: string
}

interface KatutuboAITutorProps {
  culturalProfile: any
}

export function KatutuboAITutor({ culturalProfile }: KatutuboAITutorProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTopic, setCurrentTopic] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Language-specific responses and greetings
  const getLocalizedContent = () => {
    const language = culturalProfile?.language || "English"
    const region = culturalProfile?.region || "Luzon"
    const tone = culturalProfile?.tone || "informal"

    const content: any = {
      Filipino: {
        botName: "Katutubo Tutor",
        greeting:
          tone === "formal"
            ? "Magandang araw po! Ako si Katutubo Tutor. Paano ko kayo matutulungan sa inyong pag-aaral ngayon?"
            : "Kumusta! Ako si Katutubo Tutor. Ano'ng gusto mong matutunan ngayon?",
        placeholder: "Magtanong tungkol sa inyong aralin...",
        listening: "Nakikinig...",
        thinking: "Nag-iisip...",
        encouragement: ["Magaling!", "Tama yan!", "Kaya mo yan!", "Tuloy lang!"],
        subjects: {
          math: "Matematika",
          science: "Agham",
          history: "Kasaysayan",
          english: "Ingles",
        },
      },
      Cebuano: {
        botName: "Katutubo Magtutudlo",
        greeting:
          tone === "formal"
            ? "Maayong adlaw po! Ako si Katutubo Magtutudlo. Unsaon ko ninyo pagtabang sa inyong pagkat-on karon?"
            : "Kumusta! Ako si Katutubo Magtutudlo. Unsa'y gusto nimong kat-onon karon?",
        placeholder: "Pangutana bahin sa inyong leksyon...",
        listening: "Nagpaminaw...",
        thinking: "Naghunahuna...",
        encouragement: ["Maayo kaayo!", "Sakto na!", "Kaya nimo na!", "Padayon lang!"],
        subjects: {
          math: "Matematika",
          science: "Siyensya",
          history: "Kasaysayan",
          english: "Iningles",
        },
      },
      Ilocano: {
        botName: "Katutubo Mannursuro",
        greeting:
          tone === "formal"
            ? "Naimbag nga aldaw apo! Siak ni Katutubo Mannursuro. Kasano a makatulongak kadakayo iti panagadal yo ita?"
            : "Kumusta! Siak ni Katutubo Mannursuro. Ania ti kayat yo nga adalem ita?",
        placeholder: "Agdamag maipapan iti leksion yo...",
        listening: "Agdengdengngeg...",
        thinking: "Agpanpanunot...",
        encouragement: ["Naimbag!", "Umno dayta!", "Kaya mo dayta!", "Ituloy mo!"],
        subjects: {
          math: "Matematika",
          science: "Siyensya",
          history: "Pakasaritaan",
          english: "Ingles",
        },
      },
    }

    return content[language] || content.Filipino
  }

  const localContent = getLocalizedContent()

  // Mock AI responses with cultural context
  const generateAIResponse = (userMessage: string): string => {
    const language = culturalProfile?.language || "Filipino"
    const region = culturalProfile?.region || "Luzon"
    const tone = culturalProfile?.tone || "informal"

    // Detect subject area
    const mathKeywords = ["math", "matematika", "multiply", "divide", "fraction", "numero", "kwenta"]
    const scienceKeywords = ["science", "siyensya", "agham", "photosynthesis", "halaman", "tanim"]
    const historyKeywords = ["history", "kasaysayan", "rizal", "lapu-lapu", "bayani", "hero"]

    const isMath = mathKeywords.some((keyword) => userMessage.toLowerCase().includes(keyword))
    const isScience = scienceKeywords.some((keyword) => userMessage.toLowerCase().includes(keyword))
    const isHistory = historyKeywords.some((keyword) => userMessage.toLowerCase().includes(keyword))

    // Generate culturally appropriate responses
    if (language === "Cebuano") {
      if (isMath) {
        setCurrentTopic("math")
        return tone === "formal"
          ? "Salamat sa inyong pangutana sa matematika po. Ang multiplication sa fractions kay simple ra. Imultiply lang ang numerator ug denominator. Pananglitan, 1/2 x 1/3 = 1/6. Mura ra mog nagbahin sa bibingka sa inyong mga higala! Maayo kaayo, padayon lang!"
          : "Ah, matematika! Simple ra na. Kung mag-multiply ka sa fractions, imultiply lang ang taas ug ubos. Pananglitan, 1/2 x 1/3 = 1/6. Mura ra mog nagbahin sa lechon sa fiesta! Kaya nimo na!"
      }

      if (isScience) {
        setCurrentTopic("science")
        return tone === "formal"
          ? "Maayong pangutana sa siyensya po. Ang photosynthesis mao ang proseso sa mga tanom nga naghimo sa ilang kaugalingong pagkaon gamit ang kahayag sa adlaw. Sama sa mga kamote sa inyong bakyard - kinahanglan nila ang adlaw aron motubo. Maayo kaayo!"
          : "Siyensya! Ang photosynthesis kay mura ra sa pagluto sa tanom. Gigamit nila ang adlaw aron makahimo sa ilang pagkaon. Sama sa mga malunggay sa bukid - kinahanglan nila ang adlaw! Padayon lang!"
      }

      if (isHistory) {
        setCurrentTopic("history")
        return tone === "formal"
          ? "Salamat sa inyong pangutana sa kasaysayan po. Si Lapu-Lapu usa sa mga bantog nga bayani sa Pilipinas, labi na dinhi sa Visayas. Siya ang nakabuntog kang Magellan sa Mactan. Ang iyang kaisog nagpakita sa atong pagkamakabanay. Maayo kaayo!"
          : "Kasaysayan! Si Lapu-Lapu kay bayani nato dinhi sa Visayas. Gibuntog niya si Magellan sa Mactan. Brave kaayo siya! Mura sa mga tao dinhi nga dili magpatalo. Kaya nimo na!"
      }

      return tone === "formal"
        ? "Salamat sa inyong pangutana po. Mahimo ninyo akong pangutanon ang bisan unsa bahin sa inyong mga leksyon. Andam ako motabang sa matematika, siyensya, kasaysayan, ug uban pa. Maayo kaayo!"
        : "Kumusta! Pwede ka mangutana sa bisan unsa nga subject. Math, science, history - kaya nako tanan! Unsa pa'y gusto nimo mahibal-an?"
    }

    if (language === "Filipino") {
      if (isMath) {
        setCurrentTopic("math")
        return tone === "formal"
          ? "Salamat po sa inyong tanong sa matematika. Ang multiplication ng fractions ay simple lang po. I-multiply lang ang numerator at denominator. Halimbawa, 1/2 x 1/3 = 1/6. Parang naghahati kayo ng bibingka sa mga kaibigan ninyo! Magaling po!"
          : "Ah, math! Simple lang yan. Pag nag-multiply ka ng fractions, i-multiply mo lang yung taas at baba. Halimbawa, 1/2 x 1/3 = 1/6. Parang naghahati kayo ng halo-halo sa sari-sari store! Kaya mo yan!"
      }

      if (isScience) {
        setCurrentTopic("science")
        return tone === "formal"
          ? "Magandang tanong po sa agham. Ang photosynthesis ay proseso ng mga halaman na gumagawa ng sariling pagkain gamit ang sikat ng araw. Tulad ng mga kamote sa inyong bakuran - kailangan nila ng araw para lumaki. Magaling po!"
          : "Science! Ang photosynthesis parang pagluluto ng halaman. Ginagamit nila ang araw para gumawa ng pagkain. Tulad ng malunggay sa bakuran - kailangan nila ng araw! Tuloy lang!"
      }

      if (isHistory) {
        setCurrentTopic("history")
        return tone === "formal"
          ? "Salamat po sa inyong tanong sa kasaysayan. Si Jose Rizal ay isa sa mga pangunahing bayani ng Pilipinas. Sumulat siya ng Noli Me Tangere at El Filibusterismo para ipakita ang mga problema sa panahon ng Espanyol. Ang kanyang tapang ay nagbigay inspirasyon sa aming kalayaan. Magaling po!"
          : "History! Si Rizal ay bayani natin. Sumulat siya ng mga libro para ipakita ang mga problema noon. Brave siya tulad ng mga OFW natin ngayon na lumalaban para sa pamilya! Kaya mo yan!"
      }

      return tone === "formal"
        ? "Salamat po sa inyong tanong. Maaari ninyo akong tanungin ang kahit ano tungkol sa inyong mga aralin. Handa akong tumulong sa matematika, agham, kasaysayan, at iba pa. Magaling po!"
        : "Kumusta! Pwede mo akong tanungin kahit ano tungkol sa subjects mo. Math, science, history - kaya ko lahat! Ano pa'ng gusto mong malaman?"
    }

    // Default English response
    if (isMath) {
      setCurrentTopic("math")
      return "Great math question! Multiplying fractions is simple - just multiply the numerators together and denominators together. For example, 1/2 x 1/3 = 1/6. Think of it like sharing bibingka with friends at a fiesta! You can do this!"
    }

    if (isScience) {
      setCurrentTopic("science")
      return "Excellent science question! Photosynthesis is how plants make their own food using sunlight. Just like the malunggay trees in Filipino backyards - they need sunlight to grow strong! Keep learning!"
    }

    if (isHistory) {
      setCurrentTopic("history")
      return "Great history question! Jose Rizal was one of the Philippines' greatest heroes. He wrote novels to expose the problems during Spanish colonization. His courage inspired our fight for freedom, just like the bayanihan spirit we see today! You're doing great!"
    }

    return "Hello! I'm here to help with your studies. You can ask me about math, science, history, and more. I'll explain everything using examples familiar to Filipino students. What would you like to learn today?"
  }

  // Initialize with greeting
  useEffect(() => {
    const greeting: Message = {
      id: "greeting",
      type: "bot",
      content: localContent.greeting,
      timestamp: new Date(),
      language: culturalProfile?.language || "Filipino",
      voiceSummary: localContent.encouragement[0],
    }
    setMessages([greeting])
  }, [culturalProfile])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputText,
      timestamp: new Date(),
      language: culturalProfile?.language || "Filipino",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: aiResponse,
        timestamp: new Date(),
        language: culturalProfile?.language || "Filipino",
        voiceSummary: localContent.encouragement[Math.floor(Math.random() * localContent.encouragement.length)],
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // Mock voice input - in real implementation, this would use Web Speech API
    if (!isListening) {
      setTimeout(() => {
        setInputText("Paano mag-multiply ng fractions?")
        setIsListening(false)
      }, 2000)
    }
  }

  const handleVoiceOutput = (text: string) => {
    setIsSpeaking(!isSpeaking)
    // Mock TTS - in real implementation, this would use Speech Synthesis API
    if (!isSpeaking) {
      setTimeout(() => {
        setIsSpeaking(false)
      }, 3000)
    }
  }

  const getSubjectIcon = (topic: string) => {
    switch (topic) {
      case "math":
        return <Calculator className="h-4 w-4" />
      case "science":
        return <Beaker className="h-4 w-4" />
      case "history":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  const getSubjectColor = (topic: string) => {
    switch (topic) {
      case "math":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "science":
        return "bg-green-100 text-green-700 border-green-200"
      case "history":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const quickQuestions = [
    {
      text:
        culturalProfile?.language === "Cebuano"
          ? "Unsaon pag-multiply sa fractions?"
          : "Paano mag-multiply ng fractions?",
      topic: "math",
    },
    {
      text: culturalProfile?.language === "Cebuano" ? "Unsa ang photosynthesis?" : "Ano ang photosynthesis?",
      topic: "science",
    },
    {
      text: culturalProfile?.language === "Cebuano" ? "Kinsa si Jose Rizal?" : "Sino si Jose Rizal?",
      topic: "history",
    },
  ]

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-black">{localContent.botName}</CardTitle>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {culturalProfile?.region || "Philippines"} • {culturalProfile?.language || "Filipino"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentTopic && (
              <Badge variant="outline" className={`${getSubjectColor(currentTopic)} border`}>
                {getSubjectIcon(currentTopic)}
                <span className="ml-1">
                  {localContent.subjects[currentTopic as keyof typeof localContent.subjects]}
                </span>
              </Badge>
            )}
            <Badge variant="secondary" className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Cultural AI
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user" ? "bg-blue-500 text-white" : "bg-white border shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-black">{message.content}</p>

                  {message.type === "bot" && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100 text-black">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVoiceOutput(message.content)}
                        className="h-6 px-2 text-xs"
                      >
                        {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                      </Button>
                      {message.voiceSummary && (
                        <span className="text-xs text-gray-500 italic">"{message.voiceSummary}"</span>
                      )}
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border shadow-sm rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="ml-2 text-sm text-gray-500">{localContent.thinking}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        <div className="space-y-2">
          <p className="text-xs text-gray-600 font-medium">
            {culturalProfile?.language === "Cebuano" ? "Mga Kasagarang Pangutana:" : "Mga Madalas na Tanong:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputText(question.text)}
                className="text-xs h-7 px-2"
              >
                {getSubjectIcon(question.topic)}
                <span className="ml-1">{question.text}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={localContent.placeholder}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceInput}
              className={`absolute right-1 top-1 h-8 w-8 p-0 ${isListening ? "text-red-500" : "text-gray-400"}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!inputText.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {isListening && (
          <div className="text-center">
            <Badge variant="secondary" className="animate-pulse">
              <Mic className="h-3 w-3 mr-1" />
              {localContent.listening}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
