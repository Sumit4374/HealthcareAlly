import type { Document } from "@/types/document"

// In a real app, this would be stored in a database
// For demo purposes, we'll use localStorage
const DOCUMENTS_STORAGE_KEY = "health_documents"

// Patient-doctor assignments for demo purposes
const PATIENT_DOCTOR_ASSIGNMENTS = {
  "patient-123": ["doctor-123"], // John Smith assigned to Dr. Smith
  "patient-456": ["doctor-456", "doctor-123"], // Sarah Johnson assigned to both doctors
  "patient-789": ["doctor-789"], // Michael Brown assigned to Dr. Davis
}

export function getAssignedDoctors(patientId: string): string[] {
  return PATIENT_DOCTOR_ASSIGNMENTS[patientId as keyof typeof PATIENT_DOCTOR_ASSIGNMENTS] || []
}

export function isPatientAssignedToDoctor(patientId: string, doctorId: string): boolean {
  const assignedDoctors = getAssignedDoctors(patientId)
  return assignedDoctors.includes(doctorId)
}

export function getAllDocuments(): Document[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(DOCUMENTS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error retrieving documents:", error)
    return []
  }
}

export function saveAllDocuments(documents: Document[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(documents))
  } catch (error) {
    console.error("Error saving documents:", error)
  }
}

export function getPatientDocuments(patientId: string): Document[] {
  const allDocuments = getAllDocuments()
  return allDocuments.filter((doc) => doc.patientId === patientId)
}

export function getDoctorAccessibleDocuments(doctorId: string): Document[] {
  const allDocuments = getAllDocuments()
  console.log("All documents:", allDocuments)
  console.log("Doctor ID:", doctorId)

  const accessibleDocs = allDocuments.filter((doc) => {
    const isAssigned = isPatientAssignedToDoctor(doc.patientId, doctorId)
    console.log(`Patient ${doc.patientId} assigned to doctor ${doctorId}:`, isAssigned)
    return isAssigned
  })

  console.log("Accessible documents for doctor:", accessibleDocs)
  return accessibleDocs
}

export function addDocument(document: Document): void {
  const allDocuments = getAllDocuments()
  allDocuments.push(document)
  saveAllDocuments(allDocuments)
}

export function deleteDocument(documentId: string): boolean {
  const allDocuments = getAllDocuments()
  const filteredDocuments = allDocuments.filter((doc) => doc.id !== documentId)

  if (filteredDocuments.length < allDocuments.length) {
    saveAllDocuments(filteredDocuments)
    return true
  }

  return false
}

export function getDocumentById(documentId: string): Document | null {
  const allDocuments = getAllDocuments()
  return allDocuments.find((doc) => doc.id === documentId) || null
}

// Initialize with some demo data
export function initializeDemoDocuments(): void {
  if (typeof window === "undefined") return

  // Only initialize if no documents exist
  if (getAllDocuments().length === 0) {
    // Create a simple PDF-like base64 data for demo
    const demoPdfData =
      "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKERlbW8gRG9jdW1lbnQpCi9Qcm9kdWNlciAoRGVtbyBQREYpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNDAxMDEwMDAwMDBaKQo+PgplbmRvYmoKMiAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMyAwIFIKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFs0IDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNjEyIDc5Ml0KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAzIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA1IDAgUgo+Pgo+PgovQ29udGVudHMgNiAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago2IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihEZW1vIERvY3VtZW50KSBUagpFVApzdHJlYW0KZW5kb2JqCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDc0IDAwMDAwIG4gCjAwMDAwMDAxMjEgMDAwMDAgbiAKMDAwMDAwMDE3OSAwMDAwMCBuIAowMDAwMDAwMzY0IDAwMDAwIG4gCjAwMDAwMDA0NDUgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSA3Ci9Sb290IDIgMCBSCi9JbmZvIDEgMCBSCj4+CnN0YXJ0eHJlZgo1NDYKJSVFT0Y="

    const demoDocuments: Document[] = [
      {
        id: "doc-1",
        patientId: "patient-123",
        fileName: "Blood Test Results.pdf",
        fileType: "application/pdf",
        fileSize: 1024 * 1024 * 2.5, // 2.5MB
        fileUrl: demoPdfData,
        category: "lab_report",
        uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        description: "Quarterly blood test results",
      },
      {
        id: "doc-2",
        patientId: "patient-123",
        fileName: "Prescription - Metformin.pdf",
        fileType: "application/pdf",
        fileSize: 1024 * 512, // 512KB
        fileUrl: demoPdfData,
        category: "prescription",
        uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        description: "Monthly prescription for diabetes medication",
      },
      {
        id: "doc-3",
        patientId: "patient-456",
        fileName: "X-Ray Results.jpg",
        fileType: "image/jpeg",
        fileSize: 1024 * 1024 * 3.2, // 3.2MB
        fileUrl:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
        category: "imaging",
        uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        description: "Chest X-Ray from City Hospital",
      },
    ]

    saveAllDocuments(demoDocuments)
  }
}
