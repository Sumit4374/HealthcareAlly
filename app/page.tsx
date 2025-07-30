"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Shield, Brain, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">Healthcare Ally</span>
        </div>
        <div className="space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-white text-emerald-600 hover:bg-white/90">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6">
        <div className="mb-8">
          <Sparkles className="w-16 h-16 text-white/80 mx-auto mb-6" />
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">Healthcare Ally</h1>

        <p className="text-xl text-white/90 mb-4 max-w-2xl">Your Health, Our Priority</p>

        <p className="text-lg text-white/80 mb-12 max-w-3xl leading-relaxed">
          Experience the future of healthcare management with AI-powered insights, seamless connectivity, and
          personalized care.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-white/90 px-8 py-4 text-lg">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Blockchain Security</h3>
              <p className="text-white/80 text-sm">Decentralized & tamper-proof health records</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
              <p className="text-white/80 text-sm">Smart predictions & personalized care</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Connected Care</h3>
              <p className="text-white/80 text-sm">Seamless patient-doctor collaboration</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Smart Reminders</h3>
              <p className="text-white/80 text-sm">Never miss medications with ML predictions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
