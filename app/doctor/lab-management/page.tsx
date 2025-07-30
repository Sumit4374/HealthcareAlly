"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  TestTube, FlaskConical, FileText, User, Calendar, Clock, Search, 
  Download, Eye, Plus, Filter, AlertCircle, CheckCircle, TrendingUp,
  Brain, Activity, Stethoscope, ClipboardList, BarChart3
} from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import type { Document, LabAppointment } from "@/types/document"
import { getDoctorDocumentsList } from "@/app/actions/document-actions"
import { getAllLabAppointmentsList } from "@/app/actions/lab-appointment-actions"
import { initializeDemoDocuments, initializeDemoLabAppointments } from "@/types/document"

export default function DoctorLabManagementPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [appointments, setAppointments] = useState<LabAppointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [patientFilter, setPatientFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<LabAppointment | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isReportAnalysisOpen, setIsReportAnalysisOpen] = useState(false)
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false)

  // For demo purposes, we'll use a hardcoded doctor ID
  const doctorId = "doctor-123"

  // Demo patient names for display
  const patientNames: Record<string, string> = {
    "patient-123": "John Smith",
    "patient-456": "Sarah Johnson", 
    "patient-789": "Michael Brown",
  }

  // New report form state
  const [newReport, setNewReport] = useState({
    patientId: "",
    testType: "",
    testDate: "",
    findings: "",
    recommendations: "",
    followUpRequired: false,
    normalRange: "",
    patientValue: "",
    interpretation: ""
  })

  const loadData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Initialize demo data
      initializeDemoDocuments()
      initializeDemoLabAppointments()

      // Load lab-related documents (reports) for the doctor
      const docResult = await getDoctorDocumentsList(doctorId)
      if (docResult.success) {
        // Filter for lab-related documents
        const labDocuments = docResult.documents.filter((doc: Document) => 
          doc.category === "lab_report" || 
          doc.category === "lab_appointment" ||
          (doc.category === "other" && doc.fileName.toLowerCase().includes("lab"))
        )
        setDocuments(labDocuments)
      } else {
        setError(docResult.error || "Failed to load lab documents")
      }

      // Load all lab appointments to see patient appointments
      const appointmentResult = await getAllLabAppointmentsList()
      if (appointmentResult.success) {
        setAppointments(appointmentResult.appointments)
      }
    } catch (error) {
      console.error("Error loading data:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Get unique patient IDs from documents and appointments
  const allPatientIds = Array.from(new Set([
    ...documents.map(doc => doc.patientId),
    ...appointments.map(appt => appt.patientId)
  ]))

  // Filter documents and appointments
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === "" || 
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientNames[doc.patientId]?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPatient = patientFilter === "all" || doc.patientId === patientFilter
    
    return matchesSearch && matchesPatient
  })

  const filteredAppointments = appointments.filter(appt => {
    const matchesSearch = searchTerm === "" ||
      appt.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patientNames[appt.patientId]?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPatient = patientFilter === "all" || appt.patientId === patientFilter
    const matchesStatus = statusFilter === "all" || appt.status === statusFilter
    
    return matchesSearch && matchesPatient && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "lab_report":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Lab Report</Badge>
      case "lab_appointment":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Lab Appointment</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Other</Badge>
    }
  }

  const generateLabInsights = (document: Document) => {
    const insights = [
      "Patient shows normal values across all parameters",
      "Slight elevation in cholesterol - recommend dietary consultation",
      "Glucose levels within normal range - continue current treatment",
      "Thyroid function optimal - no changes needed",
      "Vitamin D deficiency detected - supplementation recommended",
      "Kidney function markers are excellent",
      "Liver enzymes slightly elevated - monitor closely"
    ]
    return insights[Math.floor(Math.random() * insights.length)]
  }

  const handleCreateReport = () => {
    // Simulate report creation
    console.log("Creating lab report:", newReport)
    setIsCreateReportOpen(false)
    
    // Reset form
    setNewReport({
      patientId: "",
      testType: "",
      testDate: "",
      findings: "",
      recommendations: "",
      followUpRequired: false,
      normalRange: "",
      patientValue: "",
      interpretation: ""
    })
    
    alert("Lab report created successfully!")
  }

  // Statistics
  const totalReports = documents.filter(doc => doc.category === "lab_report").length
  const pendingAppointments = appointments.filter(appt => appt.status === "scheduled" || appt.status === "confirmed").length
  const completedThisWeek = appointments.filter(appt => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return new Date(appt.appointmentDate) > weekAgo && appt.status === "completed"
  }).length
  const abnormalResults = Math.floor(totalReports * 0.15) // Simulate 15% abnormal results

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DoctorSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Lab Management</h1>
            <p className="text-gray-400">Comprehensive lab reports and patient test management</p>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-gray-300 data-[state=active]:text-white">
                Lab Reports ({totalReports})
              </TabsTrigger>
              <TabsTrigger value="appointments" className="text-gray-300 data-[state=active]:text-white">
                Patient Tests ({appointments.length})
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
                      <FlaskConical className="w-6 h-6 text-emerald-400 mr-2" />
                      <span className="text-emerald-400 text-sm font-medium">TOTAL REPORTS</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{totalReports}</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TestTube className="w-6 h-6 text-blue-400 mr-2" />
                      <span className="text-blue-400 text-sm font-medium">PENDING TESTS</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{pendingAppointments}</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                      <span className="text-green-400 text-sm font-medium">THIS WEEK</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{completedThisWeek}</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
                      <span className="text-red-400 text-sm font-medium">ABNORMAL</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{abnormalResults}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Create Lab Report</h3>
                    <p className="text-gray-400 text-sm mb-4">Document test results for patients</p>
                    <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Report
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-emerald-400">Create Lab Report</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-300">Patient</Label>
                              <select 
                                className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md"
                                value={newReport.patientId}
                                onChange={(e) => setNewReport(prev => ({ ...prev, patientId: e.target.value }))}
                                aria-label="Select patient"
                              >
                                <option value="">Select patient</option>
                                {allPatientIds.map(id => (
                                  <option key={id} value={id}>
                                    {patientNames[id] || id}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <Label className="text-gray-300">Test Type</Label>
                              <select 
                                className="w-full bg-gray-700 border border-gray-600 text-white p-2 rounded-md"
                                value={newReport.testType}
                                onChange={(e) => setNewReport(prev => ({ ...prev, testType: e.target.value }))}
                                aria-label="Test Type"
                              >
                                <option value="">Select test type</option>
                                <option value="Complete Blood Count">Complete Blood Count</option>
                                <option value="Lipid Profile">Lipid Profile</option>
                                <option value="Thyroid Function">Thyroid Function</option>
                                <option value="Liver Function">Liver Function</option>
                                <option value="Kidney Function">Kidney Function</option>
                                <option value="Diabetes Panel">Diabetes Panel</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-gray-300">Test Date</Label>
                              <Input
                                type="date"
                                value={newReport.testDate}
                                onChange={(e) => setNewReport(prev => ({ ...prev, testDate: e.target.value }))}
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-gray-300">Patient Value</Label>
                              <Input
                                value={newReport.patientValue}
                                onChange={(e) => setNewReport(prev => ({ ...prev, patientValue: e.target.value }))}
                                className="bg-gray-700 border-gray-600 text-white"
                                placeholder="e.g., 85 mg/dL"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-gray-300">Normal Range</Label>
                            <Input
                              value={newReport.normalRange}
                              onChange={(e) => setNewReport(prev => ({ ...prev, normalRange: e.target.value }))}
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="e.g., 70-100 mg/dL"
                            />
                          </div>

                          <div>
                            <Label className="text-gray-300">Findings</Label>
                            <Textarea
                              value={newReport.findings}
                              onChange={(e) => setNewReport(prev => ({ ...prev, findings: e.target.value }))}
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="Detailed findings and observations"
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label className="text-gray-300">Interpretation</Label>
                            <Textarea
                              value={newReport.interpretation}
                              onChange={(e) => setNewReport(prev => ({ ...prev, interpretation: e.target.value }))}
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="Clinical interpretation of results"
                              rows={2}
                            />
                          </div>

                          <div>
                            <Label className="text-gray-300">Recommendations</Label>
                            <Textarea
                              value={newReport.recommendations}
                              onChange={(e) => setNewReport(prev => ({ ...prev, recommendations: e.target.value }))}
                              className="bg-gray-700 border-gray-600 text-white"
                              placeholder="Treatment recommendations and next steps"
                              rows={3}
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="followUp"
                              title="Follow-up required"
                              checked={newReport.followUpRequired}
                              onChange={(e) => setNewReport(prev => ({ ...prev, followUpRequired: e.target.checked }))}
                              className="rounded border-gray-600"
                            />
                            <Label htmlFor="followUp" className="text-gray-300">Follow-up required</Label>
                          </div>

                          <div className="flex justify-end space-x-3">
                            <Button 
                              variant="outline" 
                              onClick={() => setIsCreateReportOpen(false)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleCreateReport}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              disabled={!newReport.patientId || !newReport.testType || !newReport.findings}
                            >
                              Create Report
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Review Tests</h3>
                    <p className="text-gray-400 text-sm mb-4">View pending patient lab appointments</p>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setActiveTab("appointments")}
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      View Appointments
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Analytics</h3>
                    <p className="text-gray-400 text-sm mb-4">View lab statistics and trends</p>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => setActiveTab("analytics")}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Lab Activity</h3>
                  <div className="space-y-3">
                    {filteredDocuments.slice(0, 5).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center">
                          <FlaskConical className="w-4 h-4 text-emerald-400 mr-3" />
                          <div>
                            <p className="text-white font-medium">{doc.fileName}</p>
                            <p className="text-gray-400 text-sm">{patientNames[doc.patientId]} • {doc.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-300 text-sm">{formatDate(doc.uploadDate)}</p>
                          {getCategoryBadge(doc.category)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-64"
                    />
                  </div>
                  <select
                    className="bg-gray-700 border border-gray-600 text-white p-2 rounded-md w-48"
                    value={patientFilter}
                    onChange={(e) => setPatientFilter(e.target.value)}
                    aria-label="Filter by patient"
                  >
                    <option value="all">All Patients</option>
                    {allPatientIds.map(id => (
                      <option key={id} value={id}>
                        {patientNames[id] || id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredDocuments.length === 0 ? (
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-8 text-center">
                    <FlaskConical className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400 text-lg font-medium">No lab reports found</p>
                    <p className="text-gray-500 text-sm">Try adjusting your search filters</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredDocuments.map((document) => (
                    <Card key={document.id} className="bg-gray-800 border-gray-700 hover:border-emerald-500/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <FlaskConical className="w-6 h-6 text-emerald-400" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-white font-medium truncate">{document.fileName}</h4>
                                {getCategoryBadge(document.category)}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <div className="flex items-center">
                                  <User className="w-3 h-3 mr-1" />
                                  <span>{patientNames[document.patientId]}</span>
                                </div>
                                <span>•</span>
                                <span>{formatFileSize(document.fileSize)}</span>
                                <span>•</span>
                                <span>{formatDate(document.uploadDate)}</span>
                                {document.description && (
                                  <>
                                    <span>•</span>
                                    <span className="truncate max-w-xs">{document.description}</span>
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
                                setSelectedDocument(document)
                                setIsViewerOpen(true)
                              }}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                              onClick={() => {
                                setSelectedDocument(document)
                                setIsReportAnalysisOpen(true)
                              }}
                            >
                              <Brain className="w-4 h-4 mr-1" />
                              Analyze
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
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Patient Lab Tests</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search tests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-64"
                    />
                  </div>
                  <select
                    className="bg-gray-700 border border-gray-600 text-white p-2 rounded-md w-40"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter by status"
                  >
                    <option value="all">All Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <TestTube className="w-5 h-5 text-blue-400 mr-2" />
                            <h4 className="text-lg font-semibold text-white">{appointment.testType}</h4>
                            <Badge className={`ml-3 ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex items-center text-gray-300">
                              <User className="w-4 h-4 mr-2" />
                              <span>{patientNames[appointment.patientId]}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>{formatDate(appointment.appointmentDate)}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{appointment.appointmentTime}</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                              <span className="font-bold">${appointment.cost}</span>
                            </div>
                          </div>
                          <p className="text-gray-400 mt-2">{appointment.labName}</p>
                          {appointment.instructions && (
                            <p className="text-gray-500 text-sm mt-1">{appointment.instructions}</p>
                          )}
                        </div>
                        <div className="flex flex-col space-y-2 ml-6">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                          >
                            View Details
                          </Button>
                          {appointment.status === "completed" && (
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <ClipboardList className="w-4 h-4 mr-1" />
                              Create Report
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Lab Analytics</h2>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 text-sm font-medium">Data Insights</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Test Distribution</h3>
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
                    <h3 className="text-lg font-semibold text-white mb-4">Monthly Trends</h3>
                    <div className="space-y-4">
                      <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                          <span className="text-green-300 font-medium">Increasing</span>
                        </div>
                        <p className="text-green-100 text-sm">25% more lab orders this month</p>
                      </div>
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <Activity className="w-4 h-4 text-blue-400 mr-2" />
                          <span className="text-blue-300 font-medium">Completion Rate</span>
                        </div>
                        <p className="text-blue-100 text-sm">92% appointment completion rate</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700 md:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Patient Insights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-4">
                        <Stethoscope className="w-6 h-6 text-emerald-400 mb-2" />
                        <h4 className="text-emerald-300 font-medium mb-2">Frequent Tests</h4>
                        <p className="text-emerald-100 text-sm">Blood sugar monitoring is most common among diabetic patients</p>
                      </div>
                      <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                        <Brain className="w-6 h-6 text-purple-400 mb-2" />
                        <h4 className="text-purple-300 font-medium mb-2">AI Insights</h4>
                        <p className="text-purple-100 text-sm">Early detection patterns identified in routine screenings</p>
                      </div>
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
                        <Activity className="w-6 h-6 text-blue-400 mb-2" />
                        <h4 className="text-blue-300 font-medium mb-2">Health Trends</h4>
                        <p className="text-blue-100 text-sm">Overall patient health metrics showing improvement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

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
                        <p className="text-gray-400 text-sm">Patient: {patientNames[selectedDocument.patientId]}</p>
                        <p className="text-gray-400 text-sm">File Type: {selectedDocument.fileType}</p>
                        <p className="text-gray-400 text-sm">Size: {formatFileSize(selectedDocument.fileSize)}</p>
                        <Button className="mt-4">
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

          {/* Report Analysis Dialog */}
          <Dialog open={isReportAnalysisOpen} onOpenChange={setIsReportAnalysisOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              {selectedDocument && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-purple-400">Lab Report Analysis</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">{selectedDocument.fileName}</h4>
                      <p className="text-gray-300 text-sm">Patient: {patientNames[selectedDocument.patientId]}</p>
                      <p className="text-gray-300 text-sm">{selectedDocument.description}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        Date: {formatDate(selectedDocument.uploadDate)}
                      </p>
                    </div>
                    
                    <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Brain className="w-5 h-5 text-purple-400 mr-2" />
                        <h5 className="text-purple-300 font-medium">AI-Powered Analysis</h5>
                      </div>
                      <p className="text-purple-100">{generateLabInsights(selectedDocument)}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-gray-400 text-sm">Report Category</p>
                        <p className="text-white font-medium">{getCategoryBadge(selectedDocument.category)}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-gray-400 text-sm">Clinical Status</p>
                        <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">
                          Within Normal Limits
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-4">
                      <h5 className="text-emerald-300 font-medium mb-2">Clinical Recommendations</h5>
                      <ul className="text-emerald-100 text-sm space-y-1">
                        <li>• Continue current medication regimen</li>
                        <li>• Monitor patient closely for 2 weeks</li>
                        <li>• Schedule follow-up appointment</li>
                        <li>• Consider dietary modifications</li>
                      </ul>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsReportAnalysisOpen(false)}>
                        Close
                      </Button>
                      <Button>
                        <ClipboardList className="w-4 h-4 mr-2" />
                        Add to Patient Notes
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
