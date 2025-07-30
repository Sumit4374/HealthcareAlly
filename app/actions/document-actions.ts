"use server"

import type { Document, DocumentCategory, DocumentUploadResponse, DocumentsListResponse } from "@/types/document"
import {
  addDocument,
  getPatientDocuments,
  getDoctorAccessibleDocuments,
  deleteDocument as deleteDocumentFromDb,
} from "@/lib/document-service"

export async function uploadDocument(
  patientId: string,
  fileName: string,
  fileType: string,
  fileSize: number,
  fileData: string,
  category: DocumentCategory,
  description?: string,
): Promise<DocumentUploadResponse> {
  try {
    if (!fileName || !patientId || !category || !fileData) {
      return {
        success: false,
        error: "Missing required fields",
      }
    }

    // Check file size (limit to 5MB for localStorage)
    if (fileSize > 5 * 1024 * 1024) {
      return {
        success: false,
        error: "File size must be less than 5MB",
      }
    }

    // Create document record
    const document: Document = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      patientId,
      fileName,
      fileType,
      fileSize,
      fileUrl: fileData, // Store base64 data directly
      category,
      uploadDate: new Date().toISOString(),
      description: description || undefined,
    }

    // Save to localStorage (this will be handled on client side)
    addDocument(document)

    return {
      success: true,
      document,
    }
  } catch (error) {
    console.error("Error uploading document:", error)
    return {
      success: false,
      error: "Failed to upload document",
    }
  }
}

export async function getPatientDocumentsList(patientId: string): Promise<DocumentsListResponse> {
  try {
    const documents = getPatientDocuments(patientId)

    return {
      success: true,
      documents: documents.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()),
    }
  } catch (error) {
    console.error("Error fetching patient documents:", error)
    return {
      success: false,
      documents: [],
      error: "Failed to fetch documents",
    }
  }
}

export async function getDoctorDocumentsList(doctorId: string): Promise<DocumentsListResponse> {
  try {
    const documents = getDoctorAccessibleDocuments(doctorId)

    return {
      success: true,
      documents: documents.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()),
    }
  } catch (error) {
    console.error("Error fetching doctor documents:", error)
    return {
      success: false,
      documents: [],
      error: "Failed to fetch documents",
    }
  }
}

export async function deleteDocument(documentId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const deleted = deleteDocumentFromDb(documentId)

    if (!deleted) {
      return {
        success: false,
        error: "Failed to delete document",
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting document:", error)
    return {
      success: false,
      error: "Failed to delete document",
    }
  }
}
