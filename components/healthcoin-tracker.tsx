"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins, Plus, TrendingUp } from "lucide-react"

interface Transaction {
  id: string
  type: "earned" | "spent"
  amount: number
  description: string
  timestamp: Date
}

export function HealthCoinTracker() {
  const [balance, setBalance] = useState(250)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "earned",
      amount: 5,
      description: "Medication taken on time",
      timestamp: new Date(),
    },
  ])

  const addTransaction = (type: "earned" | "spent", amount: number, description: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      description,
      timestamp: new Date(),
    }

    setTransactions((prev) => [newTransaction, ...prev])

    if (type === "earned") {
      setBalance((prev) => prev + amount)
    } else {
      setBalance((prev) => Math.max(0, prev - amount))
    }
  }

  const earnHealthCoin = (amount: number, reason: string) => {
    addTransaction("earned", amount, reason)
  }

  const spendHealthCoin = (amount: number, reason: string) => {
    if (balance >= amount) {
      addTransaction("spent", amount, reason)
      return true
    }
    return false
  }

  return (
    <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Coins className="w-8 h-8 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">HealthCoin Balance</h3>
              <p className="text-2xl font-bold">{balance} HC</p>
              <p className="text-sm opacity-75">${(balance * 0.1).toFixed(2)} USD</p>
            </div>
          </div>
          <TrendingUp className="w-6 h-6 opacity-75" />
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => earnHealthCoin(5, "Medication reminder completed")}
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Earn 5 HC (Take Medicine)
          </Button>

          <div className="text-xs opacity-75 mt-2">
            Recent: {transactions[0]?.description} (+{transactions[0]?.amount} HC)
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export type { Transaction }
export { HealthCoinTracker as default }
