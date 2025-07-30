"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, TestTube, Send, Check, FileText, Activity, Filter } from "lucide-react"
import { LabSidebar } from "@/components/lab-sidebar"

export default function ActivityLogs() {
  const [filterType, setFilterType] = useState("all")

  const activityLogs = [
    {
      id: 1,
      type: "appointment_accepted",
      description: "Accepted appointment request from John Doe",
      details: "Blood Test scheduled for Aug 1, 2025 at 10:30 AM",
      timestamp: "2025-07-31 09:15 AM",
      user: "Dr. Smith",
      status: "completed",
    },
    {
      id: 2,
      type: "results_sent",
      description: "Test results sent to Alice Brown",
      details: "Blood Test results delivered via secure portal",
      timestamp: "2025-07-31 08:45 AM",
      user: "Lab Tech Sarah",
      status: "completed",
    },
    {
      id: 3,
      type: "test_completed",
      description: "Completed MRI Scan for Bob Wilson",
      details: "MRI Scan processed and results ready for review",
      timestamp: "2025-07-30 04:30 PM",
      user: "Dr. Smith",
      status: "completed",
    },
    {
      id: 4,
      type: "appointment_declined",
      description: "Declined appointment request from Jane Smith",
      details: "MRI Scan request declined - equipment maintenance",
      timestamp: "2025-07-30 02:15 PM",
      user: "Dr. Smith",
      status: "completed",
    },
    {
      id: 5,
      type: "settings_updated",
      description: "Updated lab operating hours",
      details: "Changed opening time from 9:00 AM to 8:00 AM",
      timestamp: "2025-07-30 01:00 PM",
      user: "Dr. Smith",
      status: "completed",
    },
    {
      id: 6,
      type: "test_started",
      description: "Started X-Ray procedure for Mike Johnson",
      details: "Chest X-Ray in progress - estimated completion 3:45 PM",
      timestamp: "2025-07-30 03:30 PM",
      user: "Lab Tech Sarah",
      status: "in_progress",
    },
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case "appointment_accepted":
      case "appointment_declined":
        return <Calendar className="w-5 h-5" />
      case "results_sent":
        return <Send className="w-5 h-5" />
      case "test_completed":
      case "test_started":
        return <TestTube className="w-5 h-5" />
      case "settings_updated":
        return <FileText className="w-5 h-5" />
      default:
        return <Activity className="w-5 h-5" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case "appointment_accepted":
      case "test_completed":
      case "results_sent":
        return "text-emerald-600 bg-emerald-100"
      case "appointment_declined":
        return "text-red-600 bg-red-100"
      case "test_started":
        return "text-blue-600 bg-blue-100"
      case "settings_updated":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-800">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const filteredLogs = filterType === "all" ? activityLogs : activityLogs.filter((log) => log.type.includes(filterType))

  return (
    <div className="flex min-h-screen bg-gray-900">
      <LabSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Activity Logs</h1>
              <p className="text-gray-400">Track all lab activities and system events</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Activities</option>
                  <option value="appointment">Appointments</option>
                  <option value="test">Tests</option>
                  <option value="results">Results</option>
                  <option value="settings">Settings</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Activities</p>
                    <p className="text-2xl font-bold text-white">{activityLogs.length}</p>
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
                    <p className="text-sm text-gray-400">Today's Activities</p>
                    <p className="text-2xl font-bold text-white">
                      {activityLogs.filter((log) => log.timestamp.includes("2025-07-31")).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-white">
                      {activityLogs.filter((log) => log.status === "completed").length}
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
                    <p className="text-sm text-gray-400">In Progress</p>
                    <p className="text-2xl font-bold text-white">
                      {activityLogs.filter((log) => log.status === "in_progress").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredLogs.map((log, index) => (
                  <div key={log.id} className="relative">
                    {/* Timeline line */}
                    {index !== filteredLogs.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-600"></div>
                    )}

                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${getActivityColor(log.type)}`}
                      >
                        {getActivityIcon(log.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-medium">{log.description}</h3>
                          {getStatusBadge(log.status)}
                        </div>

                        <p className="text-gray-400 text-sm mb-2">{log.details}</p>

                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{log.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{log.user}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
