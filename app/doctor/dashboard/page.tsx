"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, FileText, Building2, Phone } from "lucide-react"
import { DoctorSidebar } from "@/components/doctor-sidebar"

export default function DoctorDashboard() {
  const [hospitalInfo] = useState({
    name: "City Hospital",
    address: "123 Main Street, Springfield",
    contact: "(555) 123-4567",
  })

  const [stats] = useState({
    todayAppointments: 8,
    totalPatients: 145,
    pendingReports: 3,
  })

  const [recentPatients] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      date: "Jan 15, 2024",
      status: "Completed",
    },
  ])

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DoctorSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Doctor Dashboard</h1>
            <p className="text-gray-400">Manage your patients and appointments</p>
          </div>

          {/* Hospital Info Card */}
          <Card className="bg-gray-800 border-emerald-500/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="w-12 h-12 text-emerald-400 mr-4" />
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{hospitalInfo.name}</h2>
                  <p className="text-gray-400 text-sm mb-1">{hospitalInfo.address}</p>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Phone className="w-4 h-4 mr-1" />
                    {hospitalInfo.contact}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-emerald-400 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{stats.todayAppointments}</h3>
                    <p className="text-gray-400 text-sm">Today's Appointments</p>
                    <p className="text-emerald-400 text-xs">Upcoming today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-emerald-400 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{stats.totalPatients}</h3>
                    <p className="text-gray-400 text-sm">Total Patients</p>
                    <p className="text-emerald-400 text-xs">Active patients</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-emerald-400 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{stats.pendingReports}</h3>
                    <p className="text-gray-400 text-sm">Pending Reports</p>
                    <p className="text-emerald-400 text-xs">Need review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Patients */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Patients</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-emerald-400 font-medium">NAME</th>
                      <th className="text-left py-3 px-4 text-emerald-400 font-medium">DATE</th>
                      <th className="text-left py-3 px-4 text-emerald-400 font-medium">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPatients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-700/50">
                        <td className="py-3 px-4 text-white">{patient.name}</td>
                        <td className="py-3 px-4 text-gray-400">{patient.date}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-xs">
                            {patient.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
