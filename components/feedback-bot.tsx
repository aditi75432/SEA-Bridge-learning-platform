"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Mic, Send, X } from "lucide-react"
import { useLanguage } from "./language-provider"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function FeedbackBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you with your lesson today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const { currentLanguage } = useLanguage()

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      let botResponse: string

      if (currentLanguage.code === "fil") {
        botResponse =
          "Salamat sa iyong tanong! Ang water cycle ay ang natural na proseso kung paano umiikot ang tubig sa Earth. Maari bang maging mas specific ang iyong tanong?"
      } else if (currentLanguage.code === "vi") {
        botResponse =
          "Cảm ơn câu hỏi của bạn! Chu trình nước là quá trình tự nhiên về cách nước lưu thông trên Trái đất. Bạn có thể hỏi cụ thể hơn không?"
      } else {
        botResponse =
          "Thank you for your question! The water cycle is the natural process of how water circulates around the Earth. Could you be more specific with your question?"
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg">
        <span className="sr-only">Open feedback bot</span>
        <Avatar className="h-10 w-10 bg-white">
          <span className="text-primary text-lg font-bold">AI</span>
        </Avatar>
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[350px] h-[500px] shadow-lg flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <span className="text-primary font-bold">AI</span>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">AI Tutor</h3>
            <p className="text-xs text-gray-500">{currentLanguage.name === "English" ? "Online" : "Aktibo"}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="p-2 border-t">
        <div className="flex items-center w-full gap-2">
          <Button variant="ghost" size="icon">
            <Mic className="h-4 w-4" />
          </Button>

          <Input
            placeholder={currentLanguage.code === "fil" ? "Magtanong..." : "Ask a question..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />

          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
