"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MessageCircle, CreditCard, MapPin } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { ChatSystem } from "@/components/chat-system"

export default function PatientAppointmentsPage() {
  const [appointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "confirmed",
      location: "City Hospital, Room 205",
      fee: 150,
      type: "consultation",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "2024-01-22",
      time: "2:30 PM",
      status: "pending",
      location: "Healthcare Center, Room 102",
      fee: 120,
      type: "follow-up",
    },
    {
      id: 3,
      doctorName: "Dr. Emily Davis",
      specialty: "Neurology",
      date: "2024-01-18",
      time: "9:00 AM",
      status: "completed",
      location: "Medical Plaza, Room 301",
      fee: 200,
      type: "consultation",
    },
  ])

  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status === "confirmed" || apt.status === "pending")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed")

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            <p className="text-gray-600">Manage your upcoming and past appointments</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-6 h-6 text-emerald-500 mr-2" />
                  <span className="text-emerald-600 text-sm font-medium">UPCOMING</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{upcomingAppointments.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-emerald-500 mr-2" />
                  <span className="text-emerald-600 text-sm font-medium">COMPLETED</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{pastAppointments.length}</div>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <User className="w-6 h-6 text-emerald-500 mr-2" />
                  <span className="text-emerald-600 text-sm font-medium">DOCTORS</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {new Set(appointments.map((apt) => apt.doctorName)).size}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          {upcomingAppointments.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-white border-emerald-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <User className="w-5 h-5 text-emerald-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                            <Badge className={`ml-3 ${getStatusColor(appointment.status)}`}>
                              {getStatusText(appointment.status)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-gray-600 text-sm">Specialty</p>
                              <p className="font-medium">{appointment.specialty}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">Type</p>
                              <p className="font-medium capitalize">{appointment.type}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">Date & Time</p>
                              <p className="font-medium">
                                {appointment.date} at {appointment.time}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">Fee</p>
                              <p className="font-medium">${appointment.fee}</p>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {appointment.location}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => {
                              setSelectedDoctor({
                                id: appointment.id,
                                name: appointment.doctorName,
                                specialty: appointment.specialty,
                              })
                              setIsChatOpen(true)
                            }}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          {appointment.status === "pending" && (
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                              <CreditCard className="w-4 h-4 mr-1" />
                              Pay Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Appointments</h2>
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <User className="w-5 h-5 text-gray-500 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                            <Badge className={`ml-3 ${getStatusColor(appointment.status)}`}>
                              {getStatusText(appointment.status)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-gray-600 text-sm">Specialty</p>
                              <p className="font-medium">{appointment.specialty}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">Date & Time</p>
                              <p className="font-medium">
                                {appointment.date} at {appointment.time}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-500 text-emerald-600 bg-transparent"
                            onClick={() => {
                              setSelectedDoctor({
                                id: appointment.id,
                                name: appointment.doctorName,
                                specialty: appointment.specialty,
                              })
                              setIsChatOpen(true)
                            }}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {appointments.length === 0 && (
            <Card className="bg-white border-emerald-200">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments yet</h3>
                <p className="text-gray-600">Book your first appointment to get started</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Chat Modal */}
      {isChatOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Chat with {selectedDoctor.name}</h3>
              <Button variant="outline" size="sm" onClick={() => setIsChatOpen(false)}>
                Close
              </Button>
            </div>
            <div className="flex-1">
              <ChatSystem
                currentUserId="patient-1"
                currentUserType="patient"
                recipientId={selectedDoctor.id.toString()}
                recipientName={selectedDoctor.name}
                recipientType="doctor"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
