"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Calendar } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"

export default function HealthRecordsPage() {
  const [prescriptions] = useState([
    {
      id: 1,
      date: "July 19, 2022 at 03:27 PM",
      medications: [
        { name: "Amoxicillin 500mg", number: 1 },
        { name: "Ibuprofen 200mg", number: 2 },
        { name: "Vitamin D3 1000 IU", number: 3 },
      ],
    },
    {
      id: 2,
      date: "July 12, 2022 at 03:27 PM",
      medications: [
        { name: "Paracetamol 650mg", number: 1 },
        { name: "Cetirizine 10mg", number: 2 },
      ],
    },
  ])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-emerald-500 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900">My Health Records</h1>
            </div>
            <p className="text-gray-600">
              Keep track of your medical history, prescriptions, and treatments all in one beautiful, secure place.
            </p>
          </div>

          {/* Prescriptions */}
          <div className="space-y-6">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id} className="bg-white border-emerald-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Prescription</h3>
                      <p className="text-sm text-emerald-600">{prescription.date}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {prescription.medications.map((medication) => (
                      <div
                        key={medication.number}
                        className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-medium">{medication.number}</span>
                          </div>
                          <span className="font-medium text-gray-900">{medication.name}</span>
                        </div>
                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                          Find on BlinkIt
                        </Button>
                      </div>
                    ))}
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
