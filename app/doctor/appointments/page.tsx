"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Clock, User, Check, X, MessageCircle, DollarSign } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Smith",
      patientAge: 35,
      date: "2024-01-20",
      time: "10:00 AM",
      status: "pending",
      reason: "Regular checkup",
      urgency: "normal",
      requestedDate: "2024-01-20",
      requestedTime: "10:00 AM",
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      patientAge: 28,
      date: "2024-01-18",
      time: "2:30 PM",
      status: "confirmed",
      reason: "Follow-up consultation",
      urgency: "normal",
      requestedDate: "2024-01-18",
      requestedTime: "2:30 PM",
    },
  ])

  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [responseData, setResponseData] = useState({
    status: "",
    suggestedDate: "",
    suggestedTime: "",
    notes: "",
    consultationFee: "",
  })

  const handleAppointmentResponse = (appointmentId: number, action: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? {
              ...apt,
              status: action,
              ...(action === "confirmed" && responseData.suggestedDate && responseData.suggestedTime
                ? {
                    date: responseData.suggestedDate,
                    time: responseData.suggestedTime,
                  }
                : {}),
            }
          : apt,
      ),
    )

    if (action === "confirmed") {
      alert(`Appointment ${action} successfully! Patient will be notified.`)
    } else if (action === "declined") {
      alert("Appointment declined. Patient will be notified.")
    } else if (action === "rescheduled") {
      alert("Alternative time suggested. Patient will be notified.")
    }

    setSelectedAppointment(null)
    setResponseData({ status: "", suggestedDate: "", suggestedTime: "", notes: "", consultationFee: "" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "declined":
        return "bg-red-100 text-red-800"
      case "rescheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "bg-red-100 text-red-800"
      case "urgent":
        return "bg-orange-100 text-orange-800"
      case "normal":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DoctorSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Appointment Requests</h1>
            <p className="text-gray-400">Manage patient appointment requests</p>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <User className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">{appointment.patientName}</h3>
                        <span className="text-gray-400 ml-2">({appointment.patientAge} years)</span>
                        <Badge className={`ml-3 ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                        <Badge className={`ml-2 ${getUrgencyColor(appointment.urgency)}`}>
                          {appointment.urgency.charAt(0).toUpperCase() + appointment.urgency.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Requested: {appointment.requestedDate}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>Time: {appointment.requestedTime}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-3">
                        <strong>Reason:</strong> {appointment.reason}
                      </p>
                    </div>

                    <div className="flex flex-col space-y-2">
                      {appointment.status === "pending" && (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Accept
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 text-white border-gray-700">
                              <DialogHeader>
                                <DialogTitle>Confirm Appointment</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Date</Label>
                                    <Input
                                      type="date"
                                      value={responseData.suggestedDate || appointment.requestedDate}
                                      onChange={(e) =>
                                        setResponseData((prev) => ({ ...prev, suggestedDate: e.target.value }))
                                      }
                                      className="bg-gray-700 border-gray-600 text-white"
                                    />
                                  </div>
                                  <div>
                                    <Label>Time</Label>
                                    <Input
                                      type="time"
                                      value={responseData.suggestedTime || appointment.requestedTime}
                                      onChange={(e) =>
                                        setResponseData((prev) => ({ ...prev, suggestedTime: e.target.value }))
                                      }
                                      className="bg-gray-700 border-gray-600 text-white"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label>Consultation Fee (USD)</Label>
                                  <Input
                                    type="number"
                                    placeholder="Enter consultation fee"
                                    value={responseData.consultationFee}
                                    onChange={(e) =>
                                      setResponseData((prev) => ({ ...prev, consultationFee: e.target.value }))
                                    }
                                    className="bg-gray-700 border-gray-600 text-white"
                                  />
                                </div>
                                <div>
                                  <Label>Notes (Optional)</Label>
                                  <Textarea
                                    placeholder="Any additional notes for the patient"
                                    value={responseData.notes}
                                    onChange={(e) => setResponseData((prev) => ({ ...prev, notes: e.target.value }))}
                                    className="bg-gray-700 border-gray-600 text-white"
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => handleAppointmentResponse(appointment.id, "confirmed")}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Confirm Appointment
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                <Clock className="w-4 h-4 mr-1" />
                                Suggest Time
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-800 text-white border-gray-700">
                              <DialogHeader>
                                <DialogTitle>Suggest Alternative Time</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Suggested Date</Label>
                                    <Input
                                      type="date"
                                      value={responseData.suggestedDate}
                                      onChange={(e) =>
                                        setResponseData((prev) => ({ ...prev, suggestedDate: e.target.value }))
                                      }
                                      className="bg-gray-700 border-gray-600 text-white"
                                    />
                                  </div>
                                  <div>
                                    <Label>Suggested Time</Label>
                                    <Input
                                      type="time"
                                      value={responseData.suggestedTime}
                                      onChange={(e) =>
                                        setResponseData((prev) => ({ ...prev, suggestedTime: e.target.value }))
                                      }
                                      className="bg-gray-700 border-gray-600 text-white"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label>Reason for Change</Label>
                                  <Textarea
                                    placeholder="Explain why you're suggesting a different time"
                                    value={responseData.notes}
                                    onChange={(e) => setResponseData((prev) => ({ ...prev, notes: e.target.value }))}
                                    className="bg-gray-700 border-gray-600 text-white"
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                                    Cancel
                                  </Button>
                                  <Button
                                    onClick={() => handleAppointmentResponse(appointment.id, "rescheduled")}
                                    className="bg-blue-600 hover:bg-blue-700"
                                  >
                                    Suggest Time
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
                            onClick={() => handleAppointmentResponse(appointment.id, "declined")}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        </>
                      )}

                      {appointment.status === "confirmed" && (
                        <div className="space-y-2">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Chat with Patient
                          </Button>
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Request Payment
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
