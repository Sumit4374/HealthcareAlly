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
  UserCheck,
  AlertTriangle,
  TrendingUp,
  PieChart,
  BarChart3
} from "lucide-react"
import { HospitalSidebar } from "@/components/hospital-sidebar"

interface InsurancePartnership {
  id: string
  providerName: string
  partnershipType: "preferred" | "standard" | "limited"
  contractStartDate: string
  contractEndDate: string
  reimbursementRate: number
  claimProcessingTime: string
  status: "active" | "pending" | "suspended" | "expired"
  monthlyVolume: number
  totalRevenue: number
  acceptedServices: string[]
  contactInfo: {
    representativeName: string
    phone: string
    email: string
    address: string
  }
  performanceMetrics: {
    averageClaimValue: number
    approvalRate: number
    denialRate: number
    pendingClaims: number
  }
}

interface HospitalInsuranceScheme {
  id: string
  schemeName: string
  provider: string
  description: string
  eligibilityCriteria: string[]
  coverageDetails: {
    maxCoverage: number
    roomRent: number
    surgeryLimit: number
    emergencyCover: number
    ambulanceCover: number
  }
  exclusions: string[]
  premiumRange: {
    min: number
    max: number
  }
  claimSettlementRatio: number
  networkHospitals: number
  customerRating: number
  status: "active" | "inactive"
}

export default function HospitalInsurances() {
  const [insurancePartnerships, setInsurancePartnerships] = useState<InsurancePartnership[]>([
    {
      id: "1",
      providerName: "HealthFirst Insurance",
      partnershipType: "preferred",
      contractStartDate: "2024-01-01",
      contractEndDate: "2025-12-31",
      reimbursementRate: 90,
      claimProcessingTime: "5-7 business days",
      status: "active",
      monthlyVolume: 450,
      totalRevenue: 2850000,
      acceptedServices: ["Emergency Care", "Surgery", "ICU", "Diagnostics", "Pharmacy", "Maternity"],
      contactInfo: {
        representativeName: "Rahul Mehta",
        phone: "+91 9876543210",
        email: "rahul.mehta@healthfirst.com",
        address: "123 Business Park, Mumbai, Maharashtra"
      },
      performanceMetrics: {
        averageClaimValue: 18500,
        approvalRate: 94,
        denialRate: 4,
        pendingClaims: 23
      }
    },
    {
      id: "2",
      providerName: "MediCare Plus",
      partnershipType: "standard",
      contractStartDate: "2023-06-01",
      contractEndDate: "2024-05-31",
      reimbursementRate: 85,
      claimProcessingTime: "7-10 business days",
      status: "active",
      monthlyVolume: 320,
      totalRevenue: 1980000,
      acceptedServices: ["Emergency Care", "Surgery", "General Ward", "Diagnostics"],
      contactInfo: {
        representativeName: "Priya Sharma",
        phone: "+91 8765432109",
        email: "priya.sharma@medicareplus.com",
        address: "456 Health Street, Delhi, NCR"
      },
      performanceMetrics: {
        averageClaimValue: 15200,
        approvalRate: 89,
        denialRate: 8,
        pendingClaims: 41
      }
    },
    {
      id: "3",
      providerName: "SecureHealth Corp",
      partnershipType: "limited",
      contractStartDate: "2024-03-01",
      contractEndDate: "2025-02-28",
      reimbursementRate: 80,
      claimProcessingTime: "10-14 business days",
      status: "pending",
      monthlyVolume: 180,
      totalRevenue: 890000,
      acceptedServices: ["Emergency Care", "General Ward", "Diagnostics"],
      contactInfo: {
        representativeName: "Amit Gupta",
        phone: "+91 7654321098",
        email: "amit.gupta@securehealth.com",
        address: "789 Insurance Plaza, Bangalore, Karnataka"
      },
      performanceMetrics: {
        averageClaimValue: 12800,
        approvalRate: 86,
        denialRate: 11,
        pendingClaims: 18
      }
    }
  ])

  const [hospitalSchemes, setHospitalSchemes] = useState<HospitalInsuranceScheme[]>([
    {
      id: "1",
      schemeName: "HealthCare Ally Premium Plan",
      provider: "Healthcare Ally Insurance",
      description: "Comprehensive health insurance with maximum coverage for all medical needs including advanced treatments and surgeries.",
      eligibilityCriteria: [
        "Age: 18-65 years",
        "Pre-existing conditions covered after 2 years",
        "Annual health check-up mandatory",
        "No tobacco/alcohol dependency"
      ],
      coverageDetails: {
        maxCoverage: 1000000,
        roomRent: 5000,
        surgeryLimit: 500000,
        emergencyCover: 100000,
        ambulanceCover: 2000
      },
      exclusions: [
        "Cosmetic surgeries",
        "Dental treatments (unless due to accident)",
        "Infertility treatments",
        "Mental health disorders"
      ],
      premiumRange: {
        min: 15000,
        max: 25000
      },
      claimSettlementRatio: 96.5,
      networkHospitals: 1200,
      customerRating: 4.5,
      status: "active"
    },
    {
      id: "2",
      schemeName: "HealthCare Ally Basic Plan",
      provider: "Healthcare Ally Insurance",
      description: "Essential health coverage for basic medical needs and emergency care with affordable premiums.",
      eligibilityCriteria: [
        "Age: 18-60 years",
        "Basic health screening required",
        "No major pre-existing conditions"
      ],
      coverageDetails: {
        maxCoverage: 300000,
        roomRent: 2000,
        surgeryLimit: 150000,
        emergencyCover: 50000,
        ambulanceCover: 1000
      },
      exclusions: [
        "Pre-existing conditions",
        "Cosmetic surgeries",
        "Dental treatments",
        "Alternative medicine"
      ],
      premiumRange: {
        min: 6000,
        max: 12000
      },
      claimSettlementRatio: 94.2,
      networkHospitals: 800,
      customerRating: 4.2,
      status: "active"
    },
    {
      id: "3",
      schemeName: "HealthCare Ally Family Plan",
      provider: "Healthcare Ally Insurance",
      description: "Family-oriented health insurance covering up to 6 family members with special maternity and child care benefits.",
      eligibilityCriteria: [
        "Family size: 2-6 members",
        "Age: Newborn to 65 years",
        "Maternity coverage after 2 years",
        "Child immunization covered"
      ],
      coverageDetails: {
        maxCoverage: 750000,
        roomRent: 3500,
        surgeryLimit: 300000,
        emergencyCover: 75000,
        ambulanceCover: 1500
      },
      exclusions: [
        "Pre-existing conditions for first 4 years",
        "Cosmetic surgeries",
        "Alternative medicine",
        "Experimental treatments"
      ],
      premiumRange: {
        min: 20000,
        max: 35000
      },
      claimSettlementRatio: 95.8,
      networkHospitals: 1000,
      customerRating: 4.7,
      status: "active"
    }
  ])

  const [selectedPartnership, setSelectedPartnership] = useState<InsurancePartnership | null>(null)
  const [selectedScheme, setSelectedScheme] = useState<HospitalInsuranceScheme | null>(null)
  const [isAddPartnershipDialogOpen, setIsAddPartnershipDialogOpen] = useState(false)
  const [isAddSchemeDialogOpen, setIsAddSchemeDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500"
      case "expired": return "bg-red-500"
      case "pending": return "bg-yellow-500"
      case "suspended": return "bg-orange-500"
      case "inactive": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getPartnershipTypeColor = (type: string) => {
    switch (type) {
      case "preferred": return "bg-emerald-500"
      case "standard": return "bg-blue-500"
      case "limited": return "bg-orange-500"
      default: return "bg-gray-500"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount)
  }

  const totalRevenue = insurancePartnerships.reduce((sum, p) => sum + p.totalRevenue, 0)
  const totalMonthlyVolume = insurancePartnerships.reduce((sum, p) => sum + p.monthlyVolume, 0)
  const activePartnerships = insurancePartnerships.filter(p => p.status === "active").length

  return (
    <div className="flex min-h-screen bg-gray-900">
      <HospitalSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Insurance Management</h1>
              <p className="text-gray-400">Manage insurance partnerships and hospital schemes</p>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isAddPartnershipDialogOpen} onOpenChange={setIsAddPartnershipDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Partnership
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add Insurance Partnership</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div className="col-span-2">
                      <Label htmlFor="providerName" className="text-white">Provider Name</Label>
                      <Input id="providerName" placeholder="Enter provider name" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="partnershipType" className="text-white">Partnership Type</Label>
                      <Select>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="preferred">Preferred</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="limited">Limited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="reimbursementRate" className="text-white">Reimbursement Rate (%)</Label>
                      <Input id="reimbursementRate" type="number" placeholder="Enter rate" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setIsAddPartnershipDialogOpen(false)}>Cancel</Button>
                      <Button className="bg-emerald-500 hover:bg-emerald-600">Add Partnership</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddSchemeDialogOpen} onOpenChange={setIsAddSchemeDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Scheme
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add Hospital Insurance Scheme</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div className="col-span-2">
                      <Label htmlFor="schemeName" className="text-white">Scheme Name</Label>
                      <Input id="schemeName" placeholder="Enter scheme name" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="maxCoverage" className="text-white">Max Coverage</Label>
                      <Input id="maxCoverage" type="number" placeholder="Enter amount" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="roomRent" className="text-white">Room Rent Limit</Label>
                      <Input id="roomRent" type="number" placeholder="Enter amount" className="bg-gray-700 border-gray-600 text-white" />
                    </div>
                    <div className="col-span-2 flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setIsAddSchemeDialogOpen(false)}>Cancel</Button>
                      <Button className="bg-emerald-500 hover:bg-emerald-600">Add Scheme</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Overview Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Building2 className="w-8 h-8 text-emerald-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Active Partnerships</p>
                    <p className="text-white text-xl font-bold">{activePartnerships}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-white text-xl font-bold">{formatCurrency(totalRevenue)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-blue-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Monthly Claims</p>
                    <p className="text-white text-xl font-bold">{totalMonthlyVolume}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-purple-400 mr-3" />
                  <div>
                    <p className="text-gray-400 text-sm">Hospital Schemes</p>
                    <p className="text-white text-xl font-bold">{hospitalSchemes.filter(s => s.status === "active").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="partnerships" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
              <TabsTrigger value="partnerships" className="data-[state=active]:bg-emerald-600">Insurance Partnerships</TabsTrigger>
              <TabsTrigger value="schemes" className="data-[state=active]:bg-emerald-600">Hospital Schemes</TabsTrigger>
            </TabsList>

            {/* Insurance Partnerships Tab */}
            <TabsContent value="partnerships" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {insurancePartnerships.map((partnership) => (
                  <Card key={partnership.id} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-lg flex items-center">
                            <Building2 className="w-5 h-5 mr-2 text-emerald-400" />
                            {partnership.providerName}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge className={`${getPartnershipTypeColor(partnership.partnershipType)} text-white text-xs`}>
                              {partnership.partnershipType}
                            </Badge>
                            <Badge className={`${getStatusColor(partnership.status)} text-white text-xs`}>
                              {partnership.status}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPartnership(partnership)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Reimbursement Rate</p>
                          <p className="text-white font-semibold text-lg">{partnership.reimbursementRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Monthly Volume</p>
                          <p className="text-white font-semibold">{partnership.monthlyVolume}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Total Revenue</p>
                          <p className="text-white font-semibold">{formatCurrency(partnership.totalRevenue)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Approval Rate</p>
                          <p className="text-white font-semibold">{partnership.performanceMetrics.approvalRate}%</p>
                        </div>
                      </div>

                      {/* Contract Info */}
                      <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-emerald-400 mr-2" />
                            <span className="text-white text-sm">
                              Contract: {partnership.contractStartDate} to {partnership.contractEndDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <p className="text-gray-400 text-xs mb-2">Accepted Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {partnership.acceptedServices.slice(0, 3).map((service, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {partnership.acceptedServices.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{partnership.acceptedServices.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="space-y-1 mb-4">
                        <p className="text-gray-400 text-xs">Representative: {partnership.contactInfo.representativeName}</p>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 text-emerald-400 mr-1" />
                          <span className="text-white text-xs">{partnership.contactInfo.phone}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedPartnership(partnership)}
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        View Analytics
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Hospital Schemes Tab */}
            <TabsContent value="schemes" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {hospitalSchemes.map((scheme) => (
                  <Card key={scheme.id} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white text-lg flex items-center">
                            <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                            {scheme.schemeName}
                          </CardTitle>
                          <p className="text-gray-400 text-sm mt-1">{scheme.provider}</p>
                          <Badge className={`${getStatusColor(scheme.status)} text-white text-xs mt-2`}>
                            {scheme.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-yellow-400">
                            {"★".repeat(Math.floor(scheme.customerRating))}
                            <span className="ml-1 text-white text-sm">{scheme.customerRating}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Coverage Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Max Coverage</p>
                          <p className="text-white font-semibold">{formatCurrency(scheme.coverageDetails.maxCoverage)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Room Rent</p>
                          <p className="text-white font-semibold">{formatCurrency(scheme.coverageDetails.roomRent)}/day</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Surgery Limit</p>
                          <p className="text-white font-semibold">{formatCurrency(scheme.coverageDetails.surgeryLimit)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Emergency Cover</p>
                          <p className="text-white font-semibold">{formatCurrency(scheme.coverageDetails.emergencyCover)}</p>
                        </div>
                      </div>

                      {/* Premium Range */}
                      <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                        <p className="text-gray-400 text-xs mb-1">Annual Premium</p>
                        <p className="text-white font-semibold">
                          {formatCurrency(scheme.premiumRange.min)} - {formatCurrency(scheme.premiumRange.max)}
                        </p>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-xs">Settlement Ratio</p>
                          <p className="text-green-400 font-semibold">{scheme.claimSettlementRatio}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Network Hospitals</p>
                          <p className="text-white font-semibold">{scheme.networkHospitals}</p>
                        </div>
                      </div>

                      {/* Eligibility */}
                      <div className="mb-4">
                        <p className="text-gray-400 text-xs mb-2">Key Eligibility:</p>
                        <div className="space-y-1">
                          {scheme.eligibilityCriteria.slice(0, 2).map((criteria, index) => (
                            <p key={index} className="text-white text-xs">• {criteria}</p>
                          ))}
                          {scheme.eligibilityCriteria.length > 2 && (
                            <p className="text-gray-400 text-xs">+{scheme.eligibilityCriteria.length - 2} more criteria</p>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedScheme(scheme)}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        View Full Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Partnership Details Dialog */}
          {selectedPartnership && (
            <Dialog open={!!selectedPartnership} onOpenChange={() => setSelectedPartnership(null)}>
              <DialogContent className="bg-gray-800 border-gray-700 max-w-5xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl flex items-center">
                    <Building2 className="w-6 h-6 mr-2 text-emerald-400" />
                    {selectedPartnership.providerName} - Partnership Analytics
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-4">
                  {/* Performance Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-xs">Approval Rate</p>
                        <p className="text-white text-xl font-bold">{selectedPartnership.performanceMetrics.approvalRate}%</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <PieChart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-xs">Denial Rate</p>
                        <p className="text-white text-xl font-bold">{selectedPartnership.performanceMetrics.denialRate}%</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-xs">Pending Claims</p>
                        <p className="text-white text-xl font-bold">{selectedPartnership.performanceMetrics.pendingClaims}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4 text-center">
                        <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-gray-400 text-xs">Avg. Claim Value</p>
                        <p className="text-white text-xl font-bold">{formatCurrency(selectedPartnership.performanceMetrics.averageClaimValue)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Contact Information */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Partnership Contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Representative</p>
                          <p className="text-white font-medium">{selectedPartnership.contactInfo.representativeName}</p>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="text-white">{selectedPartnership.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="text-white">{selectedPartnership.contactInfo.email}</span>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-400 text-sm">Address</p>
                          <p className="text-white">{selectedPartnership.contactInfo.address}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* All Accepted Services */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Accepted Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {selectedPartnership.acceptedServices.map((service, index) => (
                          <Badge key={index} variant="secondary" className="justify-center">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {/* Scheme Details Dialog */}
          {selectedScheme && (
            <Dialog open={!!selectedScheme} onOpenChange={() => setSelectedScheme(null)}>
              <DialogContent className="bg-gray-800 border-gray-700 max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-emerald-400" />
                    {selectedScheme.schemeName}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-4">
                  {/* Description */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white">{selectedScheme.description}</p>
                    </CardContent>
                  </Card>

                  {/* Full Coverage Details */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Coverage Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Maximum Coverage</p>
                          <p className="text-white font-semibold">{formatCurrency(selectedScheme.coverageDetails.maxCoverage)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Room Rent Limit</p>
                          <p className="text-white font-semibold">{formatCurrency(selectedScheme.coverageDetails.roomRent)}/day</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Surgery Limit</p>
                          <p className="text-white font-semibold">{formatCurrency(selectedScheme.coverageDetails.surgeryLimit)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Emergency Cover</p>
                          <p className="text-white font-semibold">{formatCurrency(selectedScheme.coverageDetails.emergencyCover)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Ambulance Cover</p>
                          <p className="text-white font-semibold">{formatCurrency(selectedScheme.coverageDetails.ambulanceCover)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Eligibility Criteria */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Eligibility Criteria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedScheme.eligibilityCriteria.map((criteria, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                            <span className="text-white">{criteria}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Exclusions */}
                  <Card className="bg-gray-700 border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Exclusions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {selectedScheme.exclusions.map((exclusion, index) => (
                          <div key={index} className="flex items-center">
                            <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                            <span className="text-white">{exclusion}</span>
                          </div>
                        ))}
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
