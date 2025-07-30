"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, TrendingUp, ArrowUpRight, ArrowDownLeft, Gift, Calendar, Pill, CreditCard } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"

export default function WalletPage() {
  const [healthCoinBalance, setHealthCoinBalance] = useState(250)
  const [totalEarned, setTotalEarned] = useState(1250)
  const [totalSpent, setTotalSpent] = useState(1000)

  const transactions = [
    {
      id: 1,
      type: "earned",
      amount: 5,
      description: "Medication taken on time - Vitamin D3",
      date: "2024-01-15",
      time: "09:00 AM",
    },
    {
      id: 2,
      type: "spent",
      amount: 160,
      description: "Purchased Amoxicillin 500mg",
      date: "2024-01-14",
      time: "02:30 PM",
    },
    {
      id: 3,
      type: "earned",
      amount: 25,
      description: "Attended appointment with Dr. Smith",
      date: "2024-01-14",
      time: "10:00 AM",
    },
    {
      id: 4,
      type: "earned",
      amount: 50,
      description: "7-day medication streak bonus",
      date: "2024-01-13",
      time: "11:59 PM",
    },
    {
      id: 5,
      type: "spent",
      amount: 85,
      description: "Purchased Ibuprofen 200mg",
      date: "2024-01-12",
      time: "04:15 PM",
    },
  ]

  const rewardOpportunities = [
    {
      activity: "Take today's medications",
      reward: 10,
      icon: Pill,
      available: true,
    },
    {
      activity: "Complete health survey",
      reward: 15,
      icon: Gift,
      available: true,
    },
    {
      activity: "Book next appointment",
      reward: 20,
      icon: Calendar,
      available: true,
    },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">HealthCoin Wallet</h1>
            <p className="text-gray-600">Manage your HealthCoin balance and transaction history</p>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm">Current Balance</p>
                    <p className="text-3xl font-bold">{healthCoinBalance} HC</p>
                    <p className="text-emerald-100 text-xs">${(healthCoinBalance * 0.1).toFixed(2)} USD</p>
                  </div>
                  <Coins className="w-12 h-12 text-emerald-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Earned</p>
                    <p className="text-2xl font-bold text-green-600">{totalEarned} HC</p>
                    <p className="text-gray-500 text-xs">${(totalEarned * 0.1).toFixed(2)} USD</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold text-blue-600">{totalSpent} HC</p>
                    <p className="text-gray-500 text-xs">${(totalSpent * 0.1).toFixed(2)} USD</p>
                  </div>
                  <CreditCard className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Earn More Section */}
          <Card className="bg-white border-emerald-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <Gift className="w-6 h-6 mr-2" />
                Earn More HealthCoins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rewardOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center mb-3">
                      <opportunity.icon className="w-5 h-5 text-emerald-600 mr-2" />
                      <span className="font-medium text-gray-900">{opportunity.activity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 font-bold">+{opportunity.reward} HC</span>
                      <Badge variant={opportunity.available ? "default" : "secondary"}>
                        {opportunity.available ? "Available" : "Completed"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="bg-white border-emerald-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                          transaction.type === "earned" ? "bg-green-100" : "bg-blue-100"
                        }`}
                      >
                        {transaction.type === "earned" ? (
                          <ArrowUpRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.date} at {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.type === "earned" ? "text-green-600" : "text-blue-600"}`}>
                        {transaction.type === "earned" ? "+" : "-"}
                        {transaction.amount} HC
                      </p>
                      <p className="text-sm text-gray-500">${(transaction.amount * 0.1).toFixed(2)} USD</p>
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
