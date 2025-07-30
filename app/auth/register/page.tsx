"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Stethoscope, Building2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("patient")
  const [formData, setFormData] = useState({
    // Patient fields
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    allergies: "",
    medicalHistory: "",

    // Doctor fields
    doctorName: "",
    doctorEmail: "",
    doctorPhone: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    qualification: "",
    hospitalAffiliation: "",
    consultationFee: "",

    // Hospital fields
    hospitalName: "",
    hospitalEmail: "",
    hospitalPhone: "",
    hospitalAddress: "",
    hospitalType: "",
    departments: "",
    bedCapacity: "",
    emergencyServices: "",
    accreditation: "",
    website: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Registration data:", { type: activeTab, ...formData })

    // Simulate registration success
    alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} registered successfully!`)

    // Redirect based on user type
    if (activeTab === "patient") {
      router.push("/patient/dashboard")
    } else if (activeTab === "doctor") {
      router.push("/doctor/dashboard")
    } else {
      router.push("/hospital/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-emerald-600">Join Healthcare Ally</CardTitle>
            <p className="text-gray-600">Create your account to get started</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="patient" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Patient
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger value="hospital" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Hospital
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="patient" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender *</Label>
                      <Select onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select onValueChange={(value) => handleInputChange("bloodGroup", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies">Known Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) => handleInputChange("allergies", e.target.value)}
                      placeholder="List any known allergies..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={(e) => handleInputChange("medicalHistory", e.target.value)}
                      placeholder="Brief medical history..."
                    />
                  </div>
                </TabsContent>

                <TabsContent value="doctor" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="doctorName">Full Name *</Label>
                      <Input
                        id="doctorName"
                        value={formData.doctorName}
                        onChange={(e) => handleInputChange("doctorName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorEmail">Email *</Label>
                      <Input
                        id="doctorEmail"
                        type="email"
                        value={formData.doctorEmail}
                        onChange={(e) => handleInputChange("doctorEmail", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorPhone">Phone Number *</Label>
                      <Input
                        id="doctorPhone"
                        value={formData.doctorPhone}
                        onChange={(e) => handleInputChange("doctorPhone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialization">Specialization *</Label>
                      <Select onValueChange={(value) => handleInputChange("specialization", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="psychiatry">Psychiatry</SelectItem>
                          <SelectItem value="general">General Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">Medical License Number *</Label>
                      <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="consultationFee">Consultation Fee (USD) *</Label>
                      <Input
                        id="consultationFee"
                        type="number"
                        value={formData.consultationFee}
                        onChange={(e) => handleInputChange("consultationFee", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalAffiliation">Hospital Affiliation</Label>
                      <Input
                        id="hospitalAffiliation"
                        value={formData.hospitalAffiliation}
                        onChange={(e) => handleInputChange("hospitalAffiliation", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="qualification">Qualifications *</Label>
                    <Textarea
                      id="qualification"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange("qualification", e.target.value)}
                      placeholder="List your medical qualifications..."
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="hospital" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hospitalName">Hospital Name *</Label>
                      <Input
                        id="hospitalName"
                        value={formData.hospitalName}
                        onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalEmail">Email *</Label>
                      <Input
                        id="hospitalEmail"
                        type="email"
                        value={formData.hospitalEmail}
                        onChange={(e) => handleInputChange("hospitalEmail", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalPhone">Phone Number *</Label>
                      <Input
                        id="hospitalPhone"
                        value={formData.hospitalPhone}
                        onChange={(e) => handleInputChange("hospitalPhone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalType">Hospital Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("hospitalType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hospital type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Hospital</SelectItem>
                          <SelectItem value="specialty">Specialty Hospital</SelectItem>
                          <SelectItem value="teaching">Teaching Hospital</SelectItem>
                          <SelectItem value="private">Private Hospital</SelectItem>
                          <SelectItem value="government">Government Hospital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bedCapacity">Bed Capacity *</Label>
                      <Input
                        id="bedCapacity"
                        type="number"
                        value={formData.bedCapacity}
                        onChange={(e) => handleInputChange("bedCapacity", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="accreditation">Accreditation</Label>
                      <Input
                        id="accreditation"
                        value={formData.accreditation}
                        onChange={(e) => handleInputChange("accreditation", e.target.value)}
                        placeholder="e.g., NABH, JCI"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyServices">Emergency Services</Label>
                      <Select onValueChange={(value) => handleInputChange("emergencyServices", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="24/7 Emergency?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes - 24/7</SelectItem>
                          <SelectItem value="limited">Limited Hours</SelectItem>
                          <SelectItem value="no">No Emergency Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hospitalAddress">Hospital Address *</Label>
                    <Textarea
                      id="hospitalAddress"
                      value={formData.hospitalAddress}
                      onChange={(e) => handleInputChange("hospitalAddress", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="departments">Departments/Services *</Label>
                    <Textarea
                      id="departments"
                      value={formData.departments}
                      onChange={(e) => handleInputChange("departments", e.target.value)}
                      placeholder="List available departments (e.g., Cardiology, Neurology, Emergency, ICU...)"
                      required
                    />
                  </div>
                </TabsContent>

                <div className="flex justify-between pt-6">
                  <Link href="/auth/login">
                    <Button type="button" variant="outline">
                      Already have an account? Sign In
                    </Button>
                  </Link>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    Create Account
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
