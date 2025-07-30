"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, AlertTriangle, Heart, Brain } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"

interface Message {
  id: number
  type: "user" | "assistant"
  content: string
  timestamp: Date
  analysis: {
    type: string
    data: any
  } | null
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "assistant",
      content: `Hi! I'm your AI Health Assistant powered by Google's Gemini AI. I can help you with:

🔬 **Medication Questions** - Get information about your medications
🏥 **Health Concerns** - Discuss your health symptoms and concerns  
🧠 **General Health Advice** - Receive personalized health guidance
💊 **Wellness Tips** - Learn about maintaining good health

What would you like help with today?`,
      timestamp: new Date(),
      analysis: null,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const callGeminiAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `You are a helpful AI health assistant. Please provide helpful, informative responses about health-related questions. Always remind users to consult healthcare professionals for serious medical concerns. User question: ${message}`,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.response || "I apologize, but I couldn't generate a response. Please try again."
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      return "I'm experiencing technical difficulties. Please try again later or consult with a healthcare professional for urgent matters."
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      analysis: null,
    }

    setMessages((prev) => [...prev, userMessage])
    const currentMessage = inputMessage
    setInputMessage("")
    setIsLoading(true)

    try {
      const aiResponse = await callGeminiAPI(currentMessage)
      
      const assistantMessage: Message = {
        id: Date.now() + 1,
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
        analysis: {
          type: "gemini_response",
          data: { originalQuery: currentMessage }
        },
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please try again or consult with a healthcare professional for urgent matters.",
        timestamp: new Date(),
        analysis: null,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getAnalysisIcon = (type: string) => {
    switch (type) {
      case "adherence":
        return <Heart className="w-4 h-4" />
      case "risk_assessment":
        return <AlertTriangle className="w-4 h-4" />
      case "symptom_analysis":
        return <Brain className="w-4 h-4" />
      case "drug_interaction":
      case "gemini_response":
        return <Bot className="w-4 h-4" />
      default:
        return <Bot className="w-4 h-4" />
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Header */}
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white mb-6">
            <CardContent className="p-6 text-center">
              <Bot className="w-12 h-12 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">AI Health Assistant</h1>
              <p className="text-blue-100">Powered by Google Gemini AI</p>
              <div className="flex justify-center space-x-4 mt-4">
                <Badge className="bg-white/20 text-white">
                  <Heart className="w-3 h-3 mr-1" />
                  Health Guidance
                </Badge>
                <Badge className="bg-white/20 text-white">
                  <Brain className="w-3 h-3 mr-1" />
                  Smart Responses
                </Badge>
                <Badge className="bg-white/20 text-white">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Medical Awareness
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="flex-1 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0 h-full flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "assistant" && <Bot className="w-5 h-5 mt-1 flex-shrink-0" />}
                          {message.type === "user" && <User className="w-5 h-5 mt-1 flex-shrink-0" />}
                          <div className="flex-1">
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            {message.analysis && (
                              <div className="mt-3 p-2 bg-white/10 rounded border-l-2 border-white/30">
                                <div className="flex items-center text-sm opacity-90 mb-1">
                                  {getAnalysisIcon(message.analysis.type)}
                                  <span className="ml-1">Gemini AI</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-700 text-white rounded-lg p-4 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-5 h-5" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm">Thinking with Gemini AI...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about health, medications, symptoms, or wellness..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setInputMessage("What should I know about taking medications regularly?")}
                    className="text-xs"
                  >
                    Medication Tips
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setInputMessage("What are some common signs I should watch for regarding my health?")}
                    className="text-xs"
                  >
                    Health Monitoring
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setInputMessage("I have a headache and feel tired, what could this mean?")}
                    className="text-xs"
                  >
                    Symptom Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}