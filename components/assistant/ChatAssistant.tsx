'use client'
import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'

export default function ChatAssistant() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (input.trim() === '') return
    setMessages((prev) => [...prev, `👤: ${input}`, `🤖: (AI reply to "${input}")`])
    setInput('')
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} variant="outline">
          <MessageSquare className="mr-2" /> AI Assistant
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white border p-4 w-80 h-96 shadow-lg rounded-lg flex flex-col">
          <div className="overflow-y-auto flex-1 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex mt-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..." />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      )}
    </>
  )
}
