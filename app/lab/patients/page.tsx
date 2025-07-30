"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Phone, Mail, Calendar, TestTube, Search, Filter, Plus, Eye, Edit, History, MapPin } from "lucide-react"
import { LabSidebar } from "@/components/lab-sidebar"

export default function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const patients = [
    {
      id: 1,
      name: "Alice Brown",
      patientId: "P001",
      email: "alice.brown@email.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1985-03-15",
      address: "123 Main St, City, State 12345",
      lastVisit: "2025-07-30",
      totalTests: 5,
      status: "active",
      recentTests: [
        { type: "Complete Blood Count", date: "2025-07-30", status: "completed" },
        { type: "Lipid Profile", date: "2025-06-15", status: "completed" },
      ],
      medicalHistory: "Hypertension, managed with medication",
      emergencyContact: {
        name: "John Brown",
        relationship: "Spouse",
        phone: "+1 (555) 123-4568",
      },
    },
    {
      id: 2,
      name: "Bob Wilson",
      patientId: "P002",
      email: "bob.wilson@email.com",
      phone: "+1 (555) 234-5678",
      dateOfBirth: "1978-11-22",
      address: "456 Oak Ave, City, State 12345",
      lastVisit: "2025-07-29",
      totalTests: 3,
      status: "active",
      recentTests: [
        { type: "MRI Scan - Lower Back", date: "2025-07-29", status: "completed" },
        { type: "X-Ray - Spine", date: "2025-05-10", status: "completed" },
      ],
      medicalHistory: "Lower back pain, previous herniated disc",
      emergencyContact: {
        name: "Sarah Wilson",
        relationship: "Daughter",
        phone: "+1 (555) 234-5679",
      },
    },
    {
      id: 3,
      name: "Carol Davis",
      patientId: "P003",
      email: "carol.davis@email.com",
      phone: "+1 (555) 345-6789",
      dateOfBirth: "1992-07-08",
      address: "789 Pine St, City, State 12345",
      lastVisit: "2025-07-31",
      totalTests: 2,
      status: "active",
      recentTests: [{ type: "Lipid Profile", date: "2025-07-31", status: "processing" }],
      medicalHistory: "Family history of heart disease",
      emergencyContact: {
        name: "Mike Davis",
        relationship: "Brother",
        phone: "+1 (555) 345-6790",
      },
    },
    {
      id: 4,
      name: "David Miller",
      patientId: "P004",
      email: "david.miller@email.com",
      phone: "+1 (555) 456-7890",
      dateOfBirth: "1965-12-03",
      address: "321 Elm St, City, State 12345",
      lastVisit: "2025-07-30",
      totalTests: 8,
      status: "active",
      recentTests: [
        { type: "X-Ray - Chest", date: "2025-07-30", status: "completed" },
        { type: "Blood Test", date: "2025-07-15", status: "completed" },
      ],
      medicalHistory: "Diabetes Type 2, regular monitoring required",
      emergencyContact: {
        name: "Linda Miller",
        relationship: "Wife",
        phone: "+1 (555) 456-7891",
      },
    },
    {
      id: 5,
      name: "Emma Thompson",
      patientId: "P005",
      email: "emma.thompson@email.com",
      phone: "+1 (555) 567-8901",
      dateOfBirth: "1988-09-18",
      address: "654 Maple Dr, City, State 12345",
      lastVisit: "2025-07-28",
      totalTests: 4,
      status: "inactive",
      recentTests: [
        { type: "CT Scan - Abdomen", date: "2025-07-28", status: "completed" },
        { type: "Ultrasound", date: "2025-04-20", status: "completed" },
      ],
      medicalHistory: "Previous appendectomy, routine follow-up",
      emergencyContact: {
        name: "James Thompson",
        relationship: "Father",
        phone: "+1 (555) 567-8902",
      },
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getTestStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const calculateAge = (dateOfBirth) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || patient.status === filterStatus

    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex min-h-screen bg-gray-900">
      <LabSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Patient Management</h1>
              <p className="text-gray-400">Manage patient records and medical history</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Patient
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Patients</p>
                    <p className="text-2xl font-bold text-white">{patients.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Active Patients</p>
                    <p className="text-2xl font-bold text-white">
                      {patients.filter((patient) => patient.status === "active").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TestTube className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Tests</p>
                    <p className="text-2xl font-bold text-white">
                      {patients.reduce((sum, patient) => sum + patient.totalTests, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">This Month</p>
                    <p className="text-2xl font-bold text-white">
                      {patients.filter((patient) => patient.lastVisit.includes("2025-07")).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, patient ID, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Patients</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient List */}
          <div className="space-y-6">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-xl font-semibold text-white">{patient.name}</h3>
                        <span className="text-gray-400 text-sm">ID: {patient.patientId}</span>
                        {getStatusBadge(patient.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Age: {calculateAge(patient.dateOfBirth)} years</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TestTube className="w-4 h-4" />
                          <span>Total Tests: {patient.totalTests}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{patient.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Last Visit: {patient.lastVisit}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Tests */}
                  <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-3">Recent Tests</h4>
                    <div className="space-y-2">
                      {patient.recentTests.map((test, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <TestTube className="w-4 h-4 text-emerald-400" />
                            <span className="text-gray-300 text-sm">{test.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400 text-xs">{test.date}</span>
                            {getTestStatusBadge(test.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medical History */}
                  <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2">Medical History</h4>
                    <p className="text-gray-300 text-sm">{patient.medicalHistory}</p>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2">Emergency Contact</h4>
                    <div className="text-sm text-gray-300">
                      <p>
                        <strong>{patient.emergencyContact.name}</strong> ({patient.emergencyContact.relationship})
                      </p>
                      <p>{patient.emergencyContact.phone}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                    >
                      <History className="w-4 h-4 mr-2" />
                      Test History
                    </Button>

                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <TestTube className="w-4 h-4 mr-2" />
                      Schedule Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">No patients found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
