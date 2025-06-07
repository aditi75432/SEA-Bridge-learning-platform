"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Send, Mic, X, Brain, Sparkles, Globe } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { useAzureTranslate } from "./azure-translate-provider"
import { useSpeechRecognition } from "./speech-recognition-hook"
import { VoiceFeedback } from "./voice-feedback"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "suggestion" | "quiz"
}

interface AITutorChatProps {
  isOpen: boolean
  onClose: () => void
  courseContext?: string
}

export function AITutorChat({ isOpen, onClose, courseContext }: AITutorChatProps) {
  const { currentLanguage } = useLanguage()
  const { getCulturalGreeting, profile } = useCulturalContext()
  const { translateText } = useAzureTranslate()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Speech recognition
  const { isListening, transcript, startListening, stopListening, hasRecognitionSupport, confidence, resetTranscript } =
    useSpeechRecognition(currentLanguage.code)

  // Update input when transcript changes
  useEffect(() => {
    if (transcript) {
      setInput(transcript)
    }
  }, [transcript])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const initializeChat = async () => {
    const greeting = getCulturalGreeting()
    let welcomeMessage = `${greeting}! I'm your AI tutor. I'm here to help you learn and answer any questions you have.`

    if (courseContext) {
      welcomeMessage += ` I see you're working on "${courseContext}". What would you like to know?`
    }

    // Translate if not in English
    if (currentLanguage.code !== "en") {
      welcomeMessage = await translateText(welcomeMessage)
    }

    const initialMessage: Message = {
      id: "1",
      content: welcomeMessage,
      sender: "ai",
      timestamp: new Date(),
    }

    setMessages([initialMessage])
  }

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Simple response generation based on keywords
    const lowerMessage = userMessage.toLowerCase()

    let response = ""

    if (lowerMessage.includes("water cycle") || lowerMessage.includes("evaporation")) {
      response =
        "Great question about the water cycle! In Southeast Asia, we can see this process clearly in our rice terraces. When the sun heats the water in the paddies, it evaporates and rises into the atmosphere. This is just like how water evaporates from our oceans and rivers. Would you like me to explain condensation next?"
    } else if (lowerMessage.includes("ai") || lowerMessage.includes("artificial intelligence")) {
      response =
        "Artificial Intelligence is fascinating! In Southeast Asia, we're seeing amazing AI innovations. For example, Indonesian companies are using AI for agriculture, and Singapore is leading in smart city technologies. AI learns patterns from data, just like how you learn patterns in your studies. What specific aspect of AI interests you most?"
    } else if (lowerMessage.includes("help") || lowerMessage.includes("stuck")) {
      response =
        "I'm here to help! Don't worry, learning can be challenging sometimes. Let's break down the problem step by step. Can you tell me specifically what part you're finding difficult? Remember, every expert was once a beginner!"
    } else if (lowerMessage.includes("quiz") || lowerMessage.includes("test")) {
      response =
        "I'd love to help you prepare! Quizzes are a great way to test your understanding. Would you like me to create some practice questions for you? I can make them relate to examples from your culture to make them more meaningful."
    } else if (lowerMessage.includes("culture") || lowerMessage.includes("tradition")) {
      response = `That's wonderful that you're interested in cultural connections! In ${profile.country}, we have rich traditions that connect to many scientific concepts. For example, traditional farming methods often demonstrate scientific principles. What cultural practice would you like to explore from a scientific perspective?`
    } else {
      // Generic helpful response
      response =
        "That's an interesting question! I want to make sure I give you the best answer. Could you provide a bit more context or let me know what specific aspect you'd like to understand better? I'm here to help you learn in a way that makes sense for you."
    }

    // Add cultural encouragement based on formality preference
    if (profile.formalityPreference === "formal") {
      if (currentLanguage.code === "fil") {
        response += " Salamat sa inyong tanong!"
      } else if (currentLanguage.code === "vi") {
        response += " Cảm ơn câu hỏi của bạn!"
      } else if (currentLanguage.code === "th") {
        response += " ขอบคุณสำหรับคำถามของคุณ!"
      }
    } else {
      response += " Keep up the great work! 🌟"
    }

    // Translate response if not in English
    if (currentLanguage.code !== "en") {
      response = await translateText(response)
    }

    return response
  }

  const handleSend = async () => {
    if (!input.trim()) return

    // Reset speech recognition
    resetTranscript()

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const aiResponse = await generateAIResponse(input)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickSuggestions = [
    "Explain this concept",
    "Give me an example",
    "Create a quiz question",
    "How does this relate to my culture?",
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-secondary">
              <Brain className="h-6 w-6 text-white" />
            </Avatar>
            <div>
              <CardTitle className="text-lg">AI Tutor</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs bg-forest/10 text-forest">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Online
                </Badge>
                <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                  <Globe className="h-3 w-3 mr-1" />
                  {currentLanguage.localName}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800 border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    {message.sender === "ai" && <VoiceFeedback text={message.content} className="ml-2" />}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 border">
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
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t bg-gray-50">
              <p className="text-sm text-gray-600 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInput(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2 relative">
              <Button
                variant={isListening ? "default" : "ghost"}
                size="icon"
                className={`${isListening ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" : "text-gray-500"}`}
                onClick={isListening ? stopListening : startListening}
                disabled={!hasRecognitionSupport}
                title={
                  !hasRecognitionSupport
                    ? "Speech recognition not supported"
                    : isListening
                      ? "Stop recording"
                      : "Start voice input"
                }
              >
                <Mic className="h-4 w-4" />
              </Button>

              <Input
                placeholder={
                  currentLanguage.code === "fil"
                    ? "Magtanong sa AI tutor..."
                    : currentLanguage.code === "vi"
                      ? "Hỏi AI tutor..."
                      : "Ask your AI tutor..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              {isListening && (
                <div className="absolute -top-8 left-0 right-0 flex items-center justify-center">
                  <Badge variant="secondary" className="bg-red-100 text-red-700 animate-pulse">
                    🎤 Listening... {confidence && `(${Math.round(confidence * 100)}%)`}
                  </Badge>
                </div>
              )}

              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
