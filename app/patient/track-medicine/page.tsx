"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pill, Clock, CheckCircle, Coins, Calendar } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"

export default function TrackMedicinePage() {
  const [healthCoinBalance, setHealthCoinBalance] = useState(250)
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Vitamin D3",
      dosage: "1 tablet after breakfast",
      scheduledTime: "9:00 AM",
      taken: false,
      reward: 5,
    },
    {
      id: 2,
      name: "ABC Medicine",
      dosage: "2 tablets after dinner",
      scheduledTime: "8:00 PM",
      taken: false,
      reward: 5,
    },
    {
      id: 3,
      name: "Calcium Supplement",
      dosage: "1 tablet with lunch",
      scheduledTime: "1:00 PM",
      taken: true,
      reward: 5,
    },
  ])

  const [adherenceStats] = useState({
    weeklyStreak: 7,
    monthlyAdherence: 85,
    totalRewardsEarned: 150,
  })

  const markAsTaken = (medicationId: number) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === medicationId && !med.taken) {
          const newBalance = healthCoinBalance + med.reward
          setHealthCoinBalance(newBalance)

          // Persist to localStorage
          localStorage.setItem("healthCoinBalance", newBalance.toString())

          return { ...med, taken: true }
        }
        return med
      }),
    )
  }

  useEffect(() => {
    const savedBalance = localStorage.getItem("healthCoinBalance")
    if (savedBalance) {
      setHealthCoinBalance(Number.parseInt(savedBalance))
    }
  }, [])

  const pendingMedications = medications.filter((med) => !med.taken)
  const completedMedications = medications.filter((med) => med.taken)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header with HealthCoin Balance */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Medicine</h1>
              <p className="text-gray-600">Monitor your medication routine and earn HealthCoins</p>
            </div>
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Coins className="w-6 h-6 mr-2" />
                  <div>
                    <p className="text-sm opacity-90">HealthCoin Balance</p>
                    <p className="text-2xl font-bold">{healthCoinBalance} HC</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Adherence Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Weekly Streak</h3>
                <p className="text-3xl font-bold text-emerald-600">{adherenceStats.weeklyStreak}</p>
                <p className="text-sm text-gray-600">days in a row</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Monthly Adherence</h3>
                <p className="text-3xl font-bold text-emerald-600">{adherenceStats.monthlyAdherence}%</p>
                <p className="text-sm text-gray-600">completion rate</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6 text-center">
                <Coins className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">HC Earned</h3>
                <p className="text-3xl font-bold text-emerald-600">{adherenceStats.totalRewardsEarned}</p>
                <p className="text-sm text-gray-600">total rewards</p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Medications */}
          <Card className="bg-white border-emerald-200 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Clock className="w-6 h-6 mr-2 text-emerald-500" />
                Pending Medications ({pendingMedications.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingMedications.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <p className="text-gray-600">All medications taken for today! 🎉</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingMedications.map((medication) => (
                    <div
                      key={medication.id}
                      className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                          <Pill className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                          <p className="text-gray-600 text-sm">{medication.dosage}</p>
                          <p className="text-yellow-600 text-sm">Scheduled: {medication.scheduledTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600">
                          +{medication.reward} HC
                        </Badge>
                        <Button
                          onClick={() => markAsTaken(medication.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        >
                          Mark as Taken
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed Medications */}
          <Card className="bg-white border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <CheckCircle className="w-6 h-6 mr-2 text-emerald-500" />
                Completed Today ({completedMedications.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedMedications.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No medications completed yet today.</p>
              ) : (
                <div className="space-y-4">
                  {completedMedications.map((medication) => (
                    <div
                      key={medication.id}
                      className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{medication.name}</h3>
                          <p className="text-gray-600 text-sm">{medication.dosage}</p>
                          <p className="text-emerald-600 text-sm">Completed ✓</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500 text-white">+{medication.reward} HC Earned</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
