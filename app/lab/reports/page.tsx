"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Eye,
  Send,
  Calendar,
  User,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { LabSidebar } from "@/components/lab-sidebar"

export default function LabReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const testReports = [
    {
      id: 1,
      patientName: "Alice Brown",
      patientId: "P001",
      testType: "Complete Blood Count",
      testDate: "2025-07-30",
      completedDate: "2025-07-30",
      status: "ready",
      sent: false,
      results: {
        summary: "All parameters within normal ranges",
        details: "WBC: 7.2 K/uL, RBC: 4.5 M/uL, Hemoglobin: 14.2 g/dL, Hematocrit: 42.1%",
        notes: "Patient shows healthy blood profile. No abnormalities detected.",
      },
      technician: "Sarah Johnson",
      priority: "routine",
    },
    {
      id: 2,
      patientName: "Bob Wilson",
      patientId: "P002",
      testType: "MRI Scan - Lower Back",
      testDate: "2025-07-29",
      completedDate: "2025-07-29",
      status: "ready",
      sent: true,
      results: {
        summary: "No significant abnormalities detected",
        details: "Lumbar spine shows normal alignment. No disc herniation or nerve compression observed.",
        notes: "Recommend follow-up in 6 months if symptoms persist.",
      },
      technician: "Dr. Smith",
      priority: "urgent",
    },
    {
      id: 3,
      patientName: "Carol Davis",
      patientId: "P003",
      testType: "Lipid Profile",
      testDate: "2025-07-31",
      completedDate: "2025-07-31",
      status: "processing",
      sent: false,
      results: {
        summary: "Test in progress",
        details: "Sample received and currently being analyzed",
        notes: "Expected completion: 2025-08-01 2:00 PM",
      },
      technician: "Sarah Johnson",
      priority: "routine",
    },
    {
      id: 4,
      patientName: "David Miller",
      patientId: "P004",
      testType: "X-Ray - Chest",
      testDate: "2025-07-30",
      completedDate: "2025-07-30",
      status: "ready",
      sent: false,
      results: {
        summary: "Clear chest X-ray",
        details: "No acute cardiopulmonary abnormalities. Heart size normal. Lungs clear.",
        notes: "Excellent image quality. No follow-up required.",
      },
      technician: "Dr. Smith",
      priority: "routine",
    },
    {
      id: 5,
      patientName: "Emma Thompson",
      patientId: "P005",
      testType: "CT Scan - Abdomen",
      testDate: "2025-07-28",
      completedDate: "2025-07-28",
      status: "ready",
      sent: true,
      results: {
        summary: "Normal abdominal CT scan",
        details: "All organs appear normal in size and density. No masses or abnormalities detected.",
        notes: "Patient can resume normal activities.",
      },
      technician: "Dr. Smith",
      priority: "urgent",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-emerald-100 text-emerald-800">Ready</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>
      case "routine":
        return <Badge className="bg-gray-100 text-gray-800">Routine</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Normal</Badge>
    }
  }

  const filteredReports = testReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || report.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const handleSendResults = (reportId) => {
    // Handle sending results logic here
    console.log(`Sending results for report ${reportId}`)
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <LabSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Test Reports</h1>
              <p className="text-gray-400">Manage and review all laboratory test results</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Ready Reports</p>
                    <p className="text-2xl font-bold text-white">
                      {testReports.filter((report) => report.status === "ready").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Processing</p>
                    <p className="text-2xl font-bold text-white">
                      {testReports.filter((report) => report.status === "processing").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sent Reports</p>
                    <p className="text-2xl font-bold text-white">
                      {testReports.filter((report) => report.sent).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Urgent Reports</p>
                    <p className="text-2xl font-bold text-white">
                      {testReports.filter((report) => report.priority === "urgent").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by patient name, test type, or patient ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">All Status</option>
                    <option value="ready">Ready</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-xl font-semibold text-white">{report.patientName}</h3>
                        <span className="text-gray-400 text-sm">ID: {report.patientId}</span>
                        {getStatusBadge(report.status)}
                        {getPriorityBadge(report.priority)}
                        {report.sent && <Badge className="bg-green-100 text-green-800">Sent</Badge>}
                      </div>
                      <p className="text-emerald-400 font-medium mb-1">{report.testType}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Test Date: {report.testDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>Technician: {report.technician}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Summary */}
                  <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2">Results Summary</h4>
                    <p className="text-gray-300 text-sm mb-2">{report.results.summary}</p>
                    <p className="text-gray-400 text-xs">{report.results.details}</p>
                    {report.results.notes && (
                      <div className="mt-2 pt-2 border-t border-gray-600">
                        <p className="text-gray-400 text-xs">
                          <strong>Notes:</strong> {report.results.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>

                    {report.status === "ready" && !report.sent && (
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleSendResults(report.id)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send to Patient
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">No reports found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
