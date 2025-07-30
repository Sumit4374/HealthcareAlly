"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, AlertCircle, Search, User, Download } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"
import { DocumentCard } from "@/components/document-card"
import type { Document } from "@/types/document"
import { getDoctorDocumentsList } from "@/app/actions/document-actions"
import { initializeDemoDocuments } from "@/lib/document-service"

export default function DoctorPatientReportsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [patientFilter, setPatientFilter] = useState("all")

  // For demo purposes, we'll use a hardcoded doctor ID
  const doctorId = "doctor-123"

  // Demo patient names for display
  const patientNames: Record<string, string> = {
    "patient-123": "John Smith",
    "patient-456": "Sarah Johnson",
    "patient-789": "Michael Brown",
  }

  const loadDocuments = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Initialize demo documents if needed
      initializeDemoDocuments()

      const result = await getDoctorDocumentsList(doctorId)

      if (result.success) {
        setDocuments(result.documents)
        console.log("Loaded documents for doctor:", result.documents)
      } else {
        setError(result.error || "Failed to load documents")
      }
    } catch (error) {
      console.error("Error loading documents:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  // Get unique patient IDs from documents
  const patientIds = Array.from(new Set(documents.map((doc) => doc.patientId)))

  // Filter documents based on active tab, search term, and patient filter
  const filteredDocuments = documents.filter((doc) => {
    // Filter by category
    if (activeTab !== "all" && doc.category !== activeTab) {
      return false
    }

    // Filter by patient
    if (patientFilter !== "all" && doc.patientId !== patientFilter) {
      return false
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        doc.fileName.toLowerCase().includes(searchLower) ||
        doc.description?.toLowerCase().includes(searchLower) ||
        patientNames[doc.patientId]?.toLowerCase().includes(searchLower) ||
        false
      )
    }

    return true
  })

  // Group documents by patient for better organization
  const documentsByPatient = patientIds.reduce(
    (acc, patientId) => {
      acc[patientId] = filteredDocuments.filter((doc) => doc.patientId === patientId)
      return acc
    },
    {} as Record<string, Document[]>,
  )

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DoctorSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Patient Reports</h1>
            <p className="text-gray-400">View and manage medical documents for your patients</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-emerald-400 mr-2" />
                  <span className="text-emerald-400 text-sm font-medium">TOTAL DOCUMENTS</span>
                </div>
                <div className="text-3xl font-bold text-white">{documents.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <User className="w-6 h-6 text-emerald-400 mr-2" />
                  <span className="text-emerald-400 text-sm font-medium">PATIENTS</span>
                </div>
                <div className="text-3xl font-bold text-white">{patientIds.length}</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Download className="w-6 h-6 text-emerald-400 mr-2" />
                  <span className="text-emerald-400 text-sm font-medium">NEW THIS WEEK</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {
                    documents.filter((doc) => {
                      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                      return new Date(doc.uploadDate) > weekAgo
                    }).length
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                {/* Patient Filter */}
                <div>
                  <Select value={patientFilter} onValueChange={setPatientFilter}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Filter by patient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Patients</SelectItem>
                      {patientIds.map((id) => (
                        <SelectItem key={id} value={id}>
                          {patientNames[id] || id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Tabs */}
                <div className="md:col-span-3">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-gray-700">
                      <TabsTrigger value="all" className="text-gray-300 data-[state=active]:text-white">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="prescription" className="text-gray-300 data-[state=active]:text-white">
                        Prescriptions
                      </TabsTrigger>
                      <TabsTrigger value="lab_report" className="text-gray-300 data-[state=active]:text-white">
                        Lab Reports
                      </TabsTrigger>
                      <TabsTrigger value="imaging" className="text-gray-300 data-[state=active]:text-white">
                        Imaging
                      </TabsTrigger>
                      <TabsTrigger value="other" className="text-gray-300 data-[state=active]:text-white">
                        Other
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents List */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mb-2"></div>
                  <p className="text-gray-400">Loading patient reports...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-400">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>{error}</p>
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-lg font-medium">No documents found</p>
                  <p className="text-sm">Try adjusting your filters or ask patients to upload documents</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Show documents grouped by patient when no specific patient filter */}
                  {patientFilter === "all" ? (
                    Object.entries(documentsByPatient).map(([patientId, patientDocs]) => {
                      if (patientDocs.length === 0) return null

                      return (
                        <div key={patientId} className="mb-8">
                          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
                            <div className="flex items-center">
                              <User className="w-5 h-5 text-emerald-400 mr-2" />
                              <h3 className="text-lg font-semibold text-white">
                                {patientNames[patientId] || patientId}
                              </h3>
                              <span className="ml-3 text-sm text-gray-400">
                                ({patientDocs.length} document{patientDocs.length !== 1 ? "s" : ""})
                              </span>
                            </div>
                            <div className="text-sm text-gray-400">Patient ID: {patientId}</div>
                          </div>
                          <div className="space-y-4 pl-7">
                            {patientDocs.map((document) => (
                              <div key={document.id} className="bg-gray-700/30 rounded-lg p-1">
                                <DocumentCard document={document} canDelete={false} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    // Show documents without patient grouping when filtered to a specific patient
                    <div className="space-y-4">
                      <div className="flex items-center mb-4">
                        <User className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">{patientNames[patientFilter]} - Documents</h3>
                      </div>
                      {filteredDocuments.map((document) => (
                        <div key={document.id} className="bg-gray-700/30 rounded-lg p-1">
                          <DocumentCard document={document} canDelete={false} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
