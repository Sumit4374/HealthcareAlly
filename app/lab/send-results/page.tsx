// app/lab/send-results/page.tsx
"use client"

import { useState } from "react"
import { LabSidebar } from "@/components/lab-sidebar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function SendLabResults() {
  const [patientId, setPatientId] = useState("")
  const [testName, setTestName] = useState("")
  const [result, setResult] = useState("")

  const handleSend = () => {
    console.log({ patientId, testName, result })
    alert("Result sent to patient successfully!")
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <LabSidebar />
      <div className="flex-1 p-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Send Test Results</h1>
        <div className="mb-4">
          <label className="block mb-1">Patient ID</label>
          <Input value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Test Name</label>
          <Input value={testName} onChange={(e) => setTestName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Test Result</label>
          <Textarea value={result} onChange={(e) => setResult(e.target.value)} placeholder="Type the result here..." />
        </div>
        <Button onClick={handleSend}>Send Result</Button>
      </div>
    </div>
  )
}
