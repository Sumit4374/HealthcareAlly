"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, TestTube, Plus, AlertCircle, CheckCircle, Hourglass, X, Search, CreditCard } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import type { LabAppointment } from "@/types/document"
import { 
  getPatientLabAppointments, 
  addLabAppointment, 
  updateLabAppointment, 
  deleteLabAppointment,
  initializeDemoLabAppointments 
} from "@/types/document"
import {
  getPatientLabAppointmentsList,
  createLabAppointment,
  updateLabAppointmentDetails,
  cancelLabAppointment,
  getUpcomingLabAppointments,
  getPastLabAppointments
} from "@/app/actions/lab-appointment-actions"

export default function PatientLabAppointmentsPage() {
  const [appointments, setAppointments] = useState<LabAppointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<LabAppointment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [labSuggestions] = useState([
    "City Medical Laboratory",
    "Advanced Diagnostics Lab", 
    "Quick Lab Services",
    "HealthFirst Lab Center",
    "Metro Clinical Labs",
    "Precision Diagnostics"
  ])

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

  const loadAppointments = async () => {
    setIsLoading(true)
    try {
      // Initialize demo data if needed
      initializeDemoLabAppointments()
      
      const result = await getPatientLabAppointmentsList(patientId)
      if (result.success) {
        setAppointments(result.appointments)
      } else {
        console.error("Error loading appointments:", result.error)
      }
    } catch (error) {
      console.error("Error loading lab appointments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadAppointments()
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
        
        // Show success notification
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
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

  return (
    <div className="flex min-h-screen bg-gray-900">
      <PatientSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Lab Appointments</h1>
              <p className="text-gray-400">Manage your laboratory test appointments</p>
            </div>

            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Book Lab Test
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-emerald-400">Book Lab Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
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
                        aria-label="Test Type"
                      >
                        <option value="">Select test type</option>
                        <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                        <option value="Lipid Profile">Lipid Profile</option>
                        <option value="Thyroid Function Test">Thyroid Function Test</option>
                        <option value="Liver Function Test">Liver Function Test</option>
                        <option value="Kidney Function Test">Kidney Function Test</option>
                        <option value="Diabetes Panel">Diabetes Panel</option>
                        <option value="Vitamin D Test">Vitamin D Test</option>
                        <option value="Urine Analysis">Urine Analysis</option>
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
                        aria-label="Fasting required for this test"
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

                  <div>
                    <Label htmlFor="notes" className="text-gray-300">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Additional notes"
                      rows={2}
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
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  <Hourglass className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 text-sm font-medium">UPCOMING</span>
                </div>
                <div className="text-3xl font-bold text-white">{upcomingAppointments.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                  <span className="text-green-400 text-sm font-medium">COMPLETED</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {appointments.filter(appt => appt.status === "completed").length}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-red-400 text-sm font-medium">REQUIRES FASTING</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {upcomingAppointments.filter(appt => appt.requiredFasting).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mb-2"></div>
              <p className="text-gray-400">Loading appointments...</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Upcoming Appointments */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Upcoming Appointments</h2>
                {upcomingAppointments.length === 0 ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-8 text-center">
                      <TestTube className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                      <p className="text-gray-400 text-lg font-medium">No upcoming appointments</p>
                      <p className="text-gray-500 text-sm">Book a lab test to get started</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {upcomingAppointments.map((appointment) => (
                      <Card key={appointment.id} className="bg-gray-800 border-gray-700 hover:border-emerald-500/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <TestTube className="w-5 h-5 text-emerald-400 mr-2" />
                                <h3 className="text-lg font-semibold text-white">{appointment.testType}</h3>
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
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Past Appointments</h2>
                {pastAppointments.length === 0 ? (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-400">No past appointments</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {pastAppointments.map((appointment) => (
                      <Card key={appointment.id} className="bg-gray-800 border-gray-700 opacity-75">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <TestTube className="w-5 h-5 text-gray-400 mr-2" />
                                <h3 className="text-lg font-semibold text-gray-300">{appointment.testType}</h3>
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
                              {appointment.reportAvailableDate && appointment.status === "completed" && (
                                <div className="mt-3 p-3 bg-emerald-900/30 border border-emerald-500/30 rounded-lg">
                                  <p className="text-emerald-300 text-sm">
                                    Report available from: {formatDate(appointment.reportAvailableDate)}
                                  </p>
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
                )}
              </div>
            </div>
          )}

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

                    {selectedAppointment.reportAvailableDate && (
                      <div>
                        <Label className="text-gray-300">Report Available</Label>
                        <p className="text-white font-medium">{formatDate(selectedAppointment.reportAvailableDate)}</p>
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
        </div>
      </div>
    </div>
  )
}
