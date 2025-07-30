"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DollarSign, CreditCard, Coins, Clock, CheckCircle } from "lucide-react"

interface PaymentRequest {
  id: string
  doctorName: string
  patientName: string
  amount: number
  description: string
  date: string
  status: "pending" | "paid" | "declined"
  paymentMethod?: "healthcoin" | "googlepay"
}

interface PaymentRequestProps {
  userType: "patient" | "doctor"
  userId: string
}

export function PaymentRequest({ userType, userId }: PaymentRequestProps) {
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      patientName: "John Smith",
      amount: 150,
      description: "Consultation for chest pain evaluation",
      date: "2024-01-20",
      status: "pending",
    },
  ])

  const [newRequest, setNewRequest] = useState({
    patientName: "",
    amount: "",
    description: "",
  })

  const [healthCoinBalance] = useState(250)

  const handleCreatePaymentRequest = () => {
    if (newRequest.patientName && newRequest.amount && newRequest.description) {
      const request: PaymentRequest = {
        id: Date.now().toString(),
        doctorName: "Dr. Current User", // This would be the current doctor's name
        patientName: newRequest.patientName,
        amount: Number.parseFloat(newRequest.amount),
        description: newRequest.description,
        date: new Date().toISOString().split("T")[0],
        status: "pending",
      }

      setPaymentRequests((prev) => [...prev, request])
      setNewRequest({ patientName: "", amount: "", description: "" })
      alert("Payment request sent to patient!")
    }
  }

  const handlePayment = (requestId: string, method: "healthcoin" | "googlepay") => {
    const request = paymentRequests.find((r) => r.id === requestId)
    if (!request) return

    if (method === "healthcoin") {
      const healthCoinAmount = request.amount * 10 // 1 USD = 10 HC
      if (healthCoinBalance >= healthCoinAmount) {
        setPaymentRequests((prev) =>
          prev.map((r) => (r.id === requestId ? { ...r, status: "paid", paymentMethod: "healthcoin" } : r)),
        )
        alert(`Payment of ${healthCoinAmount} HC completed successfully!`)
      } else {
        alert("Insufficient HealthCoin balance!")
      }
    } else {
      // Simulate Google Pay
      setPaymentRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "paid", paymentMethod: "googlepay" } : r)),
      )
      alert(`Payment of $${request.amount} completed via Google Pay!`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {userType === "doctor" && (
        <Card className="bg-white border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-600">
              <DollarSign className="w-6 h-6 mr-2" />
              Create Payment Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={newRequest.patientName}
                onChange={(e) => setNewRequest((prev) => ({ ...prev, patientName: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter consultation fee"
                value={newRequest.amount}
                onChange={(e) => setNewRequest((prev) => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the service provided"
                value={newRequest.description}
                onChange={(e) => setNewRequest((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <Button onClick={handleCreatePaymentRequest} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Send Payment Request
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-600">
            <CreditCard className="w-6 h-6 mr-2" />
            {userType === "doctor" ? "Payment Requests Sent" : "Payment Requests"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentRequests.map((request) => (
              <div key={request.id} className="border border-emerald-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {userType === "doctor" ? `To: ${request.patientName}` : `From: ${request.doctorName}`}
                    </h3>
                    <p className="text-gray-600 text-sm">{request.description}</p>
                    <p className="text-gray-500 text-xs mt-1">{request.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${request.amount}</p>
                    <p className="text-sm text-gray-500">{request.amount * 10} HC</p>
                    <Badge className={`mt-1 ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                {userType === "patient" && request.status === "pending" && (
                  <div className="flex space-x-2 mt-4">
                    <Button
                      onClick={() => handlePayment(request.id, "healthcoin")}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1"
                      disabled={healthCoinBalance < request.amount * 10}
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      Pay with HealthCoin ({request.amount * 10} HC)
                    </Button>
                    <Button
                      onClick={() => handlePayment(request.id, "googlepay")}
                      variant="outline"
                      className="border-blue-500 text-blue-600 hover:bg-blue-50 flex-1"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay with Google Pay
                    </Button>
                  </div>
                )}

                {request.status === "paid" && (
                  <div className="flex items-center mt-4 text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Paid via {request.paymentMethod === "healthcoin" ? "HealthCoin" : "Google Pay"}
                    </span>
                  </div>
                )}

                {userType === "doctor" && request.status === "pending" && (
                  <div className="flex items-center mt-4 text-yellow-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">Waiting for patient payment</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
