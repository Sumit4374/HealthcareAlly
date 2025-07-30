// app/lab/appointments/page.tsx
"use client"

import { useState } from "react"
import { LabSidebar } from "@/components/lab-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const demoAppointments = [
  { id: 1, patient: "John Doe", test: "Blood Test", date: "2025-08-01", time: "10:00", status: "pending" },
  { id: 2, patient: "Jane Smith", test: "MRI", date: "2025-08-02", time: "14:00", status: "pending" },
]

export default function LabAppointments() {
  const [appointments, setAppointments] = useState(demoAppointments)

  const updateStatus = (id: number, status: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <LabSidebar />
      <div className="flex-1 p-6 max-w-4xl space-y-4">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        {appointments.map((apt) => (
          <Card key={apt.id} className="bg-gray-800 border border-gray-700">
            <CardContent className="p-4">
              <p><strong>Patient:</strong> {apt.patient}</p>
              <p><strong>Test:</strong> {apt.test}</p>
              <p><strong>Date:</strong> {apt.date} at {apt.time}</p>
              <p><strong>Status:</strong> {apt.status}</p>
              {apt.status === "pending" && (
                <div className="mt-2 space-x-2">
                  <Button onClick={() => updateStatus(apt.id, "accepted")} className="bg-green-600">Accept</Button>
                  <Button onClick={() => updateStatus(apt.id, "rescheduled")} className="bg-yellow-600">Reschedule</Button>
                  <Button onClick={() => updateStatus(apt.id, "declined")} className="bg-red-600">Decline</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
