"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatSystemProps {
  currentUserId: string
  currentUserType: "doctor" | "patient"
  recipientId: string
  recipientName: string
  recipientType: "doctor" | "patient"
}

export function ChatSystem({
  currentUserId,
  currentUserType,
  recipientId,
  recipientName,
  recipientType,
}: ChatSystemProps) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      senderId: "doctor-1",
      senderType: "doctor" as const,
      text: "Hello, how can I help you today?",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      senderId: "patient-1",
      senderType: "patient" as const,
      text: "I've been having headaches for the past few days",
      timestamp: new Date(Date.now() - 1800000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional messages from the other party
      if (Math.random() > 0.8 && messages.length > 0) {
        const lastMessage = messages[messages.length - 1]
        if (lastMessage.senderId !== recipientId) {
          const responses = [
            "I understand, can you tell me more about your symptoms?",
            "Have you taken any medication for this?",
            "When did these symptoms start?",
            "I recommend scheduling an appointment to discuss this further.",
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]
          
          setMessages(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              senderId: recipientId,
              senderType: recipientType,
              text: randomResponse,
              timestamp: new Date(),
            },
          ])
        }
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [messages, recipientId, recipientType])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderType: currentUserType,
      text: newMessage,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, message])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold">
          Chat with {recipientName} ({recipientType})
        </h3>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.senderId === currentUserId
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="text-sm">
                  {message.senderType === "doctor" ? "Dr." : ""} {message.senderId === currentUserId ? "You" : recipientName}
                </div>
                <p>{message.text}</p>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-emerald-500 hover:bg-emerald-600">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}