"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Loader2 } from "lucide-react"
import type { DocumentCategory, Document } from "@/types/document"
import { addDocument } from "@/lib/document-service"

interface DocumentUploadProps {
  patientId: string
  onUploadComplete: () => void
}

export function DocumentUpload({ patientId, onUploadComplete }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState<DocumentCategory>("other")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Please select a file to upload")
      return
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Convert file to base64 on client side
      const fileData = await fileToBase64(file)

      // Create document directly on client side
      const document: Document = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        patientId,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileUrl: fileData,
        category,
        uploadDate: new Date().toISOString(),
        description: description || undefined,
      }

      // Save to localStorage directly
      addDocument(document)

      // Reset form
      setFile(null)
      setCategory("other")
      setDescription("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Notify parent component
      onUploadComplete()

      console.log("✅ Document uploaded successfully:", document.fileName)
    } catch (error) {
      console.error("Error uploading document:", error)
      setError("An unexpected error occurred while uploading the file")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Upload New Document</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">Select File</Label>
            <div className="mt-1">
              <Input
                id="file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isUploading}
                className="cursor-pointer"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
              />
            </div>
            {file && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Document Category</Label>
            <Select
              value={category}
              onValueChange={(value) => setCategory(value as DocumentCategory)}
              disabled={isUploading}
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="lab_report">Lab Report</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
                <SelectItem value="discharge_summary">Discharge Summary</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a brief description of this document"
              disabled={isUploading}
              className="resize-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
