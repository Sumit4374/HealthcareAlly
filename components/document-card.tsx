"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Trash2, Eye, FileImage, FileIcon as FilePdf, FileSpreadsheet } from "lucide-react"
import type { Document, DocumentCategory } from "@/types/document"
import { deleteDocument } from "@/app/actions/document-actions"

interface DocumentCardProps {
  document: Document
  canDelete?: boolean
  onDeleted?: () => void
}

export function DocumentCard({ document, canDelete = false, onDeleted }: DocumentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this document?")) {
      setIsDeleting(true)
      try {
        const result = await deleteDocument(document.id)
        if (result.success) {
          onDeleted?.()
        } else {
          alert(`Failed to delete: ${result.error}`)
        }
      } catch (error) {
        console.error("Error deleting document:", error)
        alert("An error occurred while deleting the document")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCategoryLabel = (category: DocumentCategory): string => {
    const labels: Record<DocumentCategory, string> = {
      prescription: "Prescription",
      lab_report: "Lab Report",
      imaging: "Imaging",
      discharge_summary: "Discharge Summary",
      insurance: "Insurance",
      other: "Other",
    }
    return labels[category] || "Document"
  }

  const getFileIcon = () => {
    if (document.fileType.includes("pdf")) {
      return <FilePdf className="w-8 h-8 text-red-500" />
    } else if (document.fileType.includes("image")) {
      return <FileImage className="w-8 h-8 text-blue-500" />
    } else if (document.fileType.includes("excel") || document.fileType.includes("spreadsheet")) {
      return <FileSpreadsheet className="w-8 h-8 text-green-500" />
    } else {
      return <FileText className="w-8 h-8 text-gray-500" />
    }
  }

  const getCategoryColor = (category: DocumentCategory): string => {
    const colors: Record<DocumentCategory, string> = {
      prescription: "bg-purple-100 text-purple-800",
      lab_report: "bg-blue-100 text-blue-800",
      imaging: "bg-green-100 text-green-800",
      discharge_summary: "bg-yellow-100 text-yellow-800",
      insurance: "bg-gray-100 text-gray-800",
      other: "bg-gray-100 text-gray-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <>
      <Card className="bg-gray-800 border-gray-600 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start">
            <div className="mr-4 mt-1">{getFileIcon()}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white mb-1">{document.fileName}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(document.category)}`}>
                      {getCategoryLabel(document.category)}
                    </span>
                    <span className="text-xs text-gray-400">{formatFileSize(document.fileSize)}</span>
                    <span className="text-xs text-gray-400">{formatDate(document.uploadDate)}</span>
                  </div>
                  {document.description && <p className="text-sm text-gray-300 mb-2">{document.description}</p>}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-emerald-400 border-emerald-400 hover:bg-emerald-400 hover:text-white bg-transparent"
                    onClick={() => window.open(document.fileUrl, "_blank")}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                  {canDelete && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white bg-transparent"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">{document.fileName}</h3>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe src={document.fileUrl} className="w-full h-full" title={document.fileName} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
