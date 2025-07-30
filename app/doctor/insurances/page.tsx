"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Shield, 
  Plus, 
  Edit, 
  Search,
  Calendar, 
  DollarSign, 
  FileText, 
  Users,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Building2,
  Stethoscope,
  UserCheck,
  AlertTriangle
} from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"

interface InsuranceProvider {
  id: string
  name: string
  contactInfo: {
    phone: string
    email: string
    website: string
    address: string
  }
  acceptedPlans: string[]
  reimbursementRate: number
  claimProcessingTime: string
  status: "active" | "pending" | "suspended"
  totalPatients: number
  monthlyReimbursement: number
}

interface PatientInsurance {
  patientId: string
  patientName: string
  provider: string
  policyNumber: string
  planName: string
  coverageAmount: number
  copay: number
  status: "active" | "expired" | "pending"
  lastClaim?: {
    date: string
    amount: number
    status: "approved" | "pending" | "rejected"
  }
}

export default function DoctorInsurances() {
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProvider[]>([
    {
      id: "1",
      name: "HealthFirst Insurance",
      contactInfo: {
        phone: "+91 9876543210",
        email: "provider@healthfirst.com",
        website: "www.healthfirst.com",
        address: "123 Business Park, Mumbai, Maharashtra"
      },
      acceptedPlans: ["Premium Health Plan", "Basic Coverage", "Senior Care Plan", "Family Health Plan"],
      reimbursementRate: 85,
      claimProcessingTime: "7-10 business days",
      status: "active",
      totalPatients: 45,
      monthlyReimbursement: 125000
    },
    {
      id: "2",
      name: "MediCare Plus",
      contactInfo: {
        phone: "+91 8765432109",
        email: "support@medicareplus.com",
        website: "www.medicareplus.com",
        address: "456 Health Street, Delhi, NCR"
      },
      acceptedPlans: ["Basic Coverage Plan", "Emergency Care Plan"],
      reimbursementRate: 75,
      claimProcessingTime: "5-7 business days",
      status: "active",
      totalPatients: 32,
      monthlyReimbursement: 89000
    },
    {
      id: "3",
      name: "SecureHealth Corp",
      contactInfo: {
        phone: "+91 7654321098",
        email: "claims@securehealth.com",
        website: "www.securehealth.com",
        address: "789 Insurance Plaza, Bangalore, Karnataka"
      },
      acceptedPlans: ["Corporate Health Plan", "Individual Coverage"],
      reimbursementRate: 90,
      claimProcessingTime: "3-5 business days",
      status: "pending",
      totalPatients: 18,
      monthlyReimbursement: 67000
    }
  ])

  const [patientInsurances, setPatientInsurances] = useState<PatientInsurance[]>([
    {
      patientId: "P001",
      patientName: "Raj Kumar",
      provider: "HealthFirst Insurance",
      policyNumber: "HF-2024-001234",
      planName: "Premium Health Plan",
      coverageAmount: 500000,
      copay: 500,
      status: "active",
      lastClaim: {
        date: "2024-01-15",
        amount: 15000,
        status: "approved"
      }
    },
    {
      patientId: "P002",
      patientName: "Priya Sharma",
      provider: "MediCare Plus",
      policyNumber: "MCP-2023-005678",
      planName: "Basic Coverage Plan",
      coverageAmount: 200000,
      copay: 300,
      status: "active",
      lastClaim: {
        date: "2024-02-20",
        amount: 8000,
        status: "pending"
      }
    },
    {
      patientId: "P003",
      patientName: "Amit Patel",
      provider: "SecureHealth Corp",
      policyNumber: "SH-2024-009876",
      planName: "Corporate Health Plan",
      coverageAmount: 750000,
      copay: 1000,
      status: "active"
    },
    {
      patientId: "P004",
      patientName: "Sunita Singh",
      provider: "HealthFirst Insurance",
      policyNumber: "HF-2023-004321",
      planName: "Family Health Plan",
      coverageAmount: 300000,
      copay: 400,
      status: "expired"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<InsuranceProvider | null>(null)
  const [isAddProviderDialogOpen, setIsAddProviderDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "expired": return "bg-red-500"
      case "pending": return "bg-yellow-500"
      case "suspended": return "bg-orange-500"
      default: return "bg-gray-500"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount)
  }

  const filteredPatients = patientInsurances.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DoctorSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Insurance Management</h1>
              <p className="text-gray-400">Manage insurance providers and patient coverage</p>
            </div>
            <Dialog open={isAddProviderDialogOpen} onOpenChange={setIsAddProviderDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Provider
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Insurance Provider</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div className="col-span-2">
                    <Label htmlFor="providerName" className="text-white">Provider Name</Label>
                    <Input id="providerName" placeholder="Enter provider name" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" placeholder="Enter email" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-white">Website</Label>
                    <Input id="website" placeholder="Enter website" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="reimbursementRate" className="text-white">Reimbursement Rate (%)</Label>
                    <Input id="reimbursementRate" type="number" placeholder="Enter rate" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address" className="text-white">Address</Label>
                    <Textarea id="address" placeholder="Enter address" className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={() => setIsAddProviderDialogOpen(false)}>Cancel</Button>
                    <Button className="bg-emerald-500 hover:bg-emerald-600">Add Provider</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="providers" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
              <TabsTrigger value="providers" className="data-[state=active]:bg-emerald-600">Insurance Providers</TabsTrigger>
              <TabsTrigger value="patients" className="data-[state=active]:bg-emerald-600">Patient Insurance</TabsTrigger>
            </TabsList>

            {/* Insurance Providers Tab */}
            <TabsContent value="providers" className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Building2 className="w-8 h-8 text-emerald-400 mr-3" />
                      <div>
                        <p className="text-gray-400 text-sm">Active Providers</p>
                        <p className="text-white text-xl font-bold">
                          {insuranceProviders.filter(p => p.status === "active").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-blue-400 mr-3" />
                      <div>
                        <p className="text-gray-400 text-sm">Total Patients</p>
                        <p className="text-white text-xl font-bold">
                          {insuranceProviders.reduce((sum, p) => sum + p.totalPatients, 0)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <DollarSign className="w-8 h-8 text-green-400 mr-3" />
                      <div>
                        <p className="text-gray-400 text-sm">Monthly Revenue</p>
                        <p className="text-white text-xl font-bold">
                          {formatCurrency(
                            insuranceProviders.reduce((sum, p) => sum + p.monthlyReimbursement, 0)
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <Clock className="w-8 h-8 text-yellow-400 mr-3" />
                      <div>
                        <p className="text-gray-400 text-sm">Avg. Processing</p>
                        <p className="text-white text-xl font-bold">5-7 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Insurance Providers Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {insuranceProviders.map((provider) => (
                  <Card key={provider.id} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-lg flex items-center">
                            <Building2 className="w-5 h-5 mr-2 text-emerald-400" />
                            {provider.name}
                          </CardTitle>
                          <p className="text-gray-400 text-sm mt-1">{provider.contactInfo.address}</p>
                        </div>
                        <Badge className={`${getStatusColor(provider.status)} text-white`}>
                          {provider.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Reimbursement Rate</p>
                          <p className="text-white font-semibold text-lg">{provider.reimbursementRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Processing Time</p>
                          <p className="text-white font-semibold">{provider.claimProcessingTime}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Patients Covered</p>
                          <p className="text-white font-semibold">{provider.totalPatients}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Monthly Revenue</p>
                          <p className="text-white font-semibold">{formatCurrency(provider.monthlyReimbursement)}</p>
                        </div>
                      </div>

                      {/* Accepted Plans */}
                      <div className="mb-4">
                        <p className="text-gray-400 text-xs mb-2">Accepted Plans:</p>
                        <div className="flex flex-wrap gap-1">
                          {provider.acceptedPlans.slice(0, 2).map((plan, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {plan}
                            </Badge>
                          ))}
                          {provider.acceptedPlans.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{provider.acceptedPlans.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="text-white">{provider.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="text-white">{provider.contactInfo.email}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => setSelectedProvider(provider)}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Patient Insurance Tab */}
            <TabsContent value="patients" className="space-y-6">
              {/* Search Bar */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search patients, providers, or policy numbers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white pl-10"
                  />
                </div>
              </div>

              {/* Patient Insurance List */}
              <div className="grid grid-cols-1 gap-4">
                {filteredPatients.map((patient) => (
                  <Card key={patient.patientId} className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <UserCheck className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{patient.patientName}</h3>
                            <p className="text-gray-400 text-sm">Patient ID: {patient.patientId}</p>
                            <p className="text-gray-400 text-sm">Policy: {patient.policyNumber}</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(patient.status)} text-white`}>
                          {patient.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-gray-400 text-xs">Provider</p>
                          <p className="text-white font-medium">{patient.provider}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Plan</p>
                          <p className="text-white font-medium">{patient.planName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Coverage</p>
                          <p className="text-white font-medium">{formatCurrency(patient.coverageAmount)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Co-pay</p>
                          <p className="text-white font-medium">{formatCurrency(patient.copay)}</p>
                        </div>
                      </div>

                      {patient.lastClaim && (
                        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                          <p className="text-gray-400 text-xs mb-1">Last Claim</p>
                          <div className="flex justify-between items-center">
                            <span className="text-white text-sm">
                              {patient.lastClaim.date} • {formatCurrency(patient.lastClaim.amount)}
                            </span>
                            <Badge className={`${getStatusColor(patient.lastClaim.status)} text-white text-xs`}>
                              {patient.lastClaim.status}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Provider Details Dialog */}
          {selectedProvider && (
            <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
              <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl flex items-center">
                    <Building2 className="w-6 h-6 mr-2 text-emerald-400" />
                    {selectedProvider.name} - Provider Details
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-4">
                  {/* Contact Information */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="text-white">{selectedProvider.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="text-white">{selectedProvider.contactInfo.email}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                          <Shield className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="text-white">{selectedProvider.contactInfo.website}</span>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-400 text-sm">Address:</p>
                          <p className="text-white">{selectedProvider.contactInfo.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* All Accepted Plans */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Accepted Insurance Plans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {selectedProvider.acceptedPlans.map((plan, index) => (
                          <Badge key={index} variant="secondary" className="justify-center">
                            {plan}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Metrics */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-400">{selectedProvider.reimbursementRate}%</p>
                          <p className="text-gray-400 text-sm">Reimbursement Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-400">{selectedProvider.totalPatients}</p>
                          <p className="text-gray-400 text-sm">Patients Covered</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-400">
                            {formatCurrency(selectedProvider.monthlyReimbursement)}
                          </p>
                          <p className="text-gray-400 text-sm">Monthly Revenue</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-yellow-400">{selectedProvider.claimProcessingTime}</p>
                          <p className="text-gray-400 text-sm">Processing Time</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  )
}
