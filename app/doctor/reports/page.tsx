"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Download, Eye, Calendar, User } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"

export default function DoctorReportsPage() {
  const [reports, setReports] = useState([
    {
      id: 1,
      patientName: "John Smith",
      reportType: "Blood Test",
      date: "2024-01-15",
      status: "completed",
      findings: "All parameters within normal range",
      recommendations: "Continue current medication",
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      reportType: "X-Ray",
      date: "2024-01-12",
      status: "pending",
      findings: "Awaiting radiologist review",
      recommendations: "",
    },
  ])

  const [newReport, setNewReport] = useState({
    patientName: "",
    reportType: "",
    findings: "",
    recommendations: "",
    followUpRequired: false,
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateReport = () => {
    if (newReport.patientName && newReport.reportType && newReport.findings) {
      const report = {
        id: Date.now(),
        ...newReport,
        date: new Date().toISOString().split("T")[0],
        status: "completed",
      }
      setReports([...reports, report])
      setNewReport({
        patientName: "",
        reportType: "",
        findings: "",
        recommendations: "",
        followUpRequired: false,
      })
      setIsDialogOpen(false)
      alert("Report created successfully!")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DoctorSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Patient Reports</h1>
              <p className="text-gray-400">Create and manage patient medical reports</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Report
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Report</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input
                        id="patientName"
                        placeholder="Enter patient name"
                        value={newReport.patientName}
                        onChange={(e) => setNewReport((prev) => ({ ...prev, patientName: e.target.value }))}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reportType">Report Type</Label>
                      <Select onValueChange={(value) => setNewReport((prev) => ({ ...prev, reportType: value }))}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="blood_test">Blood Test</SelectItem>
                          <SelectItem value="xray">X-Ray</SelectItem>
                          <SelectItem value="mri">MRI Scan</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="follow_up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="findings">Findings</Label>
                    <Textarea
                      id="findings"
                      placeholder="Enter your findings and observations"
                      value={newReport.findings}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, findings: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recommendations">Recommendations</Label>
                    <Textarea
                      id="recommendations"
                      placeholder="Enter treatment recommendations"
                      value={newReport.recommendations}
                      onChange={(e) => setNewReport((prev) => ({ ...prev, recommendations: e.target.value }))}
                      className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="border-gray-600 text-gray-300 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateReport} className="bg-emerald-500 hover:bg-emerald-600">
                      Create Report
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <FileText className="w-5 h-5 text-emerald-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">{report.reportType}</h3>
                        <Badge className={`ml-3 ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center text-gray-300">
                          <User className="w-4 h-4 mr-2" />
                          <span>Patient: {report.patientName}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Date: {report.date}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-gray-400 text-sm mb-1">Findings:</p>
                        <p className="text-white">{report.findings}</p>
                      </div>

                      {report.recommendations && (
                        <div>
                          <p className="text-gray-400 text-sm mb-1">Recommendations:</p>
                          <p className="text-white">{report.recommendations}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
