"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, User, MessageCircle, FileText, Calendar } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { ChatSystem } from "@/components/chat-system"

export default function DoctorPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [patients] = useState([
    {
      id: 1,
      name: "John Smith",
      age: 35,
      gender: "Male",
      lastVisit: "2024-01-15",
      condition: "Hypertension",
      status: "Active",
      phone: "+1 234-567-8901",
      email: "john.smith@email.com",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 28,
      gender: "Female",
      lastVisit: "2024-01-10",
      condition: "Diabetes Type 2",
      status: "Active",
      phone: "+1 234-567-8902",
      email: "sarah.johnson@email.com",
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 45,
      gender: "Male",
      lastVisit: "2023-12-20",
      condition: "Arthritis",
      status: "Inactive",
      phone: "+1 234-567-8903",
      email: "michael.brown@email.com",
    },
  ])

  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DoctorSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">My Patients</h1>
            <p className="text-gray-400">Manage your patient records and communications</p>
          </div>

          {/* Search */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients by name or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </CardContent>
          </Card>

          {/* Patients List */}
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <User className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                        <span className="text-gray-400 ml-2">
                          ({patient.age} years, {patient.gender})
                        </span>
                        <Badge className={`ml-3 ${getStatusColor(patient.status)}`}>{patient.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-gray-400 text-sm">Last Visit</p>
                          <p className="text-white">{patient.lastVisit}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Primary Condition</p>
                          <p className="text-white">{patient.condition}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Phone</p>
                          <p className="text-white">{patient.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Email</p>
                          <p className="text-white">{patient.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          setSelectedPatient(patient)
                          setIsChatOpen(true)
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <FileText className="w-4 h-4 mr-1" />
                        Records
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No patients found</h3>
                <p className="text-gray-400">Try adjusting your search criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      {isChatOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Chat with {selectedPatient.name}</h3>
              <Button variant="outline" size="sm" onClick={() => setIsChatOpen(false)}>
                Close
              </Button>
            </div>
            <div className="flex-1 p-4">
              <ChatSystem
                currentUserId="doctor-1"
                currentUserType="doctor"
                recipientId={selectedPatient.id.toString()}
                recipientName={selectedPatient.name}
                recipientType="patient"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
