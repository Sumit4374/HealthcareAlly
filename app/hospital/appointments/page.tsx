"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Search } from "lucide-react"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function HospitalAppointmentsPage() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Smith",
      doctorName: "Dr. Sarah Johnson",
      department: "Cardiology",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "confirmed",
      type: "consultation",
      room: "Room 201",
    },
    {
      id: 2,
      patientName: "Emily Davis",
      doctorName: "Dr. Michael Chen",
      department: "Dermatology",
      date: "2024-01-20",
      time: "2:30 PM",
      status: "pending",
      type: "follow-up",
      room: "Room 105",
    },
    {
      id: 3,
      patientName: "Robert Wilson",
      doctorName: "Dr. Lisa Brown",
      department: "Orthopedics",
      date: "2024-01-21",
      time: "9:00 AM",
      status: "completed",
      type: "surgery",
      room: "OR 3",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || appointment.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || appointment.department === filterDepartment

    return matchesSearch && matchesStatus && matchesDepartment
  })

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-purple-100 text-purple-800"
      case "follow-up":
        return "bg-blue-100 text-blue-800"
      case "surgery":
        return "bg-red-100 text-red-800"
      case "emergency":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <HospitalSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Hospital Appointments</h1>
            <p className="text-gray-400">View and manage all hospital appointments</p>
          </div>

          {/* Filters */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <Select onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-[150px] bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appointments List */}
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <User className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">{appointment.patientName}</h3>
                        <Badge className={`ml-3 ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                        <Badge className={`ml-2 ${getTypeColor(appointment.type)}`}>
                          {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-gray-400 text-sm">Doctor</p>
                          <p className="text-white">{appointment.doctorName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Department</p>
                          <p className="text-white">{appointment.department}</p>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white">{appointment.room}</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        View Details
                      </Button>
                      {appointment.status === "pending" && (
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                          Confirm
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No appointments found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
