"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  TestTube, Calendar, Clock, MapPin, FlaskConical, FileText, Download, 
  Eye, Plus, Search, Filter, AlertCircle, CheckCircle, Hourglass, 
  X, CreditCard, TrendingUp, Activity, Brain
} from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { DocumentUpload } from "@/components/document-upload"
import type { LabAppointment, Document } from "@/types/document"
import {
  getPatientLabAppointmentsList,
  createLabAppointment,
  updateLabAppointmentDetails,
  cancelLabAppointment,
  getUpcomingLabAppointments,
  getPastLabAppointments
} from "@/app/actions/lab-appointment-actions"
import { getPatientDocumentsList } from "@/app/actions/document-actions"
import { initializeDemoDocuments, initializeDemoLabAppointments } from "@/types/document"

export default function LabManagementPage() {
  const [appointments, setAppointments] = useState<LabAppointment[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<LabAppointment | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // For demo purposes, we'll use a hardcoded patient ID
  const patientId = "patient-123"

  // Form state for new appointment
  const [newAppointment, setNewAppointment] = useState({
    labName: "",
    testType: "",
    appointmentDate: "",
    appointmentTime: "",
    location: "",
    instructions: "",
    estimatedDuration: 30,
    cost: 0,
    requiredFasting: false,
    notes: ""
  })

  const labSuggestions = [
    "City Medical Laboratory",
    "Advanced Diagnostics Lab", 
    "Quick Lab Services",
    "HealthFirst Lab Center",
    "Metro Clinical Labs",
    "Precision Diagnostics"
  ]

  const testTypes = [
    "Complete Blood Count (CBC)",
    "Lipid Profile",
    "Thyroid Function Test",
    "Liver Function Test",
    "Kidney Function Test",
    "Diabetes Panel",
    "Vitamin D Test",
    "Urine Analysis",
    "HbA1c Test",
    "Cardiac Markers"
  ]

  const loadData = async () => {
    setIsLoading(true)
    try {
      // Initialize demo data
      initializeDemoLabAppointments()
      initializeDemoDocuments()
      
      // Load appointments
      const appointmentResult = await getPatientLabAppointmentsList(patientId)
      if (appointmentResult.success) {
        setAppointments(appointmentResult.appointments)
      }

      // Load lab-related documents
      const documentResult = await getPatientDocumentsList(patientId)
      if (documentResult.success) {
        const labDocuments = documentResult.documents.filter((doc: Document) => 
          doc.category === "lab_report" || 
          doc.category === "lab_appointment" ||
          (doc.category === "other" && doc.fileName.toLowerCase().includes("lab"))
        )
        setDocuments(labDocuments)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleBookAppointment = async () => {
    try {
      const result = await createLabAppointment({
        patientId,
        ...newAppointment,
        status: "scheduled"
      })

      if (result.success) {
        setAppointments(prev => [...prev, result.appointment!])
        setIsBookingOpen(false)
        
        // Reset form
        setNewAppointment({
          labName: "",
          testType: "",
          appointmentDate: "",
          appointmentTime: "",
          location: "",
          instructions: "",
          estimatedDuration: 30,
          cost: 0,
          requiredFasting: false,
          notes: ""
        })
        
        alert("Lab appointment booked successfully!")
      } else {
        alert("Failed to book appointment: " + result.error)
      }
    } catch (error) {
      console.error("Error booking appointment:", error)
      alert("An error occurred while booking the appointment")
    }
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const result = await cancelLabAppointment(appointmentId)
      
      if (result.success) {
        setAppointments(prev => 
          prev.map(appt => 
            appt.id === appointmentId 
              ? { ...appt, status: "cancelled" as const }
              : appt
          )
        )
        alert("Appointment cancelled successfully!")
      } else {
        alert("Failed to cancel appointment: " + result.error)
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error)
      alert("An error occurred while cancelling the appointment")
    }
  }

  const handlePayment = (appointment: LabAppointment) => {
    setSelectedAppointment(appointment)
    setIsPaymentOpen(true)
  }

  const processPayment = async () => {
    if (!selectedAppointment) return

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const result = await updateLabAppointmentDetails(selectedAppointment.id, {
        status: "confirmed"
      })

      if (result.success) {
        setAppointments(prev => 
          prev.map(appt => 
            appt.id === selectedAppointment.id 
              ? { ...appt, status: "confirmed" as const }
              : appt
          )
        )
        setIsPaymentOpen(false)
        alert("Payment successful! Your appointment is confirmed.")
      } else {
        alert("Payment was successful but failed to update appointment status")
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Payment failed. Please try again.")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isUpcoming = (appointmentDate: string) => {
    const today = new Date()
    const apptDate = new Date(appointmentDate)
    return apptDate >= today
  }

  const upcomingAppointments = appointments.filter(appt => 
    isUpcoming(appt.appointmentDate) && appt.status !== "cancelled"
  )
  const pastAppointments = appointments.filter(appt => 
    !isUpcoming(appt.appointmentDate) || appt.status === "cancelled"
  )

  const labReports = documents.filter(doc => doc.category === "lab_report")
  const recentReports = documents.filter(doc => {
    const uploadDate = new Date(doc.uploadDate)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return uploadDate > weekAgo
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Hourglass className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <X className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <PatientSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Lab Management</h1>
            <p className="text-gray-400">Comprehensive lab appointments and reports management</p>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="appointments" className="text-gray-300 data-[state=active]:text-white">
                Appointments ({appointments.length})
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-gray-300 data-[state=active]:text-white">
                Reports ({labReports.length})
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-gray-300 data-[state=active]:text-white">
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TestTube className="w-6 h-6 text-emerald-400 mr-2" />
                      <span className="text-emerald-400 text-sm font-medium">TOTAL TESTS</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{appointments.length}</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-6 h-6 text-blue-400 mr-2" />
                      <span className="text-blue-400 text-sm font-medium">UPCOMING</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{upcomingAppointments.length}</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <FlaskConical className="w-6 h-6 text-purple-400 mr-2" />
                      <span className="text-purple-400 text-sm font-medium">REPORTS</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{labReports.length}</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
                      <span className="text-green-400 text-sm font-medium">THIS MONTH</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{recentReports.length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Book New Test</h3>
                    <p className="text-gray-400 text-sm mb-4">Schedule a new laboratory test</p>
                    <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Book Lab Test
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-emerald-400">Book Lab Appointment</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="labName" className="text-gray-300">Laboratory Name</Label>
                              <div className="relative">
                                <Input
                                  id="labName"
                                  value={newAppointment.labName}
                                  onChange={(e) => {
                                    setNewAppointment(prev => ({ ...prev, labName: e.target.value }))
                                    setSearchTerm(e.target.value)
                                  }}
                                  className="bg-gray-700 border-gray-600 text-white"
                                  placeholder="Search or enter lab name"
                                />
                                {searchTerm && (
                                  <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg">
                                    {labSuggestions
                                      .filter(lab => lab.toLowerCase().includes(searchTerm.toLowerCase()))
                                      .map((lab, index) => (
                                        <div
                                          key={index}
                                          className="px-3 py-2 text-white hover:bg-gray-600 cursor-pointer"
                                          onClick={() => {
                                            setNewAppointment(prev => ({ ...prev, labName: lab }))
                                            setSearchTerm("")
                                          }}
                                        >
                                          {lab}
                                        </div>
                                      ))
                                    }
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="testType" className="text-gray-300">Test Type</Label>
                              <select
                                id="testType"
                                value={newAppointment.testType}
                                onChange={(e) => setNewAppointment(prev => ({ ...prev, testType: e.target.value }))}
                                className="w-full h-10 px-3 py-2 text-sm border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                aria-label="Test Type Selection"
                              >
                                <option value="">Select test type</option>
                                {testTypes.map(test => (
                                  <option key={test} value={test}>{test}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="appointmentDate" className="text-gray-300">Date</Label>
                              <Input
                                id="appointmentDate"
                                type="date"
                                value={newAppointment.appointmentDate}
                                onChange={(e) => setNewAppointment(prev => ({ ...prev, appointmentDate: e.target.value }))}
                                className="bg-gray-700 border-gray-600 text-white"
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                            <div>
                              <Label htmlFor="appointmentTime" className="text-gray-300">Time</Label>
                              <Input
                                id="appointmentTime"
                                type="time"
                                value={newAppointment.appointmentTime}
                                onChange={(e) => setNewAppointment(prev => ({ ...prev, appointmentTime: e.target.value }))}
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="location" className="text-gray-300">Location</Label>
                            <Input
                              id="location"
                              value={newAppointment.location}
                              onChange={(e) => setNewAppointment(prev => ({ ...prev, location: e.target.value }))}
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="Enter lab address"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="cost" className="text-gray-300">Cost ($)</Label>
                              <Input
                                id="cost"
                                type="number"
                                value={newAppointment.cost}
                                onChange={(e) => setNewAppointment(prev => ({ ...prev, cost: Number(e.target.value) }))}
                                className="bg-gray-700 border-gray-600 text-white"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <Label htmlFor="duration" className="text-gray-300">Duration (minutes)</Label>
                              <Input
                                id="duration"
                                type="number"
                                value={newAppointment.estimatedDuration}
                                onChange={(e) => setNewAppointment(prev => ({ ...prev, estimatedDuration: Number(e.target.value) }))}
                                className="bg-gray-700 border-gray-600 text-white"
                                placeholder="30"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="fasting"
                                checked={newAppointment.requiredFasting}
                                onChange={(e) => setNewAppointment(prev => ({ ...prev, requiredFasting: e.target.checked }))}
                                className="rounded border-gray-600"
                                title="Fasting required for this test"
                              />
                              <Label htmlFor="fasting" className="text-gray-300">Fasting required</Label>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="instructions" className="text-gray-300">Pre-test Instructions</Label>
                            <Textarea
                              id="instructions"
                              value={newAppointment.instructions}
                              onChange={(e) => setNewAppointment(prev => ({ ...prev, instructions: e.target.value }))}
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="Any special instructions for the test"
                              rows={3}
                            />
                          </div>

                          <div className="flex justify-end space-x-3">
                            <Button 
                              variant="outline" 
                              onClick={() => setIsBookingOpen(false)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleBookAppointment}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              disabled={!newAppointment.labName || !newAppointment.testType || !newAppointment.appointmentDate || !newAppointment.appointmentTime}
                            >
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Upload Report</h3>
                    <p className="text-gray-400 text-sm mb-4">Add a new lab report to your records</p>
                    <DocumentUpload 
                      patientId={patientId} 
                      onUploadComplete={loadData}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Health Insights</h3>
                    <p className="text-gray-400 text-sm mb-4">View AI-powered health analysis</p>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => setActiveTab("analytics")}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {upcomingAppointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center">
                          <TestTube className="w-4 h-4 text-emerald-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">{appointment.testType}</p>
                            <p className="text-gray-400 text-sm">{appointment.labName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-300 text-sm">{formatDate(appointment.appointmentDate)}</p>
                          <Badge className={`${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {recentReports.slice(0, 2).map((report) => (
                      <div key={report.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center">
                          <FlaskConical className="w-4 h-4 text-purple-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">{report.fileName}</p>
                            <p className="text-gray-400 text-sm">{report.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-300 text-sm">{formatDate(report.uploadDate).split(',')[0]}</p>
                          <Badge className="bg-green-100 text-green-800 border-green-200">New</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Lab Appointments</h2>
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Book New Test
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>

              {/* Upcoming Appointments */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Upcoming Appointments</h3>
                {upcomingAppointments.length === 0 ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-8 text-center">
                      <TestTube className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                      <p className="text-gray-400 text-lg font-medium">No upcoming appointments</p>
                      <p className="text-gray-500 text-sm">Book a lab test to get started</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <Card key={appointment.id} className="bg-gray-800 border-gray-700 hover:border-emerald-500/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <TestTube className="w-5 h-5 text-emerald-400 mr-2" />
                                <h4 className="text-lg font-semibold text-white">{appointment.testType}</h4>
                                <Badge className={`ml-3 ${getStatusColor(appointment.status)}`}>
                                  <div className="flex items-center">
                                    {getStatusIcon(appointment.status)}
                                    <span className="ml-1 capitalize">{appointment.status}</span>
                                  </div>
                                </Badge>
                              </div>
                              <p className="text-emerald-400 font-medium">{appointment.labName}</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="flex items-center text-gray-300">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <span>{formatDate(appointment.appointmentDate)}</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                  <Clock className="w-4 h-4 mr-2" />
                                  <span>{appointment.appointmentTime} ({appointment.estimatedDuration} min)</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                  <MapPin className="w-4 h-4 mr-2" />
                                  <span className="truncate">{appointment.location}</span>
                                </div>
                              </div>
                              {appointment.requiredFasting && (
                                <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                                  <div className="flex items-center">
                                    <AlertCircle className="w-4 h-4 text-yellow-400 mr-2" />
                                    <span className="text-yellow-300 text-sm font-medium">Fasting Required</span>
                                  </div>
                                  <p className="text-yellow-200 text-sm mt-1">{appointment.instructions}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col space-y-2 ml-6">
                              <Button
                                onClick={() => {
                                  setSelectedAppointment(appointment)
                                  setIsDetailsOpen(true)
                                }}
                                variant="outline"
                                size="sm"
                                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                              >
                                View Details
                              </Button>
                              {appointment.status === "scheduled" && (
                                <>
                                  <Button
                                    onClick={() => handlePayment(appointment)}
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                  >
                                    <CreditCard className="w-4 h-4 mr-1" />
                                    Pay ${appointment.cost}
                                  </Button>
                                  <Button
                                    onClick={() => handleCancelAppointment(appointment.id)}
                                    variant="outline"
                                    size="sm"
                                    className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                  >
                                    Cancel
                                  </Button>
                                </>
                              )}
                              {appointment.status === "confirmed" && (
                                <div className="text-center">
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    Confirmed
                                  </Badge>
                                </div>
                              )}
                              <div className="text-center">
                                <span className="text-2xl font-bold text-emerald-400">${appointment.cost}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Appointments */}
              {pastAppointments.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Past Appointments</h3>
                  <div className="space-y-4">
                    {pastAppointments.slice(0, 5).map((appointment) => (
                      <Card key={appointment.id} className="bg-gray-800 border-gray-700 opacity-75">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <TestTube className="w-5 h-5 text-gray-400 mr-2" />
                                <h4 className="text-lg font-semibold text-gray-300">{appointment.testType}</h4>
                                <Badge className={`ml-3 ${getStatusColor(appointment.status)}`}>
                                  <div className="flex items-center">
                                    {getStatusIcon(appointment.status)}
                                    <span className="ml-1 capitalize">{appointment.status}</span>
                                  </div>
                                </Badge>
                              </div>
                              <p className="text-gray-400 font-medium">{appointment.labName}</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="flex items-center text-gray-400">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  <span>{formatDate(appointment.appointmentDate)}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                  <Clock className="w-4 h-4 mr-2" />
                                  <span>{appointment.appointmentTime}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                  <span className="text-lg font-bold">${appointment.cost}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2 ml-6">
                              <Button
                                onClick={() => {
                                  setSelectedAppointment(appointment)
                                  setIsDetailsOpen(true)
                                }}
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-gray-400 hover:bg-gray-700"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Lab Reports</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search reports..."
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-64"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {labReports.length === 0 ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-8 text-center">
                      <FlaskConical className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                      <p className="text-gray-400 text-lg font-medium">No lab reports yet</p>
                      <p className="text-gray-500 text-sm">Upload your first lab report to get started</p>
                    </CardContent>
                  </Card>
                ) : (
                  labReports.map((report) => (
                    <Card key={report.id} className="bg-gray-800 border-gray-700 hover:border-purple-500/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <FlaskConical className="w-6 h-6 text-purple-400" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-white font-medium truncate">{report.fileName}</h4>
                                <Badge className="bg-purple-100 text-purple-800 border-purple-200">Lab Report</Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>{formatFileSize(report.fileSize)}</span>
                                <span>•</span>
                                <span>{formatDate(report.uploadDate)}</span>
                                {report.description && (
                                  <>
                                    <span>•</span>
                                    <span className="truncate max-w-xs">{report.description}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                              onClick={() => {
                                setSelectedDocument(report)
                                setIsViewerOpen(true)
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Health Analytics</h2>
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">AI-Powered Insights</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Test Frequency</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Blood Tests</span>
                        <span className="text-emerald-400 font-medium">
                          {appointments.filter(a => a.testType.toLowerCase().includes('blood')).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Thyroid Tests</span>
                        <span className="text-blue-400 font-medium">
                          {appointments.filter(a => a.testType.toLowerCase().includes('thyroid')).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Lipid Profiles</span>
                        <span className="text-purple-400 font-medium">
                          {appointments.filter(a => a.testType.toLowerCase().includes('lipid')).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Health Trends</h3>
                    <div className="space-y-4">
                      <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-green-300 font-medium">Improving</span>
                        </div>
                        <p className="text-green-100 text-sm">Regular monitoring shows positive health trends</p>
                      </div>
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <Activity className="w-4 h-4 text-blue-400 mr-2" />
                          <span className="text-blue-300 font-medium">Consistent</span>
                        </div>
                        <p className="text-blue-100 text-sm">Lab values remain within normal ranges</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 md:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Health Recommendations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                        <Brain className="w-6 h-6 text-purple-400 mb-2" />
                        <h4 className="text-purple-300 font-medium mb-2">AI Insights</h4>
                        <p className="text-purple-100 text-sm">Based on your recent lab results, consider vitamin D supplementation</p>
                      </div>
                      <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-4">
                        <TestTube className="w-6 h-6 text-emerald-400 mb-2" />
                        <h4 className="text-emerald-300 font-medium mb-2">Next Tests</h4>
                        <p className="text-emerald-100 text-sm">Schedule annual comprehensive metabolic panel in 3 months</p>
                      </div>
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                        <Calendar className="w-6 h-6 text-blue-400 mb-2" />
                        <h4 className="text-blue-300 font-medium mb-2">Follow-up</h4>
                        <p className="text-blue-100 text-sm">Review thyroid function test results with your doctor</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Payment Dialog */}
          <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
              {selectedAppointment && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-emerald-400">Payment Confirmation</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">{selectedAppointment.testType}</h4>
                      <p className="text-gray-300 text-sm">{selectedAppointment.labName}</p>
                      <p className="text-gray-300 text-sm">
                        {formatDate(selectedAppointment.appointmentDate)} at {selectedAppointment.appointmentTime}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="text-white">Total Amount:</span>
                      <span className="text-emerald-400">${selectedAppointment.cost}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label className="text-gray-300">Card Number</Label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-gray-300">Expiry</Label>
                          <Input
                            placeholder="MM/YY"
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-300">CVV</Label>
                          <Input
                            placeholder="123"
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsPaymentOpen(false)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={processPayment}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Pay ${selectedAppointment.cost}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Appointment Details Dialog */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              {selectedAppointment && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-emerald-400">Appointment Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">Test Type</Label>
                        <p className="text-white font-medium">{selectedAppointment.testType}</p>
                      </div>
                      <div>
                        <Label className="text-gray-300">Laboratory</Label>
                        <p className="text-white font-medium">{selectedAppointment.labName}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">Date</Label>
                        <p className="text-white font-medium">{formatDate(selectedAppointment.appointmentDate)}</p>
                      </div>
                      <div>
                        <Label className="text-gray-300">Time</Label>
                        <p className="text-white font-medium">{selectedAppointment.appointmentTime} ({selectedAppointment.estimatedDuration} minutes)</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-300">Location</Label>
                      <p className="text-white font-medium">{selectedAppointment.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300">Cost</Label>
                        <p className="text-white font-medium">${selectedAppointment.cost}</p>
                      </div>
                      <div>
                        <Label className="text-gray-300">Fasting Required</Label>
                        <p className="text-white font-medium">{selectedAppointment.requiredFasting ? "Yes" : "No"}</p>
                      </div>
                    </div>

                    {selectedAppointment.instructions && (
                      <div>
                        <Label className="text-gray-300">Instructions</Label>
                        <p className="text-white">{selectedAppointment.instructions}</p>
                      </div>
                    )}

                    {selectedAppointment.notes && (
                      <div>
                        <Label className="text-gray-300">Notes</Label>
                        <p className="text-white">{selectedAppointment.notes}</p>
                      </div>
                    )}

                    <div>
                      <Label className="text-gray-300">Status</Label>
                      <Badge className={`ml-2 ${getStatusColor(selectedAppointment.status)}`}>
                        <div className="flex items-center">
                          {getStatusIcon(selectedAppointment.status)}
                          <span className="ml-1 capitalize">{selectedAppointment.status}</span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Document Viewer Dialog */}
          <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl h-[80vh]">
              {selectedDocument && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-emerald-400">{selectedDocument.fileName}</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 overflow-hidden">
                    <div className="h-full bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-300 mb-2">Document Preview</p>
                        <p className="text-gray-400 text-sm">File Type: {selectedDocument.fileType}</p>
                        <p className="text-gray-400 text-sm">Size: {formatFileSize(selectedDocument.fileSize)}</p>
                        <Button 
                          className="mt-4"
                          onClick={() => {
                            const link = window.document.createElement('a')
                            link.href = selectedDocument.fileUrl
                            link.download = selectedDocument.fileName
                            window.document.body.appendChild(link)
                            link.click()
                            window.document.body.removeChild(link)
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download to View
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
