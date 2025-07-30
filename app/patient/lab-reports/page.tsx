"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, AlertCircle, Search, Download, Eye, FlaskConical, TestTube, Calendar, Filter } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { DocumentUpload } from "@/components/document-upload"
import { DocumentCard } from "@/components/document-card"
import type { Document } from "@/types/document"
import { getPatientDocumentsList } from "@/app/actions/document-actions"
import { initializeDemoDocuments } from "@/types/document"

export default function PatientLabReportsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false)

  // For demo purposes, we'll use a hardcoded patient ID
  const patientId = "patient-123"

  const loadDocuments = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Initialize demo documents if needed
      initializeDemoDocuments()

      const result = await getPatientDocumentsList(patientId)

      if (result.success) {
        // Filter for lab reports and related documents
        const labDocuments = result.documents.filter((doc: Document) => 
          doc.category === "lab_report" || 
          doc.category === "lab_appointment" ||
          (doc.category === "other" && doc.fileName.toLowerCase().includes("lab"))
        )
        setDocuments(labDocuments)
      } else {
        setError(result.error || "Failed to load lab reports")
      }
    } catch (error) {
      console.error("Error loading lab reports:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  // Filter documents based on search term and date
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === "" || 
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDate = dateFilter === "" ||
      doc.uploadDate.includes(dateFilter)
    
    const matchesTab = activeTab === "all" || doc.category === activeTab
    
    return matchesSearch && matchesDate && matchesTab
  })

  // Group documents by category for stats
  const labReports = documents.filter(doc => doc.category === "lab_report")
  const labAppointments = documents.filter(doc => doc.category === "lab_appointment")
  const recentReports = documents.filter(doc => {
    const uploadDate = new Date(doc.uploadDate)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return uploadDate > weekAgo
  })

  const getDocumentIcon = (document: Document) => {
    if (document.category === "lab_report") {
      return <FlaskConical className="w-5 h-5 text-emerald-400" />
    } else if (document.category === "lab_appointment") {
      return <TestTube className="w-5 h-5 text-blue-400" />
    }
    return <FileText className="w-5 h-5 text-gray-400" />
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsViewerOpen(true)
  }

  const handleDownloadDocument = (doc: Document) => {
    try {
      // Create a blob from the base64 data
      const link = window.document.createElement('a')
      link.href = doc.fileUrl
      link.download = doc.fileName
      window.document.body.appendChild(link)
      link.click()
      window.document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading document:", error)
      alert("Failed to download document")
    }
  }

  const analyzeReport = (document: Document) => {
    setSelectedDocument(document)
    setIsAnalysisOpen(true)
  }

  const generateReportInsights = (document: Document) => {
    // Simulate AI-powered report analysis
    const insights = [
      "All parameters are within normal range",
      "Slight elevation in cholesterol levels - consider dietary changes",
      "Blood sugar levels are optimal",
      "Recommended to follow up in 3 months"
    ]
    return insights[Math.floor(Math.random() * insights.length)]
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <PatientSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Lab Reports</h1>
            <p className="text-gray-400">View and manage your laboratory test reports and appointments</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FlaskConical className="w-6 h-6 text-emerald-400 mr-2" />
                  <span className="text-emerald-400 text-sm font-medium">LAB REPORTS</span>
                </div>
                <div className="text-3xl font-bold text-white">{labReports.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TestTube className="w-6 h-6 text-blue-400 mr-2" />
                  <span className="text-blue-400 text-sm font-medium">APPOINTMENTS</span>
                </div>
                <div className="text-3xl font-bold text-white">{labAppointments.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-6 h-6 text-purple-400 mr-2" />
                  <span className="text-purple-400 text-sm font-medium">THIS WEEK</span>
                </div>
                <div className="text-3xl font-bold text-white">{recentReports.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 text-sm font-medium">TOTAL FILES</span>
                </div>
                <div className="text-3xl font-bold text-white">{documents.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Upload Section */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Upload Lab Documents</h3>
                  <DocumentUpload 
                    patientId={patientId} 
                    onUploadComplete={loadDocuments}
                  />
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gray-800 border-gray-700 mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => window.open("/patient/lab-appointments", "_self")}
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Book Lab Test
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => {
                        // Download all reports as a zip file (simulate)
                        alert("Downloading all reports... This feature will be available soon!")
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All Reports
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => {
                        setActiveTab("lab_report")
                      }}
                    >
                      <FlaskConical className="w-4 h-4 mr-2" />
                      View Test History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Documents List Section */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">My Lab Documents</h3>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search documents..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 w-64"
                        />
                      </div>
                      <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="date"
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="pl-10 bg-gray-700 border-gray-600 text-white w-44"
                        />
                      </div>
                    </div>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-gray-700 mb-6">
                      <TabsTrigger value="all" className="text-gray-300 data-[state=active]:text-white">
                        All ({documents.length})
                      </TabsTrigger>
                      <TabsTrigger value="lab_report" className="text-gray-300 data-[state=active]:text-white">
                        Reports ({labReports.length})
                      </TabsTrigger>
                      <TabsTrigger value="lab_appointment" className="text-gray-300 data-[state=active]:text-white">
                        Appointments ({labAppointments.length})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-0">
                      {isLoading ? (
                        <div className="text-center py-8">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mb-2"></div>
                          <p className="text-gray-400">Loading lab documents...</p>
                        </div>
                      ) : error ? (
                        <div className="text-center py-8 text-red-500">
                          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                          <p>{error}</p>
                        </div>
                      ) : filteredDocuments.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <FlaskConical className="w-12 h-12 mx-auto mb-2 opacity-30" />
                          <p className="text-lg font-medium">No lab documents found</p>
                          <p className="text-sm">
                            {searchTerm || dateFilter ? "Try adjusting your filters" : "Upload a lab report to get started"}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredDocuments.map((document) => (
                            <Card key={document.id} className="bg-gray-700 border-gray-600 hover:border-emerald-500/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4 flex-1">
                                    {getDocumentIcon(document)}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <h4 className="text-white font-medium truncate">{document.fileName}</h4>
                                        {getCategoryBadge(document.category)}
                                      </div>
                                      <div className="flex items-center space-x-4 text-sm text-gray-400">
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
                                      onClick={() => handleViewDocument(document)}
                                    >
                                      <Eye className="w-4 h-4 mr-1" />
                                      View
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                                      onClick={() => handleDownloadDocument(document)}
                                    >
                                      <Download className="w-4 h-4 mr-1" />
                                      Download
                                    </Button>
                                    {document.category === "lab_report" && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                                        onClick={() => analyzeReport(document)}
                                      >
                                        <FlaskConical className="w-4 h-4 mr-1" />
                                        Analyze
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Recent Test Results Summary */}
              {labReports.length > 0 && (
                <Card className="bg-gray-800 border-gray-700 mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Test Results Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {labReports.slice(0, 4).map((report) => (
                        <div key={report.id} className="bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <FlaskConical className="w-4 h-4 text-emerald-400 mr-2" />
                            <span className="text-white font-medium text-sm">{report.fileName}</span>
                          </div>
                          <p className="text-gray-400 text-xs">{report.description}</p>
                          <p className="text-gray-500 text-xs mt-1">{formatDate(report.uploadDate)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

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
                        onClick={() => handleDownloadDocument(selectedDocument)}
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

        {/* Report Analysis Dialog */}
        <Dialog open={isAnalysisOpen} onOpenChange={setIsAnalysisOpen}>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            {selectedDocument && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-purple-400">Report Analysis</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">{selectedDocument.fileName}</h4>
                    <p className="text-gray-300 text-sm">{selectedDocument.description}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Uploaded: {formatDate(selectedDocument.uploadDate)}
                    </p>
                  </div>
                  
                  <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <FlaskConical className="w-5 h-5 text-purple-400 mr-2" />
                      <h5 className="text-purple-300 font-medium">AI-Powered Insights</h5>
                    </div>
                    <p className="text-purple-100">{generateReportInsights(selectedDocument)}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-3">
                      <p className="text-gray-400 text-sm">Test Category</p>
                      <p className="text-white font-medium">{getCategoryBadge(selectedDocument.category)}</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3">
                      <p className="text-gray-400 text-sm">Report Status</p>
                      <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">
                        Normal Range
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-lg p-4">
                    <h5 className="text-emerald-300 font-medium mb-2">Recommendations</h5>
                    <ul className="text-emerald-100 text-sm space-y-1">
                      <li>• Continue with regular monitoring</li>
                      <li>• Maintain current lifestyle</li>
                      <li>• Schedule follow-up in 6 months</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAnalysisOpen(false)}>
                      Close
                    </Button>
                    <Button onClick={() => handleDownloadDocument(selectedDocument)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
