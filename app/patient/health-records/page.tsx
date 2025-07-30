"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ShoppingCart, Pill, Star, Truck, Coins, ExternalLink } from "lucide-react"
import { PatientSidebar } from "@/components/patient-sidebar"
import { openBlinkitSearchWithDosage } from "@/lib/blinkit"

export default function PharmacyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const [products] = useState([
    {
      id: 1,
      name: "Vitamin D3",
      dosage: "1000 IU",
      category: "vitamins",
      price: 12.99,
      healthCoinPrice: 100,
      rating: 4.8,
      image: "/placeholder.svg?height=80&width=80",
      delivery: "Same Day",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      category: "prescription",
      price: 8.5,
      healthCoinPrice: 70,
      rating: 4.9,
      image: "/placeholder.svg?height=80&width=80",
      delivery: "Next Day",
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "10mg",
      category: "prescription",
      price: 15.75,
      healthCoinPrice: 120,
      rating: 4.7,
      image: "/placeholder.svg?height=80&width=80",
      delivery: "Same Day",
    },
    {
      id: 4,
      name: "Aspirin",
      dosage: "81mg",
      category: "otc",
      price: 6.25,
      healthCoinPrice: 50,
      rating: 4.6,
      image: "/placeholder.svg?height=80&width=80",
      delivery: "Same Day",
    },
    {
      id: 5,
      name: "Multivitamin",
      dosage: "Daily",
      category: "vitamins",
      price: 14.99,
      healthCoinPrice: 110,
      rating: 4.5,
      image: "/placeholder.svg?height=80&width=80",
      delivery: "Next Day",
    },
    {
      id: 6,
      name: "Ibuprofen",
      dosage: "200mg",
      category: "otc",
      price: 7.5,
      healthCoinPrice: 60,
      rating: 4.7,
      image: "/placeholder.svg?height=80&width=80",
      delivery: "Same Day",
    },
  ])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "all" || product.category === activeTab),
  )

  const handleBlinkitSearch = (productName: string, dosage: string) => {
    openBlinkitSearchWithDosage(productName, dosage)
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <PatientSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Pharmacy</h1>
            <p className="text-gray-400">Purchase medicines with HealthCoin or regular payment</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-gray-800">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="prescription">Prescription</TabsTrigger>
                <TabsTrigger value="otc">Over the Counter</TabsTrigger>
                <TabsTrigger value="vitamins">Vitamins & Supplements</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{product.name}</h3>
                      <p className="text-gray-400 text-sm">{product.dosage}</p>
                      <div className="flex items-center text-yellow-400 mt-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm">{product.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <Truck className="w-4 h-4 mr-1" />
                        <span>{product.delivery}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                    <div>
                      <div className="flex items-center">
                        <span className="text-white font-medium">${product.price}</span>
                        <span className="text-gray-400 text-sm ml-2">or</span>
                        <div className="flex items-center ml-2">
                          <Coins className="w-4 h-4 text-emerald-400 mr-1" />
                          <span className="text-emerald-400">{product.healthCoinPrice} HC</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
                        onClick={() => handleBlinkitSearch(product.name, product.dosage)}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Find on Blinkit
                      </Button>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-12 text-center">
                <Pill className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => {
                    setSearchTerm("")
                    setActiveTab("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
