"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { PatientSidebar } from "@/components/patient-sidebar"
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  DollarSign, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Building2,
  Download,
  Upload,
  Eye,
  Filter,
  Search,
  RefreshCw,
  X,
  Save,
  AlertTriangle,
  Info,
  Star,
  TrendingUp,
  Activity,
  File,
  ImageIcon,
  FileImage
} from "lucide-react"

interface InsuranceScheme {
  id: string
  provider: string
  policyNumber: string
  planName: string
  coverageAmount: number
  premium: number
  deductible: number
  copay: number
  startDate: string
  endDate: string
  status: "active" | "expired" | "pending" | "suspended"
  coverage: string[]
  providerContact: {
    phone: string
    email: string
    website: string
  }
  claims: {
    id: string
    date: string
    amount: number
    status: "approved" | "pending" | "rejected" | "processing"
    description: string
    attachments?: string[]
    reimbursedAmount?: number
  }[]
  documents: {
    id: string
    name: string
    type: "policy" | "claim" | "receipt" | "medical_report"
    uploadDate: string
    size: string
  }[]
  rating: number
  lastClaimDate?: string
  totalClaimsAmount: number
  remainingCoverage: number
}

interface NewClaim {
  description: string
  amount: number
  claimType: string
  treatmentDate: string
  hospitalName: string
  doctorName: string
  diagnosis: string
  attachments: File[]
}

interface NewInsurance {
  provider: string
  policyNumber: string
  planName: string
  coverageAmount: number
  premium: number
  deductible: number
  copay: number
  startDate: string
  endDate: string
  coverage: string[]
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadDate: string
  status: 'uploading' | 'completed' | 'error'
  progress: number
}

interface DocumentUpload {
  insuranceId: string
  documentType: string
  files: File[]
}

interface InsuranceScheme {
  id: string
  provider: string
  policyNumber: string
  planName: string
  coverageAmount: number
  premium: number
  deductible: number
  copay: number
  startDate: string
  endDate: string
  status: "active" | "expired" | "pending" | "suspended"
  coverage: string[]
  providerContact: {
    phone: string
    email: string
    website: string
  }
  claims: {
    id: string
    date: string
    amount: number
    status: "approved" | "pending" | "rejected" | "processing"
    description: string
    attachments?: string[]
    reimbursedAmount?: number
  }[]
  documents: {
    id: string
    name: string
    type: "policy" | "claim" | "receipt" | "medical_report"
    uploadDate: string
    size: string
  }[]
  rating: number
  lastClaimDate?: string
  totalClaimsAmount: number
  remainingCoverage: number
}

interface NewClaim {
  description: string
  amount: number
  claimType: string
  treatmentDate: string
  hospitalName: string
  doctorName: string
  diagnosis: string
  attachments: File[]
}

interface NewInsurance {
  provider: string
  policyNumber: string
  planName: string
  coverageAmount: number
  premium: number
  deductible: number
  copay: number
  startDate: string
  endDate: string
  coverage: string[]
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadDate: string
  status: 'uploading' | 'completed' | 'error'
  progress: number
}

interface DocumentUpload {
  insuranceId: string
  documentType: string
  files: File[]
}

export default function PatientInsurances() {
  const { toast } = useToast()
  
  const [insuranceSchemes, setInsuranceSchemes] = useState<InsuranceScheme[]>([
    {
      id: "1",
      provider: "HealthFirst Insurance",
      policyNumber: "HF-2024-001234",
      planName: "Premium Health Plan",
      coverageAmount: 500000,
      premium: 12000,
      deductible: 5000,
      copay: 500,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      coverage: ["Emergency Care", "Hospitalization", "Surgery", "Outpatient Care", "Prescription Drugs"],
      providerContact: {
        phone: "+91 9876543210",
        email: "support@healthfirst.com",
        website: "www.healthfirst.com"
      },
      claims: [
        {
          id: "CLM001",
          date: "2024-01-15",
          amount: 15000,
          status: "approved",
          description: "Emergency Room Visit",
          attachments: ["receipt_001.pdf", "medical_report_001.pdf"],
          reimbursedAmount: 14250
        },
        {
          id: "CLM002",
          date: "2024-02-20",
          amount: 8000,
          status: "pending",
          description: "Diagnostic Tests",
          attachments: ["prescription_002.pdf"]
        }
      ],
      documents: [
        {
          id: "DOC001",
          name: "Policy Document.pdf",
          type: "policy",
          uploadDate: "2024-01-01",
          size: "2.4 MB"
        },
        {
          id: "DOC002",
          name: "Medical Report - Jan 2024.pdf",
          type: "medical_report",
          uploadDate: "2024-01-15",
          size: "1.8 MB"
        }
      ],
      rating: 4.5,
      lastClaimDate: "2024-02-20",
      totalClaimsAmount: 23000,
      remainingCoverage: 477000
    },
    {
      id: "2",
      provider: "MediCare Plus",
      policyNumber: "MCP-2023-005678",
      planName: "Basic Coverage Plan",
      coverageAmount: 200000,
      premium: 6000,
      deductible: 3000,
      copay: 300,
      startDate: "2023-06-01",
      endDate: "2024-05-31",
      status: "expired",
      coverage: ["Basic Hospitalization", "Emergency Care", "Outpatient Care"],
      providerContact: {
        phone: "+91 8765432109",
        email: "care@medicareplus.com",
        website: "www.medicareplus.com"
      },
      claims: [
        {
          id: "CLM003",
          date: "2023-08-10",
          amount: 12000,
          status: "approved",
          description: "Surgery",
          attachments: ["surgery_receipt.pdf"],
          reimbursedAmount: 10200
        }
      ],
      documents: [
        {
          id: "DOC003",
          name: "Policy Document.pdf",
          type: "policy",
          uploadDate: "2023-06-01",
          size: "1.9 MB"
        }
      ],
      rating: 4.0,
      lastClaimDate: "2023-08-10",
      totalClaimsAmount: 12000,
      remainingCoverage: 188000
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedScheme, setSelectedScheme] = useState<InsuranceScheme | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false)
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  
  // Form states
  const [newInsurance, setNewInsurance] = useState<NewInsurance>({
    provider: "",
    policyNumber: "",
    planName: "",
    coverageAmount: 0,
    premium: 0,
    deductible: 0,
    copay: 0,
    startDate: "",
    endDate: "",
    coverage: []
  })
  
  const [newClaim, setNewClaim] = useState<NewClaim>({
    description: "",
    amount: 0,
    claimType: "",
    treatmentDate: "",
    hospitalName: "",
    doctorName: "",
    diagnosis: "",
    attachments: []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [uploadProgress, setUploadProgress] = useState(0)
  
  // File upload states
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [documentUpload, setDocumentUpload] = useState<DocumentUpload>({
    insuranceId: "",
    documentType: "",
    files: []
  })
  const [isDragging, setIsDragging] = useState(false)
  const [fileUploadProgress, setFileUploadProgress] = useState<Record<string, number>>({})

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "expired": return "bg-red-500"
      case "pending": return "bg-yellow-500"
      case "suspended": return "bg-orange-500"
      case "processing": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4" />
      case "expired": return <AlertCircle className="w-4 h-4" />
      case "pending": return <Clock className="w-4 h-4" />
      case "suspended": return <AlertTriangle className="w-4 h-4" />
      case "processing": return <RefreshCw className="w-4 h-4 animate-spin" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount)
  }

  // File utility functions
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <FileImage className="w-5 h-5 text-blue-500" />
    if (type.includes("pdf")) return <FileText className="w-5 h-5 text-red-500" />
    return <File className="w-5 h-5 text-gray-500" />
  }

  const validateFileType = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    return allowedTypes.includes(file.type)
  }

  const validateFileSize = (file: File) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    return file.size <= maxSize
  }

  // Validation functions
  const validateInsuranceForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!newInsurance.provider.trim()) newErrors.provider = "Provider name is required"
    if (!newInsurance.policyNumber.trim()) newErrors.policyNumber = "Policy number is required"
    if (!newInsurance.planName.trim()) newErrors.planName = "Plan name is required"
    if (newInsurance.coverageAmount <= 0) newErrors.coverageAmount = "Coverage amount must be greater than 0"
    if (newInsurance.premium <= 0) newErrors.premium = "Premium must be greater than 0"
    if (!newInsurance.startDate) newErrors.startDate = "Start date is required"
    if (!newInsurance.endDate) newErrors.endDate = "End date is required"
    if (new Date(newInsurance.endDate) <= new Date(newInsurance.startDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateClaimForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!newClaim.description.trim()) newErrors.description = "Claim description is required"
    if (newClaim.amount <= 0) newErrors.amount = "Claim amount must be greater than 0"
    if (!newClaim.claimType) newErrors.claimType = "Claim type is required"
    if (!newClaim.treatmentDate) newErrors.treatmentDate = "Treatment date is required"
    if (!newClaim.hospitalName.trim()) newErrors.hospitalName = "Hospital name is required"
    if (!newClaim.doctorName.trim()) newErrors.doctorName = "Doctor name is required"
    if (!newClaim.diagnosis.trim()) newErrors.diagnosis = "Diagnosis is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // CRUD operations
  const handleAddInsurance = async () => {
    if (!validateInsuranceForm()) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newScheme: InsuranceScheme = {
        id: Date.now().toString(),
        ...newInsurance,
        status: "pending",
        providerContact: {
          phone: "",
          email: "",
          website: ""
        },
        claims: [],
        documents: [],
        rating: 0,
        totalClaimsAmount: 0,
        remainingCoverage: newInsurance.coverageAmount
      }

      setInsuranceSchemes(prev => [...prev, newScheme])
      setIsAddDialogOpen(false)
      setNewInsurance({
        provider: "",
        policyNumber: "",
        planName: "",
        coverageAmount: 0,
        premium: 0,
        deductible: 0,
        copay: 0,
        startDate: "",
        endDate: "",
        coverage: []
      })
      setErrors({})
      
      toast({
        title: "Insurance Added",
        description: "Your insurance policy has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add insurance. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileClaim = async () => {
    if (!validateClaimForm() || !selectedScheme) return

    setIsLoading(true)
    try {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise(resolve => setTimeout(resolve, 100))
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newClaimData = {
        id: `CLM${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        amount: newClaim.amount,
        status: "pending" as const,
        description: newClaim.description,
        attachments: newClaim.attachments.map(file => file.name)
      }

      setInsuranceSchemes(prev => prev.map(scheme => 
        scheme.id === selectedScheme.id 
          ? { ...scheme, claims: [...scheme.claims, newClaimData] }
          : scheme
      ))

      setIsClaimDialogOpen(false)
      setNewClaim({
        description: "",
        amount: 0,
        claimType: "",
        treatmentDate: "",
        hospitalName: "",
        doctorName: "",
        diagnosis: "",
        attachments: []
      })
      setUploadProgress(0)
      setErrors({})
      
      toast({
        title: "Claim Filed",
        description: "Your insurance claim has been filed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to file claim. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteInsurance = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setInsuranceSchemes(prev => prev.filter(scheme => scheme.id !== id))
      toast({
        title: "Insurance Deleted",
        description: "Insurance policy has been removed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete insurance. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Enhanced File handling
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    
    const fileArray = Array.from(files)
    const validFiles: File[] = []
    const invalidFiles: string[] = []

    fileArray.forEach(file => {
      if (!validateFileType(file)) {
        invalidFiles.push(`${file.name}: Invalid file type (only PDF, JPG, PNG allowed)`)
        return
      }
      if (!validateFileSize(file)) {
        invalidFiles.push(`${file.name}: File too large (max 10MB)`)
        return
      }
      validFiles.push(file)
    })

    if (invalidFiles.length > 0) {
      toast({
        title: "File Validation Error",
        description: invalidFiles.join(", "),
        variant: "destructive",
      })
    }

    if (validFiles.length > 0) {
      setNewClaim(prev => ({ ...prev, attachments: [...prev.attachments, ...validFiles] }))
      toast({
        title: "Files Added",
        description: `${validFiles.length} file(s) added successfully`,
      })
    }
  }

  const handleDocumentUpload = async (files: File[]) => {
    if (!documentUpload.insuranceId || !documentUpload.documentType) {
      toast({
        title: "Missing Information",
        description: "Please select insurance policy and document type",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    const newUploadedFiles: UploadedFile[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        if (!validateFileType(file) || !validateFileSize(file)) {
          continue
        }

        const fileId = `file_${Date.now()}_${i}`
        const uploadedFile: UploadedFile = {
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file), // In real app, this would be the server URL
          uploadDate: new Date().toISOString(),
          status: 'uploading',
          progress: 0
        }

        newUploadedFiles.push(uploadedFile)
        setUploadedFiles(prev => [...prev, uploadedFile])

        // Simulate file upload with progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100))
          setFileUploadProgress(prev => ({ ...prev, [fileId]: progress }))
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, progress } : f
          ))
        }

        // Mark as completed
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'completed' } : f
        ))

        // Add to insurance scheme documents
        const newDocument = {
          id: fileId,
          name: file.name,
          type: documentUpload.documentType as "policy" | "claim" | "receipt" | "medical_report",
          uploadDate: new Date().toISOString().split('T')[0],
          size: formatFileSize(file.size)
        }

        setInsuranceSchemes(prev => prev.map(scheme => 
          scheme.id === documentUpload.insuranceId 
            ? { ...scheme, documents: [...scheme.documents, newDocument] }
            : scheme
        ))
      }

      toast({
        title: "Upload Successful",
        description: `${newUploadedFiles.length} document(s) uploaded successfully`,
      })

      // Reset form
      setDocumentUpload({
        insuranceId: "",
        documentType: "",
        files: []
      })
      setIsDocumentDialogOpen(false)

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload documents. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (isClaimDialogOpen) {
      handleFileUpload(files)
    } else if (isDocumentDialogOpen) {
      setDocumentUpload(prev => ({ ...prev, files: Array.from(files) }))
    }
  }

  const removeFile = (fileIndex: number, isClaimFile: boolean = true) => {
    if (isClaimFile) {
      setNewClaim(prev => ({
        ...prev,
        attachments: prev.attachments.filter((_, index) => index !== fileIndex)
      }))
    } else {
      setDocumentUpload(prev => ({
        ...prev,
        files: prev.files.filter((_, index) => index !== fileIndex)
      }))
    }
  }

  const downloadFile = (file: UploadedFile) => {
    // Create a temporary link to download the file
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Download Started",
      description: `Downloading ${file.name}...`,
    })
  }

  const previewFile = (fileName: string) => {
    // In a real application, this would open a file preview modal or new window
    toast({
      title: "File Preview",
      description: `Opening preview for ${fileName}...`,
    })
  }

  // Filter and search
  const filteredSchemes = insuranceSchemes.filter(scheme => {
    const matchesSearch = scheme.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || scheme.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Calculate totals
  const totalCoverage = insuranceSchemes
    .filter(s => s.status === "active")
    .reduce((sum, s) => sum + s.coverageAmount, 0)
  
  const totalPendingClaims = insuranceSchemes
    .reduce((sum, s) => sum + s.claims.filter(c => c.status === "pending").length, 0)
  
  const expiringSchemes = insuranceSchemes.filter(s => {
    const endDate = new Date(s.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }).length

  return (
    <div className="flex min-h-screen bg-gray-900">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Insurance Management</h1>
              <p className="text-gray-400">Manage your insurance policies, claims, and documents</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsDocumentDialogOpen(true)}
                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Insurance
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add New Insurance Policy</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="provider" className="text-white">Insurance Provider *</Label>
                        <Input 
                          id="provider" 
                          placeholder="Enter provider name" 
                          className={`bg-gray-700 border-gray-600 text-white ${errors.provider ? 'border-red-500' : ''}`}
                          value={newInsurance.provider}
                          onChange={(e) => setNewInsurance(prev => ({ ...prev, provider: e.target.value }))}
                        />
                        {errors.provider && <p className="text-red-400 text-xs mt-1">{errors.provider}</p>}
                      </div>
                      <div>
                        <Label htmlFor="policyNumber" className="text-white">Policy Number *</Label>
                        <Input 
                          id="policyNumber" 
                          placeholder="Enter policy number" 
                          className={`bg-gray-700 border-gray-600 text-white ${errors.policyNumber ? 'border-red-500' : ''}`}
                          value={newInsurance.policyNumber}
                          onChange={(e) => setNewInsurance(prev => ({ ...prev, policyNumber: e.target.value }))}
                        />
                        {errors.policyNumber && <p className="text-red-400 text-xs mt-1">{errors.policyNumber}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="planName" className="text-white">Plan Name *</Label>
                      <Input 
                        id="planName" 
                        placeholder="Enter plan name" 
                        className={`bg-gray-700 border-gray-600 text-white ${errors.planName ? 'border-red-500' : ''}`}
                        value={newInsurance.planName}
                        onChange={(e) => setNewInsurance(prev => ({ ...prev, planName: e.target.value }))}
                      />
                      {errors.planName && <p className="text-red-400 text-xs mt-1">{errors.planName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="coverageAmount" className="text-white">Coverage Amount *</Label>
                        <Input 
                          id="coverageAmount" 
                          type="number" 
                          placeholder="Enter coverage amount" 
                          className={`bg-gray-700 border-gray-600 text-white ${errors.coverageAmount ? 'border-red-500' : ''}`}
                          value={newInsurance.coverageAmount || ""}
                          onChange={(e) => setNewInsurance(prev => ({ ...prev, coverageAmount: Number(e.target.value) }))}
                        />
                        {errors.coverageAmount && <p className="text-red-400 text-xs mt-1">{errors.coverageAmount}</p>}
                      </div>
                      <div>
                        <Label htmlFor="premium" className="text-white">Annual Premium *</Label>
                        <Input 
                          id="premium" 
                          type="number" 
                          placeholder="Enter annual premium" 
                          className={`bg-gray-700 border-gray-600 text-white ${errors.premium ? 'border-red-500' : ''}`}
                          value={newInsurance.premium || ""}
                          onChange={(e) => setNewInsurance(prev => ({ ...prev, premium: Number(e.target.value) }))}
                        />
                        {errors.premium && <p className="text-red-400 text-xs mt-1">{errors.premium}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="deductible" className="text-white">Deductible</Label>
                        <Input 
                          id="deductible" 
                          type="number" 
                          placeholder="Enter deductible amount" 
                          className="bg-gray-700 border-gray-600 text-white"
                          value={newInsurance.deductible || ""}
                          onChange={(e) => setNewInsurance(prev => ({ ...prev, deductible: Number(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="copay" className="text-white">Co-pay</Label>
                        <Input 
                          id="copay" 
                          type="number" 
                          placeholder="Enter co-pay amount" 
                          className="bg-gray-700 border-gray-600 text-white"
                          value={newInsurance.copay || ""}
                          onChange={(e) => setNewInsurance(prev => ({ ...prev, copay: Number(e.target.value) }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate" className="text-white">Start Date *</Label>
                        <Input 
                          id="startDate" 
                          type="date" 
                          className={`bg-gray-700 border-gray-600 text-white ${errors.startDate ? 'border-red-500' : ''}`}
                          value={newInsurance.startDate}
                          onChange={(e) => setNewInsurance(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                        {errors.startDate && <p className="text-red-400 text-xs mt-1">{errors.startDate}</p>}
                      </div>
                      <div>
                        <Label htmlFor="endDate" className="text-white">End Date *</Label>
                        <Input 
                          id="endDate" 
                          type="date" 
                          className={`bg-gray-700 border-gray-600 text-white ${errors.endDate ? 'border-red-500' : ''}`}
                          value={newInsurance.endDate}
                          onChange={(e) => setNewInsurance(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                        {errors.endDate && <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>}
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="px-6 pb-6">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddInsurance} 
                      className="bg-emerald-500 hover:bg-emerald-600"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Add Insurance
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by provider, plan name, or policy number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Active Policies</p>
                    <p className="text-white text-xl font-bold">
                      {insuranceSchemes.filter(s => s.status === "active").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-blue-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Total Coverage</p>
                    <p className="text-white text-xl font-bold">{formatCurrency(totalCoverage)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-yellow-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Pending Claims</p>
                    <p className="text-white text-xl font-bold">{totalPendingClaims}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-red-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Expiring Soon</p>
                    <p className="text-white text-xl font-bold">{expiringSchemes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insurance Schemes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {filteredSchemes.map((scheme) => (
              <Card key={scheme.id} className="bg-gray-800 border-gray-700 hover:border-emerald-500/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-white text-lg">{scheme.provider}</CardTitle>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(scheme.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                            />
                          ))}
                          <span className="text-gray-400 text-sm ml-1">({scheme.rating})</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">{scheme.planName}</p>
                      <p className="text-gray-500 text-xs mt-1">Policy: {scheme.policyNumber}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(scheme.status)} text-white`}>
                        {getStatusIcon(scheme.status)}
                        <span className="ml-1 capitalize">{scheme.status}</span>
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedScheme(scheme)
                          setIsEditDialogOpen(true)
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteInsurance(scheme.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Coverage Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-xs">Coverage Used</span>
                      <span className="text-white text-xs">
                        {formatCurrency(scheme.totalClaimsAmount)} / {formatCurrency(scheme.coverageAmount)}
                      </span>
                    </div>
                    <Progress 
                      value={(scheme.totalClaimsAmount / scheme.coverageAmount) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Coverage Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-xs">Remaining Coverage</p>
                      <p className="text-emerald-400 font-semibold">{formatCurrency(scheme.remainingCoverage)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Annual Premium</p>
                      <p className="text-white font-semibold">{formatCurrency(scheme.premium)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Deductible</p>
                      <p className="text-white font-semibold">{formatCurrency(scheme.deductible)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Co-pay</p>
                      <p className="text-white font-semibold">{formatCurrency(scheme.copay)}</p>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-emerald-400 mr-2" />
                      <span className="text-white text-sm">Valid until {scheme.endDate}</span>
                    </div>
                    {scheme.status === "active" && (
                      <Badge variant="outline" className="text-xs">
                        <Activity className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>

                  {/* Coverage Types */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-xs mb-2">Coverage Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {scheme.coverage.slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                      {scheme.coverage.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{scheme.coverage.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Last Claim Info */}
                  {scheme.lastClaimDate && (
                    <div className="mb-4 p-2 bg-blue-900/20 rounded-lg border border-blue-800">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-xs">Last Claim</span>
                        <span className="text-white text-xs">{scheme.lastClaimDate}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedScheme(scheme)}
                      className="text-xs"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedScheme(scheme)
                        setIsClaimDialogOpen(true)
                      }}
                      className="text-xs"
                      disabled={scheme.status !== "active"}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      File Claim
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results message */}
          {filteredSchemes.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 text-center">
                <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">No Insurance Policies Found</h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm || filterStatus !== "all" 
                    ? "No policies match your search criteria. Try adjusting your filters."
                    : "You haven't added any insurance policies yet. Add your first policy to get started."
                  }
                </p>
                {!searchTerm && filterStatus === "all" && (
                  <Button 
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Policy
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* File Claim Dialog */}
          <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">File Insurance Claim</DialogTitle>
                <p className="text-gray-400">
                  Filing claim for {selectedScheme?.provider} - {selectedScheme?.planName}
                </p>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="claimDescription" className="text-white">Claim Description *</Label>
                    <Textarea 
                      id="claimDescription"
                      placeholder="Describe your medical treatment or procedure..."
                      className={`bg-gray-700 border-gray-600 text-white ${errors.description ? 'border-red-500' : ''}`}
                      value={newClaim.description}
                      onChange={(e) => setNewClaim(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                    {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                  </div>
                  <div>
                    <Label htmlFor="claimAmount" className="text-white">Claim Amount *</Label>
                    <Input 
                      id="claimAmount"
                      type="number"
                      placeholder="Enter total amount"
                      className={`bg-gray-700 border-gray-600 text-white ${errors.amount ? 'border-red-500' : ''}`}
                      value={newClaim.amount || ""}
                      onChange={(e) => setNewClaim(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    />
                    {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount}</p>}
                    
                    <Label htmlFor="claimType" className="text-white mt-3 block">Claim Type *</Label>
                    <Select 
                      value={newClaim.claimType} 
                      onValueChange={(value) => setNewClaim(prev => ({ ...prev, claimType: value }))}
                    >
                      <SelectTrigger className={`bg-gray-700 border-gray-600 text-white ${errors.claimType ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select claim type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="emergency">Emergency Treatment</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="hospitalization">Hospitalization</SelectItem>
                        <SelectItem value="outpatient">Outpatient Care</SelectItem>
                        <SelectItem value="diagnostic">Diagnostic Tests</SelectItem>
                        <SelectItem value="prescription">Prescription Drugs</SelectItem>
                        <SelectItem value="dental">Dental Care</SelectItem>
                        <SelectItem value="maternity">Maternity Care</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.claimType && <p className="text-red-400 text-xs mt-1">{errors.claimType}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="treatmentDate" className="text-white">Treatment Date *</Label>
                    <Input 
                      id="treatmentDate"
                      type="date"
                      className={`bg-gray-700 border-gray-600 text-white ${errors.treatmentDate ? 'border-red-500' : ''}`}
                      value={newClaim.treatmentDate}
                      onChange={(e) => setNewClaim(prev => ({ ...prev, treatmentDate: e.target.value }))}
                    />
                    {errors.treatmentDate && <p className="text-red-400 text-xs mt-1">{errors.treatmentDate}</p>}
                  </div>
                  <div>
                    <Label htmlFor="hospitalName" className="text-white">Hospital/Clinic Name *</Label>
                    <Input 
                      id="hospitalName"
                      placeholder="Enter hospital or clinic name"
                      className={`bg-gray-700 border-gray-600 text-white ${errors.hospitalName ? 'border-red-500' : ''}`}
                      value={newClaim.hospitalName}
                      onChange={(e) => setNewClaim(prev => ({ ...prev, hospitalName: e.target.value }))}
                    />
                    {errors.hospitalName && <p className="text-red-400 text-xs mt-1">{errors.hospitalName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="doctorName" className="text-white">Doctor Name *</Label>
                    <Input 
                      id="doctorName"
                      placeholder="Enter treating doctor's name"
                      className={`bg-gray-700 border-gray-600 text-white ${errors.doctorName ? 'border-red-500' : ''}`}
                      value={newClaim.doctorName}
                      onChange={(e) => setNewClaim(prev => ({ ...prev, doctorName: e.target.value }))}
                    />
                    {errors.doctorName && <p className="text-red-400 text-xs mt-1">{errors.doctorName}</p>}
                  </div>
                  <div>
                    <Label htmlFor="diagnosis" className="text-white">Diagnosis *</Label>
                    <Input 
                      id="diagnosis"
                      placeholder="Enter diagnosis or medical condition"
                      className={`bg-gray-700 border-gray-600 text-white ${errors.diagnosis ? 'border-red-500' : ''}`}
                      value={newClaim.diagnosis}
                      onChange={(e) => setNewClaim(prev => ({ ...prev, diagnosis: e.target.value }))}
                    />
                    {errors.diagnosis && <p className="text-red-400 text-xs mt-1">{errors.diagnosis}</p>}
                  </div>
                </div>

                {/* Enhanced File Upload Section */}
                <div>
                  <Label className="text-white">Supporting Documents</Label>
                  <div 
                    className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                      isDragging 
                        ? 'border-emerald-500 bg-emerald-500/10 scale-105' 
                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <p className="text-white mb-2">
                      {isDragging ? 'Drop files here' : 'Drag and drop files here or click to browse'}
                    </p>
                    <p className="text-gray-400 text-sm mb-4">Supported formats: PDF, JPG, PNG (Max 10MB each)</p>
                    <Input 
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="bg-gray-700 border-gray-600 text-white file:bg-emerald-500 file:text-white file:border-0 file:rounded file:px-4 file:py-2"
                    />
                  </div>
                  
                  {/* Enhanced File List */}
                  {newClaim.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-white text-sm font-medium">Uploaded Files ({newClaim.attachments.length}):</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNewClaim(prev => ({ ...prev, attachments: [] }))}
                          className="text-gray-400 hover:text-white"
                        >
                          Clear All
                        </Button>
                      </div>
                      {newClaim.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="text-white text-sm font-medium">{file.name}</p>
                              <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {file.type.split('/')[1].toUpperCase()}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => previewFile(file.name)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (confirm(`Are you sure you want to remove ${file.name}?`)) {
                                  removeFile(index, true)
                                  toast({
                                    title: "File Removed",
                                    description: `${file.name} has been removed from the claim`,
                                  })
                                }
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-sm">Uploading files...</span>
                      <span className="text-emerald-400 text-sm">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {/* Important Notes */}
                <Alert className="bg-blue-900/20 border-blue-800">
                  <Info className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-blue-300">
                    <strong>Required Documents:</strong> Medical bills, doctor's prescription, discharge summary (if applicable), 
                    and diagnostic reports. Claims are typically processed within 7-14 business days.
                  </AlertDescription>
                </Alert>
              </div>
              <DialogFooter className="px-6 pb-6">
                <Button variant="outline" onClick={() => setIsClaimDialogOpen(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleFileClaim}
                  className="bg-emerald-500 hover:bg-emerald-600"
                  disabled={isLoading || newClaim.attachments.length === 0}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Filing Claim...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      File Claim
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Enhanced Document Upload Dialog */}
          <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
            <DialogContent className="bg-gray-800 border-gray-700 max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-emerald-400" />
                  Upload Insurance Documents
                </DialogTitle>
                <p className="text-gray-400">Upload policy documents, medical reports, and other insurance-related files</p>
              </DialogHeader>
              <div className="space-y-6 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Select Insurance Policy *</Label>
                    <Select 
                      value={documentUpload.insuranceId} 
                      onValueChange={(value) => setDocumentUpload(prev => ({ ...prev, insuranceId: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Choose insurance policy" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {insuranceSchemes.map((scheme) => (
                          <SelectItem key={scheme.id} value={scheme.id}>
                            <div className="flex items-center space-x-2">
                              <Shield className="w-4 h-4" />
                              <span>{scheme.provider} - {scheme.planName}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Document Type *</Label>
                    <Select 
                      value={documentUpload.documentType} 
                      onValueChange={(value) => setDocumentUpload(prev => ({ ...prev, documentType: value }))}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="policy">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span>Policy Document</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="claim">
                          <div className="flex items-center space-x-2">
                            <File className="w-4 h-4" />
                            <span>Claim Form</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="receipt">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Medical Receipt</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="medical_report">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4" />
                            <span>Medical Report</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Enhanced File Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    isDragging 
                      ? 'border-emerald-500 bg-emerald-500/10 scale-105' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className={`w-16 h-16 mx-auto mb-4 transition-colors ${
                    isDragging ? 'text-emerald-400' : 'text-gray-400'
                  }`} />
                  <p className="text-white mb-2 text-lg font-medium">
                    {isDragging ? 'Drop your files here' : 'Drag and drop files here'}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    or click the button below to browse your files
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    Supported formats: PDF, JPG, PNG (Max 10MB per file)
                  </p>
                  <Input 
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files) {
                        setDocumentUpload(prev => ({ ...prev, files: Array.from(e.target.files!) }))
                      }
                    }}
                    className="hidden"
                    id="document-upload"
                  />
                  <Label 
                    htmlFor="document-upload" 
                    className="inline-flex items-center justify-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Browse Files
                  </Label>
                </div>

                {/* Selected Files List */}
                {documentUpload.files.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm font-medium">
                        Selected Files ({documentUpload.files.length})
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDocumentUpload(prev => ({ ...prev, files: [] }))}
                        className="text-gray-400 hover:text-white"
                      >
                        Clear All
                      </Button>
                    </div>
                    
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {documentUpload.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(file.type)}
                            <div>
                              <p className="text-white text-sm font-medium">{file.name}</p>
                              <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {file.type.split('/')[1].toUpperCase()}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => previewFile(file.name)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if (confirm(`Are you sure you want to remove ${file.name}?`)) {
                                  removeFile(index, false)
                                  toast({
                                    title: "File Removed",
                                    description: `${file.name} has been removed from the upload queue`,
                                  })
                                }
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {isLoading && (
                  <div className="space-y-3">
                    <p className="text-white text-sm">Uploading documents...</p>
                    {Object.entries(fileUploadProgress).map(([fileId, progress]) => (
                      <div key={fileId} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs">
                            {uploadedFiles.find(f => f.id === fileId)?.name}
                          </span>
                          <span className="text-emerald-400 text-xs">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Important Notes */}
                <Alert className="bg-blue-900/20 border-blue-800">
                  <Info className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-blue-300">
                    <strong>Document Guidelines:</strong> Ensure all documents are clear and legible. 
                    Policy documents should include full terms and conditions. Medical reports should be from licensed practitioners.
                  </AlertDescription>
                </Alert>
              </div>
              
              <DialogFooter className="px-6 pb-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsDocumentDialogOpen(false)
                    setDocumentUpload({ insuranceId: "", documentType: "", files: [] })
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => handleDocumentUpload(documentUpload.files)}
                  className="bg-emerald-500 hover:bg-emerald-600"
                  disabled={isLoading || documentUpload.files.length === 0 || !documentUpload.insuranceId || !documentUpload.documentType}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload {documentUpload.files.length} Document{documentUpload.files.length !== 1 ? 's' : ''}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Enhanced Detailed View Dialog */}
          {selectedScheme && !isClaimDialogOpen && !isEditDialogOpen && (
            <Dialog open={!!selectedScheme} onOpenChange={() => setSelectedScheme(null)}>
              <DialogContent className="bg-gray-800 border-gray-700 max-w-5xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-emerald-400" />
                    {selectedScheme.provider} - {selectedScheme.planName}
                  </DialogTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={`${getStatusColor(selectedScheme.status)} text-white`}>
                      {getStatusIcon(selectedScheme.status)}
                      <span className="ml-1 capitalize">{selectedScheme.status}</span>
                    </Badge>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(selectedScheme.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                      <span className="text-gray-400 text-sm ml-1">({selectedScheme.rating})</span>
                    </div>
                  </div>
                </DialogHeader>
                
                <Tabs defaultValue="overview" className="p-4">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="claims">Claims ({selectedScheme.claims.length})</TabsTrigger>
                    <TabsTrigger value="documents">Documents ({selectedScheme.documents.length})</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Coverage Progress */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                          Coverage Utilization
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-400">Total Coverage Used</span>
                              <span className="text-white font-semibold">
                                {formatCurrency(selectedScheme.totalClaimsAmount)} / {formatCurrency(selectedScheme.coverageAmount)}
                              </span>
                            </div>
                            <Progress value={(selectedScheme.totalClaimsAmount / selectedScheme.coverageAmount) * 100} className="h-3" />
                            <p className="text-emerald-400 text-sm mt-1">
                              {formatCurrency(selectedScheme.remainingCoverage)} remaining
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-emerald-400">{formatCurrency(selectedScheme.coverageAmount)}</p>
                              <p className="text-gray-400 text-sm">Total Coverage</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-blue-400">{formatCurrency(selectedScheme.premium)}</p>
                              <p className="text-gray-400 text-sm">Annual Premium</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-yellow-400">{formatCurrency(selectedScheme.deductible)}</p>
                              <p className="text-gray-400 text-sm">Deductible</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-purple-400">{formatCurrency(selectedScheme.copay)}</p>
                              <p className="text-gray-400 text-sm">Co-pay</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Coverage Details */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Covered Services</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {selectedScheme.coverage.map((item, index) => (
                            <div key={index} className="flex items-center p-2 bg-gray-600 rounded">
                              <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                              <span className="text-white text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Policy Info */}
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white text-lg">Policy Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-gray-400 text-sm">Policy Number</p>
                            <p className="text-white font-semibold">{selectedScheme.policyNumber}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Plan Type</p>
                            <p className="text-white font-semibold">{selectedScheme.planName}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Policy Start</p>
                            <p className="text-white font-semibold">{selectedScheme.startDate}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm">Policy End</p>
                            <p className="text-white font-semibold">{selectedScheme.endDate}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="claims" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white text-lg font-semibold">Claims History</h3>
                      <Button 
                        onClick={() => setIsClaimDialogOpen(true)}
                        className="bg-emerald-500 hover:bg-emerald-600"
                        disabled={selectedScheme.status !== "active"}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        File New Claim
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {selectedScheme.claims.map((claim) => (
                        <Card key={claim.id} className="bg-gray-600 border-gray-500">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="text-white font-medium">{claim.description}</h4>
                                <p className="text-gray-400 text-sm mt-1">
                                  Claim ID: {claim.id} • Date: {claim.date}
                                </p>
                                {claim.attachments && claim.attachments.length > 0 && (
                                  <div className="flex items-center mt-2">
                                    <FileText className="w-4 h-4 text-blue-400 mr-1" />
                                    <span className="text-blue-400 text-sm">
                                      {claim.attachments.length} document(s) attached
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="text-white text-lg font-semibold">{formatCurrency(claim.amount)}</p>
                                {claim.reimbursedAmount && (
                                  <p className="text-emerald-400 text-sm">
                                    Reimbursed: {formatCurrency(claim.reimbursedAmount)}
                                  </p>
                                )}
                                <Badge className={`${getStatusColor(claim.status)} text-white text-xs mt-1`}>
                                  {claim.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      {selectedScheme.claims.length === 0 && (
                        <div className="text-center py-8">
                          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">No claims filed yet</p>
                          <Button 
                            onClick={() => setIsClaimDialogOpen(true)}
                            className="bg-emerald-500 hover:bg-emerald-600 mt-4"
                            disabled={selectedScheme.status !== "active"}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            File Your First Claim
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white text-lg font-semibold">Documents</h3>
                        <p className="text-gray-400 text-sm">Manage your insurance documents and files</p>
                      </div>
                      <Button 
                        onClick={() => {
                          setDocumentUpload(prev => ({ ...prev, insuranceId: selectedScheme.id }))
                          setIsDocumentDialogOpen(true)
                        }}
                        variant="outline"
                        className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Documents
                      </Button>
                    </div>

                    {/* Document Stats */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <Card className="bg-gray-700 border-gray-600">
                        <CardContent className="p-3 text-center">
                          <FileText className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">
                            {selectedScheme.documents.filter(d => d.type === 'policy').length}
                          </p>
                          <p className="text-gray-400 text-xs">Policy Docs</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-700 border-gray-600">
                        <CardContent className="p-3 text-center">
                          <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">
                            {selectedScheme.documents.filter(d => d.type === 'receipt').length}
                          </p>
                          <p className="text-gray-400 text-xs">Receipts</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-700 border-gray-600">
                        <CardContent className="p-3 text-center">
                          <Activity className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">
                            {selectedScheme.documents.filter(d => d.type === 'medical_report').length}
                          </p>
                          <p className="text-gray-400 text-xs">Medical Reports</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-700 border-gray-600">
                        <CardContent className="p-3 text-center">
                          <File className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                          <p className="text-white text-sm font-medium">
                            {selectedScheme.documents.filter(d => d.type === 'claim').length}
                          </p>
                          <p className="text-gray-400 text-xs">Claims</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedScheme.documents.map((doc) => {
                        const uploadedFile = uploadedFiles.find(f => f.id === doc.id)
                        return (
                          <Card key={doc.id} className="bg-gray-600 border-gray-500 hover:border-gray-400 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                  {getFileIcon(doc.type === 'policy' ? 'application/pdf' : 'image/jpeg')}
                                  <div className="flex-1">
                                    <p className="text-white font-medium text-sm">{doc.name}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <Badge variant="secondary" className="text-xs">
                                        {doc.type.replace('_', ' ').toUpperCase()}
                                      </Badge>
                                      <span className="text-gray-400 text-xs">{doc.size}</span>
                                    </div>
                                    <p className="text-gray-400 text-xs mt-1">
                                      Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex space-x-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-blue-400 hover:text-blue-300"
                                    onClick={() => {
                                      previewFile(doc.name)
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-emerald-400 hover:text-emerald-300"
                                    onClick={() => {
                                      if (uploadedFile) {
                                        downloadFile(uploadedFile)
                                      } else {
                                        // Create a simulated download for existing documents
                                        const link = document.createElement('a')
                                        link.href = '#' // In real app, this would be the actual file URL
                                        link.download = doc.name
                                        toast({
                                          title: "Download Started",
                                          description: `Downloading ${doc.name}...`,
                                        })
                                      }
                                    }}
                                  >
                                    <Download className="w-4 h-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-400 hover:text-red-300"
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to delete ${doc.name}?`)) {
                                        setInsuranceSchemes(prev => prev.map(scheme => 
                                          scheme.id === selectedScheme.id 
                                            ? { ...scheme, documents: scheme.documents.filter(d => d.id !== doc.id) }
                                            : scheme
                                        ))
                                        toast({
                                          title: "Document Deleted",
                                          description: "Document has been removed successfully",
                                        })
                                      }
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                    
                    {selectedScheme.documents.length === 0 && (
                      <div className="text-center py-12">
                        <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h4 className="text-white text-lg font-medium mb-2">No documents uploaded yet</h4>
                        <p className="text-gray-400 mb-6">
                          Upload your insurance documents to keep them organized and easily accessible
                        </p>
                        <Button 
                          onClick={() => {
                            setDocumentUpload(prev => ({ ...prev, insuranceId: selectedScheme.id }))
                            setIsDocumentDialogOpen(true)
                          }}
                          className="bg-emerald-500 hover:bg-emerald-600"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Your First Document
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                          <Building2 className="w-5 h-5 mr-2" />
                          Provider Contact Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center p-3 bg-gray-600 rounded">
                              <Phone className="w-5 h-5 text-emerald-400 mr-3" />
                              <div>
                                <p className="text-gray-400 text-sm">Phone</p>
                                <p className="text-white font-medium">{selectedScheme.providerContact.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-gray-600 rounded">
                              <Mail className="w-5 h-5 text-emerald-400 mr-3" />
                              <div>
                                <p className="text-gray-400 text-sm">Email</p>
                                <p className="text-white font-medium">{selectedScheme.providerContact.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center p-3 bg-gray-600 rounded">
                              <Shield className="w-5 h-5 text-emerald-400 mr-3" />
                              <div>
                                <p className="text-gray-400 text-sm">Website</p>
                                <p className="text-white font-medium">{selectedScheme.providerContact.website}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Provider
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Shield className="w-4 h-4 mr-2" />
                              Visit Website
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  )
}
