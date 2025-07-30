"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Stethoscope, Building2, ArrowLeft, Wallet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useBlockchain } from "@/hooks/useBlockchain"

export default function LoginPage() {
  const router = useRouter()
  const { connectWallet, account, isConnecting } = useBlockchain()
  const [activeTab, setActiveTab] = useState("patient")
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    userType: "patient",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Demo credentials for testing
    const demoCredentials = {
      patient: { email: "patient@demo.com", password: "demo123" },
      doctor: { email: "doctor@demo.com", password: "demo123" },
      hospital: { email: "hospital@demo.com", password: "demo123" },
    }

    const demo = demoCredentials[activeTab as keyof typeof demoCredentials]

    if (credentials.email === demo.email && credentials.password === demo.password) {
      // Simulate successful login
      localStorage.setItem("userType", activeTab)
      localStorage.setItem("isLoggedIn", "true")

      // Redirect based on user type
      if (activeTab === "patient") {
        router.push("/patient/dashboard")
      } else if (activeTab === "doctor") {
        router.push("/doctor/dashboard")
      } else {
        router.push("/hospital/dashboard")
      }
    } else {
      alert("Invalid credentials. Use demo credentials:\nEmail: " + demo.email + "\nPassword: demo123")
    }
  }

  const handleWeb3Login = async () => {
    try {
      await connectWallet()
      if (account) {
        localStorage.setItem("userType", activeTab)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("walletAddress", account)

        // Redirect based on user type
        if (activeTab === "patient") {
          router.push("/patient/dashboard")
        } else if (activeTab === "doctor") {
          router.push("/doctor/dashboard")
        } else {
          router.push("/hospital/dashboard")
        }
      }
    } catch (error) {
      console.error("Web3 login failed:", error)
      alert("Failed to connect wallet. Please make sure MetaMask is installed.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link href="/" className="flex items-center text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-emerald-600">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your Healthcare Ally account</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="patient" className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Patient
                </TabsTrigger>
                <TabsTrigger value="doctor" className="flex items-center gap-1">
                  <Stethoscope className="w-3 h-3" />
                  Doctor
                </TabsTrigger>
                <TabsTrigger value="hospital" className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Hospital
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={credentials.email}
                      onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder={`${activeTab}@demo.com`}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="demo123"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Sign In
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  onClick={handleWeb3Login}
                  disabled={isConnecting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isConnecting ? "Connecting..." : "Connect MetaMask Wallet"}
                </Button>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
                  <p className="text-xs text-emerald-700">
                    <strong>Demo Credentials:</strong>
                    <br />
                    Email: {activeTab}@demo.com
                    <br />
                    Password: demo123
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
