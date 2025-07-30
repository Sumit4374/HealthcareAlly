"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, Calendar, Phone, Mail, MapPin, FileText } from "lucide-react"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function HospitalPatientsPage() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Smith",
      age: 35,
      gender: "Male",
      phone: "+1 234-567-8901",
      email: "john.smith@email.com",
      address: "123 Main St, City",
      lastVisit: "2024-01-15",
      department: "Cardiology",
      doctor: "Dr. Sarah Johnson",
      status: "Active",
      admissionDate: "2024-01-10",
      condition: "Hypertension",
    },
    {
      id: 2,
      name: "Emily Davis",
      age: 28,
      gender: "Female",
      phone: "+1 234-567-8902",
      email: "emily.davis@email.com",
      address: "456 Oak Ave, City",
      lastVisit: "2024-01-12",
      department: "Dermatology",
      doctor: "Dr. Michael Chen",
      status: "Discharged",
      admissionDate: "2024-01-08",
      condition: "Skin Allergy",
    },
    {
      id: 3,
      name: "Robert Wilson",
      age: 45,
      gender: "Male",
      phone: "+1 234-567-8903",
      email: "robert.wilson@email.com",
      address: "789 Pine St, City",
      lastVisit: "2024-01-18",
      department: "Orthopedics",
      doctor: "Dr. Lisa Brown",
      status: "Admitted",
      admissionDate: "2024-01-18",
      condition: "Fracture",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || patient.status.toLowerCase() === filterStatus
    const matchesDepartment = filterDepartment === "all" || patient.department === filterDepartment

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "admitted":
        return "bg-blue-100 text-blue-800"
      case "discharged":
        return "bg-gray-100 text-gray-800"
      case "critical":
        return "bg-red-100 text-red-800"
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
            <h1 className="text-3xl font-bold text-white mb-2">Patient Records</h1>
            <p className="text-gray-400">Search and manage patient information</p>
          </div>

          {/* Search and Filters */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search patients by name, condition, or doctor..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="admitted">Admitted</SelectItem>
                    <SelectItem value="discharged">Discharged</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
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

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Department</p>
                          <p className="text-white">{patient.department}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Attending Doctor</p>
                          <p className="text-white">{patient.doctor}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Condition</p>
                          <p className="text-white">{patient.condition}</p>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Phone className="w-4 h-4 mr-1" />
                          <span className="text-sm">{patient.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Mail className="w-4 h-4 mr-1" />
                          <span className="text-sm">{patient.email}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="text-sm">Last Visit: {patient.lastVisit}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{patient.address}</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <FileText className="w-4 h-4 mr-1" />
                        View Records
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
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
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
