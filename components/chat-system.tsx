"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User, Stethoscope, Loader2, Wifi, Paperclip, X, FileText, ImageIcon } from "lucide-react"

interface Message {
  _id: string
  senderId: string
  receiverId: string
  text: string
  seen: boolean
  createdAt: string
  attachments?: FileAttachment[]
}

interface FileAttachment {
  name: string
  size: number
  type: string
  url: string
}

interface ChatSystemProps {
  currentUserId: string
  currentUserType: "patient" | "doctor"
  recipientId: string
  recipientName: string
  recipientType: "patient" | "doctor"
}

// Global message store to sync between tabs
const getStoredMessages = (): Message[] => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("chat_messages")
    return stored
      ? JSON.parse(stored)
      : [
          {
            _id: "1",
            senderId: "doctor-123",
            receiverId: "patient-123",
            text: "Hello! How are you feeling today?",
            seen: false,
            createdAt: new Date(Date.now() - 3600000).toISOString(),
          },
          {
            _id: "2",
            senderId: "patient-123",
            receiverId: "doctor-123",
            text: "Hi Doctor! I'm feeling much better, thank you.",
            seen: true,
            createdAt: new Date(Date.now() - 3000000).toISOString(),
          },
          {
            _id: "3",
            senderId: "doctor-123",
            receiverId: "patient-123",
            text: "That's great to hear! Please continue taking your medication as prescribed.",
            seen: false,
            createdAt: new Date(Date.now() - 1800000).toISOString(),
          },
        ]
  } catch {
    return []
  }
}

const saveMessages = (messages: Message[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("chat_messages", JSON.stringify(messages))
    // Trigger storage event for other tabs
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "chat_messages",
        newValue: JSON.stringify(messages),
      }),
    )
  }
}

const markMessagesAsSeen = (currentUserId: string, recipientId: string) => {
  const allMessages = getStoredMessages()
  let hasUpdates = false
  const updatedMessages = allMessages.map((msg) => {
    // Mark messages as seen if they are from the recipient to current user and not already seen
    if (msg.senderId === recipientId && msg.receiverId === currentUserId && !msg.seen) {
      hasUpdates = true
      return { ...msg, seen: true }
    }
    return msg
  })
  if (hasUpdates) {
    saveMessages(updatedMessages)
  }
}

export function ChatSystem({
  currentUserId,
  currentUserType,
  recipientId,
  recipientName,
  recipientType,
}: ChatSystemProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load messages and mark as seen
  useEffect(() => {
    const loadMessages = () => {
      setLoading(true)
      const allMessages = getStoredMessages()
      // Filter messages for this conversation
      const conversationMessages = allMessages.filter(
        (msg) =>
          (msg.senderId === currentUserId && msg.receiverId === recipientId) ||
          (msg.senderId === recipientId && msg.receiverId === currentUserId),
      )
      setMessages(conversationMessages)
      setLoading(false)
      // Mark messages from recipient as seen
      setTimeout(() => {
        markMessagesAsSeen(currentUserId, recipientId)
      }, 1000) // Delay to simulate reading time
    }

    loadMessages()

    // Listen for storage changes (messages from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "chat_messages" && e.newValue) {
        try {
          const allMessages = JSON.parse(e.newValue)
          const conversationMessages = allMessages.filter(
            (msg: Message) =>
              (msg.senderId === currentUserId && msg.receiverId === recipientId) ||
              (msg.senderId === recipientId && msg.receiverId === currentUserId),
          )
          setMessages(conversationMessages)
          // Mark new messages from recipient as seen
          setTimeout(() => {
            markMessagesAsSeen(currentUserId, recipientId)
          }, 1000)
        } catch (error) {
          console.error("Error parsing messages:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [currentUserId, recipientId])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if ((!newMessage.trim() && attachedFiles.length === 0) || sending) return

    const messageText = newMessage.trim()
    const files = [...attachedFiles]
    setNewMessage("")
    setAttachedFiles([])
    setSending(true)

    // Create file attachments data
    const attachments: FileAttachment[] = files.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file), // In a real app, you'd upload to a server
    }))

    // Create new message with unique ID
    const newMsg: Message = {
      _id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      senderId: currentUserId,
      receiverId: recipientId,
      text: messageText || (files.length > 0 ? `📎 Sent ${files.length} file(s)` : ""),
      seen: false,
      createdAt: new Date().toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined,
    }

    try {
      // Get all messages, check for duplicates, add new one
      const allMessages = getStoredMessages()
      // Check if message already exists (prevent duplicates)
      const messageExists = allMessages.some(
        (msg) =>
          msg.text === newMsg.text &&
          msg.senderId === newMsg.senderId &&
          Math.abs(new Date(msg.createdAt).getTime() - new Date(newMsg.createdAt).getTime()) < 5000, // Within 5 seconds
      )

      if (!messageExists) {
        const updatedMessages = [...allMessages, newMsg]
        saveMessages(updatedMessages)
        // Update local state only if message doesn't exist
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === newMsg._id)
          if (exists) return prev
          return [...prev, newMsg]
        })
        console.log(`✅ Message sent from ${currentUserType} (${currentUserId}) to ${recipientType} (${recipientId})`)

        // Log file attachments
        if (files.length > 0) {
          console.log(`📎 Files attached: ${files.map((f) => f.name).join(", ")}`)
        }
      } else {
        console.log("⚠️ Duplicate message prevented")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setNewMessage(messageText) // Restore message on error
      setAttachedFiles(files) // Restore files on error
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Custom read receipt component
  const ReadReceipt = ({ message }: { message: Message }) => {
    if (message.senderId !== currentUserId) return null
    return (
      <span className="text-xs ml-2 opacity-70">
        {message.seen ? (
          <span className="text-blue-300">✓✓</span> // Double tick for seen
        ) : (
          <span className="opacity-50">✓</span> // Single tick for sent
        )}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading messages...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col max-h-[600px]">
      {/* Connection Status - Fixed height */}
      <div className="flex-shrink-0 flex items-center justify-between p-3 bg-gray-50 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            {recipientType === "doctor" ? (
              <Stethoscope className="w-4 h-4 text-white" />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{recipientName}</h3>
            <div className="flex items-center space-x-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-500">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Wifi className="w-3 h-3 mr-1" />
          Real-time Demo
        </div>
      </div>

      {/* Messages Area - Flexible height with proper constraints */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <div className="mb-2">No messages yet</div>
                  <div className="text-sm">Start the conversation!</div>
                </div>
              ) : (
                messages.map((message) => {
                  const isMyMessage = message.senderId === currentUserId
                  const senderName = message.senderId === "doctor-123" ? "Dr. Smith" : "John Patient"
                  return (
                    <div key={message._id}>
                      {/* Debug info - shows sender */}
                      <div className="text-xs text-gray-400 mb-1">
                        {senderName} • {isMyMessage ? "You" : "Them"}
                      </div>
                      <div className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-lg p-3 break-words ${
                            isMyMessage ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.text && <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>}

                          {/* File Attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center space-x-2 p-2 rounded ${
                                    isMyMessage ? "bg-emerald-600" : "bg-gray-200"
                                  }`}
                                >
                                  {attachment.type.startsWith("image/") ? (
                                    <ImageIcon className="w-4 h-4" />
                                  ) : (
                                    <FileText className="w-4 h-4" />
                                  )}
                                  <span className="text-xs truncate max-w-[150px]">{attachment.name}</span>
                                  <span className="text-xs opacity-70">({formatFileSize(attachment.size)})</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">{formatTime(message.createdAt)}</span>
                            <ReadReceipt message={message} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Input Area - Fixed height at bottom */}
      <div className="flex-shrink-0 border-t bg-white">
        <div className="p-4">
          <div className="mb-2 text-xs text-gray-500 flex items-center justify-between">
            <span>
              Sending as: <strong>{currentUserType === "doctor" ? "Dr. Smith" : "John Patient"}</strong>
            </span>
            <span className="text-xs">
              ✓ = Sent • <span className="text-blue-500">✓✓</span> = Seen
            </span>
          </div>

          {/* File Attachments Preview */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-2">Attached files:</div>
              <div className="space-y-1">
                {attachedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith("image/") ? (
                        <ImageIcon className="w-4 h-4 text-blue-500" />
                      ) : (
                        <FileText className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      <span className="text-xs text-gray-400">({formatFileSize(file.size)})</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder={`Type a message as ${currentUserType}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={sending}
                  className="flex-1"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={sending}
                  className="flex-shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={(!newMessage.trim() && attachedFiles.length === 0) || sending}
              className="bg-emerald-500 hover:bg-emerald-600 flex-shrink-0"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
