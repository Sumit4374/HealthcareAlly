"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, MapPin, Coins, CreditCard, Wallet } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"

export default function PharmacyPage() {
  const [healthCoinBalance, setHealthCoinBalance] = useState(250)
  const [cart, setCart] = useState<any[]>([])

  const medications = [
    {
      id: 1,
      name: "Amoxicillin 500mg",
      price: 15.99,
      healthCoinPrice: 160, // 1 HC = $0.10, so $15.99 = 160 HC
      inStock: true,
      pharmacy: "MedPlus Pharmacy",
      distance: "0.5 km",
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      price: 8.5,
      healthCoinPrice: 85,
      inStock: true,
      pharmacy: "Apollo Pharmacy",
      distance: "1.2 km",
    },
    {
      id: 3,
      name: "Vitamin D3 1000 IU",
      price: 12.99,
      healthCoinPrice: 130,
      inStock: true,
      pharmacy: "Wellness Pharmacy",
      distance: "0.8 km",
    },
    {
      id: 4,
      name: "Paracetamol 650mg",
      price: 5.99,
      healthCoinPrice: 60,
      inStock: false,
      pharmacy: "HealthFirst Pharmacy",
      distance: "2.1 km",
    },
  ]

  const handlePurchase = (medication: any, paymentMethod: "healthcoin" | "googlepay") => {
    if (paymentMethod === "healthcoin") {
      if (healthCoinBalance >= medication.healthCoinPrice) {
        setHealthCoinBalance((prev) => prev - medication.healthCoinPrice)

        // Also update the global balance in localStorage for persistence
        const newBalance = healthCoinBalance - medication.healthCoinPrice
        localStorage.setItem("healthCoinBalance", newBalance.toString())

        alert(`Successfully purchased ${medication.name} with ${medication.healthCoinPrice} HealthCoins!`)
      } else {
        alert("Insufficient HealthCoin balance!")
      }
    } else {
      // Simulate Google Pay
      alert(`Processing Google Pay payment of $${medication.price} for ${medication.name}...`)
      setTimeout(() => {
        alert(`Successfully purchased ${medication.name} with Google Pay!`)
      }, 2000)
    }
  }

  useEffect(() => {
    const savedBalance = localStorage.getItem("healthCoinBalance")
    if (savedBalance) {
      setHealthCoinBalance(Number.parseInt(savedBalance))
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <PatientSidebar />

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with HealthCoin Balance */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pharmacy</h1>
              <p className="text-gray-600">Buy medicines with HealthCoin or traditional payment</p>
            </div>
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Coins className="w-6 h-6 mr-2" />
                  <div>
                    <p className="text-sm opacity-90">HealthCoin Balance</p>
                    <p className="text-2xl font-bold">{healthCoinBalance} HC</p>
                    <p className="text-xs opacity-75">${(healthCoinBalance * 0.1).toFixed(2)} USD</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Medications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medications.map((medication) => (
              <Card key={medication.id} className="bg-white border-emerald-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{medication.name}</CardTitle>
                    <Badge variant={medication.inStock ? "default" : "secondary"}>
                      {medication.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {medication.pharmacy} • {medication.distance}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">USD Price:</span>
                        <span className="font-semibold">${medication.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">HealthCoin Price:</span>
                        <span className="font-semibold text-emerald-600">{medication.healthCoinPrice} HC</span>
                      </div>
                    </div>

                    {/* Payment Options */}
                    {medication.inStock && (
                      <div className="space-y-2">
                        <Button
                          onClick={() => handlePurchase(medication, "healthcoin")}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                          disabled={healthCoinBalance < medication.healthCoinPrice}
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          Pay with HealthCoin
                        </Button>
                        <Button
                          onClick={() => handlePurchase(medication, "googlepay")}
                          variant="outline"
                          className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay with Google Pay
                        </Button>
                        <Button
                          onClick={() => window.open("https://blinkit.com", "_blank")}
                          variant="outline"
                          className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        >
                          Find on BlinkIt
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* HealthCoin Info Section */}
          <Card className="mt-8 bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center text-emerald-700">
                <Coins className="w-6 h-6 mr-2" />
                About HealthCoin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-emerald-700 mb-2">Earn HealthCoins</h3>
                  <p className="text-sm text-gray-600">
                    Get rewarded for taking medications on time, attending appointments, and maintaining healthy habits.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-emerald-700 mb-2">Spend on Healthcare</h3>
                  <p className="text-sm text-gray-600">
                    Use HealthCoins to pay for medications, consultations, and other healthcare services.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-emerald-700 mb-2">Exchange Rate</h3>
                  <p className="text-sm text-gray-600">
                    1 HealthCoin = $0.10 USD. Transparent and stable pricing for all healthcare transactions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
