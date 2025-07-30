"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, AlertCircle } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { DocumentUpload } from "@/components/document-upload"
import { DocumentCard } from "@/components/document-card"
import type { Document } from "@/types/document"
import { getPatientDocumentsList } from "@/app/actions/document-actions"
import { initializeDemoDocuments } from "@/lib/document-service"

export default function PatientHealthRecordsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

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
        setDocuments(result.documents)
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

  const filteredDocuments = activeTab === "all" ? documents : documents.filter((doc) => doc.category === activeTab)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <PatientSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Records</h1>
            <p className="text-gray-600">Manage and view your medical documents</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Document Upload Section */}
            <div className="lg:col-span-1">
              <DocumentUpload patientId={patientId} onUploadComplete={loadDocuments} />
            </div>

            {/* Documents List Section */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">My Documents</h3>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
                      <TabsTrigger value="lab_report">Lab Reports</TabsTrigger>
                      <TabsTrigger value="lab_appointment">Lab Appointments</TabsTrigger>
                      <TabsTrigger value="imaging">Imaging</TabsTrigger>
                      <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-0">
                      {isLoading ? (
                        <div className="text-center py-8">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mb-2"></div>
                          <p className="text-gray-500">Loading documents...</p>
                        </div>
                      ) : error ? (
                        <div className="text-center py-8 text-red-500">
                          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                          <p>{error}</p>
                        </div>
                      ) : filteredDocuments.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
                          <p className="text-lg font-medium">No documents found</p>
                          <p className="text-sm">Upload a document to get started</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredDocuments.map((document) => (
                            <DocumentCard
                              key={document.id}
                              document={document}
                              canDelete={true}
                              onDeleted={loadDocuments}
                            />
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
