"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Search, Stethoscope, Plus, Phone, Mail, Edit, Trash2 } from "lucide-react"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function HospitalDoctorsPage() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      experience: 15,
      phone: "+1 234-567-8901",
      email: "sarah.johnson@healthcareally.com",
      licenseNumber: "MD123456",
      consultationFee: 150,
      status: "Active",
      joinDate: "2020-01-15",
      patients: 145,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Dermatology",
      experience: 12,
      phone: "+1 234-567-8902",
      email: "michael.chen@healthcareally.com",
      licenseNumber: "MD123457",
      consultationFee: 120,
      status: "Active",
      joinDate: "2021-03-10",
      patients: 98,
    },
    {
      id: 3,
      name: "Dr. Lisa Brown",
      specialization: "Orthopedics",
      experience: 18,
      phone: "+1 234-567-8903",
      email: "lisa.brown@healthcareally.com",
      licenseNumber: "MD123458",
      consultationFee: 180,
      status: "On Leave",
      joinDate: "2019-06-20",
      patients: 203,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialization, setFilterSpecialization] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<any>(null)

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    email: "",
    licenseNumber: "",
    consultationFee: "",
  })

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialization = filterSpecialization === "all" || doctor.specialization === filterSpecialization

    return matchesSearch && matchesSpecialization
  })

  const handleAddDoctor = () => {
    if (newDoctor.name && newDoctor.specialization && newDoctor.email) {
      const doctor = {
        id: Date.now(),
        ...newDoctor,
        experience: Number.parseInt(newDoctor.experience) || 0,
        consultationFee: Number.parseInt(newDoctor.consultationFee) || 0,
        status: "Active",
        joinDate: new Date().toISOString().split("T")[0],
        patients: 0,
      }
      setDoctors([...doctors, doctor])
      setNewDoctor({
        name: "",
        specialization: "",
        experience: "",
        phone: "",
        email: "",
        licenseNumber: "",
        consultationFee: "",
      })
      setIsDialogOpen(false)
      alert("Doctor added successfully!")
    }
  }

  const handleEditDoctor = (doctor: any) => {
    setEditingDoctor(doctor)
    setNewDoctor({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience.toString(),
      phone: doctor.phone,
      email: doctor.email,
      licenseNumber: doctor.licenseNumber,
      consultationFee: doctor.consultationFee.toString(),
    })
    setIsDialogOpen(true)
  }

  const handleUpdateDoctor = () => {
    if (editingDoctor && newDoctor.name && newDoctor.specialization && newDoctor.email) {
      setDoctors((prev) =>
        prev.map((doctor) =>
          doctor.id === editingDoctor.id
            ? {
                ...doctor,
                ...newDoctor,
                experience: Number.parseInt(newDoctor.experience) || 0,
                consultationFee: Number.parseInt(newDoctor.consultationFee) || 0,
              }
            : doctor,
        ),
      )
      setEditingDoctor(null)
      setNewDoctor({
        name: "",
        specialization: "",
        experience: "",
        phone: "",
        email: "",
        licenseNumber: "",
        consultationFee: "",
      })
      setIsDialogOpen(false)
      alert("Doctor updated successfully!")
    }
  }

  const handleDeleteDoctor = (doctorId: number) => {
    if (confirm("Are you sure you want to remove this doctor?")) {
      setDoctors((prev) => prev.filter((doctor) => doctor.id !== doctorId))
      alert("Doctor removed successfully!")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "On Leave":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Manage Doctors</h1>
              <p className="text-gray-400">Add, edit, and manage hospital doctors</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => {
                    setEditingDoctor(null)
                    setNewDoctor({
                      name: "",
                      specialization: "",
                      experience: "",
                      phone: "",
                      email: "",
                      licenseNumber: "",
                      consultationFee: "",
                    })
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Doctor
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter doctor's name"
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor((prev) => ({ ...prev, name: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select onValueChange={(value) => setNewDoctor((prev) => ({ ...prev, specialization: value }))}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder={newDoctor.specialization || "Select specialization"} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="Cardiology">Cardiology</SelectItem>
                          <SelectItem value="Dermatology">Dermatology</SelectItem>
                          <SelectItem value="Neurology">Neurology</SelectItem>
                          <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="Enter years of experience"
                        value={newDoctor.experience}
                        onChange={(e) => setNewDoctor((prev) => ({ ...prev, experience: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consultationFee">Consultation Fee (USD)</Label>
                      <Input
                        id="consultationFee"
                        type="number"
                        placeholder="Enter consultation fee"
                        value={newDoctor.consultationFee}
                        onChange={(e) => setNewDoctor((prev) => ({ ...prev, consultationFee: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        value={newDoctor.phone}
                        onChange={(e) => setNewDoctor((prev) => ({ ...prev, phone: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={newDoctor.email}
                        onChange={(e) => setNewDoctor((prev) => ({ ...prev, email: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="licenseNumber">Medical License Number</Label>
                    <Input
                      id="licenseNumber"
                      placeholder="Enter license number"
                      value={newDoctor.licenseNumber}
                      onChange={(e) => setNewDoctor((prev) => ({ ...prev, licenseNumber: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="border-gray-600 text-gray-300 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
                      className="bg-emerald-500 hover:bg-emerald-600"
                    >
                      {editingDoctor ? "Update Doctor" : "Add Doctor"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search doctors by name or specialization..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <Select onValueChange={setFilterSpecialization}>
                  <SelectTrigger className="w-[200px] bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Doctors List */}
          <div className="space-y-4">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <Stethoscope className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
                        <Badge className={`ml-3 ${getStatusColor(doctor.status)}`}>{doctor.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Specialization</p>
                          <p className="text-white">{doctor.specialization}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Experience</p>
                          <p className="text-white">{doctor.experience} years</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Consultation Fee</p>
                          <p className="text-white">${doctor.consultationFee}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Patients</p>
                          <p className="text-white">{doctor.patients}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-300">
                          <Phone className="w-4 h-4 mr-1" />
                          <span className="text-sm">{doctor.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Mail className="w-4 h-4 mr-1" />
                          <span className="text-sm">{doctor.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleEditDoctor(doctor)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent"
                        onClick={() => handleDeleteDoctor(doctor.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <Stethoscope className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No doctors found</h3>
                <p className="text-gray-400">Try adjusting your search criteria or add a new doctor</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
