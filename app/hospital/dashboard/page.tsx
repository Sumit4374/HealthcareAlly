"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Search, Edit, Building2, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { HospitalSidebar } from "@/components/hospital-sidebar"

export default function HospitalDashboard() {
  const [hospitalInfo] = useState({
    name: "Chakraborty Multi Speciality Hospital",
    address: "Near Dollygunj Junction, South Andaman, Andaman and Nicobar Islands (744101)",
    contact: "03192251971",
  })

  return (
    <div className="flex min-h-screen bg-gray-900">
      <HospitalSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Hospital Info Card */}
          <Card className="bg-gray-800 border-emerald-500/20 mb-8">
            <CardContent className="p-8">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-6">
                  <Building2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{hospitalInfo.name}</h1>
                  <div className="flex items-center text-gray-400 text-sm mb-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    {hospitalInfo.address}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    {hospitalInfo.contact}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/hospital/appointments">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <Calendar className="w-6 h-6 text-emerald-400 mr-3" />
                        <h3 className="text-white font-semibold text-lg">View Appointments</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Manage patient appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/hospital/patients">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <Search className="w-6 h-6 text-emerald-400 mr-3" />
                        <h3 className="text-white font-semibold text-lg">Find Patients</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Search and manage patient records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/hospital/doctors">
              <Card className="bg-gray-800 border-emerald-500/20 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-3">
                        <Edit className="w-6 h-6 text-emerald-400 mr-3" />
                        <h3 className="text-white font-semibold text-lg">Manage Doctors</h3>
                      </div>
                      <p className="text-gray-400 text-sm">Add or update doctor information</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
